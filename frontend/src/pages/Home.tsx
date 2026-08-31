/**
 * Marketing landing page (hero, quote ledger, products, docs checklist).
 *
 * LINK MAP
 * - Public; CTAs go to /apply/details (auth required) or product pages.
 * - RepaymentLedger estimates only -- real loan created after admin approve.
 */

import { Link } from 'react-router-dom'
import {
  IdCard,
  FileText,
  Landmark,
  ArrowRight,
  ArrowUpRight,
  Banknote,
  Calculator,
  ShieldCheck,
  Clock3,
  Eye,
} from 'lucide-react'
import { RepaymentLedger } from '@/components/ledger/RepaymentLedger'
import { accentBtn, IconTile, Panel, SectionLabel } from '@/components/ui/primitives'
import { Reveal } from '@/components/ui/Reveal'
import { brand } from '@/content/brand'

const products = [
  {
    to: '/products/cash-loan',
    title: 'Cash loan',
    meta: 'R500 – R20,000 · 1 to 9 months',
    copy: 'For employed South Africans with a payslip and three months of bank statements.',
    n: '01',
  },
  {
    to: '/products/domestic',
    title: 'Domestic worker loan',
    meta: 'Same range · simpler work questions',
    copy: 'Built for people paid cash or EFT in a private home — ID, wage proof, and banking.',
    n: '02',
  },
  {
    to: '/products/transfer',
    title: 'Send money',
    meta: 'Zimbabwe, Mozambique, Lesotho, Botswana',
    copy: 'Cross-border transfers from South Africa. Fee shown in rand before you pay.',
    n: '03',
  },
  {
    to: '/products/debt-review',
    title: 'Debt review',
    meta: 'Not a loan',
    copy: 'If you are already over-indebted, request a consultation under South African credit law.',
    n: '04',
  },
]

const steps = [
  {
    n: '01',
    title: 'See the monthly amount',
    copy: 'Move the quote until the instalment fits your payday — amounts show in rand.',
  },
  {
    n: '02',
    title: 'Send the documents we need',
    copy: 'SA ID, latest payslip, and three months of bank statements — each in its own slot.',
  },
  {
    n: '03',
    title: 'Hear back on a working day',
    copy: 'Most decisions come once those files are in. Keep your phone nearby for a call or WhatsApp.',
  },
]

const docs = [
  {
    title: 'SA ID or work permit',
    copy: 'A clear photo or PDF of your green ID book, smart ID, passport, or permit.',
    Icon: IdCard,
  },
  {
    title: 'Latest payslip',
    copy: 'Most recent month. Domestic workers can show wage proof from their employer.',
    Icon: FileText,
  },
  {
    title: 'Three bank statements',
    copy: 'Last three months from your SA bank account, each as its own file.',
    Icon: Landmark,
  },
]

const ticker = [
  'R500 – R20,000',
  '1–9 month terms',
  'Quote in rand',
  'Limpopo · South Africa',
  'SA ID + payslip + statements',
  'Debit-order repayment',
]

export function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden hero-mesh grain text-white">
        <div className="hero-pattern" aria-hidden />
        <div className="hero-orb hero-orb-a" aria-hidden />
        <div className="hero-orb hero-orb-b" aria-hidden />

        <span className="hero-float-icon hero-float-icon-a" aria-hidden>
          <Banknote size={18} strokeWidth={1.6} />
        </span>
        <span className="hero-float-icon hero-float-icon-b" aria-hidden>
          <Calculator size={18} strokeWidth={1.6} />
        </span>
        <span className="hero-float-icon hero-float-icon-c" aria-hidden>
          <ShieldCheck size={18} strokeWidth={1.6} />
        </span>

        <p
          className="watermark pointer-events-none absolute -right-8 bottom-[-0.2em] hidden select-none lg:block"
          aria-hidden
        >
          R
        </p>

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 lg:pb-24 lg:pt-20">
          <div>
            <p className="hero-copy inline-flex items-center gap-2 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-white/55">
              <span className="live-dot" aria-hidden />
              {brand.productName}
            </p>
            <h1 className="hero-copy-2 display-xl mt-5 max-w-xl text-balance">
              See what you’ll repay{' '}
              <span className="text-white/45">before</span> you apply.
            </h1>
            <p className="hero-copy-3 mt-5 max-w-md text-[1.0625rem] leading-relaxed text-white/70">
              Short-term cash loans for working people in South Africa. Move the amount
              and term — monthly instalment and total show in rand up front.
            </p>
            <div className="hero-copy-4 mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/apply/details"
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-white px-5 text-[0.9375rem] font-semibold text-teal transition-[transform,background-color] duration-200 hover:-translate-y-px hover:bg-white/92"
              >
                Apply
                <ArrowUpRight
                  size={16}
                  strokeWidth={2}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </Link>
              <a
                href="#quote"
                className="inline-flex min-h-11 items-center text-[0.9375rem] font-semibold text-white/85 underline decoration-white/30 decoration-2 underline-offset-4 transition-colors hover:text-white hover:decoration-white/70"
              >
                Try the quote
              </a>
            </div>
            <ul className="hero-copy-4 hero-trust mt-8" aria-label="Why apply here">
              <li className="hero-trust-item">
                <Eye size={15} strokeWidth={1.75} aria-hidden />
                Quote in rand first
              </li>
              <li className="hero-trust-item">
                <Clock3 size={15} strokeWidth={1.75} aria-hidden />
                Answer within a working day
              </li>
              <li className="hero-trust-item">
                <ShieldCheck size={15} strokeWidth={1.75} aria-hidden />
                Based in Sibasa, Limpopo
              </li>
            </ul>
          </div>

          <div id="quote" className="relative lg:justify-self-end lg:w-full lg:max-w-[28.5rem]">
            <div
              className="pointer-events-none absolute -inset-3 rounded-lg bg-teal-mid/20 blur-2xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-6 -top-6 hidden h-24 w-24 rounded-full border border-white/10 lg:block"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-8 -left-8 hidden h-32 w-32 rounded-full border border-dashed border-white/10 lg:block"
              aria-hidden
            />
            <RepaymentLedger showCta featured className="relative" />
          </div>
        </div>

        <div className="relative border-t border-white/10 bg-teal-deep/40">
          <div className="overflow-hidden py-3">
            <div className="marquee-track gap-10 px-4 text-[0.8125rem] font-medium tracking-wide text-white/50">
              {[...ticker, ...ticker].map((item, i) => (
                <span key={`${item}-${i}`} className="inline-flex items-center gap-10 whitespace-nowrap">
                  {item}
                  <span className="h-1 w-1 rounded-full bg-teal-mid/80" aria-hidden />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionLabel>How it works</SectionLabel>
              <h2 className="mt-2 max-w-lg text-[1.85rem] font-bold tracking-tight text-ink sm:text-[2.35rem]">
                Three steps. Clear from the start.
              </h2>
            </div>
            <p className="max-w-xs text-[0.9375rem] text-ink-muted sm:text-right">
              Quote in rand. Documents next. Decision when the files are complete.
            </p>
          </div>
        </Reveal>
        <ol className="mt-12 grid gap-4 md:grid-cols-3 md:gap-5">
          {steps.map((step, i) => (
            <li key={step.n}>
              <Reveal delay={i * 90}>
                <Panel className="panel-lift relative h-full overflow-hidden p-5 sm:p-6">
                  <div className="accent-bar absolute inset-x-0 top-0" />
                  <p className="step-num text-[2rem] font-semibold leading-none opacity-90">{step.n}</p>
                  <h3 className="mt-6 text-[1.125rem] font-semibold tracking-tight text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">{step.copy}</p>
                </Panel>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="relative border-y border-line bg-white/70 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <Reveal>
            <SectionLabel>Products</SectionLabel>
            <h2 className="mt-2 text-[1.85rem] font-bold tracking-tight text-ink sm:text-[2.35rem]">
              Built for how people earn here
            </h2>
          </Reveal>
          <ul className="mt-10">
            {products.map((p, i) => (
              <li key={p.to} className="border-b border-line first:border-t">
                <Reveal delay={i * 50}>
                  <Link
                    to={p.to}
                    className="product-row group flex flex-col gap-3 px-3 py-7 sm:flex-row sm:items-center sm:justify-between sm:gap-10 sm:px-4"
                  >
                    <div className="flex items-start gap-4 sm:gap-6">
                      <span className="font-mono text-[0.875rem] font-semibold text-teal-mid/70">
                        {p.n}
                      </span>
                      <div>
                        <p className="text-[1.2rem] font-semibold tracking-tight text-ink transition-colors group-hover:text-teal">
                          {p.title}
                        </p>
                        <p className="mt-1 max-w-md text-[0.9375rem] text-ink-muted">{p.copy}</p>
                      </div>
                    </div>
                    <p className="flex shrink-0 items-center gap-2 pl-10 text-[0.875rem] font-medium text-teal sm:pl-0 sm:text-right">
                      {p.meta}
                      <ArrowRight
                        size={16}
                        strokeWidth={1.75}
                        className="transition-transform group-hover:translate-x-1"
                        aria-hidden
                      />
                    </p>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <Reveal>
          <SectionLabel>To apply</SectionLabel>
          <h2 className="mt-2 max-w-xl text-[1.85rem] font-bold tracking-tight text-ink sm:text-[2.35rem]">
            The documents every SA lender asks for.
          </h2>
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-3 sm:gap-5">
          {docs.map((doc, i) => (
            <li key={doc.title}>
              <Reveal delay={i * 90}>
                <Panel className="panel-lift group h-full p-5 sm:p-6">
                  <IconTile size="lg" className="transition-transform duration-300 group-hover:scale-105">
                    <doc.Icon size={22} strokeWidth={1.5} aria-hidden />
                  </IconTile>
                  <h3 className="mt-5 text-[1.0625rem] font-semibold text-ink">{doc.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">{doc.copy}</p>
                </Panel>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="cta-band text-white">
        <Reveal className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <SectionLabel className="text-white/45">Ready</SectionLabel>
          <h2 className="mt-3 max-w-xl text-[2rem] font-bold leading-tight tracking-tight sm:text-[2.75rem]">
            If the monthly amount works, apply from your phone.
          </h2>
          <p className="mt-4 max-w-md text-[1rem] text-white/60">
            One sitting. You can go back and change a step before you submit. We are
            based in Sibasa, Limpopo — serving applicants across South Africa.
          </p>
          <Link
            to="/apply/details"
            className={`${accentBtn} mt-8 inline-flex gap-2 bg-teal-mid hover:bg-teal`}
          >
            Start application
            <ArrowUpRight size={16} strokeWidth={2} aria-hidden />
          </Link>
        </Reveal>
      </section>
    </>
  )
}
