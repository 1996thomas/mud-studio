import HeroSection from '@/app/components/sections/HeroSection'
import BrandsSection from '@/app/components/sections/BrandsSection'
import TeamSection from '@/app/components/sections/TeamSection'
import FooterSection from '@/app/components/sections/FooterSection'

export default function Home() {
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
    </>
  )
}
