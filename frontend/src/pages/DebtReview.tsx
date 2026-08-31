/**
 * Debt-review consultation request (public).
 *
 * LINK MAP
 * - createDebtReview -> POST /api/debt-review (DebtReviewController).
 * - Requests show under AdminPanel Debt review tab.
 */

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { debtReviewSchema, type DebtReviewForm } from '@/lib/validation'
import { createDebtReview } from '@/lib/apiClient'
import { Button, Input, TextArea, PageIntro, Notice } from '@/components/ui/primitives'
import { Link } from 'react-router-dom'
import { Reveal } from '@/components/ui/Reveal'
import { whatsappChatUrl } from '@/content/brand'

export function DebtReviewPage() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DebtReviewForm>({
    resolver: zodResolver(debtReviewSchema),
  })

  const onSubmit = async (values: DebtReviewForm) => {
    setSubmitting(true)
    setSubmitError(null)
    try {
      await createDebtReview(values)
      setSubmitted(true)
    } catch {
      setSubmitError('Could not send your request. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 sm:py-16">
        <PageIntro title="We’ll call you">
          Someone from the debt review team will follow up within two working days.
          This was a consultation request — not a loan application.
        </PageIntro>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={whatsappChatUrl('Hi Tshedza — I just requested a debt review consultation.')}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center text-[1rem] font-semibold text-teal hover:underline"
          >
            Message us on WhatsApp
          </a>
          <Link
            to="/"
            className="inline-flex min-h-11 items-center text-[1rem] font-semibold text-teal hover:underline"
          >
            Back to home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page-cascade mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-[0.9375rem] text-ink-muted">
        <Link to="/" className="hover:text-ink">
          Home
        </Link>
        <span aria-hidden className="mx-2">
          /
        </span>
        Debt review
      </p>

      <Reveal className="mt-6">
        <PageIntro title="If repayments are already too much">
          Debt review (debt counselling) is a formal process under the National Credit
          Act. It is not a cash loan, and we will not offer you one from this page.
        </PageIntro>
      </Reveal>

      <Reveal className="mt-8">
        <Notice>
          A counsellor looks at income and what you already owe, then may negotiate
          with credit providers. It can take months. It is not a quick cash fix.
        </Notice>
      </Reveal>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="panel-soft mt-10 space-y-5 p-5 sm:p-6"
      >
        <h2 className="text-[1.125rem] font-semibold">Request a consultation</h2>
        <Input
          label="Full name"
          autoComplete="name"
          error={errors.fullName?.message}
          {...register('fullName')}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            label="Phone"
            inputMode="tel"
            autoComplete="tel"
            error={errors.phone?.message}
            {...register('phone')}
          />
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
          />
        </div>
        <TextArea
          label="What’s going on, roughly?"
          hint="Who you owe, and whether you’ve missed payments. No documents needed yet."
          error={errors.situation?.message}
          {...register('situation')}
        />
        {submitError ? (
          <p className="text-[0.875rem] text-rust" role="alert">
            {submitError}
          </p>
        ) : null}
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? 'Sending…' : 'Request consultation'}
        </Button>
      </form>
    </div>
  )
}
