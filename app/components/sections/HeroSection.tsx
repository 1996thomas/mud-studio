import { siteData } from '@/app/data'

export default function HeroSection() {
  const { hero, brand } = siteData

  return (
    <section
      className="relative flex min-h-screen flex-col"
      style={{ background: 'var(--color-paper)' }}
    >
      {/* ── Top bar: logo + location ────────────────── */}
      <div
        className="flex items-center justify-between py-8"
        style={{ borderBottom: '1px solid var(--color-line)' }}
      >
        <span
          className="text-[13px] font-black uppercase tracking-[0.08em]"
          style={{ color: 'var(--color-ink)' }}
        >
          {brand.name.toUpperCase()}
        </span>
        <span
          className="font-mono text-[11px] uppercase tracking-[0.2em]"
          style={{ color: 'var(--color-ink-soft)' }}
        >
          {brand.tagline}
        </span>
      </div>

      {/* ── Main headline ───────────────────────────── */}
      <div className="flex flex-1 flex-col justify-end pb-16 pt-20">
        <p
          className="font-mono text-[11px] uppercase tracking-[0.22em]"
          style={{ color: 'var(--color-mud)' }}
        >
          {hero.eyebrow}
        </p>

        <h1
          className="mt-6 text-[clamp(3.5rem,9vw,8rem)] font-light leading-[1.0]"
          style={{ color: 'var(--color-ink)' }}
        >
          {hero.headlineLines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>

        <div
          className="mt-12 grid gap-10 border-t pt-10 sm:grid-cols-2"
          style={{ borderColor: 'var(--color-line)' }}
        >
          <p
            className="max-w-[52ch] text-base leading-relaxed"
            style={{ color: 'var(--color-ink-soft)' }}
          >
            {hero.subheading}
          </p>

          {/* Scroll hint */}
          <div className="flex items-end justify-end sm:justify-start">
            <div className="flex items-center gap-3" style={{ color: 'var(--color-ink-soft)' }}>
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
              <span className="font-mono text-[11px] uppercase tracking-[0.22em]">Scroll</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom meta bar ─────────────────────────── */}
      <div
        className="flex justify-between pb-8 font-mono text-[11px] uppercase tracking-widest"
        style={{ color: 'var(--color-ink-soft)', borderTop: '1px solid var(--color-line)', paddingTop: '1.25rem' }}
      >
        <span>{hero.meta.left}</span>
        <span>{hero.meta.right}</span>
      </div>
    </section>
  )
}
