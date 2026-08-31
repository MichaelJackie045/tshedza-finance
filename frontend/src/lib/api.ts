/**
 * Shared Axios instance for all backend calls.
 *
 * LINK MAP
 * - baseURL `/api` is proxied by Vite to Spring Boot :8080.
 * - Request interceptor adds Authorization Bearer token from authStore/hydrateAuth.
 * - 401 response clears session and sends user to /login (pairs with JwtAuthenticationFilter).
 * - Typed wrappers live in apiClient.ts; DTO shapes in apiTypes.ts.
 */

import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  withCredentials: true,
})

let accessToken: string | null = null

export function setAccessToken(token: string | null) {
  accessToken = token
}

export function getAccessToken() {
  return accessToken
}

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem('tshedza-token')
      sessionStorage.removeItem('tshedza-user')
      accessToken = null
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = `/login?next=${window.location.pathname}`
      }
    }
    return Promise.reject(error)
  },
)
