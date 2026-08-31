import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { HomePage } from '@/pages/Home'

vi.mock('@/hooks/useAnimatedNumber', () => ({
  useAnimatedNumber: (value: number) => value,
}))

describe('HomePage', () => {
  it('renders the hero and primary actions', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: /start application/i })).toHaveAttribute('href', '/apply/details')
    expect(screen.getByText(/your quote/i)).toBeInTheDocument()
  })
})
