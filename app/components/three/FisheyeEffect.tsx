'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'

// Distorsion en barillet (fisheye) — courbe les lignes droites vers l'extérieur,
// contrairement à une simple hausse de FOV qui ne fait qu'étirer les bords.
const FisheyeShader = {
  uniforms: {
    tDiffuse: { value: null },
    strength: { value: 0.22 },
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
    varying vec2 vUv;

    void main() {
      vec2 p = vUv * 2.0 - 1.0;
      float r2 = dot(p, p);
      vec2 distorted = p * (1.0 + strength * r2);
      vec2 uv = distorted * 0.5 + 0.5;

      if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
      } else {
        gl_FragColor = texture2D(tDiffuse, uv);
      }
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
