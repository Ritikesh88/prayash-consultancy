// ============================================================
// FORM SERVICE
// Form submission layer with Supabase Database & Storage,
// Netlify Forms fallback, rate limiting, and admin sync.
// ============================================================

import type { Lead, TenderSubmission, ContactRequest } from '@/types/lead'
import type { AdminLead } from '@/types/content'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

const LEADS_STORAGE_KEY = 'prayash_admin_leads_v1'
const LAST_SUBMIT_KEY = 'prayash_last_submit_ts'
const MIN_SUBMISSION_INTERVAL_MS = 15000 // 15 seconds cooldown

// Rate limiting check
function checkRateLimit(): void {
  if (typeof window === 'undefined') return
  const lastTs = sessionStorage.getItem(LAST_SUBMIT_KEY)
  if (lastTs) {
    const elapsed = Date.now() - Number(lastTs)
    if (elapsed < MIN_SUBMISSION_INTERVAL_MS) {
      const waitSecs = Math.ceil((MIN_SUBMISSION_INTERVAL_MS - elapsed) / 1000)
      throw new Error(`Please wait ${waitSecs} second(s) before sending another submission.`)
    }
  }
  sessionStorage.setItem(LAST_SUBMIT_KEY, String(Date.now()))
}

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

// Dispatch to Netlify Forms endpoint (fallback / dual delivery)
async function postToNetlify(formName: string, data: Record<string, string | undefined>): Promise<void> {
  if (typeof window === 'undefined') return
  try {
    const filtered: Record<string, string> = { 'form-name': formName }
    for (const [key, val] of Object.entries(data)) {
      if (val !== undefined && val !== null) {
        filtered[key] = String(val)
      }
    }
    const encodedBody = new URLSearchParams(filtered).toString()
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodedBody,
    })
  } catch (err) {
    if (import.meta.env.DEV) {
      console.warn('[FormService] Netlify form dispatch notice:', err)
    }
  }
}

// Upload file to Supabase Storage if configured
async function uploadTenderFileToSupabase(file: File): Promise<string | null> {
  if (!supabase || !isSupabaseConfigured) return null
  try {
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const filePath = `tenders/${Date.now()}_${cleanFileName}`

    const { error: uploadError } = await supabase.storage
      .from('tender-documents')
      .upload(filePath, file, { cacheControl: '3600', upsert: false })

    if (uploadError) {
      console.warn('[FormService] Supabase storage upload notice:', uploadError.message)
      return null
    }

    const { data: publicUrlData } = supabase.storage
      .from('tender-documents')
      .getPublicUrl(filePath)

    return publicUrlData.publicUrl || filePath
  } catch (err) {
    console.warn('[FormService] Storage upload exception:', err)
    return null
  }
}

// Sync to local Admin Leads store so admin panel immediately displays submitted leads
function syncToAdminLeads(lead: AdminLead) {
  if (typeof window === 'undefined') return
  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY)
    const existing: AdminLead[] = raw ? JSON.parse(raw) : []
    const updated = [lead, ...existing].slice(0, 100) // Keep latest 100
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated))
  } catch {
    // Silently continue
  }
}

// ============================================================
// PUBLIC API
// ============================================================

/**
 * Submit a general consultation lead.
 */
export async function submitLead(data: Omit<Lead, 'id' | 'status' | 'createdAt'>): Promise<void> {
  checkRateLimit()

  const leadId = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
  const now = new Date().toISOString()
  const utm = getUtmParams()

  // 1. Insert into Supabase if configured
  if (supabase && isSupabaseConfigured) {
    const { error } = await supabase.from('leads').insert({
      type: 'quick_callback',
      name: data.name,
      company_name: data.companyName || null,
      mobile: data.mobile,
      email: data.email || null,
      requirement_type: data.requirementType || null,
      tender_number: data.tenderNumber || null,
      message: data.message || null,
      utm_source: utm.utmSource || null,
      utm_medium: utm.utmMedium || null,
      utm_campaign: utm.utmCampaign || null,
      status: 'new',
    })

    if (error) {
      console.error('[FormService] Supabase insert error:', error.message)
    }
  }

  // 2. Dual dispatch to Netlify Forms
  await postToNetlify('contact', {
    name: data.name,
    companyName: data.companyName,
    phone: data.mobile,
    email: data.email,
    requirementType: data.requirementType,
    tenderNumber: data.tenderNumber,
    message: data.message,
    ...utm,
  })

  // 3. Sync to Admin Desk Leads
  syncToAdminLeads({
    id: leadId,
    type: 'quick_callback',
    name: data.name,
    companyName: data.companyName,
    mobile: data.mobile,
    email: data.email,
    tenderNumber: data.tenderNumber,
    message: data.message,
    status: 'new',
    createdAt: now,
  })

  if (import.meta.env.DEV) {
    console.log('[FormService] Lead submitted successfully:', data)
  }
}

/**
 * Submit a tender document / bid review request.
 */
export async function submitTender(
  data: Omit<TenderSubmission, 'id' | 'status' | 'createdAt'> & { botField?: string }
): Promise<void> {
  // Silent drop for bot submissions
  if (data.botField) {
    return
  }

  checkRateLimit()

  const leadId = `tnd_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
  const now = new Date().toISOString()
  const utm = getUtmParams()

  // Upload file to Supabase Storage if file attached
  let uploadedFileUrl: string | null = null
  if (data.tenderFile) {
    uploadedFileUrl = await uploadTenderFileToSupabase(data.tenderFile)
  }

  // 1. Insert into Supabase if configured
  if (supabase && isSupabaseConfigured) {
    const { error } = await supabase.from('leads').insert({
      type: 'tender_submission',
      name: data.name,
      company_name: data.companyName,
      mobile: data.mobile,
      email: data.email || null,
      tender_number: data.tenderNumber || null,
      tender_authority: data.tenderAuthority || null,
      message: data.message || null,
      preferred_contact: data.preferredContact || null,
      file_name: data.tenderFile?.name || null,
      file_url: uploadedFileUrl,
      utm_source: utm.utmSource || null,
      utm_medium: utm.utmMedium || null,
      utm_campaign: utm.utmCampaign || null,
      status: 'new',
    })

    if (error) {
      console.error('[FormService] Supabase insert error:', error.message)
    }
  }

  // 2. Dual dispatch to Netlify Forms
  await postToNetlify('tender-review', {
    name: data.name,
    companyName: data.companyName,
    mobile: data.mobile,
    email: data.email,
    tenderNumber: data.tenderNumber,
    tenderAuthority: data.tenderAuthority,
    message: data.message,
    preferredContact: data.preferredContact,
    fileName: data.tenderFile?.name,
    ...utm,
  })

  // 3. Sync to Admin Desk Leads
  syncToAdminLeads({
    id: leadId,
    type: 'tender_submission',
    name: data.name,
    companyName: data.companyName,
    mobile: data.mobile,
    email: data.email,
    tenderNumber: data.tenderNumber,
    tenderAuthority: data.tenderAuthority,
    message: data.message,
    fileName: data.tenderFile?.name,
    status: 'new',
    createdAt: now,
  })

  if (import.meta.env.DEV) {
    console.log('[FormService] Tender review submitted successfully:', data)
  }
}

/**
 * Submit a contact / callback request.
 */
export async function submitContact(
  data: Omit<ContactRequest, 'id' | 'createdAt'> & { botField?: string }
): Promise<void> {
  // Silent drop for bot submissions
  if (data.botField) {
    return
  }

  checkRateLimit()

  const leadId = `cnt_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
  const now = new Date().toISOString()
  const utm = getUtmParams()

  // 1. Insert into Supabase if configured
  if (supabase && isSupabaseConfigured) {
    const { error } = await supabase.from('leads').insert({
      type: 'contact_request',
      name: data.name,
      company_name: data.companyName || null,
      mobile: data.phone,
      email: data.email || null,
      requirement_type: data.requirementType || null,
      tender_number: data.tenderNumber || null,
      message: data.message || null,
      utm_source: utm.utmSource || null,
      utm_medium: utm.utmMedium || null,
      utm_campaign: utm.utmCampaign || null,
      status: 'new',
    })

    if (error) {
      console.error('[FormService] Supabase insert error:', error.message)
    }
  }

  // 2. Dual dispatch to Netlify Forms
  await postToNetlify('contact', {
    name: data.name,
    companyName: data.companyName,
    phone: data.phone,
    email: data.email,
    requirementType: data.requirementType,
    tenderNumber: data.tenderNumber,
    message: data.message,
    ...utm,
  })

  // 3. Sync to Admin Desk Leads
  syncToAdminLeads({
    id: leadId,
    type: 'contact_request',
    name: data.name,
    companyName: data.companyName,
    mobile: data.phone,
    email: data.email,
    tenderNumber: data.tenderNumber,
    message: data.message,
    status: 'new',
    createdAt: now,
  })

  if (import.meta.env.DEV) {
    console.log('[FormService] Contact request submitted successfully:', data)
  }
}
