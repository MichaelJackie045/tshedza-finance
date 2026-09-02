/**
 * TypeScript shapes for API JSON (keep in sync with backend entities/DTOs).
 *
 * LINK MAP
 * - UserProfile.role <- User.role / AuthenticationResponse
 * - Loan / Payment <- LoanController responses
 * - AdminOverview / AdminApplication <- AdminController DTOs
 */

export type ProductType = 'cash' | 'domestic'

export type DocumentKind =
  | 'id'
  | 'payslip'
  | 'bank1'
  | 'bank2'
  | 'bank3'
  | 'address'
  | 'employment'

export type LoanStatus = 'active' | 'approved' | 'pending' | 'overdue' | 'paid'

export type Loan = {
  id: string
  product: string
  status: LoanStatus
  principal: number
  remaining: number
  nextPaymentDate: string
  nextPaymentAmount: number
  termMonths: number
  monthlyInstalment: number
  schedule: Array<{
    dueDate: string
    amount: number
    status: 'paid' | 'upcoming' | 'overdue'
  }>
}

export type Payment = {
  id: string
  date: string
  amount: number
  method: string
  status: 'active' | 'approved' | 'paid' | 'cleared' | 'pending' | 'upcoming' | 'overdue'
}

export type UserRole = 'USER' | 'ADMIN'

export type UserProfile = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  idNumberMasked?: string
  role?: UserRole
}

export type AuthResponse = {
  accessToken: string
  user: UserProfile
}

export type AdminOverview = {
  pendingApplications: number
  approvedApplications: number
  declinedApplications: number
  activeLoans: number
  pendingTransfers: number
  debtReviewRequests: number
}

export type AdminApplication = {
  id: string
  product: string
  amount: number
  termMonths: number
  status: string
  reference?: string
  decisionNote?: string
  firstName?: string
  lastName?: string
  phone?: string
  email?: string
  createdAt?: string
}

export type AdminTransfer = {
  id: string
  senderName: string
  senderPhone?: string
  recipientName: string
  recipientPhone?: string
  country: string
  total: number
  status: string
  createdAt?: string
}

export type AdminDebtReview = {
  id: string
  fullName: string
  phone: string
  email: string
  situation: string
  status: string
  createdAt?: string
}
