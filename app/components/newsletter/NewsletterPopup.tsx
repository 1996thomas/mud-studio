'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { siteData } from '@/app/data'
import { NewsletterFields } from './NewsletterFields'

const { popup } = siteData.newsletter

export function NewsletterPopup() {
  const [open, setOpen] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sessionStorage.getItem(popup.dismissedStorageKey)) return
    const timer = setTimeout(() => setOpen(true), popup.delaySeconds * 1000)
    return () => clearTimeout(timer)
  }, [])

  useGSAP(
    () => {
      if (!open || !dialogRef.current) return
      gsap.fromTo(
        dialogRef.current,
        { opacity: 0, y: 16, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power2.out' }
      )
    },
    { dependencies: [open], scope: dialogRef }
  )

  function dismiss() {
    setOpen(false)
    sessionStorage.setItem(popup.dismissedStorageKey, '1')
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-popup-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 p-4"
      onClick={dismiss}
    >
      <div
        ref={dialogRef}
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-sm border border-line bg-paper p-8 shadow-2xl"
      >
        <button
          type="button"
          onClick={dismiss}
          aria-label={popup.closeLabel}
          className="absolute right-4 top-4 text-ink-soft transition-colors hover:text-ink"
        >
          ✕
        </button>

        <div className="mb-5 text-center">
          <h2 id="newsletter-popup-title" className="text-2xl font-black uppercase text-ink">
            {siteData.newsletter.title}
          </h2>
          <p className="mt-1 text-sm text-ink-soft">{siteData.newsletter.subtitle}</p>
        </div>

        <NewsletterFields tone="onLight" stacked />
      </div>
    </div>
  )
}
