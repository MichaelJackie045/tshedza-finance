/**
 * Client-side loan quote calculator (marketing / apply terms UI).
 *
 * LINK MAP
 * - Used by RepaymentLedger and TermsStep for live estimates.
 * - Backend ApplicationService.calculateTotalRepayable should stay aligned
 *   (rate: INTEREST_RATE_MONTHLY here <-> app.interest-rate in application.yml).
 */

export const LOAN_MIN = 500
export const LOAN_MAX = 20_000
export const LOAN_TERM_MIN = 1
export const LOAN_TERM_MAX = 9
export const INTEREST_RATE_MONTHLY = 0.035

export type LoanQuote = {
  amount: number
  termMonths: number
  monthlyInstalment: number
  totalRepayable: number
  interestCost: number
  interestRateLabel: string
}

export function calculateLoanQuote(amount: number, termMonths: number): LoanQuote {
  const principal = Math.min(LOAN_MAX, Math.max(LOAN_MIN, amount))
  const term = Math.min(LOAN_TERM_MAX, Math.max(LOAN_TERM_MIN, Math.round(termMonths)))

  if (term === 1) {
    const interestCost = Math.round(principal * INTEREST_RATE_MONTHLY * 100) / 100
    const totalRepayable = principal + interestCost
    return {
      amount: principal,
      termMonths: term,
      monthlyInstalment: totalRepayable,
      totalRepayable,
      interestCost,
      interestRateLabel: `${(INTEREST_RATE_MONTHLY * 100).toFixed(1)}% p.m.`,
    }
  }

  const r = INTEREST_RATE_MONTHLY
  const factor = Math.pow(1 + r, term)
  const monthlyInstalment = Math.round(((principal * r * factor) / (factor - 1)) * 100) / 100
  const totalRepayable = Math.round(monthlyInstalment * term * 100) / 100
  const interestCost = Math.round((totalRepayable - principal) * 100) / 100

  return {
    amount: principal,
    termMonths: term,
    monthlyInstalment,
    totalRepayable,
    interestCost,
    interestRateLabel: `${(INTEREST_RATE_MONTHLY * 100).toFixed(1)}% p.m.`,
  }
}

export function calculateTransferFee(amount: number, countryCode: string): {
  amount: number
  fee: number
  total: number
  receiveEstimate: number
} {
  const feeRate = countryCode === 'ZW' ? 0.045 : countryCode === 'MZ' ? 0.04 : 0.035
  const fee = Math.max(49, Math.round(amount * feeRate * 100) / 100)
  return {
    amount,
    fee,
    total: amount + fee,
    receiveEstimate: amount,
  }
}
