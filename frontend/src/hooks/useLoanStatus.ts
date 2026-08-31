/**
 * Loan / repayment queries for the customer dashboard.
 *
 * LINK MAP
 * - fetchLoans / fetchLoan / fetchRepayments -> LoanController via apiClient.
 */

import { useQuery } from '@tanstack/react-query'
import { fetchLoan, fetchLoans, fetchRepayments } from '@/lib/apiClient'
import { formatRand } from '@/lib/format'

export function useLoanStatus(loanId: string) {
  return useQuery({
    queryKey: ['loan', loanId],
    queryFn: () => fetchLoan(loanId),
    enabled: Boolean(loanId),
  })
}

export function useDashboardLoans() {
  return useQuery({
    queryKey: ['loans', 'dashboard'],
    queryFn: async () => {
      const data = await fetchLoans()
      const loan = data.loans[0]
      return {
        loans: data.loans,
        nextPaymentLabel: loan ? formatRand(loan.nextPaymentAmount) : undefined,
      }
    },
  })
}

export function useRepaymentHistory() {
  return useQuery({
    queryKey: ['repayments'],
    queryFn: fetchRepayments,
  })
}
