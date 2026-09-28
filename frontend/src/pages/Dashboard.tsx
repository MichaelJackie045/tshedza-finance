/**
 * Authenticated customer area: loans, repayments, documents, profile.
 *
 * LINK MAP
 * - fetchLoans / fetchLoan / initiatePayment -> loans and mock checkout.
 * - Loans appear after DataInitializer seed OR admin approval of an application.
 * - Layout/nav: DashboardLayout; routes under /dashboard/* in App.tsx.
 */

import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useDashboardLoans, useLoanStatus, useRepaymentHistory } from '@/hooks/useLoanStatus'
import { fetchMe, fetchMyDocuments, initiatePayment, logout as apiLogout } from '@/lib/apiClient'
import { useAuthStore } from '@/store/authStore'
import { formatDate, formatRand } from '@/lib/format'
import { Button, StatusPill, PageIntro, accentBtn } from '@/components/ui/primitives'
import { Reveal } from '@/components/ui/Reveal'

function LoadingLine({ label }: { label: string }) {
  return <p className="text-ink-muted">{label}</p>
}

function formatPhone(phone: string | undefined) {
  if (!phone) return '—'
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`
  }
  return phone
}

export function DashboardPage() {
  const { data, isLoading } = useDashboardLoans()
  const loan = data?.loans[0]

  if (isLoading) {
    return <LoadingLine label="Loading your account…" />
  }

  if (!loan) {
    return (
      <div className="space-y-6">
        <PageIntro title="Your account">
          No active loan yet. Finish your application and we will show repayments here once
          it is approved.
        </PageIntro>
        <Link to="/apply/details" className={accentBtn}>
          Continue application
        </Link>
      </div>
    )
  }

  return (
    <div className="page-cascade space-y-10">
      <Reveal>
        <PageIntro title="Next payment">
          <span className="font-mono text-[1.35rem] font-semibold text-teal">
            {formatRand(loan.nextPaymentAmount)}
          </span>{' '}
          <span className="text-ink">on {formatDate(loan.nextPaymentDate)}.</span>{' '}
          Remaining balance {formatRand(loan.remaining)}.
        </PageIntro>
      </Reveal>

      <div className="flex flex-wrap gap-3">
        <Link to="/dashboard/repayments" className={accentBtn}>
          Make a payment
        </Link>
        <Link
          to={`/dashboard/loans/${loan.id}`}
          className="inline-flex min-h-11 items-center px-2 text-[1rem] font-semibold text-teal hover:underline"
        >
          Full schedule
        </Link>
      </div>

      <dl className="panel-soft grid gap-px overflow-hidden bg-line sm:grid-cols-3">
        <div className="relative bg-white p-5">
          <div className="accent-bar absolute inset-x-0 top-0" />
          <dt className="text-[0.6875rem] font-semibold uppercase tracking-wider text-ink-muted">
            Remaining
          </dt>
          <dd className="mt-2 font-mono text-[1.5rem] font-semibold text-ink">
            {formatRand(loan.remaining)}
          </dd>
          <p className="mt-1 flex flex-wrap items-center gap-2 text-[0.8125rem] text-ink-muted">
            <span className="font-mono">{loan.id}</span> · <StatusPill status={loan.status} />
          </p>
        </div>
        <div className="bg-white p-5">
          <dt className="text-[0.6875rem] font-semibold uppercase tracking-wider text-ink-muted">
            Monthly instalment
          </dt>
          <dd className="mt-2 font-mono text-[1.5rem] font-semibold text-teal">
            {formatRand(loan.nextPaymentAmount)}
          </dd>
          <p className="mt-1 text-[0.8125rem] text-ink-muted">Due {formatDate(loan.nextPaymentDate)}</p>
        </div>
        <div className="bg-white p-5">
          <dt className="text-[0.6875rem] font-semibold uppercase tracking-wider text-ink-muted">
            Originally borrowed
          </dt>
          <dd className="mt-2 font-mono text-[1.5rem] font-semibold text-ink">
            {formatRand(loan.principal)}
          </dd>
          <p className="mt-1 text-[0.8125rem] text-ink-muted">{loan.termMonths}-month term</p>
        </div>
      </dl>
    </div>
  )
}

export function LoanDetailPage() {
  const { loanId = '' } = useParams()
  const { data: loan, isLoading } = useLoanStatus(loanId)

  if (isLoading) {
    return <LoadingLine label="Loading loan…" />
  }

  if (!loan) {
    return (
      <div className="space-y-4">
        <PageIntro title="Loan">We could not find that loan.</PageIntro>
        <Link to="/dashboard" className={accentBtn}>
          Back to account
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="font-mono text-[0.875rem] text-ink-muted">{loan.id}</p>
        <div className="mt-1 flex flex-wrap items-center gap-3">
          <h1 className="text-[1.75rem] font-bold tracking-tight text-ink">{loan.product}</h1>
          <StatusPill status={loan.status} />
        </div>
      </div>

      <dl className="panel-soft grid gap-px overflow-hidden bg-line sm:grid-cols-3">
        {[
          ['Remaining', formatRand(loan.remaining)],
          ['Monthly instalment', formatRand(loan.monthlyInstalment)],
          ['Originally borrowed', formatRand(loan.principal)],
        ].map(([label, value]) => (
          <div key={label} className="bg-white p-5">
            <dt className="text-[0.8125rem] text-ink-muted">{label}</dt>
            <dd className="mt-1 font-mono text-[1.25rem] font-semibold text-ink">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="panel-soft overflow-x-auto">
        <table className="w-full min-w-[28rem] text-left text-[0.9375rem]">
          <caption className="sr-only">Repayment schedule</caption>
          <thead className="border-b border-line text-ink-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Due</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {loan.schedule.map((row) => (
              <tr key={row.dueDate}>
                <td className="px-4 py-3.5">{formatDate(row.dueDate)}</td>
                <td className="px-4 py-3.5 font-mono">{formatRand(row.amount)}</td>
                <td className="px-4 py-3.5">
                  <StatusPill status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function RepaymentsPage() {
  const navigate = useNavigate()
  const { data: payments, isLoading } = useRepaymentHistory()
  const { data: loansData } = useDashboardLoans()
  const loan = loansData?.loans[0]
  const [paying, setPaying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const mockPayments = import.meta.env.VITE_MOCK_PAYMENTS === 'true'

  async function onPay() {
    if (!loan) {
      setError('No active loan to pay against.')
      return
    }
    setPaying(true)
    setError(null)
    try {
      const { checkoutUrl } = await initiatePayment(loan.id)
      const url = new URL(checkoutUrl, window.location.origin)
      navigate(`${url.pathname}${url.search}`)
    } catch {
      setError('Could not start checkout. Try again.')
      setPaying(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <PageIntro title="Payments">History of what has gone out, and a button to pay the next instalment.</PageIntro>
        <Button variant="primary" onClick={() => void onPay()} disabled={paying || !loan}>
          {paying ? 'Opening checkout…' : 'Make a payment'}
        </Button>
      </div>
      {mockPayments ? (
        <p
          role="status"
          className="rounded-sm border border-amber bg-amber-soft px-4 py-3 text-[0.9375rem] text-amber"
        >
          Demo payments — no real money is charged.
        </p>
      ) : null}
      {error ? <p className="text-[0.9375rem] text-red-700">{error}</p> : null}
      {loan ? (
        <p className="text-[0.9375rem] text-ink-muted">
          Next instalment {formatRand(loan.nextPaymentAmount)}.
        </p>
      ) : null}

      <div className="panel-soft overflow-x-auto">
        {isLoading || !payments ? (
          <p className="p-5 text-ink-muted">Loading payments…</p>
        ) : payments.length === 0 ? (
          <p className="p-5 text-ink-muted">No payments yet.</p>
        ) : (
          <table className="w-full min-w-[36rem] text-left text-[0.9375rem]">
            <caption className="sr-only">Payment history</caption>
            <thead className="border-b border-line text-ink-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Reference</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Method</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {payments.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-3.5 font-mono text-[0.875rem]">{p.id}</td>
                  <td className="px-4 py-3.5">{formatDate(p.date)}</td>
                  <td className="px-4 py-3.5 font-mono">{formatRand(p.amount)}</td>
                  <td className="px-4 py-3.5">{p.method}</td>
                  <td className="px-4 py-3.5">
                    <StatusPill status={p.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

const DOC_LABELS: Record<string, string> = {
  id: 'ID document',
  payslip: 'Payslip',
  bank1: 'Bank statement — month 1',
  bank2: 'Bank statement — month 2',
  bank3: 'Bank statement — month 3',
  address: 'Proof of address',
  employment: 'Employment letter',
}

export function DocumentsPage() {
  const { data: docs, isLoading } = useQuery({
    queryKey: ['me', 'documents'],
    queryFn: fetchMyDocuments,
  })

  return (
    <div className="space-y-6">
      <PageIntro title="Documents">Submitted with your application. You can look, not replace, from here.</PageIntro>
      {isLoading ? (
        <p className="text-ink-muted">Loading documents…</p>
      ) : !docs || docs.length === 0 ? (
        <div className="space-y-4">
          <p className="text-ink-muted">No documents on file yet.</p>
          <Link to="/apply/details" className={accentBtn}>
            Start application
          </Link>
        </div>
      ) : (
        <ul className="panel-soft divide-y divide-line px-5">
          {docs.map((d) => (
            <li key={`${d.kind}-${d.fileName}`} className="flex items-center justify-between gap-3 py-4">
              <span className="text-[0.9375rem] text-ink">
                {DOC_LABELS[d.kind] ?? d.fileName ?? d.kind}
              </span>
              <span className="text-[0.8125rem] font-semibold capitalize text-sage">
                {d.status === 'uploaded' ? 'On file' : d.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function ProfilePage() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const setUser = useAuthStore((s) => s.setUser)
  const clearAuth = useAuthStore((s) => s.clearAuth)
  const [signingOut, setSigningOut] = useState(false)

  const { data: me, isLoading, isError } = useQuery({
    queryKey: ['me'],
    queryFn: fetchMe,
  })

  useEffect(() => {
    if (me) setUser(me)
  }, [me, setUser])

  const profile = me ?? user
  const fullName = profile
    ? `${profile.firstName ?? ''} ${profile.lastName ?? ''}`.trim() || '—'
    : '—'

  const rows: Array<[string, string]> = [
    ['Name', fullName],
    [
      'ID document',
      profile?.idNumberMasked
        ? `On file (${profile.idNumberMasked})`
        : 'Not submitted yet',
    ],
    ['Mobile', formatPhone(profile?.phone)],
    ['Email', profile?.email ?? '—'],
    ['Password', '••••••••'],
  ]

  const handleSignOut = async () => {
    setSigningOut(true)
    try {
      await apiLogout()
    } catch {
      // Stateless JWT — still clear local session
    } finally {
      clearAuth()
      navigate('/')
    }
  }

  if (isLoading && !profile) {
    return <LoadingLine label="Loading profile…" />
  }

  return (
    <div className="space-y-6">
      <PageIntro title="Profile">How we reach you, and the ID we have on file.</PageIntro>
      {isError && !profile ? (
        <p className="text-rust" role="alert">
          Could not load your profile. Sign in again and retry.
        </p>
      ) : null}
      <dl className="panel-soft divide-y divide-line px-5">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex flex-col gap-1 py-4 sm:flex-row sm:justify-between"
          >
            <dt className="text-[0.8125rem] text-ink-muted">{label}</dt>
            <dd className="text-[0.9375rem] text-ink">{value}</dd>
          </div>
        ))}
      </dl>
      {!profile?.idNumberMasked ? (
        <Link to="/apply/details" className={accentBtn}>
          Complete your application
        </Link>
      ) : null}
      <Button type="button" variant="ghost" onClick={handleSignOut} disabled={signingOut}>
        {signingOut ? 'Signing out…' : 'Sign out'}
      </Button>
    </div>
  )
}
