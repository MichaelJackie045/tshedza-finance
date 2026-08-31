/**
 * PayFast return / cancel pages after sandbox or live checkout redirect.
 */
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { cancelPayFastPayment, confirmPayFastPayment } from '@/lib/apiClient'
import { PageIntro, accentBtn } from '@/components/ui/primitives'
import { whatsappChatUrl } from '@/content/brand'

export function PaymentReturnPage() {
  const [params] = useSearchParams()
  const ref = params.get('ref') ?? ''
  const queryClient = useQueryClient()
  const [status, setStatus] = useState<'working' | 'ok' | 'error'>('working')
  const [message, setMessage] = useState('Confirming your payment…')

  useEffect(() => {
    let cancelled = false
    async function run() {
      if (!ref) {
        setStatus('error')
        setMessage('Missing payment reference.')
        return
      }
      try {
        await confirmPayFastPayment(ref)
        if (cancelled) return
        await queryClient.invalidateQueries({ queryKey: ['repayments'] })
        await queryClient.invalidateQueries({ queryKey: ['loans'] })
        setStatus('ok')
        setMessage('Payment received. Your balance will update shortly.')
      } catch {
        if (cancelled) return
        // ITN may already have cleared it, or user cancelled mid-flow
        await queryClient.invalidateQueries({ queryKey: ['repayments'] })
        await queryClient.invalidateQueries({ queryKey: ['loans'] })
        setStatus('ok')
        setMessage('If you completed payment on PayFast, it will show in your history once confirmed.')
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [ref, queryClient])

  return (
    <div className="space-y-6">
      <PageIntro title={status === 'error' ? 'Payment issue' : 'Payment'}>{message}</PageIntro>
      {ref ? <p className="font-mono text-[0.875rem] text-ink-muted">Ref {ref}</p> : null}
      <div className="flex flex-wrap gap-3">
        <Link to="/dashboard/repayments" className={accentBtn}>
          Back to payments
        </Link>
        <a
          href={whatsappChatUrl(
            ref
              ? `Hi Tshedza — payment reference ${ref}.`
              : 'Hi Tshedza — I need help with a repayment.',
          )}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center text-[0.9375rem] font-semibold text-teal hover:underline"
        >
          WhatsApp support
        </a>
      </div>
    </div>
  )
}

export function PaymentCancelPage() {
  const [params] = useSearchParams()
  const ref = params.get('ref')
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!ref) return
    let cancelled = false
    async function run() {
      try {
        await cancelPayFastPayment(ref!)
      } catch {
        // already cleared / unknown — still refresh lists
      }
      if (!cancelled) {
        await queryClient.invalidateQueries({ queryKey: ['repayments'] })
        await queryClient.invalidateQueries({ queryKey: ['loans'] })
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [ref, queryClient])

  return (
    <div className="space-y-6">
      <PageIntro title="Payment cancelled">
        No charge was taken. You can try again whenever you are ready.
      </PageIntro>
      {ref ? <p className="font-mono text-[0.875rem] text-ink-muted">Ref {ref}</p> : null}
      <Link to="/dashboard/repayments" className={accentBtn}>
        Back to payments
      </Link>
    </div>
  )
}
