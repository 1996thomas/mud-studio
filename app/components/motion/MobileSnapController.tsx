'use client'

import { useEffect } from 'react'

// Sur desktop, le scroll-snap CSS natif (voir globals.css, "y proximity") suffit :
// il n'attire que si on est déjà près d'un bord, donc jamais de saut brutal à
// travers BrandsSection/TeamSection (pin + scrub GSAP sur plusieurs écrans).
//
// Sur mobile, on veut au contraire une garantie forte : on ne doit jamais rester
// coincé à moitié entre deux sections pleine page. "mandatory" ferait ça, mais il
// résout TOUJOURS vers le point de snap le plus proche — y compris en sautant par
// dessus tout BrandsSection/TeamSection si on s'arrête au milieu de leur scrub
// (ils n'ont pas de point de snap à eux). D'où ce contrôleur JS, mobile uniquement :
// il ne resnap QUE si le scroll s'arrête à l'intérieur d'une section marquée
// .snap-page ; s'il s'arrête ailleurs (zone libre Brands/Team), il ne touche à rien.
// Le scroll-snap-type CSS est désactivé sur mobile (media query dans globals.css)
// pour ne pas avoir les deux mécanismes en même temps.
export function MobileSnapController() {
  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    if (!isTouch) return

    let idleTimer: ReturnType<typeof setTimeout> | null = null
    let snapping = false

    const getSnapPages = () =>
      Array.from(document.querySelectorAll<HTMLElement>('.snap-page')).map((el) => {
        const top = el.getBoundingClientRect().top + window.scrollY
        return { top, bottom: top + el.offsetHeight }
      })

    const settle = () => {
      if (snapping) return
      const y = window.scrollY
      const current = getSnapPages().find((s) => y >= s.top - 2 && y < s.bottom - 4)
      if (!current) return // zone libre (Brands/Team) : scroll naturel, on ne touche à rien

      const diff = current.top - y
      if (Math.abs(diff) < 4) return // déjà aligné

      snapping = true
      window.scrollTo({ top: current.top, behavior: 'smooth' })
      window.setTimeout(() => {
        snapping = false
      }, 700)
    }

    const onScroll = () => {
      if (snapping) return
      if (idleTimer) clearTimeout(idleTimer)
      idleTimer = setTimeout(settle, 140)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (idleTimer) clearTimeout(idleTimer)
    }
  }, [])

  return null
}
