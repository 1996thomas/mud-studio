'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Eyebrow } from '@/app/components/ui/Eyebrow'

gsap.registerPlugin(ScrollTrigger)

// WebGL — jamais chargé côté serveur ni avant que la section soit montée
const SpaceScene = dynamic(() => import('@/app/components/three/SpaceScene'), { ssr: false })
const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024
// Le crossfade des labels suit le moment où la caméra franchit la porte intérieure
// (voir CAM_PATH dans SpaceScene — le seuil de la porte est franchi vers 0.65-0.78)
const FADE_START = 0.65
const FADE_END = 0.78

export default function SpaceSection() {
  const outerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const atelierLabelRef = useRef<HTMLDivElement>(null)
  const expoLabelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const outer = outerRef.current
    if (!outer) return

    const SCREENS = 2.6

    const setHeight = () => {
      outer.style.height = `${window.innerHeight * SCREENS}px`
    }
    setHeight()

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: outer,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          progressRef.current = self.progress
          // Crossfade : salle d'expo visible en premier, atelier après avoir passé la porte
          const span = FADE_END - FADE_START
          const expoOpacity = Math.min(1, Math.max(0, 1 - (self.progress - FADE_START) / span))
          const atelierOpacity = Math.min(1, Math.max(0, (self.progress - FADE_START) / span))
          if (expoLabelRef.current) expoLabelRef.current.style.opacity = String(expoOpacity)
          if (atelierLabelRef.current) atelierLabelRef.current.style.opacity = String(atelierOpacity)
        },
      })

      const onResize = () => {
        setHeight()
        ScrollTrigger.refresh()
      }
      window.addEventListener('resize', onResize)
      requestAnimationFrame(() => ScrollTrigger.refresh())

      return () => {
        window.removeEventListener('resize', onResize)
        trigger.kill()
      }
    }, outer)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={outerRef} className="relative" style={{ background: '#171310' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0">
          <SpaceScene progressRef={progressRef} isDesktop={isDesktop} />
        </div>

        {/* Overlay */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 sm:p-8">
          <Eyebrow className="text-white/70">L&apos;espace — 51m²</Eyebrow>

          <div className="relative h-32 sm:h-40">
            <div ref={expoLabelRef} className="absolute inset-x-0 bottom-0">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/50">
                01 · 19m²
              </span>
              <h3 className="mt-2 text-[clamp(2rem,5vw,3.5rem)] font-black uppercase leading-[0.95] text-white">
                Salle d&apos;expo
                <br />— Pop Store
              </h3>
            </div>

            <div
              ref={atelierLabelRef}
              className="absolute inset-x-0 bottom-0"
              style={{ opacity: 0 }}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/50">
                02 · 32m²
              </span>
              <h3 className="mt-2 text-[clamp(2rem,5vw,3.5rem)] font-black uppercase leading-[0.95] text-white">
                Atelier de
                <br />
                sérigraphie
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
