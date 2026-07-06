import Link from 'next/link'
import { Eyebrow } from '@/app/components/ui/Eyebrow'
import { SectionReveal } from '@/app/components/motion/SectionReveal'

type SectionPreviewCardProps = {
  eyebrow: string
  title: string
  description: string
  href: string
  linkLabel?: string
  tone?: 'paper' | 'paper-alt' | 'marginal' | 'bizness'
}

const toneClasses: Record<NonNullable<SectionPreviewCardProps['tone']>, string> = {
  paper: 'bg-paper text-ink',
  'paper-alt': 'bg-paper-alt text-ink',
  marginal: 'bg-marginal text-paper',
  bizness: 'bg-bizness text-paper',
}

const eyebrowToneClasses: Record<NonNullable<SectionPreviewCardProps['tone']>, string> = {
  paper: '',
  'paper-alt': '',
  marginal: 'text-paper/75',
  bizness: 'text-paper/75',
}

export function SectionPreviewCard({
  eyebrow,
  title,
  description,
  href,
  linkLabel = 'En savoir plus',
  tone = 'paper',
}: SectionPreviewCardProps) {
  return (
    <Link href={href} className={`block border-b border-line px-7 py-14 md:py-20 ${toneClasses[tone]}`}>
      <SectionReveal className="group mx-auto max-w-280">
        <Eyebrow className={eyebrowToneClasses[tone]}>{eyebrow}</Eyebrow>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-[16ch] text-[clamp(28px,4vw,46px)] font-black uppercase leading-[0.95]">
            {title}
          </h2>
          <span className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.08em] opacity-70 transition-opacity group-hover:opacity-100">
            {linkLabel} →
          </span>
        </div>
        <p className="mt-4 max-w-[56ch] opacity-80">{description}</p>
      </SectionReveal>
    </Link>
  )
}
