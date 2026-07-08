'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'

// Distorsion en barillet (fisheye) — courbe les lignes droites vers l'extérieur,
// contrairement à une simple hausse de FOV qui ne fait qu'étirer les bords.
// Corrigée par le ratio d'écran (sinon la distorsion est plus violente en vertical
// sur un écran étroit type mobile) et fondue en douceur vers la couleur de fond
// au lieu d'étirer le dernier pixel (qui donnait un effet "glitché").
const FisheyeShader = {
  uniforms: {
    tDiffuse: { value: null },
    strength: { value: 0.22 },
    aspect: { value: 1 },
    vignetteColor: { value: new THREE.Color('#171310') },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float strength;
    uniform float aspect;
    uniform vec3 vignetteColor;
    varying vec2 vUv;

    void main() {
      vec2 p = vUv * 2.0 - 1.0;
      p.x *= aspect;
      float r2 = dot(p, p);
      vec2 distorted = p * (1.0 + strength * r2);
      distorted.x /= aspect;
      vec2 uv = distorted * 0.5 + 0.5;

      vec2 clamped = clamp(uv, 0.0, 1.0);
      vec3 color = texture2D(tDiffuse, clamped).rgb;

      // Fondu doux vers la couleur de fond plutôt que d'étirer le pixel de bord
      vec2 overflow = abs(uv - clamped);
      float fade = smoothstep(0.0, 0.08, max(overflow.x, overflow.y));
      color = mix(color, vignetteColor, fade);

      gl_FragColor = vec4(color, 1.0);
    }
  `,
}

export default function FisheyeEffect({ strength = 0.22 }: { strength?: number }) {
  const { gl, scene, camera, size } = useThree()
  const composerRef = useRef<EffectComposer | null>(null)
  const fisheyePassRef = useRef<ShaderPass | null>(null)

  const composer = useMemo(() => {
    const c = new EffectComposer(gl)
    c.addPass(new RenderPass(scene, camera))
    const fisheyePass = new ShaderPass(FisheyeShader)
    fisheyePassRef.current = fisheyePass
    c.addPass(fisheyePass)
    composerRef.current = c
    return c
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl, scene, camera])

  useEffect(() => {
    composer.setSize(size.width, size.height)
    composer.setPixelRatio(gl.getPixelRatio())
    if (fisheyePassRef.current) {
      fisheyePassRef.current.uniforms.aspect.value = size.width / size.height
    }
  }, [composer, gl, size])

  useEffect(() => {
    if (fisheyePassRef.current) {
      fisheyePassRef.current.uniforms.strength.value = strength
    }
  }, [strength])

  useFrame(() => {
    composer.render()
  }, 1)

  return null
}
