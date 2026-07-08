'use client'

import { useEffect, useState } from 'react'

// Fil d'Ariane vertical façon "one page" — points cliquables + scroll-spy.
// mix-blend-mode: difference fait que le blanc s'auto-adapte (sombre sur fond
// clair, clair sur fond sombre) sans avoir à connaître le thème de chaque section.
const SECTIONS = [
  { id: 'section-home', label: 'Accueil' },
  { id: 'section-brands', label: 'Marques' },
  { id: 'section-team', label: 'Équipe' },
  { id: 'section-space', label: 'Espace' },
  { id: 'contact', label: 'Contact' },
]

export function SectionNav() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    )
    if (els.length === 0) return

    const onScroll = () => {
      // Point de référence légèrement sous le haut du viewport, pour basculer
      // sur la section suivante dès qu'elle commence vraiment à occuper l'écran.
      const y = window.scrollY + window.innerHeight * 0.3
      let idx = 0
      els.forEach((el, i) => {
        const top = el.getBoundingClientRect().top + window.scrollY
        if (y >= top) idx = i
      })
      setActive(idx)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const goTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    // Saut instantané, pas smooth : un scroll animé qui traverse la zone pinnée
    // de TeamSection (GSAP ScrollTrigger) se fait recalculer la mise en page en
    // plein vol par le pin-spacer, et la destination finit fausse à mi-chemin.
    const top = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top, behavior: 'auto' })
  }

  return (
    <nav
      aria-label="Navigation des sections"
      className="fixed right-4 top-1/2 z-50 -translate-y-1/2 sm:right-6"
      style={{ mixBlendMode: 'difference' }}
    >
      <div className="relative flex flex-col items-center gap-6 py-1">
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/70" />
        {SECTIONS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(s.id)}
            aria-label={s.label}
            aria-current={active === i}
            className="group relative z-10 flex h-5 w-5 items-center justify-center"
          >
            <span
              className="pointer-events-none absolute right-full mr-3 whitespace-nowrap text-[11px] font-mono uppercase tracking-[0.15em] text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            >
              {s.label}
            </span>
            <span
              className="block rounded-full bg-white transition-all duration-300 group-hover:opacity-100"
              style={{
                width: active === i ? 10 : 6,
                height: active === i ? 10 : 6,
                opacity: active === i ? 1 : 0.65,
              }}
            />
          </button>
        ))}
      </div>
    </nav>
  )
}
