// ============================================================
// SITE CONFIGURATION
// All company-specific values live here.
// Supports environment variables (VITE_*) with safe fallbacks.
// ============================================================

const env = import.meta.env ?? {}

export const siteConfig = {
  companyName: (env.VITE_COMPANY_NAME as string) || 'Prayash Consultancy',
  tagline: 'Government Tenders. Managed From Start to Finish.',
  taglineShort: 'Your Outsourced Tender Desk',
  description:
    'From GeM registration and tender discovery to eligibility checks, documentation, bid preparation and submission support — get practical assistance from a dedicated tender team.',

  // Contact
  phone: (env.VITE_PHONE as string) || '+91 98765 43210',
  phoneHref: (env.VITE_PHONE_HREF as string) || 'tel:+919876543210',
  whatsapp: (env.VITE_WHATSAPP as string) || '+91 98765 43210',
  whatsappNumber: (env.VITE_WHATSAPP_NUMBER as string) || '919876543210', // digits only
  whatsappMessage:
    (env.VITE_WHATSAPP_MSG as string) ||
    'Hello, I would like help with a government tender. My requirement is ______.',
  email: (env.VITE_EMAIL as string) || 'info@prayashconsultancy.com',
  emailHref: `mailto:${(env.VITE_EMAIL as string) || 'info@prayashconsultancy.com'}`,

  // Address
  address: (env.VITE_ADDRESS as string) || 'New Delhi, India',
  addressFull: (env.VITE_ADDRESS_FULL as string) || 'New Delhi, India',
  businessHours: 'Monday – Saturday, 10 AM – 6 PM IST',

  // Social
  linkedin: (env.VITE_LINKEDIN as string) || '',
  twitter: (env.VITE_TWITTER as string) || '',

  // SEO base
  siteUrl: (env.VITE_SITE_URL as string) || 'https://prayashconsultancy.com',

  // Analytics (GA4 measurement ID)
  gaMeasurementId: (env.VITE_GA_ID as string) || '',
} as const

// WhatsApp click URL
export const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`
