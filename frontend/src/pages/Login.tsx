/**
 * Sign-in form.
 *
 * LINK MAP
 * - Submits via apiClient.login -> POST /api/auth/login (AuthenticationController).
 * - On success: authStore.setAuth -> navigate to ?next or /dashboard.
 */

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { login } from '@/lib/apiClient'
import { useAuthStore } from '@/store/authStore'
import { BrandMark, Button, Input, PageIntro, Panel } from '@/components/ui/primitives'
import { brand } from '@/content/brand'

export function LoginPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const setAuth = useAuthStore((s) => s.setAuth)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit } = useForm({
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (values: { email: string; password: string }) => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await login(values.email, values.password)
      setAuth(res.accessToken, res.user)
      const next = searchParams.get('next') ?? '/dashboard'
      navigate(next)
    } catch {
      setError('Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto grid max-w-4xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch lg:gap-0 lg:py-20">
      <aside className="relative hidden overflow-hidden rounded-md hero-mesh grain p-8 text-white lg:flex lg:flex-col lg:justify-between lg:rounded-r-none lg:border lg:border-r-0 lg:border-line">
        <BrandMark inverse />
        <div>
          <p className="font-mono text-[0.75rem] uppercase tracking-wider text-white/45">Account</p>
          <p className="mt-3 text-[1.75rem] font-bold leading-tight tracking-tight">
            Your loans, repayments, and documents — in one place.
          </p>
          <p className="mt-3 text-[0.9375rem] text-white/65">
            {brand.productName} keeps the numbers in rand, on the page.
          </p>
        </div>
        <p className="font-mono text-[0.75rem] text-white/40">Secure sign-in</p>
      </aside>

      <div className="lg:flex lg:items-center">
        <div className="w-full lg:pl-0">
          <div className="mb-8 lg:hidden">
            <BrandMark />
          </div>
          <Panel className="p-6 sm:p-8 lg:rounded-l-none lg:border-l-0">
            <PageIntro title="Welcome back">
              Sign in to manage your loans and repayments.
            </PageIntro>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
              {error ? (
                <div
                  className="rounded-sm bg-rust-soft px-3 py-2.5 text-[0.875rem] text-rust"
                  role="alert"
                >
                  {error}
                </div>
              ) : null}

              <div className="space-y-4">
                <Input
                  label="Email address"
                  type="email"
                  {...register('email', { required: true })}
                  autoComplete="email"
                />
                <Input
                  label="Password"
                  type="password"
                  {...register('password', { required: true })}
                  autoComplete="current-password"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in…' : 'Sign in'}
              </Button>

              <p className="text-center text-[0.875rem] text-ink-muted">
                Don&apos;t have an account?{' '}
                <Link to="/register" className="font-semibold text-teal hover:underline">
                  Create one
                </Link>
                {' · '}
                <Link to="/apply/details" className="font-semibold text-teal hover:underline">
                  Apply for a loan
                </Link>
              </p>
            </form>
          </Panel>
        </div>
      </div>
    </div>
  )
}
