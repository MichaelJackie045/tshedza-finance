/**
 * Site chrome for public pages: header and outlet.
 *
 * LINK MAP
 * - Shows Admin nav when authStore.user.role === 'ADMIN' -> /admin.
 * - Sign-in / account links use authStore token state.
 */

import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { cn } from '@/lib/format'
import { useEffect, useId, useRef, useState } from 'react'
import { BrandMark } from '@/components/ui/primitives'
import { useAuthStore } from '@/store/authStore'
import { brand } from '@/content/brand'
import {
  Banknote,
  ChevronDown,
  CircleHelp,
  HandCoins,
  Home,
  LayoutDashboard,
  Menu,
  Phone,
  Send,
  Shield,
  UserRound,
  X,
} from 'lucide-react'

const products = [
  {
    to: '/products/cash-loan',
    label: 'Cash loan',
    desc: 'R500–R20,000 · see the instalment first',
    Icon: Banknote,
  },
  {
    to: '/products/domestic',
    label: 'Domestic worker',
    desc: 'Same range · shorter work questions',
    Icon: Home,
  },
  {
    to: '/products/transfer',
    label: 'Send money',
    desc: 'Fee in rand before you pay',
    Icon: Send,
  },
  {
    to: '/products/debt-review',
    label: 'Debt review',
    desc: 'Advice — not a loan',
    Icon: HandCoins,
  },
]

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const user = useAuthStore((s) => s.user)
  const location = useLocation()
  const productsRef = useRef<HTMLDivElement>(null)
  const productsBtnId = useId()
  const productsPanelId = useId()

  const productActive = products.some((p) => location.pathname.startsWith(p.to))

  useEffect(() => {
    setMobileOpen(false)
    setProductsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!mobileOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileOpen])

  useEffect(() => {
    if (!productsOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setProductsOpen(false)
    }
    const onPointer = (e: MouseEvent) => {
      if (productsRef.current && !productsRef.current.contains(e.target as Node)) {
        setProductsOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onPointer)
    }
  }, [productsOpen])

  const accountHref = user ? '/dashboard' : '/login'
  const accountLabel = user ? 'Account' : 'Sign in'

  return (
    <div className="site-nav-shell sticky top-0 z-40">
      <header className="site-nav relative mx-auto max-w-6xl">
        <div className="site-nav-rail flex items-center gap-3 px-4 py-3.5 sm:px-6 sm:py-4">
          <BrandMark onClick={() => setMobileOpen(false)} />

          <nav
            className="site-nav-links ml-1 hidden flex-1 items-center justify-center gap-0.5 lg:flex"
            aria-label="Primary"
          >
            <div className="relative" ref={productsRef}>
              <button
                id={productsBtnId}
                type="button"
                aria-expanded={productsOpen}
                aria-controls={productsPanelId}
                aria-haspopup="true"
                onClick={() => setProductsOpen((v) => !v)}
                className={cn(
                  'site-nav-link',
                  (productActive || productsOpen) && 'is-active',
                )}
              >
                Products
                <ChevronDown
                  size={14}
                  strokeWidth={2.25}
                  className={cn('transition-transform duration-200', productsOpen && 'rotate-180')}
                  aria-hidden
                />
              </button>

              {productsOpen ? (
                <div
                  id={productsPanelId}
                  role="menu"
                  aria-labelledby={productsBtnId}
                  className="site-nav-menu absolute left-1/2 top-full z-50 mt-3 w-[22rem] -translate-x-1/2 p-2"
                >
                  <p className="px-3 pb-2 pt-1 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-teal-mid">
                    What you can do
                  </p>
                  <ul className="space-y-0.5">
                    {products.map(({ to, label, desc, Icon }) => (
                      <li key={to}>
                        <Link
                          to={to}
                          role="menuitem"
                          onClick={() => setProductsOpen(false)}
                          className={cn(
                            'flex items-start gap-3 rounded-sm px-3 py-2.5 transition-colors hover:bg-teal-soft/70',
                            location.pathname === to && 'bg-teal-soft',
                          )}
                        >
                          <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[0.3rem] bg-teal text-white">
                            <Icon size={15} strokeWidth={1.75} aria-hidden />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-[0.875rem] font-semibold text-ink">{label}</span>
                            <span className="mt-0.5 block text-[0.8125rem] leading-snug text-ink-muted">
                              {desc}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <NavLink
              to="/faq"
              className={({ isActive }) => cn('site-nav-link', isActive && 'is-active')}
            >
              <CircleHelp size={14} strokeWidth={1.75} aria-hidden />
              Help
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => cn('site-nav-link', isActive && 'is-active')}
            >
              Contact
            </NavLink>
          </nav>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <a
              href={brand.phoneHref}
              className="hidden items-center gap-1.5 px-2.5 py-2 font-mono text-[0.75rem] font-medium tracking-wide text-ink-muted transition-colors hover:text-teal xl:inline-flex"
            >
              <Phone size={13} strokeWidth={1.75} aria-hidden />
              {brand.phoneDisplay}
            </a>

            {user?.role === 'ADMIN' ? (
              <Link
                to="/admin"
                className="hidden items-center gap-1.5 px-2.5 py-2 text-[0.8125rem] font-medium text-ink-muted transition-colors hover:text-teal md:inline-flex"
              >
                <Shield size={14} strokeWidth={1.75} aria-hidden />
                Admin
              </Link>
            ) : null}

            <Link
              to={accountHref}
              className="site-nav-account hidden items-center gap-1.5 sm:inline-flex"
            >
              {user ? (
                <LayoutDashboard size={14} strokeWidth={1.75} aria-hidden />
              ) : (
                <UserRound size={14} strokeWidth={1.75} aria-hidden />
              )}
              {accountLabel}
            </Link>

            <Link to="/apply/details" className="site-nav-cta">
              Apply
            </Link>

            <button
              type="button"
              className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-[0.3rem] text-ink transition-colors hover:bg-teal-soft lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
            </button>
          </div>
        </div>

        <div className="site-nav-steps" aria-hidden>
          <span />
          <span />
          <span />
        </div>

        {mobileOpen ? (
          <nav
            id="mobile-nav"
            className="max-h-[min(78vh,36rem)] overflow-y-auto border-t border-line bg-surface lg:hidden"
            aria-label="Primary"
          >
            <div className="space-y-5 px-4 py-4 sm:px-6">
              <div>
                <p className="px-1 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-teal-mid">
                  Products
                </p>
                <ul className="mt-2 space-y-1">
                  {products.map(({ to, label, desc, Icon }) => (
                    <li key={to}>
                      <Link
                        to={to}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          'flex items-start gap-3 rounded-sm px-2 py-3 transition-colors hover:bg-teal-soft/60',
                          location.pathname === to && 'bg-teal-soft',
                        )}
                      >
                        <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.3rem] bg-teal text-white">
                          <Icon size={17} strokeWidth={1.75} aria-hidden />
                        </span>
                        <span>
                          <span className="block text-[1rem] font-semibold text-ink">{label}</span>
                          <span className="mt-0.5 block text-[0.875rem] text-ink-muted">{desc}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-line pt-4">
                <p className="px-1 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-teal-mid">
                  Help
                </p>
                <ul className="mt-1">
                  <li>
                    <Link
                      to="/faq"
                      className="flex min-h-11 items-center px-2 text-[1rem] text-ink"
                      onClick={() => setMobileOpen(false)}
                    >
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="flex min-h-11 items-center px-2 text-[1rem] text-ink"
                      onClick={() => setMobileOpen(false)}
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <a
                      href={brand.phoneHref}
                      className="flex min-h-11 items-center gap-2 px-2 text-[1rem] text-ink"
                    >
                      <Phone size={16} strokeWidth={1.75} aria-hidden />
                      <span className="font-mono text-[0.9375rem]">{brand.phoneDisplay}</span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="border-t border-line pt-4">
                <Link
                  to={accountHref}
                  className="flex min-h-11 items-center gap-2 px-2 text-[1rem] font-medium text-ink"
                  onClick={() => setMobileOpen(false)}
                >
                  {user ? (
                    <LayoutDashboard size={18} strokeWidth={1.75} aria-hidden />
                  ) : (
                    <UserRound size={18} strokeWidth={1.75} aria-hidden />
                  )}
                  {accountLabel}
                </Link>
                {user?.role === 'ADMIN' ? (
                  <Link
                    to="/admin"
                    className="flex min-h-11 items-center gap-2 px-2 text-[1rem] text-ink"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Shield size={18} strokeWidth={1.75} aria-hidden />
                    Admin
                  </Link>
                ) : null}
                <Link
                  to="/apply/details"
                  onClick={() => setMobileOpen(false)}
                  className="site-nav-cta mt-3 w-full"
                >
                  Apply now
                </Link>
              </div>
            </div>
          </nav>
        ) : null}
      </header>
    </div>
  )
}

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
