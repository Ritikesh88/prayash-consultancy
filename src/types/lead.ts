// ============================================================
// LEAD & FORM TYPES
// Matches the planned Phase 2 Supabase / CRM data model.
// ============================================================

export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'CONSULTATION'
  | 'PROPOSAL'
  | 'CONVERTED'
  | 'LOST'

export type RequirementType =
  | 'GeM Registration'
  | 'Tender Discovery'
  | 'Tender Eligibility Review'
  | 'Bid Documentation'
  | 'Tender Submission'
  | 'Reverse Auction'
  | 'eTender Portal Support'
  | 'Post-Award Support'
  | 'Other'

export interface Lead {
  id?: string
  name: string
  companyName: string
  mobile: string
  email?: string
  requirementType: RequirementType
  tenderNumber?: string
  businessCategory?: string
  location?: string
  message?: string
  source?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  status?: LeadStatus
  createdAt?: string
}

export interface TenderSubmission {
  id?: string
  name: string
  companyName: string
  mobile: string
  email?: string
  tenderNumber?: string
  tenderAuthority?: string
  tenderFile?: File | null
  tenderFileName?: string
  preferredContact?: 'phone' | 'whatsapp' | 'email'
  message?: string
  consent: boolean
  source?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  status?: LeadStatus
  createdAt?: string
}

export interface ContactRequest {
  id?: string
  name: string
  companyName?: string
  phone: string
  email?: string
  requirementType?: RequirementType
  tenderNumber?: string
  message?: string
  source?: string
  createdAt?: string
}

export const REQUIREMENT_TYPES: RequirementType[] = [
  'GeM Registration',
  'Tender Discovery',
  'Tender Eligibility Review',
  'Bid Documentation',
  'Tender Submission',
  'Reverse Auction',
  'eTender Portal Support',
  'Post-Award Support',
  'Other',
]
