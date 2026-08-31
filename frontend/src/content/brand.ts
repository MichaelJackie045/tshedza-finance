/** Product brand vs registered parent — Limpopo / Vhembe based lender. */
export const brand = {
  /** Public loan product name (header, wordmark, “follow” line). */
  productName: 'Tshedza Finance',
  productShort: 'Tshedza',
  /** Registered company that owns the product. */
  legalName: 'Tshedza and Canaan Group of Companies',
  registrationNumber: '2026/462710/07',
  copyright: '© All rights reserved.',
  /** Physical office — Makwarela, Sibasa (Thohoyandou), Limpopo. */
  address: '2124 Makwarela, Sibasa 0970',
  region: 'Limpopo, South Africa',
  email: 'nevhutandandivhuwo64@gmail.com',
  phoneDisplay: '079 932 6111',
  phoneHref: 'tel:0799326111',
  /** WhatsApp Business click-to-chat (E.164 without +). */
  whatsappE164: '27799326111',
  whatsappHref: 'https://wa.me/27799326111',
  hours: 'Weekdays 08:00 – 17:00 SAST',
  tagline: 'Short-term cash loans for working people in South Africa.',
  social: {
    facebook: 'https://www.facebook.com/',
    linkedin: 'https://www.linkedin.com/',
  },
} as const

export function legalEntityLine() {
  return `${brand.legalName} (reg no ${brand.registrationNumber})`
}

/** Build a wa.me URL to our business line, optionally with a prefilled message. */
export function whatsappChatUrl(prefill?: string) {
  if (!prefill?.trim()) return brand.whatsappHref
  return `${brand.whatsappHref}?text=${encodeURIComponent(prefill.trim())}`
}

/**
 * Build a wa.me URL to a customer mobile (SA 0XXXXXXXXX or digits with country code).
 * Returns null if the number cannot be normalised.
 */
export function customerWhatsAppUrl(phone: string | undefined | null, prefill?: string) {
  if (!phone) return null
  const digits = phone.replace(/\D/g, '')
  let e164 = digits
  if (digits.length === 10 && digits.startsWith('0')) {
    e164 = `27${digits.slice(1)}`
  } else if (digits.length === 11 && digits.startsWith('27')) {
    e164 = digits
  } else if (digits.length < 8) {
    return null
  }
  const base = `https://wa.me/${e164}`
  if (!prefill?.trim()) return base
  return `${base}?text=${encodeURIComponent(prefill.trim())}`
}
