'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MEMBERS = [
  {
    number: '01',
    name: 'Thomas Kanthack',
    role: 'Président · Sérigraphie & Web',
    description: `Sérigraphie et flocage depuis le lycée.
Co-développeur de KNIT, plateforme dédiée aux marques indépendantes.`,
  },
  {
    number: '02',
    name: 'Ludo Harlay',
    role: 'Événementiel & Espace',
    description: `Formation en 3D. En charge de l'espace exposition
et de la programmation des événements culturels.`,
  },
  {
    number: '03',
    name: 'Victor Cohen',
    role: 'Atelier & Commandes',
    description: `Pop-up stores pour la Fashion Week de Paris.
En charge de l'atelier et du suivi des commandes.`,
  },
]

// How many viewport-heights worth of extra scroll to spend on the carousel.
// Higher = slower / more time on each card.
const SCROLL_MULTIPLIER = 1

export default function TeamSection() {
  // outerRef: explicit-height container — determines total scroll budget
  const outerRef  = useRef<HTMLDivElement>(null)
  // stickyRef: CSS sticky element — stays at viewport top during scroll
  const stickyRef = useRef<HTMLDivElement>(null)
  // trackRef: the horizontal row of cards
  const trackRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const outer  = outerRef.current
    const track  = trackRef.current
    if (!outer || !track) return

    // Sets outer height so the sticky section has enough scroll room.
    // outer.height = 100vh + (SCROLL_MULTIPLIER × horizontal travel)
    const setOuterHeight = () => {
      const travelX = track.scrollWidth - window.innerWidth
      outer.style.height = `${window.innerHeight + travelX * SCROLL_MULTIPLIER}px`
    }

    setOuterHeight()

    // GSAP maps scroll progress of the outer container to the track's X position.
    // start: outer top hits viewport top  → x = 0        (first card centered)
    // end:   outer bottom hits viewport bottom → x = -travelX (last card centered)
    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: outer,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
          invalidateOnRefresh: true,
          onRefresh: setOuterHeight,
        },
      })
    }, outer)

    return () => ctx.revert()
  }, [])

  return (
    // Outer: its height creates the vertical scroll budget consumed by the carousel
    <div ref={outerRef} style={{ background: '#0e0e0e' }}>

      {/* Sticky inner: glued at the top while outer scrolls beneath it */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden"
        style={{ background: '#0e0e0e' }}
      >
        {/* Section heading */}
        <div className="flex items-baseline justify-between pt-16 pb-6 p-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-500">
              Mud Studio
            </p>
            <h2 className="mt-3 text-[clamp(2.8rem,4.5vw,4rem)] font-light leading-none text-white">
              La team fondatrice
            </h2>
          </div>
          <p className="font-mono text-[11px] text-neutral-500">03 membres</p>
        </div>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="flex gap-30 pb-14"
          style={{ width: 'max-content' }}
        >
          {/* Leading spacer — first card enters centered */}
          <div
            className="flex-none"
            style={{ width: 'calc((100vw - (100vh - 220px) * 0.75) / 2)' }}
          />

          {MEMBERS.map((member, i) => (
            <div
              key={i}
              className="relative flex-none overflow-hidden rounded-2xl"
              style={{
                height: 'calc(100vh - 220px)',
                width:  'calc((100vh - 220px) * 0.75)',
              }}
            >
              {/* Photo placeholder — swap for <Image fill className="object-cover"> */}
              <div className="absolute inset-0 bg-neutral-800">
                <div className="flex h-full w-full items-center justify-center">
                  <span
                    className="select-none font-mono font-black leading-none"
                    style={{
                      fontSize: 'clamp(5rem,15vw,12rem)',
                      color: 'rgba(255,255,255,0.05)',
                    }}
                  >
                    {member.number}
                  </span>
                </div>
              </div>

              {/* Bottom gradient + text overlay */}
              <div
                className="absolute inset-x-0 bottom-0"
                style={{
                  height: '65%',
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 40%, transparent 100%)',
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <p className="font-mono text-[11px] text-white/40">{member.number}</p>
                <h3 className="mt-2 text-[clamp(1.3rem,2vw,1.8rem)] font-light leading-snug text-white">
                  {member.name}
                </h3>
                <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-white/50">
                  {member.role}
                </p>
                <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-white/40">
                  {member.description}
                </p>
              </div>
            </div>
          ))}

          {/* Trailing spacer — last card ends centered */}
          <div
            className="flex-none"
            style={{ width: 'calc((100vw - (100vh - 220px) * 0.75) / 2)' }}
          />
        </div>
      </div>
    </div>
  )
}
