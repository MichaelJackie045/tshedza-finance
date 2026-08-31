import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AdminPanelPage } from '@/pages/admin/AdminPanel'

const apiClient = vi.hoisted(() => ({
  adminDecideApplication: vi.fn(),
  fetchAdminApplications: vi.fn(),
  fetchAdminDebtReviews: vi.fn(),
  fetchAdminLoans: vi.fn(),
  fetchAdminOverview: vi.fn(),
  fetchAdminTransfers: vi.fn(),
}))

vi.mock('@/lib/apiClient', () => apiClient)

function renderPage() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })

  return render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <AdminPanelPage />
      </QueryClientProvider>
    </MemoryRouter>,
  )
}

describe('AdminPanelPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders overview cards and switches tabs', async () => {
    apiClient.fetchAdminOverview.mockResolvedValue({
      pendingApplications: 2,
      approvedApplications: 1,
      declinedApplications: 0,
      activeLoans: 4,
      pendingTransfers: 3,
      debtReviewRequests: 5,
    })
    apiClient.fetchAdminApplications.mockResolvedValue([
      {
        id: 'app-1',
        reference: 'TF-123',
        firstName: 'Audit',
        lastName: 'User',
        product: 'cash',
        amount: 5000,
        termMonths: 1,
        status: 'pending',
      },
    ])
    apiClient.fetchAdminLoans.mockResolvedValue([
      {
        id: 'LN-100',
        product: 'Cash loan',
        remaining: 5175,
        nextPaymentDate: '2026-09-18',
        status: 'active',
      },
    ])
    apiClient.fetchAdminTransfers.mockResolvedValue([
      { id: 'TX-1', senderName: 'A', recipientName: 'B', country: 'ZW', total: 500, status: 'pending' },
    ])
    apiClient.fetchAdminDebtReviews.mockResolvedValue([
      { id: 'DR-1', fullName: 'Debt User', phone: '0821234567', email: 'debt@example.com', situation: 'Help', status: 'received' },
    ])
    apiClient.adminDecideApplication.mockResolvedValue({ id: 'app-1', status: 'approved' })

    renderPage()

    expect(await screen.findByText('Queue')).toBeInTheDocument()
    expect(await screen.findByText('Pending applications')).toBeInTheDocument()
    expect(await screen.findByText(/Audit User/)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Loans' }))
    expect(await screen.findByText('LN-100')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Transfers' }))
    expect(await screen.findByText('TX-1')).toBeInTheDocument()
    expect(screen.getByText(/A → B/)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Debt review' }))
    expect(await screen.findByText('Debt User')).toBeInTheDocument()
  })

  it('submits an approval decision', async () => {
    apiClient.fetchAdminOverview.mockResolvedValue({
      pendingApplications: 1,
      approvedApplications: 0,
      declinedApplications: 0,
      activeLoans: 0,
      pendingTransfers: 0,
      debtReviewRequests: 0,
    })
    apiClient.fetchAdminApplications.mockResolvedValue([
      {
        id: 'app-2',
        reference: 'TF-456',
        firstName: 'Case',
        lastName: 'Owner',
        product: 'domestic',
        amount: 3000,
        termMonths: 1,
        status: 'pending',
      },
    ])
    apiClient.fetchAdminLoans.mockResolvedValue([])
    apiClient.fetchAdminTransfers.mockResolvedValue([])
    apiClient.fetchAdminDebtReviews.mockResolvedValue([])
    apiClient.adminDecideApplication.mockResolvedValue({ id: 'app-2', status: 'approved' })

    renderPage()

    fireEvent.change(await screen.findByPlaceholderText(/decision note/i), {
      target: { value: 'Looks good' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Approve' }))

    await waitFor(() => {
      expect(apiClient.adminDecideApplication).toHaveBeenCalledWith('app-2', 'approve', 'Looks good')
    })
  })
})
