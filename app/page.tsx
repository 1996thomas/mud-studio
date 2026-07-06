'use client'

import { useEffect, useState } from 'react'
import HeroSection from '@/app/components/sections/HeroSection'
import BrandsSection from '@/app/components/sections/BrandsSection'
import TeamSection from '@/app/components/sections/TeamSection'
import FooterSection from '@/app/components/sections/FooterSection'
import Grainient from './components/Grainient'
import { config } from './config'

function useIsDesktop(breakpoint = 1024) {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${breakpoint}px)`)

    const update = () => {
      setIsDesktop(mediaQuery.matches)
    }

    update()
    mediaQuery.addEventListener('change', update)

    return () => mediaQuery.removeEventListener('change', update)
  }, [breakpoint])

  return isDesktop
}

export default function Home() {
  const { grain } = config
  const isDesktop = useIsDesktop(1024) // tu peux mettre 1280 si tu veux le garder uniquement sur gros desktop

  return (
    <>
      <HeroSection />
      <BrandsSection />
      <TeamSection />
      <FooterSection />

      {isDesktop && (
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
      )}
    </>
  )
}