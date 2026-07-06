'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

type HeroHeadlineProps = {
  lines: string[]
}

export function HeroHeadline({ lines }: HeroHeadlineProps) {
  const containerRef = useRef<HTMLHeadingElement>(null)

  useGSAP(
    () => {
      const lineEls = containerRef.current?.querySelectorAll('[data-hero-line]')
      if (!lineEls?.length) return

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(lineEls, { clipPath: 'inset(0 0% 0 0)' })
        return
      }

      gsap.fromTo(
        lineEls,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'expo.inOut', stagger: 0.16 }
      )
    },
    { scope: containerRef }
  )

  return (
    <h1
      ref={containerRef}
      className="max-w-[16ch] font-black uppercase leading-[0.92] tracking-tight text-[clamp(46px,8.4vw,108px)]"
    >
      {lines.map((line, i) => (
        <span key={i} data-hero-line className="block overflow-hidden">
          {line}
        </span>
      ))}
    </h1>
  )
}
