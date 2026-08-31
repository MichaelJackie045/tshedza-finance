/**
 * Apply step 4: confirm details, accept terms, submit — paper-form layout.
 *
 * LINK MAP
 * - apiClient.submitApplication -> ApplicationController.submit -> status pending.
 * - After submit, application appears in AdminPanel queue for approve/decline.
 * - Next: DoneStep. Route: /apply/review.
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApplicationStore } from '@/store/applicationStore'
import { submitApplication } from '@/lib/apiClient'
import { calculateLoanQuote } from '@/lib/loanCalc'
import { formatRand } from '@/lib/format'
import { Button } from '@/components/ui/primitives'

function ReviewBlock({
  title,
  rows,
}: {
  title: string
  rows: Array<[string, string]>
}) {
  return (
    <section>
      <p className="loan-form-section-label">{title}</p>
      <dl className="mt-4 divide-y divide-line border border-line">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-baseline sm:justify-between"
          >
            <dt className="text-[0.75rem] font-bold uppercase tracking-wide text-ink-muted">
              {label}
            </dt>
            <dd className="text-[0.9375rem] text-ink sm:text-right sm:font-mono">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export function ReviewStep() {
  const navigate = useNavigate()
  const { data, setStep, setReference, allDocumentsReady } = useApplicationStore()
  const quote = calculateLoanQuote(data.amount, data.termMonths)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    if (!allDocumentsReady()) {
      navigate('/apply/documents')
      return
    }
    if (!data.applicationId) {
      setError('Application is missing. Go back and save your details again.')
      navigate('/apply/details')
      return
    }

    setError(null)
    setIsSubmitting(true)
    try {
      const result = await submitApplication(data.applicationId, {
        acceptedTerms: true,
        signature: `${data.details.firstName ?? ''} ${data.details.lastName ?? ''}`.trim(),
        amount: data.amount,
        termMonths: data.termMonths,
      })
      setReference(result.reference)
      setStep(5)
      navigate('/apply/done')
    } catch {
      setError('Could not submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      <p className="text-[0.9375rem] text-ink-muted">
        Check this, then send it. Submitting starts the decision clock.
      </p>

      {error ? (
        <p className="text-[0.875rem] text-rust" role="alert">
          {error}
        </p>
      ) : null}

      <ReviewBlock
        title="Personal information"
        rows={[
          ['Product', data.product === 'domestic' ? 'Domestic worker loan' : 'Cash loan'],
          ['Name', `${data.details.firstName ?? ''} ${data.details.lastName ?? ''}`.trim() || '—'],
          ['ID number', data.details.idNumber ?? '—'],
          ['Phone', data.details.phone ?? '—'],
          ['Email', data.details.email ?? '—'],
          ['Occupation', data.details.occupation ?? '—'],
          ['Employment', data.details.employmentStatus ?? '—'],
          [
            'Monthly income',
            data.details.monthlyIncome ? `R${data.details.monthlyIncome}` : '—',
          ],
        ]}
      />

      <ReviewBlock
        title="Address"
        rows={[
          ['Present address', data.details.presentAddress ?? '—'],
          ['City', data.details.city ?? '—'],
          ['Province', data.details.province ?? '—'],
          ['Postal code', data.details.postCode ?? '—'],
        ]}
      />

      <ReviewBlock
        title="The loan"
        rows={[
          ['Amount', formatRand(quote.amount)],
          ['Term', `${quote.termMonths} month${quote.termMonths === 1 ? '' : 's'}`],
          ['Monthly instalment', formatRand(quote.monthlyInstalment)],
          ['Interest', formatRand(quote.interestCost)],
          ['Total you repay', formatRand(quote.totalRepayable)],
        ]}
      />

      <div className="flex flex-wrap gap-x-4 gap-y-2 text-[0.875rem]">
        <button
          type="button"
          className="font-semibold text-teal-mid hover:underline"
          onClick={() => {
            setStep(1)
            navigate('/apply/details')
          }}
        >
          Edit details
        </button>
        <button
          type="button"
          className="font-semibold text-teal-mid hover:underline"
          onClick={() => {
            setStep(2)
            navigate('/apply/documents')
          }}
        >
          Edit documents
        </button>
        <button
          type="button"
          className="font-semibold text-teal-mid hover:underline"
          onClick={() => {
            setStep(3)
            navigate('/apply/terms')
          }}
        >
          Edit terms
        </button>
      </div>

      <div className="loan-form-actions">
        <Button
          type="button"
          variant="ghost"
          className="min-h-11"
          onClick={() => {
            setStep(3)
            navigate('/apply/terms')
          }}
        >
          Back
        </Button>
        <Button
          type="button"
          variant="primary"
          className="min-h-11"
          onClick={() => void submit()}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting…' : 'Submit application'}
        </Button>
      </div>
    </div>
  )
}
