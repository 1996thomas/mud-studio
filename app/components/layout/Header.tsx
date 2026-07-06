'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { siteData } from '@/app/data'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-7 text-[12.5px] uppercase tracking-[0.08em] text-ink transition-[background-color,border-color,padding] duration-300 ${
        scrolled
          ? 'border-b border-line bg-paper/92 py-3.5 backdrop-blur-md'
          : 'border-b border-transparent py-5'
      }`}
    >
      <Link href="/" className="text-lg font-black tracking-[0.04em]">
        {siteData.brand.name.toUpperCase()}
      </Link>

      <nav className="hidden gap-6 md:flex">
        {siteData.nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="opacity-75 transition-opacity hover:opacity-100"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-expanded={menuOpen}
        aria-label="Menu"
        className="flex flex-col gap-1.5 md:hidden"
      >
        <span
          aria-hidden
          className={`h-px w-6 bg-ink transition-transform duration-200 ${menuOpen ? 'translate-y-[3px] rotate-45' : ''}`}
        />
        <span
          aria-hidden
          className={`h-px w-6 bg-ink transition-transform duration-200 ${menuOpen ? '-translate-y-[3px] -rotate-45' : ''}`}
        />
      </button>

      {menuOpen && (
        <nav className="absolute inset-x-0 top-full flex flex-col gap-1 border-b border-line bg-paper px-7 py-6 md:hidden">
          {siteData.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="py-2 opacity-75 transition-opacity hover:opacity-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
