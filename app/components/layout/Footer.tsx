import { siteData } from '@/app/data'
import { Eyebrow } from '@/app/components/ui/Eyebrow'
import { NewsletterFields } from '@/app/components/newsletter/NewsletterFields'

export function Footer() {
  const { brand, footer, newsletter } = siteData

  return (
    <footer id="contact" className="bg-ink px-7 py-20 text-paper">
      <div className="mx-auto max-w-280">
        <Eyebrow className="text-paper/60">{footer.eyebrow}</Eyebrow>
        <h2 className="max-w-[14ch] text-[clamp(38px,6vw,72px)] font-black uppercase leading-[0.92]">
          {footer.title}
        </h2>

        <div className="mt-14 grid gap-10 font-mono text-[13px] sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <span className="opacity-85">{brand.address.street}</span>
            <span className="opacity-85">{brand.address.city}</span>
          </div>
          <div className="flex flex-col gap-2">
            <a href={`mailto:${brand.email}`} className="opacity-85 hover:opacity-100">
              {brand.email}
            </a>
            <a href={brand.instagramUrl} className="opacity-85 hover:opacity-100">
              Instagram
            </a>
          </div>
          <div className="flex flex-col gap-2">
            {brand.hours.map((line) => (
              <span key={line} className="opacity-85">
                {line}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-14 max-w-md border-t border-paper/15 pt-10">
          <h3 className="text-xl font-black uppercase">{newsletter.title}</h3>
          <p className="mb-5 mt-1 text-sm text-paper/60">{newsletter.subtitle}</p>
          <NewsletterFields tone="onDark" />
        </div>

        <div className="mt-16 flex flex-wrap justify-between gap-3 border-t border-paper/18 pt-6 text-[11px] uppercase tracking-widest opacity-55">
          <span>{footer.bottom.left}</span>
          <span>{footer.bottom.right}</span>
        </div>
      </div>
    </footer>
  )
}
