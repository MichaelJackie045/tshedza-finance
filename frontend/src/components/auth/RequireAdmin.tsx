/**
 * Route guard: logged-in user with role ADMIN.
 */

import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import type { ReactNode } from 'react'

export function RequireAdmin({ children }: { children: ReactNode }) {
  const token = useAuthStore((s) => s.token)
  const user = useAuthStore((s) => s.user)
  const ready = useAuthStore((s) => s.ready)
  const location = useLocation()

  if (!ready) {
    return null
  }

  if (!token) {
    return <Navigate to={`/login?next=${location.pathname}`} replace />
  }

  if (user?.role !== 'ADMIN') {
    return <Navigate to="/dashboard" replace />
  }

  return children
}
