/**
 * Document-style shell for /apply/* — matches the paper loan application layout.
 *
 * LINK MAP
 * - Wraps DetailsStep … DoneStep (App.tsx).
 * - Brand/contact from content/brand.ts; short terms from content/loanTerms.ts.
 */

import { Outlet, useLocation } from 'react-router-dom'
import { cn } from '@/lib/format'
import { BrandMark } from '@/components/ui/primitives'
import { brand } from '@/content/brand'

const STEPS = [
  { n: 1, path: 'details', label: 'Details' },
  { n: 2, path: 'documents', label: 'Documents' },
  { n: 3, path: 'terms', label: 'Terms' },
  { n: 4, path: 'review', label: 'Review' },
  { n: 5, path: 'done', label: 'Done' },
]

function ApplicationDateBoxes() {
  const now = new Date()
  const dd = String(now.getDate()).padStart(2, '0')
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const yy = String(now.getFullYear()).slice(-2)
  const cells = [...dd.split(''), '/', ...mm.split(''), '/', ...yy.split('')]

  return (
    <div className="loan-form-date" aria-label={`Date of application ${dd}/${mm}/20${yy}`}>
      <p className="loan-form-date-label">Date of application</p>
      <div className="loan-form-date-boxes" aria-hidden>
        {cells.map((c, i) =>
          c === '/' ? (
            <span key={`sep-${i}`} className="loan-form-date-sep">
              /
            </span>
          ) : (
            <span key={`d-${i}`} className="loan-form-date-cell">
              {c}
            </span>
          ),
        )}
      </div>
    </div>
  )
}

export function ApplyLayout() {
  const location = useLocation()
  const current =
    STEPS.find((s) => location.pathname.includes(`/apply/${s.path}`))?.n ?? 1
  const currentStep = STEPS[current - 1]
  const progress = ((current - 1) / (STEPS.length - 1)) * 100

  return (
    <div className="loan-form-page min-h-screen">
      <a href="#apply-main" className="skip-link">
        Skip to form
      </a>

      <div className="loan-form-sheet">
        <header className="loan-form-banner" aria-label="Application header">
          <div className="loan-form-banner-left">
            <span className="loan-form-banner-label">Application</span>
          </div>
          <div className="loan-form-banner-geo" aria-hidden />
        </header>

        <div className="loan-form-head">
          <div className="loan-form-body">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
              <div className="min-w-0 flex-1">
                <h1 className="loan-form-title">
                  Loan application <span>Form</span>
                </h1>
              <p className="mt-3 max-w-xl text-[0.8125rem] leading-relaxed text-ink-muted sm:text-[0.875rem]">
                Complete this form for a short-term cash loan with {brand.productName}.
                Your details support our affordability assessment under South African
                credit law.{' '}
                <span className="font-semibold uppercase tracking-wide text-ink">
                  We are registered and protected by the law.
                </span>
              </p>
              </div>
              <div className="flex shrink-0 flex-row items-end justify-between gap-4 sm:flex-col sm:items-end">
                <BrandMark compact />
                <ApplicationDateBoxes />
              </div>
            </div>

            <div className="mt-5 border-t border-line pt-4 sm:mt-6">
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-teal-mid sm:text-[0.75rem] sm:tracking-[0.14em]">
                  Step {current} of {STEPS.length} — {currentStep.label}
                </p>
                <p className="hidden text-[0.75rem] text-ink-muted sm:block">{brand.productName}</p>
              </div>
              <div
                className="mt-2 h-1.5 overflow-hidden rounded-sm bg-line"
                role="progressbar"
                aria-valuemin={1}
                aria-valuemax={STEPS.length}
                aria-valuenow={current}
                aria-label={`Application step ${current} of ${STEPS.length}: ${currentStep.label}`}
              >
                <div
                  className="h-full bg-teal-mid transition-[width] duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <nav aria-label="Application steps" className="mt-3">
                <ol className="loan-form-steps">
                  {STEPS.map((step) => (
                    <li key={step.n} className="shrink-0">
                      <span
                        className={cn(
                          'inline-flex px-2.5 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-wide sm:text-[0.75rem]',
                          step.n === current && 'bg-teal-soft text-teal',
                          step.n < current && 'text-teal-mid',
                          step.n > current && 'text-ink-muted',
                        )}
                        aria-current={step.n === current ? 'step' : undefined}
                      >
                        {step.n}. {step.label}
                      </span>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <div id="apply-main">
          <div className="loan-form-body">
            <Outlet />
          </div>
        </div>

        <footer className="loan-form-footer mt-auto pb-0">
          <div className="loan-form-body">
            <div className="grid gap-8 border-t border-line pt-6 md:grid-cols-[1.1fr_1fr]">
              <div>
                <p className="loan-form-section-label">Address office</p>
                <dl className="mt-3 space-y-1.5 text-[0.8125rem] text-ink">
                  <div className="flex gap-2">
                    <dt className="w-4 shrink-0 font-bold text-teal-mid">A</dt>
                    <dd className="min-w-0 break-words">{brand.address}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-4 shrink-0 font-bold text-teal-mid">P</dt>
                    <dd>
                      <a href={brand.phoneHref} className="hover:underline">
                        {brand.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-4 shrink-0 font-bold text-teal-mid">E</dt>
                    <dd className="min-w-0 break-all">
                      <a href={`mailto:${brand.email}`} className="hover:underline">
                        {brand.email}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <div className="loan-form-sign-line" />
                    <p className="mt-1.5 text-[0.75rem] font-semibold text-ink-muted">
                      Applicant signature
                    </p>
                  </div>
                  <div>
                    <div className="loan-form-sign-line" />
                    <p className="mt-1.5 text-[0.75rem] font-semibold text-ink-muted">
                      Officer signature
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-[1.05rem] font-bold tracking-tight text-ink">
                    Thank you <span className="text-teal-mid">for applying</span>
                  </p>
                  <p className="mt-1 text-[0.8125rem] text-ink-muted">
                    Keep your phone nearby — we may ask for one clearer document.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="loan-form-footer-bar mt-6" aria-hidden />
        </footer>
      </div>
    </div>
  )
}
