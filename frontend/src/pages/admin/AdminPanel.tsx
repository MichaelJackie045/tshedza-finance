/**
 * Admin operations UI: pending applications, loans, transfers, debt reviews.
 *
 * LINK MAP
 * - Data: apiClient fetchAdmin* -> AdminController /api/admin/*
 * - Approve/Decline -> adminDecideApplication -> ApplicationService.decide
 *   (approve creates Loan visible on user Dashboard).
 * - Route protected by RequireAdmin; nav link shown in PublicLayout when role=ADMIN.
 */

import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  adminDecideApplication,
  fetchAdminApplications,
  fetchAdminDebtReviews,
  fetchAdminLoans,
  fetchAdminOverview,
  fetchAdminTransfers,
} from '@/lib/apiClient'
import { cn, formatDate, formatRand } from '@/lib/format'
import {
  BrandMark,
  Button,
  IslandShell,
  PageIntro,
  Panel,
  SoftChip,
  StatusPill,
} from '@/components/ui/primitives'
import { Reveal } from '@/components/ui/Reveal'
import { Link, useNavigate } from 'react-router-dom'
import { logout as apiLogout } from '@/lib/apiClient'
import { useAuthStore } from '@/store/authStore'
import { customerWhatsAppUrl } from '@/content/brand'

type QueueTab = 'applications' | 'loans' | 'transfers' | 'debt'

export function AdminPanelPage() {
  const navigate = useNavigate()
  const clearAuth = useAuthStore((s) => s.clearAuth)
  const [tab, setTab] = useState<QueueTab>('applications')
  const [note, setNote] = useState<Record<string, string>>({})
  const qc = useQueryClient()

  const { data: overview } = useQuery({ queryKey: ['admin-overview'], queryFn: fetchAdminOverview })
  const { data: applications } = useQuery({
    queryKey: ['admin-applications'],
    queryFn: () => fetchAdminApplications('pending'),
  })
  const { data: loans } = useQuery({ queryKey: ['admin-loans'], queryFn: fetchAdminLoans })
  const { data: transfers } = useQuery({ queryKey: ['admin-transfers'], queryFn: fetchAdminTransfers })
  const { data: debtReviews } = useQuery({ queryKey: ['admin-debt'], queryFn: fetchAdminDebtReviews })

  const decision = useMutation({
    mutationFn: ({ id, value, note }: { id: string; value: 'approve' | 'decline'; note?: string }) =>
      adminDecideApplication(id, value, note),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['admin-overview'] })
      void qc.invalidateQueries({ queryKey: ['admin-applications'] })
      void qc.invalidateQueries({ queryKey: ['admin-loans'] })
    },
  })

  const handleSignOut = async () => {
    try {
      await apiLogout()
    } catch {
      // clear local session anyway
    }
    clearAuth()
    navigate('/')
  }

  const cards = useMemo(
    () => [
      ['Pending applications', overview?.pendingApplications ?? 0],
      ['Approved today set', overview?.approvedApplications ?? 0],
      ['Declined', overview?.declinedApplications ?? 0],
      ['Active loans', overview?.activeLoans ?? 0],
      ['Pending transfers', overview?.pendingTransfers ?? 0],
      ['Debt-review requests', overview?.debtReviewRequests ?? 0],
    ],
    [overview],
  )

  return (
    <div className="min-h-screen bg-surface">
      <IslandShell>
        <div className="flex items-center justify-between px-4 py-3 sm:px-5">
          <div className="flex items-baseline gap-2">
            <BrandMark />
            <span className="text-[0.6875rem] font-semibold uppercase tracking-wider text-ink-muted">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-[0.875rem] text-ink-muted hover:text-ink">
              Back to site
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="text-[0.875rem] font-medium text-ink-muted hover:text-ink"
            >
              Sign out
            </button>
          </div>
        </div>
      </IslandShell>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Reveal>
          <PageIntro kicker="Operations" title="Queue">
            Decide loan applications, watch transfers, and follow debt-review requests.
          </PageIntro>
        </Reveal>

        <Panel className="mt-8 grid gap-x-6 gap-y-4 p-5 sm:grid-cols-3 lg:grid-cols-6">
          {cards.map(([label, value]) => (
            <div key={label}>
              <p className="text-[0.6875rem] font-semibold uppercase tracking-wider text-ink-muted">
                {label}
              </p>
              <p className="mt-1.5 font-mono text-[1.375rem] font-semibold text-ink">{value}</p>
            </div>
          ))}
        </Panel>

        <div className="mt-8 flex flex-wrap gap-1">
          {[
            ['applications', 'Applications'],
            ['loans', 'Loans'],
            ['transfers', 'Transfers'],
            ['debt', 'Debt review'],
          ].map(([k, label]) => (
            <SoftChip
              key={k}
              active={tab === k}
              onClick={() => setTab(k as QueueTab)}
              className={cn(tab !== k && 'border border-transparent')}
            >
              {label}
            </SoftChip>
          ))}
        </div>

        {tab === 'applications' ? (
          <div className="mt-6 space-y-3">
            {(applications ?? []).map((app) => (
              <Panel key={app.id} className="p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[0.75rem] text-ink-muted">
                      {app.reference ?? app.id}
                    </p>
                    <p className="text-[1rem] font-semibold text-ink">
                      {app.firstName} {app.lastName} · {app.product}
                    </p>
                    <p className="font-mono text-[0.875rem] text-ink-muted">
                      {formatRand(Number(app.amount ?? 0), 0)} over {app.termMonths} month(s)
                    </p>
                  </div>
                  <StatusPill status={app.status === 'declined' ? 'overdue' : 'pending'} />
                </div>
                <textarea
                  value={note[app.id] ?? ''}
                  onChange={(e) => setNote((n) => ({ ...n, [app.id]: e.target.value }))}
                  className="mt-3 min-h-20 w-full rounded-sm border border-line bg-surface px-3 py-2 text-[0.875rem] outline-none focus:border-teal"
                  placeholder="Decision note (optional)"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    type="button"
                    onClick={() =>
                      decision.mutate({ id: app.id, value: 'approve', note: note[app.id] })
                    }
                  >
                    Approve
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      decision.mutate({ id: app.id, value: 'decline', note: note[app.id] })
                    }
                  >
                    Decline
                  </Button>
                  {customerWhatsAppUrl(
                    app.phone,
                    `Hi ${app.firstName ?? ''} — regarding application ${app.reference ?? app.id}.`,
                  ) ? (
                    <a
                      href={
                        customerWhatsAppUrl(
                          app.phone,
                          `Hi ${app.firstName ?? ''} — regarding application ${app.reference ?? app.id}.`,
                        )!
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center px-3 text-[0.875rem] font-semibold text-teal hover:underline"
                    >
                      WhatsApp
                    </a>
                  ) : null}
                </div>
              </Panel>
            ))}
            {!applications?.length ? (
              <p className="text-[0.9375rem] text-ink-muted">No pending applications.</p>
            ) : null}
          </div>
        ) : null}

        {tab === 'loans' ? (
          <Panel className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[42rem] text-left text-[0.875rem]">
              <thead className="border-b border-line text-ink-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">Loan</th>
                  <th className="px-4 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium">Remaining</th>
                  <th className="px-4 py-3 font-medium">Next payment</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {(loans ?? []).map((loan) => (
                  <tr key={loan.id}>
                    <td className="px-4 py-3 font-mono">{loan.id}</td>
                    <td className="px-4 py-3">{loan.product}</td>
                    <td className="px-4 py-3 font-mono">{formatRand(loan.remaining)}</td>
                    <td className="px-4 py-3">{formatDate(loan.nextPaymentDate)}</td>
                    <td className="px-4 py-3">
                      <StatusPill status={loan.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>
        ) : null}

        {tab === 'transfers' ? (
          <Panel className="mt-6 divide-y divide-line">
            {(transfers ?? []).map((t) => {
              const wa = customerWhatsAppUrl(
                t.senderPhone,
                `Hi ${t.senderName} — regarding transfer ${t.id}.`,
              )
              return (
                <div key={t.id} className="flex flex-wrap items-start justify-between gap-3 px-4 py-4">
                  <div>
                    <p className="font-semibold text-ink">
                      <span className="font-mono text-[0.875rem]">{t.id}</span>
                      {` · ${t.country}`}
                    </p>
                    <p className="text-[0.875rem] text-ink-muted">
                      {t.senderName} → {t.recipientName} ·{' '}
                      <span className="font-mono">{formatRand(t.total)}</span> ({t.status})
                    </p>
                  </div>
                  {wa ? (
                    <a
                      href={wa}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[0.875rem] font-semibold text-teal hover:underline"
                    >
                      WhatsApp sender
                    </a>
                  ) : null}
                </div>
              )
            })}
          </Panel>
        ) : null}

        {tab === 'debt' ? (
          <Panel className="mt-6 divide-y divide-line">
            {(debtReviews ?? []).map((d) => {
              const wa = customerWhatsAppUrl(
                d.phone,
                `Hi ${d.fullName} — following up on your debt review request.`,
              )
              return (
                <div key={d.id} className="px-4 py-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-ink">{d.fullName}</p>
                      <p className="text-[0.875rem] text-ink-muted">
                        {d.phone} · {d.email}
                      </p>
                    </div>
                    {wa ? (
                      <a
                        href={wa}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[0.875rem] font-semibold text-teal hover:underline"
                      >
                        WhatsApp
                      </a>
                    ) : null}
                  </div>
                  <p className="mt-2 text-[0.875rem] text-ink">{d.situation}</p>
                </div>
              )
            })}
          </Panel>
        ) : null}
      </div>
    </div>
  )
}
