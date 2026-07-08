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
    logoUrl: '/biznesslogowhite.svg',
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
    logoUrl: '/margi.svg',
    description:
      "Collections streetwear en séries limitées, conçues et imprimées dans l'atelier depuis l'ouverture.",
  },
  {
    number: '03',
    name: ['Bourbier'],
    role: 'Marque partenaire',
    accent: 'var(--color-mud)',
    bgUrl: '/bourbier.png',
    logoUrl: '/bourbier_logo.svg',
    description:
      "Production en cours de structuration avec l'atelier Mud Studio — description complète à paraître.",
  },
]

type Brand = (typeof BRANDS)[number]

function BrandsIntro() {
  return (
    <div
      className="absolute inset-0 flex flex-col justify-between p-4 pt-8 pb-8"
      style={{ color: 'var(--color-ink)' }}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between"
        style={{
          borderBottom: '1px solid var(--color-line)',
          paddingBottom: '1.5rem',
        }}
      >
        <p
          className="font-mono text-[11px] uppercase tracking-[0.22em]"
          style={{ color: 'var(--color-mud)' }}
        >
          Mud Studio · Résidences </p>
        <p
          className="font-mono text-[11px] uppercase tracking-[0.22em]"
          style={{ color: 'var(--color-ink-soft)' }}
        >
          Montreuil · 93 </p> </div>

      ```
      {/* Headline + description */}
      <div className="flex flex-1 flex-col justify-end pb-10 pt-16">
        <h2
          className="text-[clamp(3rem,8vw,7rem)] font-black uppercase leading-[0.92]"
          style={{ color: 'var(--color-ink)' }}
        >
          {['Des marques', 'qui produisent', 'sur place'].map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>

        <div
          className="mt-10 grid gap-8 border-t pt-8 sm:grid-cols-2"
          style={{ borderColor: 'var(--color-line)' }}
        >
          <p
            className="max-w-[48ch] text-base leading-relaxed"
            style={{ color: 'var(--color-ink-soft)' }}
          >
            Mud Studio accueille des marques indépendantes dans son atelier.
            Chaque résident conçoit et fabrique directement sur place —
            sérigraphie, DTF ou flex.
          </p>

          <div className="flex items-end justify-end sm:justify-start">
            <div
              className="flex items-center gap-3"
              style={{ color: 'var(--color-ink-soft)' }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="animate-bounce"
                aria-hidden
              >
                <path
                  d="M10 3v14M10 17l-4-4M10 17l4-4"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em]">
                Scroll
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom meta bar */}
      <div
        className="flex justify-between font-mono text-[11px] uppercase tracking-widest"
        style={{
          color: 'var(--color-ink-soft)',
          borderTop: '1px solid var(--color-line)',
          paddingTop: '1.25rem',
        }}
      >
        <span>02 résidentes · 01 partenaire</span>
        <span>Sérigraphie · DTF · Flex</span>
      </div>
    </div>

  )
}

function BrandCardBody({
  brand,
  priority,
}: {
  brand: Brand
  priority?: boolean
}) {
  return (
    <>
      <Image
        src={brand.bgUrl}
        alt={brand.name.join(' ')}
        fill
        priority={priority}
        quality={75}
        sizes="100vw"
        className="object-cover object-center"
        style={{ objectPosition: brand.bgPosition }}
      />

      <div className="absolute inset-0 bg-black/45" />

      {/* CENTER: logo */}
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
            {brand.name.map((line, j) => (
              <span key={j} className="block">
                {line}
              </span>
            ))}
          </p>
        )}
      </div>

      {/* BOTTOM */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-10">
        <div className="mb-4 flex items-center gap-2">
          <span
            className="h-2 w-2 flex-none rounded-full"
            style={{ background: brand.accent }}
          />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">
            {brand.number} · {brand.role}
          </span>
        </div>

        <h3 className="text-lg font-black uppercase leading-snug tracking-wide text-white sm:text-xl">
          {brand.name.join(' ')}
        </h3>

        <p className="mt-2 max-w-[50ch] text-sm leading-relaxed text-white/60">
          {brand.description}
        </p>
      </div>
    </>

  )
}

export default function BrandsSection() {
  const outerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    if (isTouch) return


    const outer = outerRef.current
    if (!outer) return

    const CARD_SCREENS = 1.9
    const INTRO = 1
    const OUTRO = 1.2

    const setHeight = () => {
      outer.style.height = `${window.innerHeight * (INTRO + BRANDS.length * CARD_SCREENS + OUTRO)}px`
    }

    setHeight()

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLElement[]
      gsap.set(cards, { visibility: 'visible' })

      BRANDS.forEach((_, i) => {
        const card = cardRefs.current[i]
        const image = imageRefs.current[i]
        if (!card) return

        const getStart = () =>
          window.innerHeight * INTRO + i * window.innerHeight * CARD_SCREENS
        const getEnterEnd = () => getStart() + window.innerHeight * 0.9
        const getHoldEnd = () => getStart() + window.innerHeight * CARD_SCREENS

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

        if (image) {
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

  return (<section id="section-brands" className="relative">
    {/* DESKTOP */} <div
      ref={outerRef}
      className="relative hidden bg-[var(--color-paper)] md:block"
    > <div className="sticky top-0 h-screen overflow-hidden"> <BrandsIntro />


        {BRANDS.map((brand, i) => (
          <article
            key={brand.number}
            ref={(el) => {
              cardRefs.current[i] = el
            }}
            className="absolute inset-0 overflow-hidden"
            style={{
              zIndex: i + 2,
              visibility: 'hidden',
              willChange: 'transform',
            }}
          >
            <div
              ref={(el) => {
                imageRefs.current[i] = el
              }}
              className="absolute inset-0"
            >
              <BrandCardBody brand={brand} priority={i === 0} />
            </div>
          </article>
        ))}
      </div>
    </div>

    {/* MOBILE — vrai stack sticky */}

    <div className="bg-(--color-paper) md:hidden">
      {/* Intro */}
      <div className="relative min-h-svh">
        <div className="sticky top-0 h-svh overflow-hidden">
          <div className="relative h-full w-full">
            <BrandsIntro />
          </div>
        </div>
      </div>

      <div className="relative">
        {BRANDS.map((brand, i) => {
          return (
            <article
              key={brand.number}
              className="sticky overflow-hidden"
              style={{
                top: 0,
                zIndex: 20 + i,
                height: 'calc(100svh - 32px)',
              }}
            >
              <div className="relative h-full w-full">
                <BrandCardBody brand={brand} priority={i === 0} />
              </div>
            </article>
          )
        })}
      </div>
    </div>
  </section>


  )
}
