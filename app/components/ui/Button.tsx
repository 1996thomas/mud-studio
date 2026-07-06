import Link from 'next/link'

type ButtonProps = {
  href: string
  children: React.ReactNode
  variant?: 'solid' | 'ghost'
  tone?: 'ink' | 'paper'
  className?: string
}

const toneStyles: Record<'ink' | 'paper', Record<'solid' | 'ghost', string>> = {
  ink: {
    solid: 'bg-ink text-paper border-ink hover:bg-mud hover:border-mud',
    ghost: 'text-ink border-ink hover:bg-ink hover:text-paper',
  },
  paper: {
    solid: 'bg-paper text-ink border-paper hover:bg-ink hover:text-paper hover:border-ink',
    ghost: 'text-paper border-paper hover:bg-paper hover:text-ink',
  },
}

export function Button({
  href,
  children,
  variant = 'solid',
  tone = 'ink',
  className = '',
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2.5 border px-5 py-3.5 text-[12.5px] uppercase tracking-[0.08em] transition-colors duration-200 ${toneStyles[tone][variant]} ${className}`}
    >
      {children}
      {variant === 'solid' && <span aria-hidden>→</span>}
    </Link>
  )
}
