# Frontend Architecture

## Stack

- React 18 + Vite + TypeScript
- Tailwind CSS + shadcn/ui for components
- React Router for routing
- TanStack Query for server state (loan status, application data)
- Zustand for client state (multi-step form progress, UI state)
- React Hook Form + Zod for the application form and validation
- Axios for API calls, talking to your existing Django REST backend

This matches the Django and React stack you already use on ESD360, so the same patterns carry over.

## Folder structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn primitives
│   │   ├── application/     # DetailsStep, DocumentsStep, TermsStep, ReviewStep
│   │   └── ledger/          # the live repayment ledger component
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Apply.tsx
│   │   ├── Dashboard.tsx
│   │   ├── LoanDetail.tsx
│   │   └── Repayments.tsx
│   ├── hooks/
│   │   ├── useLoanApplication.ts
│   │   ├── useLoanStatus.ts
│   │   └── useDocumentUpload.ts
│   ├── lib/
│   │   ├── api.ts           # Axios instance, base URL, interceptors
│   │   └── validation.ts    # Zod schemas for each application step
│   ├── store/
│   │   └── applicationStore.ts   # Zustand: current step, saved form data
│   └── App.tsx
├── tailwind.config.ts
└── package.json
```

## Auth

Store the access token in memory (React state or Zustand), never in localStorage. Store the refresh token in an httpOnly cookie set by the backend. This matters more here than on a typical app - a leaked token on a loan platform exposes someone's ID, payslip, and bank statements, not just a session.

## Document uploads

Use a dedicated hook, `useDocumentUpload`, that wraps a multipart form POST to Django. Each document type (ID, payslip, bank statement) gets its own upload slot with its own status: not started, uploading, uploaded, rejected. Block the Review step until every required upload confirms. Never let a user submit with a document still uploading in the background.

## Multi-step form state

Persist form progress to Zustand and sync to `sessionStorage`, not `localStorage`. This data includes ID numbers and income figures, and should not survive past the browser session. If the user closes the tab mid-application, they lose progress and start over. That is the safer default for this kind of data.

## API integration pattern

Every screen calls a hook, never Axios directly:

```typescript
export const useLoanStatus = (loanId: string) => {
  return useQuery({
    queryKey: ['loan', loanId],
    queryFn: async () => {
      const { data } = await api.get(`/loans/${loanId}/`);
      return data;
    },
  });
};
```

## Mistakes to avoid on this project specifically

- Don't validate ID numbers or bank account numbers only on the backend. Validate format client-side first with a Zod schema, so users get instant feedback, then let the backend do the real check.
- Don't show a rand amount without a currency symbol and thousands separator. R20000 reads as a typo. R20,000.00 reads as a loan.
- Don't let the ledger component recalculate on every keystroke if you add a manual amount input later. Debounce it, or the slider will feel laggy on low-end phones.
