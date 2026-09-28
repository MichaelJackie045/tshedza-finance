/**
 * In-app checkout for the mock payment gateway.
 * Completing a payment updates the loan the same way a real gateway would.
 */
import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { cancelPayment, completePayment, fetchRepayments } from '@/lib/apiClient'
import { formatRand } from '@/lib/format'
import { Button, PageIntro, StatusPill } from '@/components/ui/primitives'

export function MockCheckoutPage() {
  const [params] = useSearchParams()
  const ref = params.get('ref') ?? ''
  const navigate = useNavigate()
  const [busy, setBusy] = useState<'pay' | 'cancel' | null>(null)
  const [error, setError] = useState<string | null>(null)

  const { data: payments, isLoading } = useQuery({
    queryKey: ['repayments'],
    queryFn: fetchRepayments,
  })
  const payment = payments?.find((row) => row.id === ref)
  const pending = (payment?.status ?? '').toLowerCase() === 'pending'

  async function onPay() {
    if (!ref) return
    setBusy('pay')
    setError(null)
    try {
      await completePayment(ref)
      navigate(`/dashboard/repayments/return?ref=${encodeURIComponent(ref)}`)
    } catch {
      setError('Could not complete this payment. Try again.')
      setBusy(null)
    }
  }

  async function onCancel() {
    if (!ref) return
    setBusy('cancel')
    setError(null)
    try {
      await cancelPayment(ref)
      navigate(`/dashboard/repayments/cancel?ref=${encodeURIComponent(ref)}`)
    } catch {
      setError('Could not cancel this payment. Try again.')
      setBusy(null)
    }
  }

  return (
    <div className="space-y-8">
      <PageIntro title="Checkout">Confirm this instalment, or go back without paying.</PageIntro>
      <p
        role="status"
        className="rounded-sm border border-amber bg-amber-soft px-4 py-3 text-[0.9375rem] text-amber"
      >
        Demo payments — no real money is charged.
      </p>

      {!ref ? (
        <p className="text-ink-muted">Missing payment reference.</p>
      ) : isLoading ? (
        <p className="text-ink-muted">Loading payment…</p>
      ) : !payment ? (
        <p className="text-ink-muted">We could not find payment {ref}.</p>
      ) : (
        <dl className="panel-soft grid gap-4 p-5 sm:grid-cols-2">
          <div>
            <dt className="text-[0.8125rem] text-ink-muted">Reference</dt>
            <dd className="font-mono text-[0.9375rem]">{payment.id}</dd>
          </div>
          <div>
            <dt className="text-[0.8125rem] text-ink-muted">Loan</dt>
            <dd className="font-mono text-[0.9375rem]">{payment.loanId ?? '—'}</dd>
          </div>
          <div>
            <dt className="text-[0.8125rem] text-ink-muted">Amount</dt>
            <dd className="font-mono text-[1.125rem] font-semibold text-teal">{formatRand(payment.amount)}</dd>
          </div>
          <div>
            <dt className="text-[0.8125rem] text-ink-muted">Status</dt>
            <dd>
              <StatusPill status={payment.status} />
            </dd>
          </div>
        </dl>
      )}

      {error ? <p className="text-[0.9375rem] text-rust">{error}</p> : null}

      <div className="flex flex-wrap gap-3">
        <Button variant="primary" onClick={() => void onPay()} disabled={!pending || busy !== null}>
          {busy === 'pay' ? 'Paying…' : 'Pay now'}
        </Button>
        <Button variant="secondary" onClick={() => void onCancel()} disabled={!pending || busy !== null}>
          {busy === 'cancel' ? 'Cancelling…' : 'Cancel'}
        </Button>
        <Link
          to="/dashboard/repayments"
          className="inline-flex min-h-11 items-center text-[0.9375rem] font-semibold text-teal hover:underline"
        >
          Back to payments
        </Link>
      </div>
    </div>
  )
}
