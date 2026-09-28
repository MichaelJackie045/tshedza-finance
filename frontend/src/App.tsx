/**
 * Route table for Tshedza Finance UI.
 *
 * LINK MAP
 * - Public pages (/) -> PublicLayout + marketing/product pages (no auth).
 * - /apply/* -> public ApplyLayout (registers account on details if needed)
 *   Details->Documents->Terms->Review->Done (API: /api/applications* via apiClient).
 * - /dashboard/* -> RequireAuth + DashboardLayout -> loans/repayments (API: /api/loans*).
 * - /admin -> RequireAdmin + AdminPanel (API: /api/admin/*, needs ROLE_ADMIN).
 * - Vite proxies /api -> http://localhost:8080 (vite.config.ts).
 */

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { ApplyLayout } from '@/components/layout/ApplyLayout'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { HomePage } from '@/pages/Home'
import { CashLoanPage, DomesticLoanPage } from '@/pages/Products'
import { TransferPage } from '@/pages/Transfer'
import { DebtReviewPage } from '@/pages/DebtReview'
import { FAQPage, ContactPage } from '@/pages/FAQ'
import { PrivacyPage, TermsPage } from '@/pages/Legal'
import { DetailsStep } from '@/components/application/DetailsStep'
import { DocumentsStep } from '@/components/application/DocumentsStep'
import { TermsStep } from '@/components/application/TermsStep'
import { ReviewStep } from '@/components/application/ReviewStep'
import { DoneStep } from '@/components/application/DoneStep'
import {
  DashboardPage,
  LoanDetailPage,
  RepaymentsPage,
  DocumentsPage,
  ProfilePage,
} from '@/pages/Dashboard'
import { PaymentReturnPage, PaymentCancelPage } from '@/pages/PaymentResult'
import { MockCheckoutPage } from '@/pages/MockCheckout'
import { LoginPage } from '@/pages/Login'
import { RegisterPage } from '@/pages/Register'
import { RequireAuth } from '@/components/auth/RequireAuth'
import { RequireAdmin } from '@/components/auth/RequireAdmin'
import { AdminPanelPage } from '@/pages/admin/AdminPanel'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="products/cash-loan" element={<CashLoanPage />} />
            <Route path="products/domestic" element={<DomesticLoanPage />} />
            <Route path="products/transfer" element={<TransferPage />} />
            <Route path="products/debt-review" element={<DebtReviewPage />} />
            <Route path="faq" element={<FAQPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>

          <Route path="apply" element={<ApplyLayout />}>
            <Route index element={<Navigate to="details" replace />} />
            <Route path="details" element={<DetailsStep />} />
            <Route
              path="documents"
              element={
                <RequireAuth>
                  <DocumentsStep />
                </RequireAuth>
              }
            />
            <Route
              path="terms"
              element={
                <RequireAuth>
                  <TermsStep />
                </RequireAuth>
              }
            />
            <Route
              path="review"
              element={
                <RequireAuth>
                  <ReviewStep />
                </RequireAuth>
              }
            />
            <Route
              path="done"
              element={
                <RequireAuth>
                  <DoneStep />
                </RequireAuth>
              }
            />
          </Route>

          <Route
            path="dashboard"
            element={
              <RequireAuth>
                <DashboardLayout />
              </RequireAuth>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="loans/:loanId" element={<LoanDetailPage />} />
            <Route path="repayments" element={<RepaymentsPage />} />
            <Route path="repayments/checkout" element={<MockCheckoutPage />} />
            <Route path="repayments/return" element={<PaymentReturnPage />} />
            <Route path="repayments/cancel" element={<PaymentCancelPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          <Route
            path="admin"
            element={
              <RequireAdmin>
                <AdminPanelPage />
              </RequireAdmin>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
