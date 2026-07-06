'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
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
    logoUrl: '/biznesslogowhite.svg', // → remplacer par '/logos/mb_logo.svg'
    description:
      "Marque de streetwear qui fabrique ses pièces directement dans l'atelier Mud Studio, en sérigraphie et DTF.",
  },
  {
    number: '02',
    name: ['Marginal', 'Mouvement'],
    role: 'Marque résidente',
    accent: 'var(--color-marginal)',
    bgPosition: 'top',
    bgUrl: '/margi.webp',
    logoUrl: '/margi.svg', // → remplacer par '/logos/marginal_logo.svg'
    description:
      "Collections streetwear en séries limitées, conçues et imprimées dans l'atelier depuis l'ouverture.",
  },
  {
    number: '03',
    name: ['Bourbier'],
    role: 'Marque partenaire',
    accent: 'var(--color-mud)',
    bgUrl: '/bourbier.png',
    logoUrl: '/bourbier_logo.svg', // → remplacer par '/logos/bourbier_logo.svg'
    description:
      "Production en cours de structuration avec l'atelier Mud Studio — description complète à paraître.",
  },
]

export default function BrandsSection() {
  const outerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const outer = outerRef.current
    if (!outer) return

    const CARD_SCREENS = 1.9
    const INTRO = 1
    const OUTRO = 1.2  // extra hold after last card settles — softens the transition to TeamSection

    const setHeight = () => {
      outer.style.height = `${window.innerHeight * (INTRO + BRANDS.length * CARD_SCREENS + OUTRO)}px`
    }
    setHeight()

    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches

    const ctx = gsap.context(() => {
      // Reveal cards (visibility was hidden in JSX to prevent SSR flash)
      const cards = cardRefs.current.filter(Boolean) as HTMLElement[]
      gsap.set(cards, { visibility: 'visible' })

      BRANDS.forEach((_, i) => {
        const card = cardRefs.current[i]
        const image = imageRefs.current[i]
        if (!card) return

        const getStart = () => window.innerHeight * INTRO + i * window.innerHeight * CARD_SCREENS
        const getEnterEnd = () => getStart() + window.innerHeight * 0.9
        const getHoldEnd = () => getStart() + window.innerHeight * CARD_SCREENS

        // force3D ensures translateZ(0) is used — GPU compositor layer
        gsap.fromTo(
          card,
          { yPercent: 100 },
          {
            yPercent: 0,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: outer,
              start: () => `top+=${getStart()}px top`,
              end: () => `top+=${getEnterEnd()}px top`,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        )

        // Image scale: skip on mobile — one fewer GPU transform per card
        if (!isTouch && image) {
          gsap.fromTo(
            image,
            { scale: 1.1 },
            {
              scale: 1,
              ease: 'none',
              force3D: true,
              scrollTrigger: {
                trigger: outer,
                start: () => `top+=${getStart()}px top`,
                end: () => `top+=${getHoldEnd()}px top`,
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          )
        }
      })

      const onResize = () => {
        setHeight()
        ScrollTrigger.refresh()
      }
      window.addEventListener('resize', onResize)
      requestAnimationFrame(() => ScrollTrigger.refresh())

      return () => window.removeEventListener('resize', onResize)
    }, outer)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={outerRef} className="relative bg-[var(--color-paper)]">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* BASE LAYER */}
        <div className="absolute inset-0 flex flex-col justify-between py-10 flex justify-center items-center">
          <h2 className="text-center text-[clamp(3rem,8vw,7rem)] font-black text-black/80 uppercase">
            Les marques résidentes
          </h2>
        </div>

        {/* CARDS */}
        {BRANDS.map((brand, i) => (
          <article
            key={brand.number}
            ref={(el) => {
              cardRefs.current[i] = el
            }}
            className="absolute inset-0 overflow-hidden"
            style={{ zIndex: i + 2, visibility: 'hidden', willChange: 'transform' }}
          >

            {/* IMAGE */}
            <div
              ref={(el) => {
                imageRefs.current[i] = el
              }}
              className="absolute inset-0"
            >
              <Image
                src={brand.bgUrl}
                alt={brand.name.join(' ')}
                fill
                style={{ objectPosition: brand.bgPosition }}
                priority={i === 0}
                quality={75}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/45" />

            {/* CENTER: brand logo (ou placeholder) */}
            <div className="absolute inset-0 flex items-center justify-center">
              {brand.logoUrl ? (
                <div className="relative h-28 w-56 sm:h-36 sm:w-72">
                  <Image
                    src={brand.logoUrl}
                    alt={brand.name.join(' ')}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                /* Placeholder : nom stylisé en filigranne */
                <p
                  className="select-none text-center font-black uppercase"
                  style={{
                    fontSize: 'clamp(1.6rem,5vw,3.2rem)',
                    letterSpacing: '0.12em',
                    lineHeight: 1,
                    color: 'white',
                    opacity: 0.18,
                  }}
                >
                  {brand.name.map((l, j) => (
                    <span key={j} className="block">{l}</span>
                  ))}
                </p>
              )}
            </div>

            {/* BOTTOM: numéro + nom + description */}
            <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-45">
              {/* numéro + role */}
              <div className="mb-4 flex items-center gap-2">
                <span
                  className="h-2 w-2 flex-none rounded-full"
                  style={{ background: brand.accent }}
                />
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">
                  {brand.number} · {brand.role}
                </span>
              </div>

              {/* Nom de la marque — titre de la description */}
              <h3 className="text-lg font-black uppercase leading-snug tracking-wide text-white sm:text-xl">
                {brand.name.join(' ')}
              </h3>

              {/* Description */}
              <p className="mt-2 max-w-[50ch] text-sm leading-relaxed text-white/60">
                {brand.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}