import { cn } from '@/lib/format'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

export const buttonVariants = cva(
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-5 py-2.5 text-[0.9375rem] font-semibold transition-[background-color,color,border-color,transform] duration-150 disabled:cursor-not-allowed disabled:opacity-45',
  {
    variants: {
      variant: {
        primary:
          'bg-teal text-white hover:bg-teal-deep hover:-translate-y-px shadow-[0_1px_0_rgb(255_255_255/0.12)_inset]',
        secondary:
          'border border-line-strong bg-white text-ink hover:border-ink/30 hover:bg-surface hover:-translate-y-px',
        ghost: 'bg-transparent font-medium text-teal hover:bg-teal-soft',
        outline:
          'border border-line bg-white font-medium text-ink hover:border-ink/30 hover:-translate-y-px',
        destructive: 'bg-rust text-white hover:bg-rust/90',
        accent:
          'bg-teal text-white hover:bg-teal-deep hover:-translate-y-px shadow-[0_1px_0_rgb(255_255_255/0.12)_inset]',
      },
    },
    defaultVariants: { variant: 'primary' },
  },
)

export const accentBtn = cn(buttonVariants({ variant: 'primary' }))

/** Minimal stepped mark — ascending bars + crossbar. Always drawn 1:1. */
export function BrandGlyph({
  className,
  tone = 'onDark',
}: {
  className?: string
  tone?: 'onDark' | 'onLight'
}) {
  const deep = tone === 'onDark' ? '#f4f6f5' : '#0b3d3b'
  const mid = tone === 'onDark' ? 'rgb(244 246 245 / 0.72)' : '#14706c'
  const soft = tone === 'onDark' ? 'rgb(244 246 245 / 0.4)' : '#9cbcb8'
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      width={32}
      height={32}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <rect width="32" height="32" rx="6" fill={tone === 'onDark' ? '#0b3d3b' : '#e6f0ef'} />
      <rect x="6" y="20" width="5" height="7" rx="1" fill={soft} />
      <rect x="13.5" y="14" width="5" height="13" rx="1" fill={mid} />
      <rect x="21" y="8" width="5" height="19" rx="1" fill={deep} />
      <rect x="6" y="6" width="20" height="3.5" rx="1" fill={deep} />
    </svg>
  )
}

export function BrandMark({
  to = '/',
  compact = false,
  inverse = false,
  onClick,
}: {
  to?: string
  compact?: boolean
  inverse?: boolean
  onClick?: () => void
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      aria-label="Tshedza Finance"
      className="brand-mark inline-flex items-center gap-2 sm:gap-2.5"
    >
      <BrandGlyph
        tone={inverse ? 'onLight' : 'onDark'}
        className="h-8 w-8 shrink-0 sm:h-9 sm:w-9"
      />
      <span className="flex min-w-0 flex-col justify-center leading-none">
        <span
          className={cn(
            'font-display text-[1.05rem] font-bold tracking-[-0.02em] sm:text-[1.125rem]',
            inverse ? 'text-white' : 'text-teal',
          )}
        >
          Tshedza
        </span>
        {compact ? null : (
          <span
            className={cn(
              'mt-1 font-mono text-[0.6rem] font-medium uppercase tracking-[0.16em] sm:tracking-[0.18em]',
              inverse ? 'text-white/65' : 'text-ink-muted',
            )}
          >
            Finance
          </span>
        )}
      </span>
    </Link>
  )
}

export function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>) {
  return (
    <button className={cn(buttonVariants({ variant }), className)} {...props}>
      {children}
    </button>
  )
}

const fieldClass =
  'mt-1.5 min-h-11 w-full rounded-sm border bg-white px-3 py-2.5 text-[1rem] text-ink outline-none placeholder:text-ink-muted/55 transition-colors'

export function Input({
  label,
  error,
  hint,
  className,
  id,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
  hint?: string
}) {
  const inputId = id ?? props.name
  const errorId = error ? `${inputId}-error` : undefined
  const hintId = hint ? `${inputId}-hint` : undefined
  return (
    <div className="block">
      <label htmlFor={inputId} className="block text-[0.9375rem] font-semibold text-ink">
        {label}
      </label>
      {hint ? (
        <p id={hintId} className="mt-1 text-[0.875rem] text-ink-muted">
          {hint}
        </p>
      ) : null}
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
        className={cn(
          fieldClass,
          error ? 'border-rust' : 'border-line focus:border-teal',
          className,
        )}
        {...props}
      />
      {error ? (
        <p id={errorId} className="mt-1.5 text-[0.875rem] text-rust" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function Select({
  label,
  error,
  hint,
  children,
  id,
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  error?: string
  hint?: string
  children: ReactNode
}) {
  const selectId = id ?? props.name
  const errorId = error ? `${selectId}-error` : undefined
  const hintId = hint ? `${selectId}-hint` : undefined
  return (
    <div className="block">
      <label htmlFor={selectId} className="block text-[0.9375rem] font-semibold text-ink">
        {label}
      </label>
      {hint ? (
        <p id={hintId} className="mt-1 text-[0.875rem] text-ink-muted">
          {hint}
        </p>
      ) : null}
      <select
        id={selectId}
        aria-invalid={error ? true : undefined}
        aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
        className={cn(
          fieldClass,
          'appearance-none',
          error ? 'border-rust' : 'border-line focus:border-teal',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {error ? (
        <p id={errorId} className="mt-1.5 text-[0.875rem] text-rust" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function TextArea({
  label,
  error,
  hint,
  className,
  id,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  error?: string
  hint?: string
}) {
  const areaId = id ?? props.name
  const errorId = error ? `${areaId}-error` : undefined
  const hintId = hint ? `${areaId}-hint` : undefined
  return (
    <div className="block">
      <label htmlFor={areaId} className="block text-[0.9375rem] font-semibold text-ink">
        {label}
      </label>
      {hint ? (
        <p id={hintId} className="mt-1 text-[0.875rem] text-ink-muted">
          {hint}
        </p>
      ) : null}
      <textarea
        id={areaId}
        aria-invalid={error ? true : undefined}
        aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
        className={cn(
          fieldClass,
          'min-h-32',
          error ? 'border-rust' : 'border-line focus:border-teal',
          className,
        )}
        {...props}
      />
      {error ? (
        <p id={errorId} className="mt-1.5 text-[0.875rem] text-rust" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

const statusStyles: Record<string, string> = {
  active: 'bg-sage-soft text-sage',
  approved: 'bg-sage-soft text-sage',
  paid: 'bg-sage-soft text-sage',
  cleared: 'bg-sage-soft text-sage',
  pending: 'bg-surface text-ink-muted',
  upcoming: 'bg-surface text-ink-muted',
  overdue: 'bg-rust-soft text-rust',
  cancelled: 'bg-surface text-ink-muted',
}

const statusLabels: Record<string, string> = {
  active: 'Active',
  approved: 'Approved',
  paid: 'Paid',
  cleared: 'Cleared',
  pending: 'Pending',
  upcoming: 'Upcoming',
  overdue: 'Overdue',
  cancelled: 'Cancelled',
}

export function StatusPill({
  status,
}: {
  status: 'active' | 'approved' | 'pending' | 'overdue' | 'paid' | 'upcoming' | 'cleared' | 'cancelled'
}) {
  return (
    <span
      className={cn(
        'inline-flex rounded-sm px-2 py-0.5 text-[0.75rem] font-semibold uppercase tracking-wide',
        statusStyles[status],
      )}
    >
      {statusLabels[status] ?? status}
    </span>
  )
}

export function PageIntro({
  kicker,
  title,
  children,
}: {
  kicker?: string
  title: string
  children?: ReactNode
}) {
  return (
    <header className="max-w-2xl">
      {kicker ? <SectionLabel>{kicker}</SectionLabel> : null}
      <h1
        className={cn(
          'text-[1.75rem] font-bold leading-tight tracking-tight text-ink sm:text-[2rem]',
          kicker && 'mt-2',
        )}
      >
        {title}
      </h1>
      {children ? <div className="mt-3 text-[1rem] text-ink-muted">{children}</div> : null}
    </header>
  )
}

export const islandSurface =
  'rounded-md border border-line bg-white shadow-[0_8px_30px_rgb(12_18_16/0.06)]'

export const islandSticky =
  'rounded-md border border-line bg-white/92 shadow-[0_8px_30px_rgb(12_18_16/0.06)] backdrop-blur-md'

export const softChipActive = 'rounded-sm bg-teal-soft font-semibold text-teal'
export const softChipIdle =
  'rounded-sm font-medium text-ink-muted hover:bg-surface hover:text-ink'

export function StepActions({ children }: { children: ReactNode }) {
  return (
    <div className="mt-10 flex items-center justify-between gap-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      {children}
    </div>
  )
}

export function Notice({
  children,
  tone = 'neutral',
}: {
  children: ReactNode
  tone?: 'neutral' | 'warning'
}) {
  return (
    <div
      className={cn(
        'rounded-md border px-4 py-3 text-[0.9375rem] leading-relaxed',
        tone === 'warning'
          ? 'border-amber/30 bg-amber-soft text-ink'
          : 'border-line bg-teal-soft/60 text-ink',
      )}
    >
      {children}
    </div>
  )
}

export function Panel({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn(islandSurface, className)}>{children}</div>
}

export function SectionLabel({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p
      className={cn(
        'text-[0.6875rem] font-semibold uppercase tracking-wider text-ink-muted',
        className,
      )}
    >
      {children}
    </p>
  )
}

export function IconTile({
  children,
  size = 'md',
  className,
}: {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-sm bg-teal-soft text-teal',
        size === 'sm' && 'h-8 w-8',
        size === 'md' && 'h-9 w-9',
        size === 'lg' && 'h-11 w-11',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function SoftChip({
  active = false,
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex min-h-10 items-center gap-1.5 px-3 py-2 text-[0.875rem] transition-colors',
        active ? softChipActive : softChipIdle,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function IslandShell({
  children,
  className,
  contentClassName,
}: {
  children: ReactNode
  className?: string
  contentClassName?: string
}) {
  return (
    <div className={cn('sticky top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4', className)}>
      <div className={cn(islandSticky, 'mx-auto max-w-6xl', contentClassName)}>{children}</div>
    </div>
  )
}
