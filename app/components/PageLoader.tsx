'use client'

import { useEffect, useRef } from 'react'

// Minimum time the loader stays visible (ms) — gives animations room to breathe
const MIN_DURATION = 3000
// Hard fallback so the loader never blocks forever
const MAX_DURATION = 10000

export default function PageLoader() {
  const loaderRef  = useRef<HTMLDivElement>(null)
  const barFillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loader  = loaderRef.current
    const barFill = barFillRef.current
    if (!loader || !barFill) return

    const startTime = Date.now()
    let closed = false

    const close = () => {
      if (closed) return
      closed = true

      const elapsed = Date.now() - startTime
      const wait    = Math.max(MIN_DURATION - elapsed, 0)

      setTimeout(() => {
        // 1. Grab current animated width so the bar doesn't jump back to 0
        const parentW  = barFill.parentElement?.getBoundingClientRect().width ?? 128
        const currentW = barFill.getBoundingClientRect().width
        const currentPct = Math.round((currentW / parentW) * 100)

        // 2. Stop CSS animation, lock at current position
        barFill.style.animation = 'none'
        barFill.style.width     = `${currentPct}%`
        // force reflow so the transition picks up from here
        void barFill.offsetHeight

        // 3. Animate to 100%
        barFill.style.transition = 'width 0.45s cubic-bezier(0.4, 0, 0.2, 1)'
        barFill.style.width      = '100%'

        // 4. Fade out the whole loader
        setTimeout(() => {
          loader.style.transition = 'opacity 0.55s ease'
          loader.style.opacity    = '0'
          setTimeout(() => { loader.style.display = 'none' }, 560)
        }, 480)
      }, wait)
    }

    // Trigger on real load or hard fallback
    if (document.readyState === 'complete') {
      close()
    } else {
      window.addEventListener('load', close, { once: true })
      setTimeout(close, MAX_DURATION)
    }
  }, [])

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-0"
      style={{ background: 'var(--color-paper)' }}
      aria-hidden="true"
    >
      {/* ── Logo + shimmer ─── */}
      <div
        className="relative overflow-hidden"
        style={{ width: 88, height: 89 }}
      >
        {/* The SVG logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/mud_logo_mini.svg"
          alt=""
          draggable={false}
          style={{ width: '100%', height: '100%', display: 'block', userSelect: 'none' }}
        />

        {/* Shimmer sweep — a light gradient that slides across the logo */}
        <div
          style={{
            position:   'absolute',
            inset:       0,
            background: 'linear-gradient(108deg, transparent 20%, rgba(234,230,221,0.55) 50%, transparent 80%)',
            animation:  'loader-shimmer 2.2s ease-in-out infinite',
          }}
        />
      </div>

      {/* ── Label ─── */}
      <p
        className="mt-8 font-mono text-[10px] uppercase tracking-[0.32em]"
        style={{ color: 'var(--color-ink-soft)' }}
      >
        Mud Studio
      </p>

      {/* ── Progress bar ─── */}
      <div
        className="mt-5 overflow-hidden rounded-full"
        style={{
          width:      132,
          height:     1.5,
          background: 'var(--color-line)',
        }}
      >
        <div
          ref={barFillRef}
          style={{
            height:       '100%',
            width:        '0%',
            borderRadius: '9999px',
            background:   'var(--color-ink)',
            // CSS animation drives fake progress 0→84% over 5s
            // JS takes over after window.load to complete to 100%
            animation: 'loader-progress 5.2s cubic-bezier(0.4, 0, 0.15, 1) forwards',
          }}
        />
      </div>
    </div>
  )
}
