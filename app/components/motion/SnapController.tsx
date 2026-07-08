'use client'

import { useEffect } from 'react'

// Aimante le scroll sur les points de départ des sections .snap-page (Hero,
// TeamIntro, SpaceIntro, la galerie 3D, Footer) : si le scroll s'arrête assez
// près de l'un d'eux (dans un rayon d'une demi-hauteur d'écran), on complète
// l'alignement vers ce bord haut. Sinon (au milieu de la zone libre
// BrandsSection/TeamSection, ou trop loin de tout point), on ne touche à rien.
//
// Pourquoi pas "snap si on est dans la section" (zone complète) : une section
// .snap-page fait ~1 écran, donc ça revenait à toujours retirer vers son haut
// peu importe où on s'était arrêté dedans — y compris juste avant d'en sortir
// pour de bon vers la suite. D'où un rayon de proximité borné plutôt qu'une
// zone entière : seule la moitié la plus proche d'un bord y est attirée,
// l'autre moitié laisse filer vers la section/la zone suivante.
//
// Pourquoi pas le scroll-snap CSS natif (scroll-snap-type) : en "mandatory" il
// résout TOUJOURS vers le point le plus proche, y compris en sautant par-dessus
// tout Brands/Team si on s'arrête au milieu de leur scrub. En "proximity" c'est
// pire dans l'autre sens : le moindre petit coup de molette près d'un bord se
// fait retirer en arrière à répétition par le navigateur (à-coups/blocage).
// Ce contrôleur ne resnap qu'une fois le scroll réellement stabilisé
// (débounce), donc aucun des deux problèmes.
export function SnapController() {
  useEffect(() => {
    let idleTimer: ReturnType<typeof setTimeout> | null = null
    let snapping = false
    // Tant qu'un doigt est posé sur l'écran, le navigateur mappe directement sa
    // position au scroll — si l'utilisateur marque une pause pour changer de
    // sens (sans relâcher), le débounce ci-dessous croit le scroll "arrêté" et
    // déclenche un scrollTo() qui se bat avec le doigt toujours actif : ça
    // saute dans tous les sens. On suspend donc toute correction tant que le
    // doigt est posé, et on ne l'évalue qu'après relâchement.
    let touching = false

    const getSnapTops = () =>
      Array.from(document.querySelectorAll<HTMLElement>('.snap-page')).map(
        (el) => el.getBoundingClientRect().top + window.scrollY
      )

    const settle = () => {
      if (snapping || touching) return
      const y = window.scrollY
      const threshold = window.innerHeight * 0.5

      let nearest: number | null = null
      let nearestDist = Infinity
      for (const top of getSnapTops()) {
        const dist = Math.abs(top - y)
        if (dist < nearestDist) {
          nearest = top
          nearestDist = dist
        }
      }
      if (nearest === null || nearestDist > threshold || nearestDist < 4) return

      snapping = true
      window.scrollTo({ top: nearest, behavior: 'smooth' })
      window.setTimeout(() => {
        snapping = false
      }, 700)
    }

    const onScroll = () => {
      if (snapping || touching) return
      if (idleTimer) clearTimeout(idleTimer)
      // Un vrai geste de scroll (molette continue, flick trackpad) déclenche une
      // rafale d'événements 'scroll' très rapprochés (souvent <100ms d'écart) —
      // il faut un débounce assez long pour couvrir toute la rafale et ne
      // resnap qu'une fois le geste vraiment terminé, pas entre deux à-coups
      // du même geste (sinon ça se corrige en boucle avant même d'avoir fini
      // de scroller, ce qui se sentait comme un gros saut pour un petit scroll).
      idleTimer = setTimeout(settle, 350)
    }

    const onTouchStart = () => {
      touching = true
      if (idleTimer) clearTimeout(idleTimer)
    }
    const onTouchEnd = () => {
      touching = false
      // Le doigt est levé, mais l'inertie peut continuer à scroller un peu —
      // le débounce habituel prend le relais pour resnap une fois ça stabilisé.
      if (idleTimer) clearTimeout(idleTimer)
      idleTimer = setTimeout(settle, 350)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('touchcancel', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('touchcancel', onTouchEnd)
      if (idleTimer) clearTimeout(idleTimer)
    }
  }, [])

  return null
}
