/**
 * Cross-border transfer form (public).
 *
 * LINK MAP
 * - createTransfer -> POST /api/transfers (TransferController, permitAll).
 * - Fee estimate also uses loanCalc.calculateTransferFee locally.
 */

import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { transferSchema, type TransferForm } from '@/lib/validation'
import { calculateTransferFee } from '@/lib/loanCalc'
import { formatRand, cn } from '@/lib/format'
import { useAnimatedNumber } from '@/hooks/useAnimatedNumber'
import { createTransfer } from '@/lib/apiClient'
import { Button, Input, Select, PageIntro, Panel, softChipActive, softChipIdle } from '@/components/ui/primitives'
import { Link } from 'react-router-dom'
import { Reveal } from '@/components/ui/Reveal'
import { whatsappChatUrl } from '@/content/brand'

const countries = [
  { code: 'ZW' as const, label: 'Zimbabwe' },
  { code: 'MZ' as const, label: 'Mozambique' },
  { code: 'LS' as const, label: 'Lesotho' },
  { code: 'BW' as const, label: 'Botswana' },
]

const STEPS = ['You', 'Recipient', 'Amount']

export function TransferPage() {
  const [step, setStep] = useState(1)
  const [doneRef, setDoneRef] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TransferForm>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      senderName: '',
      senderPhone: '',
      recipientName: '',
      recipientPhone: '',
      country: 'ZW',
      amount: 2000,
    },
  })

  const amount = watch('amount')
  const country = watch('country')
  const feeQuote = useMemo(
    () => calculateTransferFee(Number(amount) || 0, country),
    [amount, country],
  )

  const animFee = useAnimatedNumber(feeQuote.fee)
  const animTotal = useAnimatedNumber(feeQuote.total)

  const onSubmit = async (values: TransferForm) => {
    if (step < 3) {
      setStep(step + 1)
      return
    }
    setSubmitting(true)
    setSubmitError(null)
    try {
      const res = await createTransfer({
        senderName: values.senderName,
        senderPhone: values.senderPhone,
        recipientName: values.recipientName,
        recipientPhone: values.recipientPhone,
        country: values.country,
        amount: Number(values.amount),
      })
      setDoneRef(res.reference ?? res.id)
      setStep(4)
    } catch {
      setSubmitError('Could not submit the transfer. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (step === 4 && doneRef) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 sm:py-16">
        <PageIntro title="Transfer submitted">
          <p>
            Reference <span className="select-all font-semibold text-ink">{doneRef}</span>.
            We’ll SMS you when the money is ready to collect.
          </p>
        </PageIntro>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={whatsappChatUrl(`Hi Tshedza — transfer reference ${doneRef}.`)}
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
    <div className="page-cascade mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-[0.9375rem] text-ink-muted">
        <Link to="/" className="hover:text-ink">
          Home
        </Link>
        <span aria-hidden className="mx-2">
          /
        </span>
        Send money
      </p>

      <Reveal className="mt-6">
        <PageIntro title="Send money with the fee on the page">
          Transfer from South Africa to Zimbabwe, Mozambique, Lesotho, or Botswana.
          Step {step} of 3 — {STEPS[step - 1]}. The recipient gets the amount you send;
          you pay the fee on top, shown in rand before you confirm.
        </PageIntro>
      </Reveal>

      <div className="mt-6 flex flex-wrap gap-1">
        {STEPS.map((label, i) => (
          <span
            key={label}
            className={cn(
              'inline-flex min-h-10 items-center px-3 py-2 text-[0.875rem]',
              i + 1 === step ? softChipActive : softChipIdle,
            )}
            aria-current={i + 1 === step ? 'step' : undefined}
          >
            {i + 1}. {label}
          </span>
        ))}
      </div>
      <div
        className="mt-3 h-1 max-w-md rounded-sm bg-surface"
        role="progressbar"
        aria-valuenow={step}
        aria-valuemin={1}
        aria-valuemax={3}
        aria-label={`Transfer step ${step} of 3`}
      >
        <div
          className="h-full rounded-sm bg-teal transition-[width] duration-300 ease-out"
          style={{ width: `${((step - 1) / 2) * 100}%` }}
        />
      </div>

      <Reveal className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <form onSubmit={handleSubmit(onSubmit)} className="contents">
        <Panel className="space-y-5 p-5 sm:p-6">
          {step === 1 ? (
            <>
              <h2 className="text-[1.125rem] font-semibold">Your details</h2>
              <Input
                label="Full name"
                autoComplete="name"
                error={errors.senderName?.message}
                {...register('senderName')}
              />
              <Input
                label="Mobile number"
                inputMode="tel"
                autoComplete="tel"
                error={errors.senderPhone?.message}
                {...register('senderPhone')}
              />
            </>
          ) : null}

          {step === 2 ? (
            <>
              <h2 className="text-[1.125rem] font-semibold">Who is receiving it?</h2>
              <Input
                label="Recipient name"
                autoComplete="off"
                error={errors.recipientName?.message}
                {...register('recipientName')}
              />
              <Input
                label="Recipient phone"
                inputMode="tel"
                error={errors.recipientPhone?.message}
                {...register('recipientPhone')}
              />
              <Select label="Country" {...register('country')}>
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </Select>
            </>
          ) : null}

          {step === 3 ? (
            <>
              <h2 className="text-[1.125rem] font-semibold">How much are you sending?</h2>
              <div>
                <div className="mb-2 flex justify-between text-[0.9375rem]">
                  <label htmlFor="send-amount" className="font-semibold text-ink">
                    Send amount
                  </label>
                  <span className="tabular-nums font-semibold text-ink">
                    {formatRand(Number(amount) || 0, 0)}
                  </span>
                </div>
                <input
                  id="send-amount"
                  type="range"
                  min={100}
                  max={50000}
                  step={50}
                  value={amount}
                  aria-valuetext={formatRand(Number(amount) || 0, 0)}
                  onChange={(e) => setValue('amount', Number(e.target.value))}
                  className="w-full accent-teal"
                />
                <div className="mt-1 flex justify-between text-[0.8125rem] text-ink-muted">
                  <span>R100</span>
                  <span>R50,000</span>
                </div>
              </div>
              <p className="text-[0.9375rem] text-ink-muted">
                Check the fee on the right before you confirm.
              </p>
            </>
          ) : null}

          <div className="flex justify-between pt-2">
            <Button
              type="button"
              variant="ghost"
              disabled={step === 1 || submitting}
              onClick={() => setStep((s) => Math.max(1, s - 1))}
            >
              Back
            </Button>
            <Button type="submit" variant="primary" disabled={submitting}>
              {step === 3
                ? submitting
                  ? 'Submitting…'
                  : 'Confirm and pay'
                : 'Continue'}
            </Button>
          </div>
          {submitError ? (
            <p className="text-[0.875rem] text-rust" role="alert">
              {submitError}
            </p>
          ) : null}
        </Panel>

        <Panel className="h-fit p-5 sm:p-6" aria-live="polite">
          <h2 className="text-[1.0625rem] font-semibold text-ink">What you pay</h2>
          <dl className="mt-4 space-y-3">
            <div className="flex justify-between gap-4 text-[0.9375rem]">
              <dt className="text-ink-muted">Send amount</dt>
              <dd className="font-mono tabular-nums">{formatRand(feeQuote.amount)}</dd>
            </div>
            <div className="flex justify-between gap-4 text-[0.9375rem]">
              <dt className="text-ink-muted">Transfer fee</dt>
              <dd className="font-mono tabular-nums">{formatRand(animFee)}</dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-line pt-3 text-[1.0625rem] font-semibold">
              <dt>You pay</dt>
              <dd className="font-mono tabular-nums">{formatRand(animTotal)}</dd>
            </div>
            <div className="flex justify-between gap-4 text-[0.9375rem]">
              <dt className="text-ink-muted">Recipient gets</dt>
              <dd className="font-mono tabular-nums">{formatRand(feeQuote.receiveEstimate)}</dd>
            </div>
          </dl>
        </Panel>
      </form>
      </Reveal>
    </div>
  )
}
