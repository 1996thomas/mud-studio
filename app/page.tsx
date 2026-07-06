import HeroSection from '@/app/components/sections/HeroSection'
import BrandsSection from '@/app/components/sections/BrandsSection'
import TeamSection from '@/app/components/sections/TeamSection'
import FooterSection from '@/app/components/sections/FooterSection'
import Grainient from './components/Grainient'
import { config } from './config'

export default function Home() {
  const { grain } = config

  return (
    <>
      {/* 1 — Studio presentation */}
      <HeroSection />

      {/* 2 — Annual brand partners (sticky) */}
      <BrandsSection />

      {/* 3 — Founding team (horizontal scroll) */}
      <TeamSection />

      {/* 4 — Contact + newsletter (GridMotion + Grainient background) */}
      <FooterSection />
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
    </>
  )
}
