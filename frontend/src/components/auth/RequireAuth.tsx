/**
 * Route guard: any logged-in user (Supabase session in authStore).
 */

import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import type { ReactNode } from 'react'

export function RequireAuth({ children }: { children: ReactNode }) {
  const token = useAuthStore((s) => s.token)
  const ready = useAuthStore((s) => s.ready)
  const location = useLocation()

  if (!ready) {
    return null
  }

  if (!token) {
    return <Navigate to={`/login?next=${location.pathname}`} replace />
  }

  return children
}
