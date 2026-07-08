import { siteData } from '@/app/data'

export default function SpaceIntroSection() {
  const { brand, espace, atelier } = siteData

  return (
    <section
      id="section-space"
      className="relative flex min-h-screen flex-col p-4"
      style={{ background: '#0e0e0e', color: 'var(--color-paper)' }}
    >
      {/* ── Top bar ─────────────────────────────────── */}
      <div
        className="flex items-center justify-between py-8"
        style={{ borderBottom: '1px solid rgba(234,230,221,0.12)' }}
      >
        <span
          className="text-[13px] font-black uppercase tracking-[0.08em]"
          style={{ color: 'var(--color-paper)' }}
        >
          {brand.name.toUpperCase()}
        </span>
        <span
          className="font-mono text-[11px] uppercase tracking-[0.2em]"
          style={{ color: 'rgba(234,230,221,0.45)' }}
        >
          {brand.address.street}
        </span>
      </div>

      {/* ── Main headline ───────────────────────────── */}
      <div className="flex flex-1 flex-col justify-end pb-16 pt-20">
        <p
          className="font-mono text-[11px] uppercase tracking-[0.22em]"
          style={{ color: 'var(--color-mud)' }}
        >
          {espace.eyebrow}
        </p>

        <h2
          className="mt-6 text-[clamp(3rem,9vw,8rem)] font-black leading-[0.92] uppercase"
          style={{ color: 'var(--color-paper)' }}
        >
          {['Un atelier,', 'un espace', "d'exposition"].map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </h2>

        <div
          className="mt-12 grid gap-10 border-t pt-10 sm:grid-cols-2"
          style={{ borderColor: 'rgba(234,230,221,0.12)' }}
        >
          <p
            className="max-w-[52ch] text-base leading-relaxed"
            style={{ color: 'rgba(234,230,221,0.6)' }}
          >
            {espace.description}
          </p>

          {/* Techniques */}
          <div className="flex flex-col justify-end gap-2">
            {atelier.techniques.filter(t => !t.soon).map(t => (
              <div
                key={t.name}
                className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.18em]"
                style={{ color: 'rgba(234,230,221,0.4)' }}
              >
                <span style={{ color: 'rgba(234,230,221,0.75)' }}>{t.name}</span>
                <span>{t.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom meta bar ─────────────────────────── */}
      <div
        className="flex justify-between pb-8 font-mono text-[11px] uppercase tracking-widest"
        style={{
          color: 'rgba(234,230,221,0.4)',
          borderTop: '1px solid rgba(234,230,221,0.12)',
          paddingTop: '1.25rem',
        }}
      >
        <span>20 m² expo · 32 m² atelier</span>
        <span>{brand.address.city}</span>
      </div>
    </section>
  )
}
