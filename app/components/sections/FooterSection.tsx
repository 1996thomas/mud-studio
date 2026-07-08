import { NewsletterFields } from '@/app/components/newsletter/NewsletterFields'
import { siteData } from '@/app/data'
import { config } from '@/app/config'

export default function FooterSection() {
  const { brand, footer, newsletter } = siteData

  return (
    <footer
      id="contact"
      className="snap-page relative h-screen overflow-hidden"
      style={{ background: config.page.background }}
    >

      {/* ── Content — sits above the animated bg ───── */}
      <div
        className="relative z-10 flex h-screen flex-col justify-center gap-6 p-4 py-8 sm:gap-8"
        style={{ color: 'var(--color-paper)' }}
      >
        <div>
          {/* Section label */}
          <p
            className="font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{ color: 'rgba(234,230,221,0.5)' }}
          >
            {footer.eyebrow}
          </p>

          {/* Big title */}
          <h2 className="mt-3 max-w-[14ch] text-[clamp(2rem,5vw,4rem)] font-black uppercase leading-[0.95]">
            {footer.title}
          </h2>
        </div>

        {/* Adresse · Contact · Horaires · Newsletter — tout sur une ligne pour tenir en 100vh */}
        <div
          className="grid gap-6 border-t pt-6 font-mono text-[13px] sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
          style={{ borderColor: 'rgba(234,230,221,0.12)' }}
        >
          {/* Address */}
          <div className="flex flex-col gap-2">
            <span style={{ color: 'rgba(234,230,221,0.5)' }} className="mb-1 text-[11px] uppercase tracking-widest">
              Adresse
            </span>
            <span className="opacity-80">{brand.address.street}</span>
            <span className="opacity-80">{brand.address.city}</span>
          </div>

          {/* Contact links */}
          <div className="flex flex-col gap-2">
            <span style={{ color: 'rgba(234,230,221,0.5)' }} className="mb-1 text-[11px] uppercase tracking-widest">
              Contact
            </span>
            <a
              href={`mailto:${brand.email}`}
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              {brand.email}
            </a>
            <a
              href={brand.instagramUrl}
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              Instagram
            </a>
          </div>

          {/* Hours */}
          <div className="flex flex-col gap-2">
            <span style={{ color: 'rgba(234,230,221,0.5)' }} className="mb-1 text-[11px] uppercase tracking-widest">
              Horaires
            </span>
            {brand.hours.map((line) => (
              <span key={line} className="opacity-80">
                {line}
              </span>
            ))}
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-2">
            <span style={{ color: 'rgba(234,230,221,0.5)' }} className="mb-1 text-[11px] uppercase tracking-widest">
              {newsletter.title}
            </span>
            <NewsletterFields tone="onDark" stacked />
          </div>
        </div>

        {/* ── Bottom bar ─────────────────────────────── */}
        <div
          className="flex flex-wrap justify-between gap-3 border-t pt-4 text-[11px] uppercase tracking-widest"
          style={{
            borderColor: 'rgba(234,230,221,0.12)',
            color: 'rgba(234,230,221,0.4)',
          }}
        >
          <span>{footer.bottom.left}</span>
          <span>{footer.bottom.right}</span>
        </div>
      </div>
    </footer>
  )
}
