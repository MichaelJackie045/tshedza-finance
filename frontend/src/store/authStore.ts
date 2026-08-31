/**
 * Client auth state (Zustand) + sessionStorage persistence.
 *
 * LINK MAP
 * - setAuth called from Login/Register after apiClient login/register.
 * - token synced into axios via lib/api.ts setAccessToken.
 * - RequireAuth / RequireAdmin / PublicLayout admin link read user.role.
 */

import { create } from 'zustand'
import type { UserProfile } from '@/lib/apiTypes'
import { setAccessToken as setAxiosToken } from '@/lib/api'

type AuthStore = {
  token: string | null
  user: UserProfile | null
  setAuth: (token: string, user: UserProfile) => void
  setUser: (user: UserProfile) => void
  clearAuth: () => void
}

const TOKEN_KEY = 'tshedza-token'
const USER_KEY = 'tshedza-user'

export const useAuthStore = create<AuthStore>((set) => ({
  token: sessionStorage.getItem(TOKEN_KEY),
  user: (() => {
    const raw = sessionStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  })(),

  setAuth: (token, user) => {
    sessionStorage.setItem(TOKEN_KEY, token)
    sessionStorage.setItem(USER_KEY, JSON.stringify(user))
    setAxiosToken(token)
    set({ token, user })
  },

  setUser: (user) => {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user))
    set({ user })
  },

  clearAuth: () => {
    sessionStorage.removeItem(TOKEN_KEY)
    sessionStorage.removeItem(USER_KEY)
    setAxiosToken(null)
    set({ token: null, user: null })
  },
}))

export function hydrateAuth() {
  const token = sessionStorage.getItem(TOKEN_KEY)
  if (token) setAxiosToken(token)
}
