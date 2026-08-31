import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { RepaymentLedger } from '@/components/ledger/RepaymentLedger'

vi.mock('@/hooks/useAnimatedNumber', () => ({
  useAnimatedNumber: (value: number) => value,
}))

describe('RepaymentLedger', () => {
  it('updates quote output when amount and term change', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(
      <MemoryRouter>
        <RepaymentLedger initialAmount={5000} initialTerm={1} onChange={onChange} />
      </MemoryRouter>,
    )

    const amountInput = screen.getByLabelText('Amount in rand')
    fireEvent.change(amountInput, { target: { value: '10000' } })
    await user.click(screen.getByRole('radio', { name: '3' }))

    expect(onChange).toHaveBeenLastCalledWith(10000, 3)
    expect(screen.getByText(/a month/i).parentElement).toHaveTextContent('3 569,34')
    expect(screen.getByText('Total you repay').parentElement).toHaveTextContent('10 708,02')
  })

  it('renders the apply call to action when requested', () => {
    render(
      <MemoryRouter>
        <RepaymentLedger showCta ctaTo="/apply/details" />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: /apply for this loan/i })).toHaveAttribute(
      'href',
      '/apply/details',
    )
  })
})
