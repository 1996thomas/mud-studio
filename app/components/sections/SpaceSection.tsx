'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { Eyebrow } from '@/app/components/ui/Eyebrow'
import type { Poi } from '@/app/components/three/tourData'
import { useSnapSection } from '@/app/components/motion/useSnapSection'

// WebGL — jamais chargé côté serveur ni avant que la section soit montée
const TourScene = dynamic(() => import('@/app/components/three/TourScene'), { ssr: false })

const ROOM_LABELS: Record<string, { number: string; area: string; title: string[] }> = {
  expo: { number: '01', area: '19m²', title: ["Salle d'expo", '— Pop Store'] },
  atelier: { number: '02', area: '32m²', title: ['Atelier de', 'sérigraphie'] },
}

export default function SpaceSection() {
  const [currentNodeId, setCurrentNodeId] = useState('street')
  const [activePoi, setActivePoi] = useState<Poi | null>(null)
  const scrollYRef = useRef(0)
  const sectionRef = useRef<HTMLElement>(null)
  useSnapSection(sectionRef)

  const label = ROOM_LABELS[currentNodeId]
  const entered = currentNodeId !== 'street'

  // Sur mobile, le drag "regarder autour" et le scroll de page utilisent le même
  // geste tactile — on bloque donc le scroll tant qu'on est "entré" dans la visite,
  // pour éviter le conflit. Au node de départ (pas encore cliqué), la page défile normalement.
  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    if (!isTouch) return

    if (entered) {
      scrollYRef.current = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollYRef.current}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
    } else {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      window.scrollTo(0, scrollYRef.current)
    }

    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
    }
  }, [entered])

  const exitTour = () => {
    setActivePoi(null)
    setCurrentNodeId('street')
  }

  return (
    <section ref={sectionRef} className="relative h-screen w-full" style={{ background: '#171310' }}>
      <div className="absolute inset-0">
        <TourScene
          currentNodeId={currentNodeId}
          activePoi={activePoi}
          onNavigate={(nodeId) => {
            setActivePoi(null)
            setCurrentNodeId(nodeId)
          }}
          onFocusPoi={setActivePoi}
        />
      </div>

      {/* Overlay */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 sm:p-8">
        <div className="flex items-start justify-between">
          <Eyebrow className="text-white/70">L&apos;espace — 51m²</Eyebrow>

          {entered && (
            <button
              onClick={exitTour}
              className="pointer-events-auto font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white"
            >
              ✕ Quitter
            </button>
          )}
        </div>

        <div className="flex items-end justify-between gap-4">
          <div className="relative h-24 sm:h-32">
            {label && (
              <div className="absolute inset-x-0 bottom-0 transition-opacity duration-500">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/50">
                  {label.number} · {label.area}
                </span>
                <h3 className="mt-2 text-[clamp(1.6rem,4.5vw,3rem)] font-black uppercase leading-[0.95] text-white">
                  {label.title.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < label.title.length - 1 && <br />}
                    </span>
                  ))}
                </h3>
              </div>
            )}

            {currentNodeId === 'street' && (
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
                Cliquez sur le repère pour entrer
              </p>
            )}
          </div>

          {entered && (
            <p className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 sm:block">
              Glissez pour regarder autour · Cliquez sur les repères
            </p>
          )}
        </div>
      </div>

      {/* Panneau d'info point d'intérêt */}
      {activePoi && (
        <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center p-4 sm:p-8">
          <div
            className="pointer-events-auto w-full max-w-md rounded-sm border p-5"
            style={{
              background: 'rgba(23,19,16,0.92)',
              borderColor: 'rgba(234,230,221,0.18)',
              backdropFilter: 'blur(6px)',
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <h4 className="text-sm font-black uppercase tracking-wide text-white">{activePoi.title}</h4>
              <button
                onClick={() => setActivePoi(null)}
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50 hover:text-white"
                aria-label="Fermer"
              >
                ✕
              </button>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{activePoi.description}</p>
          </div>
        </div>
      )}
    </section>
  )
}
