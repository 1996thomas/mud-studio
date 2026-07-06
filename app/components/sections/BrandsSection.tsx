'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BRANDS = [
  {
    number: '01',
    name: ['Maison', 'Bizness'],
    role: 'Marque résidente',
    accent: 'var(--color-bizness)',
    bgUrl: '/mb.webp',
    bg: '#1a2a24',
    description:
      "Marque de streetwear qui fabrique ses pièces directement dans l'atelier Mud Studio, en sérigraphie et DTF.",
  },
  {
    number: '02',
    name: ['Marginal', 'Mouvement'],
    role: 'Marque résidente',
    accent: 'var(--color-marginal)',
    bgUrl: '/margi.png',
    bg: '#1f1008',
    description:
      "Collections streetwear en séries limitées, conçues et imprimées dans l'atelier depuis l'ouverture.",
  },
  {
    number: '03',
    name: ['Bourbier'],
    role: 'Marque partenaire',
    accent: 'var(--color-mud)',
    bg: '#181210',
    bgUrl: '/bourbier.png',
    description:
      "Production en cours de structuration avec l'atelier Mud Studio — description complète à paraître.",
  },
]

export default function BrandsSection() {
  // outerRef: explicit height — creates the scroll budget for the pin
  const outerRef = useRef<HTMLDivElement>(null)
  // cardRefs: the 3 brand cards that slide in from below
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])


  useEffect(() => {
    const outer = outerRef.current
    if (!outer) return

    // One full viewport per card animation, plus one viewport for the initial view
    const setHeight = () => {
      outer.style.height = `${window.innerHeight * (BRANDS.length + 1)}px`
    }
    setHeight()

    const ctx = gsap.context(() => {
      BRANDS.forEach((_, i) => {
        const card = cardRefs.current[i]
        if (!card) return

        // Card i slides from y:100% → y:0% during scroll interval [i×vh, (i+1)×vh]
        gsap.fromTo(
          card,
          { y: '100%' },
          {
            y: '0%',
            ease: 'none',
            scrollTrigger: {
              trigger: outer,
              // start/end as functions so they recalculate on resize
              start: () => `top+=${i * window.innerHeight}px top`,
              end: () => `top+=${(i + 1) * window.innerHeight}px top`,
              scrub: 1,
              invalidateOnRefresh: true,
              // only first card's ST needs to refresh outer height
              onRefresh: i === 0 ? setHeight : undefined,
            },
          }
        )
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    // Outer: its explicit height creates the vertical scroll budget
    <div ref={outerRef} style={{ background: 'var(--color-paper)' }}>

      {/* Sticky viewport: stays at top while outer scrolls */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── Base layer: "Les partenaires à l'année" ─── */}
        <div
          className="absolute inset-0 flex flex-col justify-between py-10 sm:py-16"
          style={{ background: 'var(--color-paper)', color: 'var(--color-ink)' }}
        >
          <div className="flex items-start justify-between">
            <p
              className="font-mono text-[11px] uppercase tracking-[0.22em]"
              style={{ color: 'var(--color-ink-soft)' }}
            >
              Collaborations
            </p>
            <p
              className="font-mono text-[11px]"
              style={{ color: 'var(--color-ink-soft)' }}
            >
              Montreuil · 93
            </p>
          </div>

          <h2
            className="text-[clamp(3rem,8vw,7rem)] font-black leading-none uppercase text-center"
            style={{ color: 'var(--color-ink)' }}
          >
           Les marques résidentes
          </h2>

          <div
            className="flex items-center justify-between border-t pt-5"
            style={{ borderColor: 'var(--color-line)' }}
          >
            <p
              className="font-mono text-[11px] uppercase tracking-[0.18em]"
              style={{ color: 'var(--color-ink-soft)' }}
            >
              03 marques partenaires
            </p>
            <p
              className="font-mono text-[11px]"
              style={{ color: 'var(--color-ink-soft)' }}
            >
              Scroll ↓
            </p>
          </div>
        </div>

        {/* ── Brand cards: stack from below ─────────── */}
        {BRANDS.map((brand, i) => (
          <div
            key={i}
            ref={(el) => { cardRefs.current[i] = el }}
            className="absolute inset-0 will-change-transform"
            style={{
              zIndex: i + 2,
              background: brand.bg,
              backgroundImage: `url(${brand.bgUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              // Initial state (before GSAP takes over): card is below viewport
              transform: 'translateY(100%)',
            }}
          >
            <div
              className="flex h-full flex-col justify-between py-10  sm:py-16"
              style={{ color: 'var(--color-paper)' }}
            >
              {/* Top row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="h-2.5 w-2.5 flex-none rounded-full"
                    style={{ background: brand.accent }}
                  />
                  <span
                    className="font-mono text-[11px] uppercase tracking-[0.22em]"
                    style={{ color: 'rgba(234,230,221,0.45)' }}
                  >
                    {brand.number}
                  </span>
                </div>
                <span
                  className="font-mono text-[11px] uppercase tracking-[0.15em]"
                  style={{ color: 'rgba(234,230,221,0.35)' }}
                >
                  {brand.role}
                </span>
              </div>

              {/* Brand name — large */}
              <h3
                className="text-[clamp(3rem,9vw,8rem)] font-black uppercase leading-[0.88]"
                style={{ color: 'var(--color-paper)' }}
              >
                {brand.name.map((line, j) => (
                  <span key={j} className="block">{line}</span>
                ))}
              </h3>

              {/* Description */}
              <div
                className="border-t pt-5"
                style={{ borderColor: 'rgba(234,230,221,0.1)' }}
              >
                <p
                  className="max-w-[52ch] text-sm leading-relaxed sm:text-base"
                  style={{ color: 'rgba(234,230,221,0.55)' }}
                >
                  {brand.description}
                </p>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}
