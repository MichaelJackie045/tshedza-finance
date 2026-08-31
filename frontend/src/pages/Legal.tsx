import { Link } from 'react-router-dom'
import { PageIntro } from '@/components/ui/primitives'
import { brand, legalEntityLine } from '@/content/brand'

export function PrivacyPage() {
  return (
    <div className="page-cascade mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
      <PageIntro kicker={brand.productName} title="Privacy Statement">
        How {brand.productName} handles personal information under South African law
        (POPIA).
      </PageIntro>
      <div className="mt-10 space-y-6 text-[1.0625rem] leading-relaxed text-ink-muted">
        <p>
          {brand.productName} is operated by {legalEntityLine()}, with an office at{' '}
          {brand.address}. We process the details you submit to assess and service a
          loan application, answer contact requests, and keep your account secure.
        </p>
        <p>
          We do not sell your information. Documents you upload (ID, payslip, bank
          statements, proof of address) are used for underwriting, affordability
          assessment, and compliance with the National Credit Act and POPIA. We share
          information only where the law requires it, or with service providers who help
          us process applications under strict confidentiality.
        </p>
        <p>
          You may request access to, or correction of, your personal information by
          contacting us on {brand.email} or {brand.phoneDisplay}.
        </p>
        <p>
          Questions? Use the{' '}
          <Link to="/contact" className="font-semibold text-teal hover:underline">
            contact page
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export function TermsPage() {
  return (
    <div className="page-cascade mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
      <PageIntro kicker={brand.productName} title="Terms & Conditions">
        Site use and credit information for {brand.productName}.
      </PageIntro>
      <div className="mt-10 space-y-6 text-[1.0625rem] leading-relaxed text-ink-muted">
        <p>
          By using this website you agree that online quotes are estimates only. A
          binding credit agreement is only created after assessment, approval, and your
          signature on the agreement. {brand.productName} is a product of{' '}
          {brand.legalName} (reg no {brand.registrationNumber}).
        </p>
        <p>
          Loan amounts, terms, and interest shown on product pages and in the
          application describe our intended short-term cash loan product for South
          African residents. Final terms are set out in your credit agreement and remain
          subject to the National Credit Act.
        </p>
        <p>
          You must provide accurate information. False or incomplete documents may lead
          to decline or cancellation. Repayment is by debit order from a South African
          bank account unless otherwise agreed in writing.
        </p>
        <p>
          For application-specific terms, see the{' '}
          <Link to="/apply/terms" className="font-semibold text-teal hover:underline">
            loan terms step
          </Link>{' '}
          in the apply flow, or read the{' '}
          <Link to="/faq" className="font-semibold text-teal hover:underline">
            FAQ
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
