type EyebrowProps = {
  children: React.ReactNode
  className?: string
}

export function Eyebrow({ children, className = '' }: EyebrowProps) {
  return (
    <div
      className={`flex items-center gap-2.5 text-[12.5px] uppercase tracking-[0.14em] mb-4 ${className}`}
    >
      <span aria-hidden className="h-px w-[22px] bg-current" />
      {children}
    </div>
  )
}
