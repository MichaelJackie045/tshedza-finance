/**
 * Cash loan and domestic-worker product detail pages.
 *
 * LINK MAP
 * - Linked from Home product rows; Apply CTA -> /apply/details.
 * - Quote uses RepaymentLedger / loanCalc (not an API until apply submit).
 */

import { Link } from 'react-router-dom'
import { PageIntro, accentBtn, Panel, SectionLabel } from '@/components/ui/primitives'
import { RepaymentLedger } from '@/components/ledger/RepaymentLedger'
import { useApplicationStore } from '@/store/applicationStore'
import { Reveal } from '@/components/ui/Reveal'

type ProductPageProps = {
  title: string
  kicker: string
  summary: string
  requirements: string[]
  ctaTo: string
  ctaLabel: string
  showLedger?: boolean
  onStart?: () => void
}

function ProductShell({
  title,
  kicker,
  summary,
  requirements,
  ctaTo,
  ctaLabel,
  showLedger,
  onStart,
}: ProductPageProps) {
  return (
    <div className="page-cascade mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-[0.9375rem] text-ink-muted">
        <Link to="/" className="hover:text-ink">
          Home
        </Link>
        <span aria-hidden className="mx-2">
          /
        </span>
        {title}
      </p>

      <Reveal className="mt-6">
        <PageIntro kicker={kicker} title={title}>
          {summary}
        </PageIntro>
      </Reveal>

      <div className="mt-6">
        <Link
          to={ctaTo}
          onClick={onStart}
          className={accentBtn}
        >
          {ctaLabel}
        </Link>
      </div>

      <Reveal className={`mt-12 grid gap-10 ${showLedger ? 'lg:grid-cols-2' : 'max-w-2xl'}`}>
        <Panel className="p-5 sm:p-6">
          <SectionLabel>What you need</SectionLabel>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[0.9375rem] text-ink-muted">
            {requirements.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </Panel>
        {showLedger ? <RepaymentLedger showCta ctaTo={ctaTo} /> : null}
      </Reveal>
    </div>
  )
}

export function CashLoanPage() {
  const setProduct = useApplicationStore((s) => s.setProduct)
  return (
    <ProductShell
      kicker="Cash loan · South Africa"
      title="Borrow between R500 and R20,000"
      summary="Pay it back over 1 to 9 months. See the instalment in rand on this page — the same quote appears in the application. Subject to affordability under the National Credit Act."
      requirements={[
        'South African adult with a valid ID or smart ID',
        'Latest payslip or other proof of regular income',
        'Three months of SA bank statements',
        'Proof of address and a mobile number we can reach',
      ]}
      ctaTo="/apply/details"
      ctaLabel="Start application"
      showLedger
      onStart={() => setProduct('cash')}
    />
  )
}

export function DomesticLoanPage() {
  const setProduct = useApplicationStore((s) => s.setProduct)
  return (
    <ProductShell
      kicker="Domestic worker loan · South Africa"
      title="A shorter form if you work in someone’s home"
      summary="Same loan range as our cash loan. Fewer employment questions. Suited to domestic workers paid weekly or monthly by EFT or cash into a bank account."
      requirements={[
        'Valid SA ID, smart ID, passport, or work permit',
        'Employer name and how you are paid (weekly / monthly)',
        'Bank statements showing your wages where possible',
        'A South African phone number we can call or WhatsApp',
      ]}
      ctaTo="/apply/details"
      ctaLabel="Start application"
      showLedger
      onStart={() => setProduct('domestic')}
    />
  )
}
