/**
 * Apply step 5: confirmation + reference — paper-form layout.
 *
 * LINK MAP
 * - Reads reference from applicationStore (set after submit).
 * - Links to /dashboard while admin decision is pending.
 */

import { Link } from 'react-router-dom'
import { useApplicationStore } from '@/store/applicationStore'
import { accentBtn } from '@/components/ui/primitives'
import { whatsappChatUrl } from '@/content/brand'

export function DoneStep() {
  const { data, reset } = useApplicationStore()
  const reference = data.reference ?? 'TF-PENDING'

  return (
    <div className="space-y-8">
      <section>
        <p className="loan-form-section-label">Application received</p>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-muted">
          Most decisions come back within one working day. Keep your phone nearby — we
          may ask for one thing to be clearer.
        </p>
      </section>

      <section className="loan-form-example">
        <p className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-teal-mid">
          Your reference
        </p>
        <p className="mt-2 select-all font-mono text-[1.65rem] font-semibold tracking-tight text-ink">
          {reference}
        </p>
        <p className="mt-2 text-[0.8125rem] text-ink-muted">
          Screenshot this or write it down. You’ll need it if you call us.
        </p>
      </section>

      <div className="loan-form-actions">
        <a
          href={whatsappChatUrl(`Hi Tshedza — my application reference is ${reference}.`)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center justify-center text-[0.9375rem] font-semibold text-teal-mid hover:underline"
        >
          Message us on WhatsApp
        </a>
        <Link
          to="/"
          onClick={() => reset()}
          className="inline-flex min-h-11 items-center justify-center text-[0.9375rem] font-semibold text-teal-mid hover:underline"
        >
          Back to home
        </Link>
        <Link to="/dashboard" className={`${accentBtn} min-h-11 w-full justify-center sm:w-auto`}>
          Go to your account
        </Link>
      </div>
    </div>
  )
}
