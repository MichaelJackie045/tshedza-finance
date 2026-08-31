import { render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Reveal } from '@/components/ui/Reveal'

describe('Reveal', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('shows content immediately when reduced motion is enabled', () => {
    vi.mocked(window.matchMedia).mockReturnValue({
      matches: true,
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })

    const { container } = render(
      <Reveal>
        <span>Reduced motion content</span>
      </Reveal>,
    )

    expect(screen.getByText('Reduced motion content')).toBeInTheDocument()
    expect(container.firstChild).toHaveClass('reveal-in')
  })

  it('reveals after intersection observer callback fires', async () => {
    vi.mocked(window.matchMedia).mockReturnValue({
      matches: false,
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })

    const { container } = render(
      <Reveal>
        <span>Observed content</span>
      </Reveal>,
    )

    ;(window.IntersectionObserver as unknown as { instances: Array<{ trigger: (state: boolean) => void }> })
      .instances[0]
      .trigger(true)
    await waitFor(() => {
      expect(container.firstChild).toHaveClass('reveal-in')
    })
  })
})
