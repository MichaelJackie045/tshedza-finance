/**
 * Route guard: any logged-in user (JWT present in authStore).
 *
 * LINK MAP
 * - Wraps /apply and /dashboard in App.tsx.
 * - Backend still enforces auth via SecurityConfig + JwtAuthenticationFilter.
 */

import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import type { ReactNode } from 'react'

export function RequireAuth({ children }: { children: ReactNode }) {
  const token = useAuthStore((s) => s.token)
  const location = useLocation()

  if (!token) {
    return <Navigate to={`/login?next=${location.pathname}`} replace />
  }

  return children
}
