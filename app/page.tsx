'use client'

import dynamic from 'next/dynamic'
import HeroSection from '@/app/components/sections/HeroSection'
import BrandsSection from '@/app/components/sections/BrandsSection'
import TeamSection from '@/app/components/sections/TeamSection'
import FooterSection from '@/app/components/sections/FooterSection'

const SpaceSection = dynamic(
  () => import('@/app/components/sections/SpaceSection'),
  { ssr: false, loading: () => <div style={{ minHeight: '100vh', background: '#171310' }} /> }
)



export default function Home() {

  return (
    <>
      <HeroSection />
      <BrandsSection />
      <TeamSection />
      <SpaceSection />
      <FooterSection />
    </>
  )
}
