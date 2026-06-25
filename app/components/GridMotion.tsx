'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import { config } from '@/app/config'

// ─── Helpers ────────────────────────────────────────────────────

const G = config.grid

function computeGrid() {
  const { innerWidth: vw, innerHeight: vh } = window
  const cols = vw < 640 ? G.cols.mobile : vw < 1024 ? G.cols.tablet : G.cols.desktop
  const rows = Math.ceil((vh * cols) / vw) + 2  // +2 rows ensures full coverage after rotation
  return { cols, rows }
}

// ─── Component ──────────────────────────────────────────────────

export default function GridMotion() {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  // Start null so the server and client initial render agree (avoids SSR cell mismatch)
  const [grid, setGrid] = useState<{ cols: number; rows: number } | null>(null)

  // ── Measure viewport, recompute on resize
  useEffect(() => {
    const update = () => setGrid(computeGrid())
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // ── Kick off infinite scroll once grid dimensions are known
  useEffect(() => {
    if (!grid) return
    gsap.ticker.lagSmoothing(0)

    // Each row scrolls one "copy" width then loops — 150vw + 1 gap = exact seam
    const loopWidth = window.innerWidth * 1.5 + G.gap

    rowRefs.current.forEach((row, i) => {
      if (!row) return
      gsap.killTweensOf(row)

      const goLeft   = i % 2 === 0
      const duration = G.rowSpeed + i * 2   // stagger speed per row for depth feel

      gsap.fromTo(
        row,
        { x: goLeft ? 0 : -loopWidth },
        { x: goLeft ? -loopWidth : 0, duration, repeat: -1, ease: 'none' }
      )
    })

    const rows = rowRefs.current.slice()
    return () => { rows.forEach(row => row && gsap.killTweensOf(row)) }
  }, [grid])

  // ── Render ──────────────────────────────────────────────────

  const background = `radial-gradient(circle, ${G.gradientColor} 0%, ${config.page.background} 100%)`

  // While waiting for client measurement, show only the background gradient
  if (!grid) {
    return <div className="absolute inset-0" style={{ background }} />
  }

  const { cols, rows } = grid
  // Cell width = (150vw minus all gaps) ÷ number of columns
  const cellWidth = `calc((150vw - ${G.gap * (cols - 1)}px) / ${cols})`

  return (
    <div className="absolute inset-0 overflow-hidden">
      <section
        className="w-full h-full overflow-hidden flex items-center justify-center"
        style={{ background }}
      >
        {/* Rotated grid — 150vw wide so it covers the screen even when tilted */}
        <div
          className="flex-none flex flex-col"
          style={{
            width: '150vw',
            gap: G.gap,
            transform: `rotate(${G.rotation}deg)`,
            transformOrigin: 'center',
          }}
        >
          {Array.from({ length: rows }, (_, rowIndex) => (
            <div
              key={rowIndex}
              className="flex flex-none"
              style={{ gap: G.gap, willChange: 'transform' }}
              ref={el => { rowRefs.current[rowIndex] = el }}
            >
              {/* Double columns for seamless infinite loop */}
              {Array.from({ length: cols * 2 }, (_, i) => (
                <div
                  key={i}
                  className="relative flex-none overflow-hidden rounded-xl"
                  style={{ width: cellWidth, aspectRatio: '1', background: G.cellBackground }}
                >
                  <Image
                    src="/mud_logo_officiel.svg"
                    alt=""
                    fill
                    loading="eager"
                    className="object-contain"
                    style={{
                      filter: 'brightness(0) invert(1)',
                      opacity: G.logoOpacity,
                      padding: G.logoPadding,
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
