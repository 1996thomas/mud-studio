'use client'

import { siteData } from '@/app/data'
import { useNewsletterSubscribe } from './useNewsletterSubscribe'

type NewsletterFieldsProps = {
  tone?: 'onDark' | 'onLight'
  stacked?: boolean
  className?: string
}

const toneStyles = {
  onDark: {
    input: 'bg-paper/10 border-paper/20 text-paper placeholder:text-paper/40',
    button: 'bg-paper text-ink border-paper hover:bg-mud hover:text-paper hover:border-mud',
    success: 'text-paper/70',
    error: 'text-red-300/80',
  },
  onLight: {
    input: 'bg-ink/5 border-line text-ink placeholder:text-ink-soft/50',
    button: 'bg-ink text-paper border-ink hover:bg-mud hover:border-mud',
    success: 'text-ink-soft',
    error: 'text-marginal',
  },
} as const

export function NewsletterFields({ tone = 'onLight', stacked = false, className = '' }: NewsletterFieldsProps) {
  const [state, formAction, pending] = useNewsletterSubscribe()
  const styles = toneStyles[tone]
  const n = siteData.newsletter

  return (
    <form
      action={formAction}
      className={`flex w-full gap-3 ${stacked ? 'flex-col' : 'flex-col sm:flex-row'} ${className}`}
    >
      <input
        type="email"
        name="email"
        placeholder={n.emailPlaceholder}
        required
        disabled={state?.success}
        className={`w-full flex-1 border px-4 py-3 text-sm transition focus:outline-none ${styles.input}`}
      />
      <button
        type="submit"
        disabled={pending || state?.success}
        className={`whitespace-nowrap border px-5 py-3 text-[12.5px] uppercase tracking-[0.08em] transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${styles.button}`}
      >
        {pending ? n.submitPendingLabel : state?.success ? n.submitSuccessLabel : n.submitLabel}
      </button>

      {state?.message && (
        <p
          aria-live="polite"
          className={`w-full text-xs tracking-wide ${state.success ? styles.success : styles.error}`}
        >
          {state.message}
        </p>
      )}
    </form>
  )
}
