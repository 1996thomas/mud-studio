'use client'

import type { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// Fait "aimanter" le scroll sur une section pleine page : si le scroll s'arrête
// alors qu'elle n'est qu'à moitié visible, on termine d'y entrer ou d'en sortir
// plutôt que de rester entre deux (utile pour la section 3D notamment, mais
// réutilisable sur n'importe quelle section "pleine page" simple).
// À ne pas utiliser sur une section déjà pilotée par son propre scrub GSAP
// (BrandsSection, le carrousel desktop de TeamSection) : ça casserait leur timeline.
export function useSnapSection(ref: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (!ref.current) return

      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top top',
        end: 'bottom top',
        snap: {
          snapTo: 1,
          duration: { min: 0.3, max: 0.7 },
          ease: 'power1.inOut',
        },
      })
    },
    { scope: ref, dependencies: [ref] }
  )
}
