/**
 * FAQ and Contact public pages.
 *
 * LINK MAP
 * - Contact form → apiClient.createContactMessage → POST /api/contact (Resend to ops).
 * - WhatsApp / mailto / tel are click-to-chat / client mail only.
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PageIntro, SectionLabel, accentBtn, Button, Input, TextArea } from '@/components/ui/primitives'
import { Reveal } from '@/components/ui/Reveal'
import { brand, legalEntityLine, whatsappChatUrl } from '@/content/brand'
import { createContactMessage } from '@/lib/apiClient'
import { contactSchema, type ContactForm } from '@/lib/validation'
import { ArrowUpRight, ChevronDown, Clock3, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'

const faqs = [
  {
    q: 'How much can I borrow?',
    a: 'From R500 to R20,000, over 1 to 9 months. Use the quote on the home page to see the monthly instalment and total in rand. The final offer depends on your income and bank statements.',
  },
  {
    q: 'Who can apply?',
    a: 'South African citizens and permanent residents aged 18 or older, with regular income and a South African bank account in their own name. Domestic workers, contract staff, and permanently employed people are welcome.',
  },
  {
    q: 'What documents do I need?',
    a: 'A valid SA ID (or passport / work permit), your latest payslip or proof of income, three months of bank statements, and proof of address. Upload each file in its own slot.',
  },
  {
    q: 'Do you do a credit check?',
    a: 'We assess affordability as required by the National Credit Act. We look at identity, income, and banking. Approval is never guaranteed from the online quote alone.',
  },
  {
    q: 'How do I repay?',
    a: 'By debit order from your South African bank account on the agreed date. Keep enough money in the account so the instalment can clear.',
  },
  {
    q: 'How long does a decision take?',
    a: 'Most applications get an answer within one working day once every document is in. We may call or WhatsApp if something is unclear.',
  },
  {
    q: 'Where are you based?',
    a: `Our office is at ${brand.address} (${brand.region}). You can also reach us on ${brand.phoneDisplay} or ${brand.email}.`,
  },
  {
    q: 'Who is behind Tshedza Finance?',
    a: `${brand.productName} is the loan product of ${legalEntityLine()}.`,
  },
  {
    q: 'I’m already in debt review. Can I still get a loan?',
    a: 'If you are under formal debt review or debt counselling, use our debt review page to request a consultation. That is advice support — not a new cash loan.',
  },
]

function PageCrumb({ current }: { current: string }) {
  return (
    <p className="text-[0.875rem] text-ink-muted">
      <Link to="/" className="transition-colors hover:text-ink">
        Home
      </Link>
      <span aria-hidden className="mx-2 text-line-strong">
        /
      </span>
      <span className="text-ink">{current}</span>
    </p>
  )
}

export function FAQPage() {
  return (
    <div className="page-cascade mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <PageCrumb current="Help" />

      <Reveal className="mt-8">
        <PageIntro kicker={brand.productName} title="Questions, answered plainly">
          Straight answers for people applying for a short-term cash loan in South
          Africa. Still stuck? Call or email us.
        </PageIntro>
      </Reveal>

      <Reveal className="mt-12">
        <div className="faq-list" role="list">
          {faqs.map((item, i) => (
            <details key={item.q} className="faq-item group" role="listitem">
              <summary className="faq-summary">
                <span className="faq-index font-mono" aria-hidden>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="faq-question">{item.q}</span>
                <span className="faq-chevron" aria-hidden>
                  <ChevronDown size={18} strokeWidth={1.75} />
                </span>
              </summary>
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-14">
        <div className="faq-footer">
          <div>
            <SectionLabel>Still unclear</SectionLabel>
            <p className="mt-2 max-w-md text-[1.0625rem] leading-relaxed text-ink">
              Write or call — or start an application if you already know the amount.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className={accentBtn}>
              Contact us
            </Link>
            <Link
              to="/apply/details"
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-sm border border-line-strong bg-transparent px-5 text-[0.9375rem] font-semibold text-ink transition-colors hover:border-teal/40 hover:bg-teal-soft"
            >
              Apply
              <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden />
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  )
}

export function ContactPage() {
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', phone: '', message: '' },
  })

  const onSubmit = async (values: ContactForm) => {
    setSubmitting(true)
    setSubmitError(null)
    try {
      await createContactMessage({
        name: values.name,
        email: values.email,
        phone: values.phone || undefined,
        message: values.message,
      })
      setSent(true)
    } catch {
      setSubmitError('Could not send your message. Try email or WhatsApp instead.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page-cascade mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
      <PageCrumb current="Contact" />

      <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:items-start">
        <Reveal>
          <PageIntro kicker={brand.productName} title="Talk to us">
            Prefer WhatsApp, a call, or email. We reply on weekdays during office
            hours from our office in Sibasa, Limpopo.
          </PageIntro>
          <p className="mt-6 max-w-sm text-[0.875rem] leading-relaxed text-ink-muted">
            {brand.productName} is a product of {legalEntityLine()}.
          </p>
          <Link
            to="/faq"
            className="mt-8 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-teal transition-colors hover:text-teal-deep"
          >
            Browse FAQ
            <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden />
          </Link>
        </Reveal>

        <Reveal>
          <ul className="contact-channels">
            <li>
              <a href={`mailto:${brand.email}`} className="contact-channel">
                <span className="contact-channel-icon" aria-hidden>
                  <Mail size={18} strokeWidth={1.75} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="contact-channel-label">Email</span>
                  <span className="contact-channel-value">{brand.email}</span>
                </span>
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.75}
                  className="contact-channel-arrow"
                  aria-hidden
                />
              </a>
            </li>
            <li>
              <a
                href={whatsappChatUrl('Hi Tshedza Finance — I have a question.')}
                target="_blank"
                rel="noreferrer"
                className="contact-channel"
              >
                <span className="contact-channel-icon" aria-hidden>
                  <MessageCircle size={18} strokeWidth={1.75} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="contact-channel-label">WhatsApp</span>
                  <span className="contact-channel-value font-mono tracking-wide">
                    {brand.phoneDisplay}
                  </span>
                </span>
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.75}
                  className="contact-channel-arrow"
                  aria-hidden
                />
              </a>
            </li>
            <li>
              <a href={brand.phoneHref} className="contact-channel">
                <span className="contact-channel-icon" aria-hidden>
                  <Phone size={18} strokeWidth={1.75} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="contact-channel-label">Phone</span>
                  <span className="contact-channel-value font-mono tracking-wide">
                    {brand.phoneDisplay}
                  </span>
                </span>
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.75}
                  className="contact-channel-arrow"
                  aria-hidden
                />
              </a>
            </li>
            <li>
              <div className="contact-channel contact-channel-static">
                <span className="contact-channel-icon" aria-hidden>
                  <MapPin size={18} strokeWidth={1.75} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="contact-channel-label">Office</span>
                  <span className="contact-channel-value">
                    {brand.address}
                    <br />
                    {brand.region}
                  </span>
                </span>
              </div>
            </li>
            <li>
              <div className="contact-channel contact-channel-static">
                <span className="contact-channel-icon" aria-hidden>
                  <Clock3 size={18} strokeWidth={1.75} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="contact-channel-label">Hours</span>
                  <span className="contact-channel-value">{brand.hours}</span>
                </span>
              </div>
            </li>
          </ul>
        </Reveal>
      </div>

      <Reveal className="mt-14 max-w-xl">
        {sent ? (
          <div className="panel-soft space-y-4 p-5 sm:p-6">
            <PageIntro title="Message sent">
              We will reply by email on a weekday. You can also continue on WhatsApp.
            </PageIntro>
            <a
              href={whatsappChatUrl('Hi — I just sent a contact form message.')}
              target="_blank"
              rel="noreferrer"
              className={accentBtn}
            >
              Message us on WhatsApp
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="panel-soft space-y-5 p-5 sm:p-6">
            <h2 className="text-[1.125rem] font-semibold">Send a message</h2>
            <Input label="Your name" autoComplete="name" error={errors.name?.message} {...register('name')} />
            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                label="Email"
                type="email"
                autoComplete="email"
                error={errors.email?.message}
                {...register('email')}
              />
              <Input
                label="Phone (optional)"
                inputMode="tel"
                autoComplete="tel"
                error={errors.phone?.message}
                {...register('phone')}
              />
            </div>
            <TextArea
              label="How can we help?"
              error={errors.message?.message}
              {...register('message')}
            />
            {submitError ? (
              <p className="text-[0.875rem] text-rust" role="alert">
                {submitError}
              </p>
            ) : null}
            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? 'Sending…' : 'Send message'}
            </Button>
          </form>
        )}
      </Reveal>
    </div>
  )
}
