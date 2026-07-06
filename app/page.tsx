'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import HeroSection from '@/app/components/sections/HeroSection'
import BrandsSection from '@/app/components/sections/BrandsSection'
import TeamSection from '@/app/components/sections/TeamSection'
import { config } from './config'

// Heavy components loaded only when needed — never on initial paint
const FooterSection = dynamic(
  () => import('@/app/components/sections/FooterSection'),
  { ssr: false, loading: () => <div style={{ minHeight: '100vh', background: config.page.background }} /> }
)

const Grainient = dynamic(
  () => import('@/app/components/Grainient'),
  { ssr: false }
)

// FooterSection only mounts when user scrolls within 400px of it.
// This prevents WebGL + GridMotion + GSAP from ever initialising on the initial load.
function DeferredFooter() {
  const [ready, setReady] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true)
          io.disconnect()
        }
      },
      { rootMargin: '400px' }
    )

    io.observe(sentinel)
    return () => io.disconnect()
  }, [])

  if (!ready) {
    return (
      <div
        ref={sentinelRef}
        style={{ minHeight: '100vh', background: config.page.background }}
      />
    )
  }

  return <FooterSection />
}

function useIsDesktop(breakpoint = 1024) {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${breakpoint}px)`)
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [breakpoint])

  return isDesktop
}

export default function Home() {
  const { grain } = config
  const isDesktop = useIsDesktop()

  return (
    <>
      <HeroSection />
      <BrandsSection />
      <TeamSection />
      <DeferredFooter />

      {/* Page-wide grain overlay — desktop only */}
      {isDesktop && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Grainient
            blendAngle={grain.blendAngle}
            blendSoftness={grain.blendSoftness}
            grainAmount={grain.grainAmount}
            grainAnimated={grain.grainAnimated}
            saturation={grain.saturation}
            contrast={grain.contrast}
            opacity={grain.opacity}
            timeSpeed={grain.timeSpeed}
            warpStrength={grain.warpStrength}
            warpSpeed={grain.warpSpeed}
            color1={grain.color1}
            color2={grain.color2}
            color3={grain.color3}
          />
        </div>
      )}
    </>
  )
}
