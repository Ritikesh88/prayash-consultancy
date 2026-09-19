export interface SiteInfoContent {
  companyName: string
  tagline: string
  phone: string
  phoneDisplay: string
  whatsapp: string
  email: string
  address: string
  hours: string
}

export interface TenderTabItem {
  id: string
  label: string
  agency: string
  value: string
  readiness: number
}

export interface HeroContent {
  badgeLabel: string
  badgeSub: string
  headline: string
  headlineAccent: string
  subheadline: string
  primaryCtaText: string
  secondaryCtaText: string
  metric1Number: string
  metric1Label: string
  metric2Number: string
  metric2Label: string
  metric3Number: string
  metric3Label: string
  tabs: TenderTabItem[]
}

export interface PortalItem {
  name: string
  full: string
  category: string
  domain: string
  color: string
  status: string
  url?: string
}

export interface TrustBarItem {
  title: string
  desc: string
  color: string
}

export interface ProblemItem {
  pain: string
  fix: string
}

export interface ServiceItemContent {
  id: string
  title: string
  subtitle: string
  icon: string
  points: string[]
  cta?: string
}

export interface WorkflowStageContent {
  id: string
  step: string
  label: string
  title: string
  desc: string
  deliverable: string
  sla: string
  color: string
}

export interface WhyUsItem {
  title: string
  desc: string
  color: string
}

export interface FAQItemContent {
  id: string
  question: string
  answer: string
  category?: string
}

export interface FinalCTAContent {
  badge: string
  headline: string
  subheadline: string
  primaryButtonText: string
  whatsappButtonText: string
}

export interface CMSContentState {
  siteInfo: SiteInfoContent
  hero: HeroContent
  portals: PortalItem[]
  trustBar: TrustBarItem[]
  problemItems: ProblemItem[]
  services: ServiceItemContent[]
  workflowStages: WorkflowStageContent[]
  whyUsItems: WhyUsItem[]
  faqs: FAQItemContent[]
  finalCta: FinalCTAContent
}

export interface AdminLead {
  id: string
  type: 'tender_submission' | 'contact_request' | 'quick_callback'
  name: string
  companyName?: string
  mobile: string
  email?: string
  tenderNumber?: string
  tenderAuthority?: string
  message?: string
  fileName?: string
  status: 'new' | 'in_review' | 'contacted' | 'closed'
  createdAt: string
  notes?: string
}
