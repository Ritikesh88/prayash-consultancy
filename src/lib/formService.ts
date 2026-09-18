// ============================================================
// FORM SERVICE
// Abstracted form submission layer.
// Phase 1: stores sanitized metadata to localStorage (max 5 items, 24h TTL) + console.
// Phase 2: swap submitToSupabase() calls in below functions.
// ============================================================

import type { Lead, TenderSubmission, ContactRequest } from '@/types/lead'

const MAX_STORED_ITEMS = 5
const TTL_HOURS = 24

// Utility: get UTM parameters from URL
function getUtmParams() {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(window.location.search)
  return {
    utmSource: params.get('utm_source') ?? undefined,
    utmMedium: params.get('utm_medium') ?? undefined,
    utmCampaign: params.get('utm_campaign') ?? undefined,
  }
}

// Utility: mask sensitive phone number for client-side storage
function maskPhone(phone?: string): string | undefined {
  if (!phone || phone.length < 6) return phone
  return `${phone.slice(0, 4)}****${phone.slice(-2)}`
}

// Utility: mask email for client-side storage
function maskEmail(email?: string): string | undefined {
  if (!email || !email.includes('@')) return email
  const [user, domain] = email.split('@')
  return `${user.slice(0, 2)}***@${domain}`
}

interface StoredEntry {
  data: unknown
  savedAt: string
}

// Utility: save sanitized record to localStorage with TTL eviction and bounded size
function saveToLocalStorage(key: string, data: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  try {
    const raw = localStorage.getItem(key)
    const existing: StoredEntry[] = raw ? JSON.parse(raw) : []

    const now = Date.now()
    const cutoff = now - TTL_HOURS * 60 * 60 * 1000

    // Filter out expired items
    const valid = existing.filter((item) => {
      const ts = new Date(item.savedAt).getTime()
      return !isNaN(ts) && ts > cutoff
    })

    // Mask PII before writing to client localStorage
    const sanitized = { ...data }
    if (typeof sanitized.mobile === 'string') sanitized.mobile = maskPhone(sanitized.mobile)
    if (typeof sanitized.phone === 'string') sanitized.phone = maskPhone(sanitized.phone)
    if (typeof sanitized.email === 'string') sanitized.email = maskEmail(sanitized.email)

    valid.push({ data: sanitized, savedAt: new Date().toISOString() })

    // Keep only most recent entries (FIFO)
    const trimmed = valid.slice(-MAX_STORED_ITEMS)
    localStorage.setItem(key, JSON.stringify(trimmed))
  } catch {
    // Fail silently — localStorage may be disabled or in private browsing
  }
}

// Simulate async network submission for realistic UX
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// ============================================================
// PUBLIC API
// ============================================================

/**
 * Submit a consultation lead.
 * Replace the body of this function with a Supabase insert when ready.
 */
export async function submitLead(data: Omit<Lead, 'id' | 'status' | 'createdAt'>): Promise<void> {
  await delay(800) // Simulate network

  const lead: Lead = {
    ...data,
    ...getUtmParams(),
    source: typeof document !== 'undefined' ? document.referrer || 'direct' : 'direct',
    status: 'NEW',
    createdAt: new Date().toISOString(),
  }

  // Phase 1: bounded, sanitized localStorage
  saveToLocalStorage('prayash_leads', lead as unknown as Record<string, unknown>)
  if (import.meta.env.DEV) {
    console.log('[FormService] Lead submitted:', lead)
  }

  // Phase 2: Configure Supabase
  // const { error } = await supabase.from('leads').insert(lead)
  // if (error) throw error
}

/**
 * Submit a tender for review.
 * Note: file upload not persisted in Phase 1 — log metadata only.
 */
export async function submitTender(
  data: Omit<TenderSubmission, 'id' | 'status' | 'createdAt'>
): Promise<void> {
  await delay(1000) // Slightly longer for file upload simulation

  const submission: TenderSubmission = {
    ...data,
    ...getUtmParams(),
    source: typeof document !== 'undefined' ? document.referrer || 'direct' : 'direct',
    tenderFileName: data.tenderFile?.name,
    tenderFile: undefined, // Don't serialize File object
    status: 'NEW',
    createdAt: new Date().toISOString(),
  }

  saveToLocalStorage('prayash_tender_submissions', submission as unknown as Record<string, unknown>)
  if (import.meta.env.DEV) {
    console.log('[FormService] Tender submitted:', submission)
  }

  // Phase 2: Upload file to Supabase Storage + insert record
  // const fileUrl = await uploadToSupabaseStorage(data.tenderFile)
  // const { error } = await supabase.from('tender_submissions').insert({ ...submission, fileUrl })
  // if (error) throw error
}

/**
 * Submit a contact / callback request.
 */
export async function submitContact(data: Omit<ContactRequest, 'id' | 'createdAt'>): Promise<void> {
  await delay(800)

  const request: ContactRequest = {
    ...data,
    source: typeof document !== 'undefined' ? document.referrer || 'direct' : 'direct',
    createdAt: new Date().toISOString(),
  }

  saveToLocalStorage('prayash_contact_requests', request as unknown as Record<string, unknown>)
  if (import.meta.env.DEV) {
    console.log('[FormService] Contact request submitted:', request)
  }

  // Phase 2:
  // const { error } = await supabase.from('contact_requests').insert(request)
  // if (error) throw error
}
