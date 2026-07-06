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
  const outerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const outer = outerRef.current
    if (!outer) return

    const vh = () => window.innerHeight

    const CARD_SCREENS = 1.9
    const INTRO = 1

    const getHeight = () =>
      vh() * (INTRO + BRANDS.length * CARD_SCREENS)

    const setHeight = () => {
      outer.style.height = `${getHeight()}px`
    }

    setHeight()

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 0px)', () => {
        // RESET (IMPORTANT → évite les cards invisibles)
        gsap.set(cardRefs.current, { yPercent: 100, force3D: true })
        gsap.set(imageRefs.current, { scale: 1.1, force3D: true })

        BRANDS.forEach((_, i) => {
          const card = cardRefs.current[i]
          const image = imageRefs.current[i]

          if (!card) return

          const start = vh() * INTRO + i * vh() * CARD_SCREENS
          const enterEnd = start + vh() * 0.9
          const holdEnd = start + vh() * CARD_SCREENS

          // ── CARD REVEAL ─────────────────────────────
          gsap.to(card, {
            yPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: outer,
              start: () => `top+=${start}px top`,
              end: () => `top+=${enterEnd}px top`,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })

          // ── IMAGE ZOOM SMOOTH ───────────────────────
          if (image) {
            gsap.to(image, {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: outer,
                start: () => `top+=${start}px top`,
                end: () => `top+=${holdEnd}px top`,
                scrub: true,
                invalidateOnRefresh: true,
              },
            })
          }
        })

        ScrollTrigger.refresh()
      })

      const onResize = () => {
        setHeight()
        ScrollTrigger.refresh()
      }

      window.addEventListener('resize', onResize)

      return () => {
        window.removeEventListener('resize', onResize)
      }
    }, outer)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={outerRef} className="relative bg-[var(--color-paper)]">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* BASE LAYER */}
        <div className="absolute inset-0 flex flex-col justify-between py-10">
          <h2 className="text-center text-[clamp(3rem,8vw,7rem)] font-black uppercase">
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
            className="absolute inset-0 overflow-hidden will-change-transform"
            style={{ zIndex: i + 2 }}
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
                priority={i === 0}
                quality={75}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/40" />

            {/* CONTENT */}
            <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white">

              <div className="flex justify-between text-xs uppercase opacity-70">
                <span>{brand.number}</span>
                <span>{brand.role}</span>
              </div>

              <h3 className="text-[clamp(3rem,9vw,8rem)] font-black uppercase leading-[0.9]">
                {brand.name.map((l) => (
                  <span key={l} className="block">{l}</span>
                ))}
              </h3>

              <p className="max-w-[55ch] text-sm opacity-70">
                {brand.description}
              </p>

            </div>
          </article>
        ))}
      </div>
    </section>
  )
}