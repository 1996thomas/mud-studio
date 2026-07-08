'use client'

import dynamic from 'next/dynamic'
import HeroSection from '@/app/components/sections/HeroSection'
import BrandsSection from '@/app/components/sections/BrandsSection'
import TeamIntroSection from '@/app/components/sections/TeamIntroSection'
import TeamSection from '@/app/components/sections/TeamSection'
import SpaceIntroSection from '@/app/components/sections/SpaceIntroSection'
import FooterSection from '@/app/components/sections/FooterSection'

const SpaceSection = dynamic(
  () => import('@/app/components/sections/SpaceSection'),
  {
    ssr: false,
    // h-screen, pas minHeight:'100vh' en inline style : le vrai composant utilise
    // aussi la classe h-screen. Même classe des deux côtés = même hauteur,
    // garanti — sinon toute la page se décale d'un coup quand le composant
    // (lourd — three.js) finit de charger et remplace ce placeholder, ressenti
    // comme un saut de scroll n'importe où sur la page.
    loading: () => <div className="h-screen" style={{ background: '#171310' }} />,
  }
)



export default function Home() {

  return (
    <>
      <HeroSection />
      {/* <BrandsSection /> */}
      <TeamIntroSection />
      <TeamSection />
      <SpaceIntroSection />
      <SpaceSection />
      <FooterSection />
    </>
  )
}
