'use client'

import { useEffect, useRef } from 'react'
import { Renderer, Program, Mesh, Triangle } from 'ogl'

// ─── Types ──────────────────────────────────────────────────────

interface GrainientProps {
  opacity?: number
  // Colors
  color1?: string
  color2?: string
  color3?: string
  // Gradient shape
  blendAngle?: number
  blendSoftness?: number
  colorBalance?: number
  // Grain
  grainAmount?: number
  grainScale?: number
  grainAnimated?: boolean
  // Animation
  timeSpeed?: number
  warpStrength?: number
  warpFrequency?: number
  warpSpeed?: number
  warpAmplitude?: number
  rotationAmount?: number
  noiseScale?: number
  // Post-processing
  contrast?: number
  gamma?: number
  saturation?: number
  // Camera
  centerX?: number
  centerY?: number
  zoom?: number
}

// ─── Helpers ────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!r) return [1, 1, 1]
  return [parseInt(r[1], 16) / 255, parseInt(r[2], 16) / 255, parseInt(r[3], 16) / 255]
}

// ─── Shaders ────────────────────────────────────────────────────

const vertex = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`

const fragment = `#version 300 es
precision highp float;
uniform vec2  iResolution;
uniform float iTime;
uniform float uTimeSpeed;
uniform float uColorBalance;
uniform float uWarpStrength;
uniform float uWarpFrequency;
uniform float uWarpSpeed;
uniform float uWarpAmplitude;
uniform float uBlendAngle;
uniform float uBlendSoftness;
uniform float uRotationAmount;
uniform float uNoiseScale;
uniform float uGrainAmount;
uniform float uGrainScale;
uniform float uGrainAnimated;
uniform float uContrast;
uniform float uGamma;
uniform float uSaturation;
uniform vec2  uCenterOffset;
uniform float uZoom;
uniform vec3  uColor1;
uniform vec3  uColor2;
uniform vec3  uColor3;
out vec4 fragColor;

#define S(a,b,t) smoothstep(a,b,t)
mat2 Rot(float a) { float s=sin(a),c=cos(a); return mat2(c,-s,s,c); }
vec2 hash(vec2 p) { p=vec2(dot(p,vec2(2127.1,81.17)),dot(p,vec2(1269.5,283.37))); return fract(sin(p)*43758.5453); }
float noise(vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.0-2.0*f);
  return 0.5+0.5*mix(
    mix(dot(-1.0+2.0*hash(i),f),                    dot(-1.0+2.0*hash(i+vec2(1,0)),f-vec2(1,0)),u.x),
    mix(dot(-1.0+2.0*hash(i+vec2(0,1)),f-vec2(0,1)),dot(-1.0+2.0*hash(i+vec2(1,1)),f-vec2(1,1)),u.x),
  u.y);
}

void main() {
  vec2 uv  = gl_FragCoord.xy / iResolution.xy;
  float t  = iTime * uTimeSpeed;
  float ar = iResolution.x / iResolution.y;

  // Warp UV space
  vec2 tuv = uv - 0.5 + uCenterOffset;
  tuv /= max(uZoom, 0.001);
  float deg = noise(vec2(t*0.1, tuv.x*tuv.y) * uNoiseScale);
  tuv.y /= ar;
  tuv *= Rot(radians((deg-0.5)*uRotationAmount+180.0));
  tuv.y *= ar;
  float amp = uWarpAmplitude / max(uWarpStrength, 0.001);
  tuv.x += sin(tuv.y * uWarpFrequency + t*uWarpSpeed) / amp;
  tuv.y += sin(tuv.x * uWarpFrequency*1.5 + t*uWarpSpeed) / (amp*0.5);

  // Gradient blend
  float bx = (tuv * Rot(radians(uBlendAngle))).x;
  float s  = max(uBlendSoftness, 0.0);
  float b  = uColorBalance;
  vec3 col = mix(
    mix(uColor3, uColor2, S(-0.3-b-s, 0.2-b+s, bx)),
    mix(uColor2, uColor1, S(-0.3-b-s, 0.2-b+s, bx)),
    S(0.5-b+s, -0.3-b-s, tuv.y)
  );

  // Grain
  vec2 grainUv = uv * max(uGrainScale, 0.001);
  if (uGrainAnimated > 0.5) grainUv += vec2(iTime * 0.05);
  col += (fract(sin(dot(grainUv, vec2(12.9898,78.233)))*43758.5453) - 0.5) * uGrainAmount;

  // Post-process
  col = (col - 0.5) * uContrast + 0.5;
  col = mix(vec3(dot(col, vec3(0.2126,0.7152,0.0722))), col, uSaturation);
  col = clamp(pow(max(col, 0.0), vec3(1.0/max(uGamma,0.001))), 0.0, 1.0);

  fragColor = vec4(col, 1.0);
}
`

// ─── Component ──────────────────────────────────────────────────

export default function Grainient({
  opacity        = 0.45,
  color1         = '#FF9FFC',
  color2         = '#5227FF',
  color3         = '#0a0a0a',
  blendAngle     = -9,
  blendSoftness  = 0.05,
  colorBalance   = 0.0,
  grainAmount    = 0.35,
  grainScale     = 2.0,
  grainAnimated  = true,
  timeSpeed      = 0.25,
  warpStrength   = 1.0,
  warpFrequency  = 5.0,
  warpSpeed      = 2.0,
  warpAmplitude  = 50.0,
  rotationAmount = 500.0,
  noiseScale     = 2.0,
  contrast       = 1.3,
  gamma          = 1.0,
  saturation     = 0.7,
  centerX        = 0.0,
  centerY        = 0.0,
  zoom           = 0.9,
}: GrainientProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  // Direct ref to the OGL Program — lets the second effect update uniforms without WeakMap lookups
  const programRef = useRef<InstanceType<typeof Program> | null>(null)

  // ── Setup WebGL context once ─────────────────────────────────
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new Renderer({ webgl: 2, alpha: true, antialias: false, dpr: Math.min(devicePixelRatio, 2) })
    const gl       = renderer.gl
    const canvas   = gl.canvas as HTMLCanvasElement
    canvas.style.cssText = 'width:100%;height:100%;display:block'
    container.appendChild(canvas)

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime:           { value: 0 },
        iResolution:     { value: new Float32Array([1, 1]) },
        uTimeSpeed:      { value: timeSpeed },
        uColorBalance:   { value: colorBalance },
        uWarpStrength:   { value: warpStrength },
        uWarpFrequency:  { value: warpFrequency },
        uWarpSpeed:      { value: warpSpeed },
        uWarpAmplitude:  { value: warpAmplitude },
        uBlendAngle:     { value: blendAngle },
        uBlendSoftness:  { value: blendSoftness },
        uRotationAmount: { value: rotationAmount },
        uNoiseScale:     { value: noiseScale },
        uGrainAmount:    { value: grainAmount },
        uGrainScale:     { value: grainScale },
        uGrainAnimated:  { value: grainAnimated ? 1.0 : 0.0 },
        uContrast:       { value: contrast },
        uGamma:          { value: gamma },
        uSaturation:     { value: saturation },
        uCenterOffset:   { value: new Float32Array([centerX, centerY]) },
        uZoom:           { value: zoom },
        uColor1:         { value: new Float32Array(hexToRgb(color1)) },
        uColor2:         { value: new Float32Array(hexToRgb(color2)) },
        uColor3:         { value: new Float32Array(hexToRgb(color3)) },
      },
    })

    programRef.current = program
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program })

    // Resize — keep canvas pixel-perfect
    const ro = new ResizeObserver(() => {
      const { width, height } = container.getBoundingClientRect()
      renderer.setSize(Math.max(1, width), Math.max(1, height))
      const res = program.uniforms.iResolution as { value: Float32Array }
      res.value[0] = gl.drawingBufferWidth
      res.value[1] = gl.drawingBufferHeight
    })
    ro.observe(container)

    // Animation loop — pauses when tab is hidden or element is off-screen
    let raf = 0
    const t0    = performance.now()
    const loop  = (t: number) => {
      ;(program.uniforms.iTime as { value: number }).value = (t - t0) * 0.001
      renderer.render({ scene: mesh })
      raf = requestAnimationFrame(loop)
    }
    const start = () => { if (!raf) raf = requestAnimationFrame(loop) }
    const stop  = () => { cancelAnimationFrame(raf); raf = 0 }

    const io = new IntersectionObserver(([e]) => e.isIntersecting ? start() : stop(), { threshold: 0 })
    io.observe(container)
    const onVisibility = () => document.hidden ? stop() : start()
    document.addEventListener('visibilitychange', onVisibility)
    start()

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      programRef.current = null
      canvas.remove()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Sync props → GPU uniforms on every prop change ───────────
  // This is what makes config.ts edits show up live in dev.
  useEffect(() => {
    const prog = programRef.current
    if (!prog) return

    const u = prog.uniforms as Record<string, { value: number | Float32Array }>
    u.uTimeSpeed.value      = timeSpeed
    u.uColorBalance.value   = colorBalance
    u.uWarpStrength.value   = warpStrength
    u.uWarpFrequency.value  = warpFrequency
    u.uWarpSpeed.value      = warpSpeed
    u.uWarpAmplitude.value  = warpAmplitude
    u.uBlendAngle.value     = blendAngle
    u.uBlendSoftness.value  = blendSoftness
    u.uRotationAmount.value = rotationAmount
    u.uNoiseScale.value     = noiseScale
    u.uGrainAmount.value    = grainAmount
    u.uGrainScale.value     = grainScale
    u.uGrainAnimated.value  = grainAnimated ? 1.0 : 0.0
    u.uContrast.value       = contrast
    u.uGamma.value          = gamma
    u.uSaturation.value     = saturation
    u.uCenterOffset.value   = new Float32Array([centerX, centerY])
    u.uZoom.value           = zoom
    u.uColor1.value         = new Float32Array(hexToRgb(color1))
    u.uColor2.value         = new Float32Array(hexToRgb(color2))
    u.uColor3.value         = new Float32Array(hexToRgb(color3))
  }, [
    timeSpeed, colorBalance, warpStrength, warpFrequency, warpSpeed, warpAmplitude,
    blendAngle, blendSoftness, rotationAmount, noiseScale,
    grainAmount, grainScale, grainAnimated,
    contrast, gamma, saturation,
    centerX, centerY, zoom,
    color1, color2, color3,
  ])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity }}
    />
  )
}
