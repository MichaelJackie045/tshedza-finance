/**
 * Interactive quote widget (amount + term -> monthly / total).
 *
 * LINK MAP
 * - Math from lib/loanCalc.ts (same idea as backend loan creation on approve).
 * - Embedded on Home and product pages; CTA often links to /apply/details.
 * - Syncs amount+term into applicationStore so Apply starts with the same quote.
 */

import { useMemo, useState } from 'react'
import { calculateLoanQuote } from '@/lib/loanCalc'
import { formatRand, formatRandCompact, cn } from '@/lib/format'
import { useAnimatedNumber } from '@/hooks/useAnimatedNumber'
import { Link } from 'react-router-dom'
import { useApplicationStore } from '@/store/applicationStore'
import {
  accentBtn,
  islandSurface,
  SectionLabel,
  softChipActive,
  softChipIdle,
} from '@/components/ui/primitives'

type LedgerProps = {
  initialAmount?: number
  initialTerm?: number
  showCta?: boolean
  ctaTo?: string
  onChange?: (amount: number, termMonths: number) => void
  className?: string
  compact?: boolean
  featured?: boolean
  /** When true, quote changes also persist into the application draft. */
  syncToApplication?: boolean
}

export function RepaymentLedger({
  initialAmount = 5000,
  initialTerm = 3,
  showCta = false,
  ctaTo = '/apply/details',
  onChange,
  className,
  compact = false,
  featured = false,
  syncToApplication = true,
}: LedgerProps) {
  const setTerms = useApplicationStore((s) => s.setTerms)
  const [amount, setAmount] = useState(initialAmount)
  const [term, setTerm] = useState(initialTerm)

  const quote = useMemo(() => calculateLoanQuote(amount, term), [amount, term])

  const animatedMonthly = useAnimatedNumber(quote.monthlyInstalment)
  const animatedTotal = useAnimatedNumber(quote.totalRepayable)
  const animatedInterest = useAnimatedNumber(quote.interestCost)

  const publish = (nextAmount: number, nextTerm: number) => {
    onChange?.(nextAmount, nextTerm)
    if (syncToApplication) setTerms(nextAmount, nextTerm)
  }

  const updateAmount = (next: number) => {
    const clamped = Math.min(20_000, Math.max(500, next))
    setAmount(clamped)
    publish(clamped, term)
  }

  const updateTerm = (next: number) => {
    setTerm(next)
    publish(amount, next)
  }

  const fill = ((amount - 500) / (20_000 - 500)) * 100

  const handleApplyClick = () => {
    if (syncToApplication) setTerms(amount, term)
  }

  return (
    <div
      className={cn(
        islandSurface,
        'relative overflow-hidden',
        featured && 'ledger-featured border-white/15',
        className,
      )}
    >
      <div className="accent-bar" />
      <div className={cn('space-y-6', compact ? 'p-4 sm:p-5' : 'p-5 sm:p-6')}>
        <div>
          <SectionLabel>Your quote</SectionLabel>
          <p className="mt-1.5 text-[0.8125rem] text-ink-muted">
            {quote.interestRateLabel} · estimate in rand, before affordability assessment
          </p>
        </div>

        <div>
          <div className="flex items-end justify-between gap-3">
            <label htmlFor="loan-amount" className="text-[0.9375rem] font-semibold text-ink">
              How much do you need?
            </label>
            <label className="sr-only" htmlFor="loan-amount-input">
              Amount in rand
            </label>
            <input
              id="loan-amount-input"
              type="number"
              min={500}
              max={20000}
              step={100}
              value={amount}
              onChange={(e) => updateAmount(Number(e.target.value) || 500)}
              className="w-[7.5rem] rounded-sm border border-line bg-white px-2 py-1.5 text-right font-mono text-[1rem] font-semibold text-ink outline-none focus:border-teal"
            />
          </div>
          <input
            id="loan-amount"
            type="range"
            min={500}
            max={20000}
            step={100}
            value={amount}
            aria-valuetext={formatRandCompact(amount)}
            onChange={(e) => updateAmount(Number(e.target.value))}
            className="ledger-slider mt-3 w-full"
          />
          <div className="mt-1 flex justify-between font-mono text-[0.75rem] text-ink-muted">
            <span>R500</span>
            <span>R20,000</span>
          </div>
        </div>

        <fieldset>
          <legend className="text-[0.9375rem] font-semibold text-ink">Over how many months?</legend>
          <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label="Loan term">
            {Array.from({ length: 9 }, (_, i) => i + 1).map((m) => (
              <button
                key={m}
                type="button"
                role="radio"
                aria-checked={term === m}
                onClick={() => updateTerm(m)}
                className={cn(
                  'min-h-11 min-w-11 border px-3 font-mono text-[0.875rem] transition-colors',
                  term === m
                    ? cn(softChipActive, 'border-transparent')
                    : cn(softChipIdle, 'border-line bg-white'),
                )}
              >
                {m}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="border-t border-line pt-5" aria-live="polite" aria-atomic="true">
          <p className="text-[0.8125rem] font-medium uppercase tracking-wider text-ink-muted">
            You would pay
          </p>
          <p className="mt-2 font-mono text-[2.15rem] font-semibold leading-none tracking-tight text-teal">
            {formatRand(animatedMonthly)}
            <span className="ml-1.5 font-sans text-[1rem] font-normal normal-case tracking-normal text-ink-muted">
              a month
            </span>
          </p>
          <dl className="mt-5 space-y-2">
            <div className="flex justify-between gap-4 text-[0.875rem]">
              <dt className="text-ink-muted">Borrowed</dt>
              <dd className="font-mono tabular-nums text-ink">{formatRand(amount)}</dd>
            </div>
            <div className="flex justify-between gap-4 text-[0.875rem]">
              <dt className="text-ink-muted">Interest</dt>
              <dd className="font-mono tabular-nums text-ink">{formatRand(animatedInterest)}</dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-line pt-2 text-[0.875rem] font-semibold">
              <dt>Total you repay</dt>
              <dd className="font-mono tabular-nums">{formatRand(animatedTotal)}</dd>
            </div>
          </dl>
        </div>

        {showCta ? (
          <Link to={ctaTo} onClick={handleApplyClick} className={cn(accentBtn, 'w-full')}>
            Apply for this loan
          </Link>
        ) : null}
      </div>

      <style>{`
        .ledger-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          border-radius: 999px;
          background: linear-gradient(
            to right,
            #0b3d3b 0%,
            #0b3d3b ${fill}%,
            #e2e8e5 ${fill}%,
            #e2e8e5 100%
          );
          outline: none;
        }
        .ledger-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #0b3d3b;
          border: 2px solid #fff;
          box-shadow: 0 1px 3px rgb(12 18 16 / 0.25);
          cursor: pointer;
        }
        .ledger-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #0b3d3b;
          border: 2px solid #fff;
          box-shadow: 0 1px 3px rgb(12 18 16 / 0.25);
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}
