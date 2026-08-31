/**
 * Shell + side nav for /dashboard/*.
 *
 * LINK MAP
 * - Nested routes: DashboardPage, LoanDetailPage, RepaymentsPage, etc.
 * - Loan link uses the caller's first loan from fetchLoans (not a demo ID).
 */

import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useDashboardLoans } from '@/hooks/useLoanStatus'
import { cn } from '@/lib/format'
import { BrandMark, IslandShell, softChipActive, softChipIdle } from '@/components/ui/primitives'
import { logout as apiLogout } from '@/lib/apiClient'
import { useAuthStore } from '@/store/authStore'

export function DashboardLayout() {
  const navigate = useNavigate()
  const clearAuth = useAuthStore((s) => s.clearAuth)
  const { data } = useDashboardLoans()
  const firstLoanId = data?.loans[0]?.id

  const links = [
    { to: '/dashboard', label: 'Overview', end: true },
    ...(firstLoanId
      ? [{ to: `/dashboard/loans/${firstLoanId}`, label: 'This loan', end: false }]
      : [{ to: '/apply/details', label: 'Apply', end: false }]),
    { to: '/dashboard/repayments', label: 'Payments', end: false },
    { to: '/dashboard/documents', label: 'Documents', end: false },
    { to: '/dashboard/profile', label: 'Profile', end: false },
  ]

  const handleSignOut = async () => {
    try {
      await apiLogout()
    } catch {
      // clear local session anyway
    }
    clearAuth()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-surface">
      <a href="#dash-main" className="skip-link">
        Skip to account
      </a>
      <IslandShell contentClassName="max-w-5xl">
        <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5">
          <div className="flex items-baseline gap-2">
            <BrandMark />
            <span className="text-[0.6875rem] font-semibold uppercase tracking-wider text-ink-muted">
              Account
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
        <div className="overflow-x-auto border-t border-line px-3 py-2 sm:px-4">
          <nav className="flex gap-1" aria-label="Account">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  cn(
                    'whitespace-nowrap px-3 py-2 text-[0.875rem] transition-colors',
                    isActive ? softChipActive : softChipIdle,
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </IslandShell>
      <div id="dash-main" className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <Outlet />
      </div>
    </div>
  )
}
