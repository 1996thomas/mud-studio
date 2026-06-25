'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'

const GAP = 16

function getGrid() {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const cols = vw < 640 ? 2 : vw < 1024 ? 3 : 7
  const rows = Math.ceil((vh * cols) / vw) + 2
  return { cols, rows }
}

interface GridMotionProps {
  gradientColor?: string
}

export default function GridMotion({ gradientColor = '#1C1C1C' }: GridMotionProps) {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const [grid, setGrid] = useState({ cols: 7, rows: 5 })

  useEffect(() => {
    const update = () => setGrid(getGrid())
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    gsap.ticker.lagSmoothing(0)

    // One copy = 150vw wide + the gap between the two copies at the seam
    const oneSetWidth = window.innerWidth * 1.5 + GAP

    rowRefs.current.forEach((row, i) => {
      if (!row) return
      gsap.killTweensOf(row)

      const goLeft = i % 2 === 0
      // Slightly different speed per row for depth feel
      const duration = 28 + i * 2

      gsap.fromTo(
        row,
        { x: goLeft ? 0 : -oneSetWidth },
        { x: goLeft ? -oneSetWidth : 0, duration, repeat: -1, ease: 'none' }
      )
    })

    return () => {
      rowRefs.current.forEach(row => {
        if (row) gsap.killTweensOf(row)
      })
    }
  }, [grid])

  const { cols, rows } = grid
  // Each cell: (150vw - gaps between cols) / cols
  const cellWidth = `calc((150vw - ${GAP * (cols - 1)}px) / ${cols})`

  return (
    <div className="absolute inset-0 overflow-hidden">
      <section
        className="w-full h-full overflow-hidden relative flex items-center justify-center"
        style={{ background: `radial-gradient(circle, ${gradientColor} 0%, #0a0a0a 100%)` }}
      >
        <div
          className="flex-none flex flex-col origin-center rotate-[-15deg] z-2"
          style={{ width: '150vw', gap: GAP }}
        >
          {Array.from({ length: rows }, (_, rowIndex) => (
            <div
              key={rowIndex}
              className="flex flex-none"
              style={{ gap: GAP, willChange: 'transform' }}
              ref={el => { rowRefs.current[rowIndex] = el }}
            >
              {/* Two copies of the cells for a seamless infinite loop */}
              {Array.from({ length: cols * 2 }, (_, i) => (
                <div
                  key={i}
                  className="relative flex-none overflow-hidden rounded-xl bg-[#1a1a1a]"
                  style={{ width: cellWidth, aspectRatio: '1' }}
                >
                  <Image
                    src="/mud_logo_officiel.svg"
                    alt=""
                    fill
                    loading="eager"
                    className="object-contain p-5"
                    style={{ filter: 'brightness(0) invert(1)', opacity: 0.55 }}
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
