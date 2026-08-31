/**
 * Apply step 3: amount + term + terms copy — paper-form layout.
 *
 * LINK MAP
 * - Updates applicationStore.setTerms; quote uses loanCalc.
 * - Next: ReviewStep. Route: /apply/terms.
 */

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApplicationStore } from '@/store/applicationStore'
import { RepaymentLedger } from '@/components/ledger/RepaymentLedger'
import { Button } from '@/components/ui/primitives'
import { calculateLoanQuote } from '@/lib/loanCalc'
import { formatRand } from '@/lib/format'
import { howItWorks, termsSections } from '@/content/loanTerms'

export function TermsStep() {
  const navigate = useNavigate()
  const { data, setTerms, setStep } = useApplicationStore()
  const example = calculateLoanQuote(1000, 1)

  useEffect(() => {
    if (!data.applicationId) {
      navigate('/apply/details', { replace: true })
    }
  }, [data.applicationId, navigate])

  if (!data.applicationId) {
    return <p className="text-ink-muted">Save your details first…</p>
  }

  return (
    <div className="space-y-8">
      <section>
        <p className="loan-form-section-label">Loan terms & responsibilities</p>
        <ul className="mt-4 space-y-3">
          {howItWorks.map((item) => (
            <li key={item.title}>
              <p className="text-[0.875rem] font-bold text-ink">{item.title}</p>
              <p className="mt-0.5 text-[0.875rem] leading-relaxed text-ink-muted">{item.copy}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="loan-form-example">
        <p className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-teal-mid">
          Example: R1,000 loan (1 month)
        </p>
        <dl className="mt-3 grid gap-3 sm:grid-cols-3 sm:gap-2">
          <div>
            <dt className="text-[0.8125rem] text-ink-muted">Loan amount</dt>
            <dd className="font-mono text-[0.9375rem] font-semibold text-ink">{formatRand(example.amount)}</dd>
          </div>
          <div>
            <dt className="text-[0.8125rem] text-ink-muted">Interest ({example.interestRateLabel})</dt>
            <dd className="font-mono text-[0.9375rem] font-semibold text-ink">{formatRand(example.interestCost)}</dd>
          </div>
          <div>
            <dt className="text-[0.8125rem] text-ink-muted">Total payable</dt>
            <dd className="font-mono text-[0.9375rem] font-semibold text-ink">{formatRand(example.totalRepayable)}</dd>
          </div>
        </dl>
      </section>

      <section>
        <p className="loan-form-section-label">Your quote</p>
        <div className="mt-4">
          <RepaymentLedger
            initialAmount={data.amount}
            initialTerm={data.termMonths}
            onChange={(amount, termMonths) => setTerms(amount, termMonths)}
            compact
          />
        </div>
      </section>

      <section>
        <p className="loan-form-section-label">Important notice</p>
        <div className="mt-4 space-y-3">
          {termsSections.map((section) => (
            <div key={section.title}>
              <p className="text-[0.875rem] font-bold text-ink">{section.title}</p>
              <p className="mt-0.5 text-[0.8125rem] leading-relaxed text-ink-muted">{section.body}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="loan-form-actions">
        <Button
          type="button"
          variant="ghost"
          className="min-h-11"
          onClick={() => {
            setStep(2)
            navigate('/apply/documents')
          }}
        >
          Back
        </Button>
        <Button
          type="button"
          variant="primary"
          className="min-h-11"
          onClick={() => {
            setStep(4)
            navigate('/apply/review')
          }}
        >
          Continue to review
        </Button>
      </div>
    </div>
  )
}
