import GridMotion from '@/app/components/GridMotion'
import { NewsletterFields } from '@/app/components/newsletter/NewsletterFields'
import { siteData } from '@/app/data'
import { config } from '@/app/config'


export default function FooterSection() {
  const { brand, footer, newsletter } = siteData

  return (
    <footer
      id="contact"
      className="relative min-h-screen overflow-hidden"
      style={{ background: config.page.background }}
    >
      {/* ── Animated background layers ─────────────── */}
      <GridMotion />
    
      {/* ── Content — sits above the animated bg ───── */}
      <div
        className="relative z-10 flex min-h-screen flex-col justify-between py-16"
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
          <h2 className="mt-5 max-w-[14ch] text-[clamp(2.5rem,6vw,5.5rem)] font-black uppercase leading-[0.92]">
            {footer.title}
          </h2>

          {/* Contact info grid */}
          <div
            className="mt-14 grid gap-10 border-t pt-12 font-mono text-[13px] sm:grid-cols-3"
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
          </div>

          {/* Newsletter */}
          <div
            className="mt-14 max-w-md border-t pt-10"
            style={{ borderColor: 'rgba(234,230,221,0.12)' }}
          >
            <h3 className="text-xl font-black uppercase">{newsletter.title}</h3>
            <p className="mb-5 mt-1 text-sm" style={{ color: 'rgba(234,230,221,0.5)' }}>
              {newsletter.subtitle}
            </p>
            <NewsletterFields tone="onDark" />
          </div>
        </div>

        {/* ── Bottom bar ─────────────────────────────── */}
        <div
          className="mt-16 flex flex-wrap justify-between gap-3 border-t pt-6 text-[11px] uppercase tracking-widest"
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
