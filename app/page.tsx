'use client'

import { useEffect, useState, lazy, Suspense } from 'react'
import HeroSection from '@/app/components/sections/HeroSection'
import BrandsSection from '@/app/components/sections/BrandsSection'
import TeamSection from '@/app/components/sections/TeamSection'
import Grainient from './components/Grainient'
import { config } from './config'

// FooterSection loads lazily — avoids initialising WebGL + GridMotion + heavy GSAP
// on the same tick as the hero, which crashes low-end mobile devices.
const FooterSection = lazy(() => import('@/app/components/sections/FooterSection'))

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

      {/* FooterSection is heavy (WebGL + GridMotion) — defer until React is idle */}
      <Suspense fallback={<div style={{ minHeight: '100vh', background: config.page.background }} />}>
        <div className="p-4">
          <FooterSection />
        </div>
      </Suspense>

      {/* Page-wide grain overlay — desktop only, absolute canvas needs a fixed wrapper */}
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
