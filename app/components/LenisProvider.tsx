'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Touch devices use native scroll — Lenis smooth scroll conflicts with iOS
    // momentum scrolling and causes heavy repaint/crash on low-end devices.
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    if (isTouch) return

    const lenis = new Lenis()
    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Sans ça, un ScrollTrigger.create({ snap: ... }) (utilisé pour aimanter des
    // sections ou des cards) appelle window.scrollTo() directement — Lenis l'ignore
    // et le réécrase à la frame suivante avec sa propre cible interne, donc le snap
    // ne "prend" jamais. On proxy le scroller par défaut (window, utilisé par tous
    // les ScrollTrigger existants) pour que ses lectures/écritures passent par Lenis
    // et restent synchronisées — sans dépendre de l'ordre de montage des composants
    // (contrairement à ScrollTrigger.defaults(), qui ne s'appliquerait qu'aux
    // triggers créés après ce useEffect).
    ScrollTrigger.scrollerProxy(window, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value as number, { immediate: true })
        }
        return lenis.animatedScroll
      },
    })

    return () => {
      lenis.destroy()
      gsap.ticker.remove(tick)
    }
  }, [])

  return <>{children}</>
}
