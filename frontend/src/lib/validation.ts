/**
 * Zod schemas for frontend forms (details, terms, transfer, debt review).
 *
 * LINK MAP
 * - DetailsStep / DomesticDetails use detailsSchema before createApplication.
 * - TransferPage / DebtReviewPage validate before calling public APIs.
 */

import { z } from 'zod'
import { LOAN_MAX, LOAN_MIN } from '@/lib/loanCalc'

const saIdRegex = /^\d{13}$/

/** Fields collected on /apply/details (also doubles as public registration). */
export const detailsSchema = z.object({
  firstName: z.string().min(2, 'Enter your first name'),
  lastName: z.string().min(2, 'Enter your surname'),
  idNumber: z.string().regex(saIdRegex, 'Enter a valid 13-digit SA ID number'),
  phone: z
    .string()
    .regex(/^0\d{9}$/, 'Enter a valid SA mobile number (e.g. 0821234567)'),
  email: z.string().email('Enter a valid email address'),
  presentAddress: z.string().min(5, 'Enter your present address'),
  city: z.string().min(2, 'Enter your city'),
  province: z.string().min(2, 'Enter your province'),
  postCode: z.string().min(4, 'Enter a postal code'),
  occupation: z.string().min(2, 'Enter your occupation'),
  employmentStatus: z.enum(
    ['employed', 'self-employed', 'domestic', 'student', 'other'],
    { required_error: 'Select your employment status' },
  ),
  monthlyIncome: z
    .string()
    .min(1, 'Enter your monthly income')
    .refine((v) => Number(v.replace(/\s/g, '')) >= 500, {
      message: 'Income must be at least R500',
    }),
  /** Required when applying without an existing account. */
  password: z.string().optional(),
})

export const domesticDetailsSchema = detailsSchema.omit({
  employmentStatus: true,
  monthlyIncome: true,
}).extend({
  employerName: z.string().min(2, 'Enter your employer’s name'),
  weeklyWage: z
    .string()
    .min(1, 'Enter your weekly wage')
    .refine((v) => Number(v.replace(/\s/g, '')) >= 300, {
      message: 'Wage must be at least R300',
    }),
})

export const termsSchema = z.object({
  amount: z.number().min(LOAN_MIN).max(LOAN_MAX),
  termMonths: z.literal(1),
})

export const debtReviewSchema = z.object({
  fullName: z.string().min(2, 'Enter your full name'),
  phone: z
    .string()
    .regex(/^0\d{9}$/, 'Enter a valid SA mobile number'),
  email: z.string().email('Enter a valid email'),
  situation: z.string().min(20, 'Tell us a little more (at least 20 characters)'),
})

export const transferSchema = z.object({
  senderName: z.string().min(2),
  senderPhone: z.string().regex(/^0\d{9}$/),
  recipientName: z.string().min(2),
  recipientPhone: z.string().min(8),
  country: z.enum(['ZW', 'MZ', 'LS', 'BW']),
  amount: z.number().min(100).max(50_000),
})

export const contactSchema = z.object({
  name: z.string().min(2, 'Enter your name'),
  email: z.string().email('Enter a valid email'),
  phone: z
    .string()
    .optional()
    .refine((v) => !v || /^0\d{9}$/.test(v), {
      message: 'Enter a valid SA mobile number',
    }),
  message: z.string().min(10, 'Write at least 10 characters'),
})

export type DetailsForm = z.infer<typeof detailsSchema>
export type DomesticDetailsForm = z.infer<typeof domesticDetailsSchema>
export type TermsForm = z.infer<typeof termsSchema>
export type DebtReviewForm = z.infer<typeof debtReviewSchema>
export type TransferForm = z.infer<typeof transferSchema>
export type ContactForm = z.infer<typeof contactSchema>
