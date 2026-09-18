// ============================================================
// ANALYTICS UTILITY
// Event tracking abstraction.
// Currently a no-op — ready to plug in GA4 or GTM.
// To activate: set VITE_GA_MEASUREMENT_ID in .env
// ============================================================

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

type EventProperties = Record<string, string | number | boolean | undefined>

/**
 * Track a named analytics event with optional properties.
 * Safe to call even when analytics is not configured.
 */
export function trackEvent(name: string, properties?: EventProperties): void {
  // Development: log to console for inspection
  if (import.meta.env.DEV) {
    console.log('[Analytics]', name, properties ?? {})
  }

  // Google Analytics 4 (via gtag)
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, properties)
  }

  // Google Tag Manager (via dataLayer)
  if (window.dataLayer) {
    window.dataLayer.push({ event: name, ...properties })
  }
}

// ============================================================
// Pre-defined event names for consistency
// ============================================================
export const EVENTS = {
  CTA_CONSULTATION_CLICK: 'cta_consultation_click',
  CTA_SEND_TENDER_CLICK: 'cta_send_tender_click',
  WHATSAPP_CLICK: 'whatsapp_click',
  LEAD_FORM_START: 'lead_form_start',
  LEAD_FORM_SUBMIT: 'lead_form_submit',
  TENDER_FORM_SUBMIT: 'tender_form_submit',
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  PHONE_CLICK: 'phone_click',
  EMAIL_CLICK: 'email_click',
  CLIENT_LOGIN_CLICK: 'client_login_click',
} as const
