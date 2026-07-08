import { siteData } from '@/app/data'

export default function TeamIntroSection() {
  const { brand, equipe } = siteData

  return (
    <section
      className="snap-page relative flex min-h-screen flex-col p-4"
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
          {brand.location}
        </span>
      </div>

      {/* ── Main headline ───────────────────────────── */}
      <div className="flex flex-1 flex-col justify-end pb-16 pt-20">
        <p
          className="font-mono text-[11px] uppercase tracking-[0.22em]"
          style={{ color: 'var(--color-mud)' }}
        >
          {equipe.eyebrow}
        </p>

        <h2
          className="mt-6 text-[clamp(3rem,9vw,8rem)] font-black leading-[0.92] uppercase"
          style={{ color: 'var(--color-paper)' }}
        >
          {['Trois', 'fondateurs,', 'un atelier'].map((line, i) => (
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
            Sérigraphie depuis le lycée, 3D et événementiel, suivi de commandes
            et pop-up stores — trois profils complémentaires qui ont ouvert
            Mud Studio à Montreuil.
          </p>

          {/* Scroll hint */}
          <div className="flex items-end justify-end sm:justify-start">
            <div
              className="flex items-center gap-3"
              style={{ color: 'rgba(234,230,221,0.4)' }}
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
              <span className="font-mono text-[11px] uppercase tracking-[0.22em]">Scroll</span>
            </div>
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
        <span>03 membres fondateurs</span>
        <span>{brand.address.city}</span>
      </div>
    </section>
  )
}
