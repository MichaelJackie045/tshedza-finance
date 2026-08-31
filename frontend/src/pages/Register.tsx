/**
 * Create account form.
 *
 * LINK MAP
 * - apiClient.register -> POST /api/auth/register -> AuthenticationService.
 * - Then authStore.setAuth and navigate to /apply/details (application first).
 */

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { register as apiRegister } from '@/lib/apiClient'
import { useAuthStore } from '@/store/authStore'
import { useApplicationStore } from '@/store/applicationStore'
import { BrandMark, Button, Input, PageIntro, Panel } from '@/components/ui/primitives'

export function RegisterPage() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((s) => s.setAuth)
  const updateDetails = useApplicationStore((s) => s.updateDetails)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
    },
  })

  const onSubmit = async (values: {
    firstName: string
    lastName: string
    email: string
    phone: string
    password: string
  }) => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await apiRegister(values)
      setAuth(res.accessToken, res.user)
      updateDetails({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
      })
      navigate('/apply/details')
    } catch {
      setError('Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:px-6 sm:py-20">
      <div className="mb-8">
        <BrandMark />
      </div>
      <Panel className="p-6 sm:p-8">
        <PageIntro title="Create your account">
          Next we will take your loan application — it only takes a few minutes.
        </PageIntro>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          {error ? (
            <div className="rounded-sm bg-rust-soft px-3 py-2.5 text-[0.875rem] text-rust" role="alert">
              {error}
            </div>
          ) : null}

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="First name" {...register('firstName', { required: true })} />
              <Input label="Surname" {...register('lastName', { required: true })} />
            </div>
            <Input label="Email" type="email" {...register('email', { required: true })} />
            <Input label="Phone" type="tel" {...register('phone', { required: true })} />
            <Input
              label="Password"
              type="password"
              {...register('password', { required: true })}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating account…' : 'Continue to application'}
          </Button>

          <p className="text-center text-[0.875rem] text-ink-muted">
            Prefer to apply in one go?{' '}
            <Link to="/apply/details" className="font-semibold text-teal hover:underline">
              Start the application
            </Link>
          </p>

          <p className="text-center text-[0.875rem] text-ink-muted">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-teal hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </Panel>
    </div>
  )
}
