import { Eyebrow } from '@/app/components/ui/Eyebrow'
import { SectionReveal } from '@/app/components/motion/SectionReveal'

type BrandSectionProps = {
  eyebrow: string
  brandMark: string
  title: string
  description: string
  role: string
  tone: 'marginal' | 'bizness'
}

const toneClasses: Record<'marginal' | 'bizness', string> = {
  marginal: 'bg-marginal',
  bizness: 'bg-bizness',
}

export function BrandSection({ eyebrow, brandMark, title, description, role, tone }: BrandSectionProps) {
  return (
    <section className={`border-b border-paper/15 px-7 pb-16 pt-35 text-paper md:pb-24 ${toneClasses[tone]}`}>
      <SectionReveal className="mx-auto grid max-w-280 gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <Eyebrow className="text-paper/75">{eyebrow}</Eyebrow>
          <div className="mb-2 text-[clamp(30px,4.4vw,44px)] font-black uppercase tracking-wide opacity-90">
            {brandMark}
          </div>
          <h1 className="max-w-[14ch] text-[clamp(34px,5vw,58px)] font-black uppercase leading-[0.92]">
            {title}
          </h1>
        </div>
        <div>
          <p className="max-w-[56ch] text-paper/80">{description}</p>
          <div className="mt-6 font-mono text-xs uppercase tracking-[0.08em] text-paper/70">{role}</div>
        </div>
      </SectionReveal>
    </section>
  )
}
