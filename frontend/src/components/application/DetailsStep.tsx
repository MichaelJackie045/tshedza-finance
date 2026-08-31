/**
 * Apply step 1: personal / employment / address — paper-form layout.
 * Also acts as public registration when the visitor has no account yet.
 *
 * LINK MAP
 * - Writes to applicationStore; registers via apiClient.register if needed;
 *   then createApplication (ApplicationController) and syncs User profile.
 * - Next: DocumentsStep. Route: /apply/details (App.tsx).
 */

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { detailsSchema, type DetailsForm } from '@/lib/validation'
import { useApplicationStore } from '@/store/applicationStore'
import { useAuthStore } from '@/store/authStore'
import {
  createApplication,
  fetchMe,
  register as apiRegister,
} from '@/lib/apiClient'
import { Button, Input, Select } from '@/components/ui/primitives'
import { cn } from '@/lib/format'

type ApplyDetailsForm = DetailsForm & { password?: string }

export function DetailsStep() {
  const navigate = useNavigate()
  const { data, updateDetails, setStep, setProduct, setApplicationId } = useApplicationStore()
  const token = useAuthStore((s) => s.token)
  const user = useAuthStore((s) => s.user)
  const setAuth = useAuthStore((s) => s.setAuth)
  const setUser = useAuthStore((s) => s.setUser)
  const isLoggedIn = Boolean(token)
  const isDomestic = data.product === 'domestic'
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const schema = isLoggedIn
    ? detailsSchema
    : detailsSchema.extend({
        password: z.string().min(8, 'Password must be at least 8 characters'),
      })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplyDetailsForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: data.details.firstName || user?.firstName || '',
      lastName: data.details.lastName || user?.lastName || '',
      idNumber: data.details.idNumber ?? '',
      phone: data.details.phone || user?.phone || '',
      email: data.details.email || user?.email || '',
      presentAddress: data.details.presentAddress ?? '',
      city: data.details.city ?? '',
      province: data.details.province ?? '',
      postCode: data.details.postCode ?? '',
      occupation: data.details.occupation ?? '',
      employmentStatus:
        (data.details.employmentStatus as DetailsForm['employmentStatus']) ??
        (isDomestic ? 'domestic' : 'employed'),
      monthlyIncome: data.details.monthlyIncome ?? '',
      password: '',
    },
  })

  const onSubmit = async (values: ApplyDetailsForm) => {
    setError(null)
    setIsSubmitting(true)
    try {
      if (!isLoggedIn) {
        const password = values.password?.trim()
        if (!password || password.length < 8) {
          setError('Create a password of at least 8 characters to open your account.')
          return
        }
        const auth = await apiRegister({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          password,
        })
        setAuth(auth.accessToken, auth.user)
      }

      const { password: _password, ...details } = values
      updateDetails(details)

      const created = await createApplication({
        product: data.product,
        amount: data.amount,
        termMonths: data.termMonths,
        details,
      })
      setApplicationId(created.id)

      try {
        const me = await fetchMe()
        setUser(me)
      } catch {
        // Profile refresh is best-effort; application was still created.
      }

      setStep(2)
      navigate('/apply/documents')
    } catch {
      setError(
        isLoggedIn
          ? 'Could not save your details. Please try again.'
          : 'Could not create your account. That email may already be registered — try signing in.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {error ? (
        <div className="rounded-sm bg-rust-soft px-3 py-2.5 text-[0.875rem] text-rust" role="alert">
          {error}
        </div>
      ) : null}

      <section>
        <p className="loan-form-section-label">Loan product</p>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Loan product">
          <button
            type="button"
            aria-pressed={data.product === 'cash'}
            onClick={() => setProduct('cash')}
            className={cn(
              'loan-form-product-btn min-h-11 border px-4 text-[0.8125rem] font-semibold uppercase tracking-wide sm:min-h-10 sm:text-[0.875rem]',
              data.product === 'cash'
                ? 'border-teal-mid bg-teal-soft text-teal'
                : 'border-line bg-white text-ink-muted hover:border-teal-mid/40',
            )}
          >
            Cash loan
          </button>
          <button
            type="button"
            aria-pressed={data.product === 'domestic'}
            onClick={() => setProduct('domestic')}
            className={cn(
              'loan-form-product-btn min-h-11 border px-4 text-[0.8125rem] font-semibold uppercase tracking-wide sm:min-h-10 sm:text-[0.875rem]',
              data.product === 'domestic'
                ? 'border-teal-mid bg-teal-soft text-teal'
                : 'border-line bg-white text-ink-muted hover:border-teal-mid/40',
            )}
          >
            Domestic worker
          </button>
        </div>
      </section>

      <section>
        <p className="loan-form-section-label">Personal information</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="loan-form-field sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-4">
            <Input
              label="First name"
              autoComplete="given-name"
              error={errors.firstName?.message}
              {...register('firstName')}
            />
            <Input
              label="Surname"
              autoComplete="family-name"
              error={errors.lastName?.message}
              {...register('lastName')}
            />
          </div>
          <div className="loan-form-field">
            <Input
              label="National ID no"
              inputMode="numeric"
              autoComplete="off"
              maxLength={13}
              error={errors.idNumber?.message}
              {...register('idNumber')}
            />
          </div>
          <div className="loan-form-field">
            <Input
              label="Phone"
              inputMode="tel"
              autoComplete="tel"
              placeholder="0821234567"
              error={errors.phone?.message}
              {...register('phone')}
            />
          </div>
          <div className="loan-form-field sm:col-span-2">
            <Input
              label="Email"
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              {...register('email')}
            />
          </div>
          {!isLoggedIn ? (
            <div className="loan-form-field sm:col-span-2">
              <Input
                label="Create a password"
                type="password"
                autoComplete="new-password"
                hint="At least 8 characters. This signs you in later."
                error={errors.password?.message}
                {...register('password')}
              />
            </div>
          ) : null}
          <div className="loan-form-field">
            <Select
              label="Employment"
              error={errors.employmentStatus?.message}
              {...register('employmentStatus')}
            >
              <option value="employed">Employed (payslip)</option>
              <option value="self-employed">Self-employed</option>
              <option value="domestic">Domestic worker</option>
              <option value="other">Other</option>
            </Select>
          </div>
          <div className="loan-form-field">
            <Input
              label="Monthly income (R)"
              inputMode="numeric"
              error={errors.monthlyIncome?.message}
              {...register('monthlyIncome')}
            />
          </div>
          <div className="loan-form-field sm:col-span-2">
            <Input
              label="Occupation"
              autoComplete="organization-title"
              error={errors.occupation?.message}
              {...register('occupation')}
            />
          </div>
        </div>
      </section>

      <section>
        <p className="loan-form-section-label">Address</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="loan-form-field sm:col-span-2">
            <Input
              label="Present address"
              autoComplete="street-address"
              error={errors.presentAddress?.message}
              {...register('presentAddress')}
            />
          </div>
          <div className="loan-form-field">
            <Input
              label="The city"
              autoComplete="address-level2"
              error={errors.city?.message}
              {...register('city')}
            />
          </div>
          <div className="loan-form-field">
            <Input
              label="Present state / province"
              autoComplete="address-level1"
              error={errors.province?.message}
              {...register('province')}
            />
          </div>
          <div className="loan-form-field">
            <Input
              label="Zip / postal code"
              autoComplete="postal-code"
              error={errors.postCode?.message}
              {...register('postCode')}
            />
          </div>
        </div>
      </section>

      <div className="loan-form-actions">
        <span className="text-center text-[0.8125rem] text-ink-muted sm:text-left">
          Next: upload your required documents.
        </span>
        <Button type="submit" variant="primary" disabled={isSubmitting} className="min-h-11 w-full sm:w-auto">
          {isSubmitting
            ? 'Saving…'
            : isLoggedIn
              ? 'Continue to documents'
              : 'Create account & continue'}
        </Button>
      </div>
    </form>
  )
}
