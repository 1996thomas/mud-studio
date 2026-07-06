type RegMarkProps = {
  position: 'tl' | 'br'
  className?: string
}

const positionClasses: Record<'tl' | 'br', string> = {
  tl: 'top-9 left-7',
  br: 'bottom-9 right-7',
}

export function RegMark({ position, className = '' }: RegMarkProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute h-[26px] w-[26px] text-ink opacity-35 ${positionClasses[position]} ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="h-full w-full">
        <circle cx="12" cy="12" r="7" />
        <line x1="12" y1="0" x2="12" y2="24" />
        <line x1="0" y1="12" x2="24" y2="12" />
      </svg>
    </div>
  )
}
