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

const SCROLL_MULTIPLIER = 1

export default function TeamSection() {
  const outerRef  = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const trackRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const outer = outerRef.current
    const track = trackRef.current
    if (!outer || !track) return

    // Mobile: CSS snap handles the carousel natively — no JS in the scroll hot path
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return

    const setOuterHeight = () => {
      const travelX = track.scrollWidth - window.innerWidth
      outer.style.height = `${window.innerHeight + travelX * SCROLL_MULTIPLIER}px`
    }
    setOuterHeight()

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        force3D: true,
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
    <div ref={outerRef} style={{ background: '#0e0e0e' }}>
      {/*
        Desktop: sticky h-screen, GSAP drives the track's translateX
        Mobile:  static, height auto — CSS snap takes over
      */}
      <div
        ref={stickyRef}
        className="md:sticky md:top-0 md:h-screen md:overflow-hidden"
        style={{ background: '#0e0e0e' }}
      >
        {/* Heading */}
        <div className="flex items-baseline justify-between pt-16 pb-6 p-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-500">
              Mud Studio
            </p>
            <h2 className="mt-3 text-[clamp(2.8rem,4.5vw,4rem)] font-light leading-none text-white">
              Equipe fondatrice
            </h2>
          </div>
          <p className="font-mono text-[11px] text-neutral-500">03 membres</p>
        </div>

        {/*
          Mobile scroll container: overflow-x-auto + snap (native, composited)
          Desktop: overflow-visible so GSAP can move the track freely
        */}
        <div
          className="snap-scroll-container overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none"
          style={{ scrollbarWidth: 'none' }}
        >
          <div
            ref={trackRef}
            className="flex gap-5 px-4 pb-8 md:gap-30 md:px-0 md:pb-14"
            style={{ width: 'max-content', willChange: 'transform' }}
          >
            {/* Leading spacer — desktop only */}
            <div
              className="hidden md:block flex-none"
              style={{ width: 'calc((100vw - (100vh - 220px) * 0.75) / 2)' }}
            />

            {MEMBERS.map((member, i) => (
              <div
                key={i}
                className="
                  relative flex-none overflow-hidden rounded-2xl
                  snap-center
                  w-[80vw] h-[107vw]
                  md:w-[calc((100vh-220px)*0.75)] md:h-[calc(100vh-220px)]
                "
              >
                {/* Photo placeholder */}
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

                {/* Bottom gradient + text */}
                <div
                  className="absolute inset-x-0 bottom-0"
                  style={{
                    height: '65%',
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 40%, transparent 100%)',
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <p className="font-mono text-[11px] text-white/40">{member.number}</p>
                  <h3 className="mt-2 text-[clamp(1.1rem,2vw,1.8rem)] font-light leading-snug text-white">
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

            {/* Trailing spacer — desktop only */}
            <div
              className="hidden md:block flex-none"
              style={{ width: 'calc((100vw - (100vh - 220px) * 0.75) / 2)' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
