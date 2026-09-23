import React, { createContext, useContext, useState, useEffect } from 'react'
import type { CMSContentState, AdminLead } from '@/types/content'
import { siteConfig } from '@/config/siteConfig'
import { servicesData } from '@/config/servicesData'
import { faqData } from '@/config/faqData'

const CMS_STORAGE_KEY = 'prayash_cms_content_v1'
const LEADS_STORAGE_KEY = 'prayash_admin_leads_v1'

export const defaultCMSContent: CMSContentState = {
  siteInfo: {
    companyName: siteConfig.companyName,
    tagline: 'Empowering Businesses to Win Government Tenders',
    phone: siteConfig.phone,
    phoneDisplay: siteConfig.phone,
    whatsapp: siteConfig.whatsappNumber || '919876543210',
    email: siteConfig.email,
    address: 'Plot No. 42, Barakhamba Road, Connaught Place, New Delhi 110001',
    hours: 'Mon – Sat: 9:30 AM – 6:30 PM',
  },
  hero: {
    badgeLabel: 'Government Procurement Desk',
    badgeSub: 'GeM · CPPP · State eTenders',
    headline: 'Win Government Tenders.',
    headlineAccent: 'Without The Bureaucracy.',
    subheadline: 'End-to-end tender bidding desk for Indian contractors, manufacturers, and MSMEs. We discover opportunities, verify eligibility, draft compliant documents, and ensure zero-rejection portal filing.',
    primaryCtaText: 'Get Free Tender Consultation',
    secondaryCtaText: 'Send Tender for Feasibility Review',
    metric1Number: '₹140+ Cr',
    metric1Label: 'Bid Volume Managed',
    metric2Number: '99.4%',
    metric2Label: 'Document Compliance Rate',
    metric3Number: '28+ States',
    metric3Label: 'Portals Actively Handled',
    tabs: [
      { id: 'gem', label: 'GeM Bid #894120', agency: 'Ministry of Defence (MES)', value: '₹4.20 Cr', readiness: 94 },
      { id: 'cppp', label: 'CPPP Tender #44192', agency: 'Indian Railways (CRIS)', value: '₹1.85 Cr', readiness: 88 },
      { id: 'state', label: 'State eTender #1082', agency: 'PWD Rajasthan', value: '₹6.50 Cr', readiness: 76 },
    ],
  },
  portals: [
    { name: 'GeM', full: 'Government e-Marketplace', category: 'Central Goods & Services', domain: 'gem.gov.in', url: 'https://gem.gov.in', color: '#0D9488', status: 'Direct API & Cataloging' },
    { name: 'CPPP', full: 'Central Public Procurement', category: 'Central Ministries & PSUs', domain: 'eprocure.gov.in', url: 'https://eprocure.gov.in/eprocure/app', color: '#0284C7', status: 'Daily Scrape & Bid Alerts' },
    { name: 'GePNIC', full: 'NIC e-Procurement Portal', category: 'National Informatics Centre', domain: 'gepnic.gov.in', url: 'https://gepnic.gov.in', color: '#4F46E5', status: 'DSC Token Support' },
    { name: 'MSTC', full: 'PSU e-Auctions & Tenders', category: 'Raw Materials & Scrap', domain: 'mstcecommerce.com', url: 'https://www.mstcecommerce.com', color: '#7E22CE', status: 'Reverse Auction Assistance' },
    { name: 'IREPS', full: 'Indian Railways E-Procurement', category: 'Rail Stores & Works', domain: 'ireps.gov.in', url: 'https://www.ireps.gov.in', color: '#0E7490', status: 'Vendor Approval Tracking' },
    { name: 'State eTenders', full: 'State Government Portals', category: '28+ States & UTs Nationwide', domain: 'etenders.gov.in', url: 'https://etenders.gov.in/eprocure/app', color: '#059669', status: 'Local Preference & PWD' },
    { name: 'PSU Portals', full: 'Direct CPSE Desks', category: 'ONGC, BHEL, NTPC, IOCL', domain: 'cpse-tenders.in', url: 'https://eprocure.gov.in/cppp/', color: '#B45309', status: 'Turnkey BOQ Costing' },
  ],
  trustBar: [
    { title: '18+ Years Govt Experience', desc: 'Advised by an ex-tender drafting & approval committee insider with 18+ years dealing only in government tenders.', color: '#0D9488' },
    { title: 'Insider Scoring & Rules', desc: 'We know internal evaluation benchmarks, hidden rejection triggers, and winning compliance rules inside and out.', color: '#6366F1' },
    { title: 'Higher Win Probability', desc: 'Pre-bid scrutiny ensures your BOQ, affidavits, and technical filings are scored at the highest possible rank.', color: '#8B5CF6' },
    { title: 'Multi-Portal Mastery', desc: 'End-to-end support across GeM 4.0, CPPP, IREPS, GePNIC, and 28+ State eTender portals.', color: '#0891B2' },
    { title: 'Direct Expert Access', desc: 'Speak directly with our chief government tender consultant when you need critical bid-winning strategy.', color: '#10B981' },
  ],
  problemItems: [
    { pain: 'Navigating dozens of state & central eTender portals with different logins', fix: 'Single point of contact managing GeM, CPPP, IREPS, and state portals' },
    { pain: 'Technical disqualification due to missing clauses or non-standard affidavits', fix: 'Comprehensive document audit against tender-specific qualification criteria' },
    { pain: 'Scrambling for corrigendum amendments and deadline extensions at the last hour', fix: 'Systematic deadline tracking and instant notification on published amendments' },
    { pain: 'Uncertainty around MSME turnover exemptions and EMD security rules', fix: 'Clear eligibility mapping ensuring maximum statutory exemptions (EMD/turnover)' },
    { pain: 'High cost of hiring, training, and retaining an in-house government tender team', fix: 'On-demand tender desk ready to prepare bids whenever relevant tenders publish' },
  ],
  services: servicesData.map(s => ({
    id: s.id,
    title: s.title,
    subtitle: s.subtitle,
    icon: s.icon,
    points: [...s.points],
    cta: s.cta || 'Learn More',
  })),
  workflowStages: [
    { id: 'onboard', step: '01', label: 'ONBOARD', title: 'Portal Enrollment & DSC', desc: 'Class 3 DSC token configuration, primary GeM seller authorization, and multi-portal credentials setup.', deliverable: 'Verified Portal Profiles & Cryptographic Setup', sla: 'Day 1 — 24h Setup', color: '#0D9488' },
    { id: 'discover', step: '02', label: 'DISCOVER', title: 'Opportunity Intelligence', desc: 'Automated scraping and manual scrutiny across GeM, CPPP & state portals matching your exact eligibility.', deliverable: 'Daily Filtered Bid Tracker & MSME Exemption Alerts', sla: 'Real-time Daily Scans', color: '#0284C7' },
    { id: 'assess', step: '03', label: 'ASSESS', title: 'Eligibility & Feasibility', desc: 'Deep audit of turnover limits, prior experience criteria, BOQ scope, and joint-venture clauses.', deliverable: 'Formal Go / No-Go Risk Assessment Matrix', sla: 'Within 12h of Notice', color: '#6366F1' },
    { id: 'prepare', step: '04', label: 'PREPARE', title: 'Bid Engineering & BOQ', desc: 'Drafting clause-by-clause compliance, technical annexures, EMD / Bank Guarantee draft, and price sheet.', deliverable: 'Flawless Pre-Submission Technical Binder', sla: 'Dual-Expert Peer Review', color: '#EC4899' },
    { id: 'submit', step: '05', label: 'SUBMIT', title: 'Digital Cryptographic Filing', desc: 'Final document encryption, DSC digital signing, and upload verification well ahead of the deadline.', deliverable: 'Official Portal Acknowledgement & Timestamp Slip', sla: '6h Before Portal Cutoff', color: '#F59E0B' },
    { id: 'track', step: '06', label: 'TRACK', title: 'Opening & Award Defense', desc: 'Monitoring technical bid opening, counter-representations for queries, and reverse auction bidding support.', deliverable: 'Award Tracking & Commercial Scrutiny Report', sla: 'Until Final Allocation', color: '#10B981' },
  ],
  whyUsItems: [
    { title: '18-Year Ex-Govt Tender Drafter on Your Side', desc: 'Our lead consultant worked inside government organizations and PSUs that draft, evaluate, and approve tenders. Knowing the process from the inside gives your bid an undeniable edge.', color: '#0D9488' },
    { title: 'Pre-Bid Eligibility Auditing', desc: 'Before investing weeks in bid prep, we verify your turnover, past work orders, and technical specs against the tender qualification sheet.', color: '#0891B2' },
    { title: 'Multi-Portal Desk Operations', desc: 'Deep familiarity with GeM 4.0, CPPP (eProcure), IREPS, GePNIC, and state eTender portals. Zero confusion over conflicting portal parameters.', color: '#6366F1' },
    { title: 'Error-Free Technical Bids', desc: 'Every affidavit, solvency certificate, compliance sheet, and BoQ matrix is cross-checked against statutory criteria to prevent disqualification.', color: '#8B5CF6' },
    { title: 'Corrigendum & Extension Tracking', desc: 'Government tenders frequently issue crucial amendments. Our desk monitors daily updates so your bid reflects the latest requirements.', color: '#F59E0B' },
    { title: 'Zero-Credential Risk Policy', desc: 'We never ask for or store your portal passwords, DSC private keys, or PINs. All authorization and OTP signing remain in your hands.', color: '#10B981' },
  ],
  faqs: faqData.map(f => ({
    id: f.id,
    question: f.question,
    answer: f.answer,
  })),
  finalCta: {
    badge: 'Get Started Today',
    headline: 'Have a tender in mind?',
    subheadline: 'Share the tender details with our desk and understand exactly what it takes to qualify and submit. No complicated jargon — just actionable guidance.',
    primaryButtonText: 'Send Your Tender for Review',
    whatsappButtonText: 'WhatsApp a Consultant Now',
  },
}

interface ContentContextType {
  content: CMSContentState
  updateSection: <K extends keyof CMSContentState>(section: K, data: Partial<CMSContentState[K]> | CMSContentState[K]) => void
  resetSection: (section: keyof CMSContentState) => void
  resetAll: () => void
  exportBackup: () => void
  importBackup: (jsonString: string) => { success: boolean; error?: string }
  leads: AdminLead[]
  updateLeadStatus: (id: string, status: AdminLead['status']) => void
  deleteLead: (id: string) => void
  clearAllLeads: () => void
  exportLeadsCSV: () => void
  hasCustomChanges: boolean
}

const ContentContext = createContext<ContentContextType | undefined>(undefined)

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<CMSContentState>(defaultCMSContent)
  const [leads, setLeads] = useState<AdminLead[]>([])
  const [hasCustomChanges, setHasCustomChanges] = useState<boolean>(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CMS_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setContent(prev => ({
          ...prev,
          ...parsed,
          siteInfo: { ...prev.siteInfo, ...(parsed.siteInfo || {}) },
          hero: { ...prev.hero, ...(parsed.hero || {}) },
          finalCta: { ...prev.finalCta, ...(parsed.finalCta || {}) },
        }))
        setHasCustomChanges(true)
      }
    } catch (e) {
      console.error('Failed to load CMS content from storage:', e)
    }

    try {
      const storedLeads = localStorage.getItem(LEADS_STORAGE_KEY)
      if (storedLeads) {
        setLeads(JSON.parse(storedLeads))
      } else {
        const initialLeads: AdminLead[] = []
        const rawTenders = localStorage.getItem('prayash_tenders')
        if (rawTenders) {
          const items = JSON.parse(rawTenders)
          items.forEach((it: { data: Record<string, unknown>; savedAt: string }, idx: number) => {
            initialLeads.push({
              id: `tender-${idx}-${Date.now()}`,
              type: 'tender_submission',
              name: String(it.data.name || 'Anonymous'),
              companyName: String(it.data.companyName || ''),
              mobile: String(it.data.mobile || ''),
              email: String(it.data.email || ''),
              tenderNumber: String(it.data.tenderNumber || ''),
              tenderAuthority: String(it.data.tenderAuthority || ''),
              message: String(it.data.message || ''),
              status: 'new',
              createdAt: it.savedAt || new Date().toISOString(),
            })
          })
        }
        if (initialLeads.length > 0) {
          setLeads(initialLeads)
          localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(initialLeads))
        }
      }
    } catch (e) {
      console.error('Failed to load leads from storage:', e)
    }
  }, [])

  const saveContent = (newContent: CMSContentState) => {
    setContent(newContent)
    setHasCustomChanges(true)
    try {
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(newContent))
    } catch (e) {
      console.error('Failed to persist CMS content:', e)
    }
  }

  const updateSection = <K extends keyof CMSContentState>(
    section: K,
    data: Partial<CMSContentState[K]> | CMSContentState[K]
  ) => {
    setContent(prev => {
      const updated = {
        ...prev,
        [section]: Array.isArray(prev[section])
          ? data
          : { ...(prev[section] as object), ...(data as object) },
      }
      saveContent(updated)
      return updated
    })
  }

  const resetSection = (section: keyof CMSContentState) => {
    setContent(prev => {
      const updated = {
        ...prev,
        [section]: defaultCMSContent[section],
      }
      saveContent(updated)
      return updated
    })
  }

  const resetAll = () => {
    setContent(defaultCMSContent)
    setHasCustomChanges(false)
    localStorage.removeItem(CMS_STORAGE_KEY)
  }

  const exportBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(content, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', dataStr)
    downloadAnchor.setAttribute('download', `prayash-cms-backup-${new Date().toISOString().split('T')[0]}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  const importBackup = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString)
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        return { success: false, error: 'Invalid JSON configuration format.' }
      }

      const validKeys: (keyof CMSContentState)[] = [
        'siteInfo', 'hero', 'portals', 'trustBar', 'problemItems',
        'services', 'workflowStages', 'whyUsItems', 'faqs', 'finalCta'
      ]

      // Verify at least some core keys match expected CMS state
      const matchingKeys = validKeys.filter(k => k in parsed)
      if (matchingKeys.length === 0) {
        return { success: false, error: 'Backup does not contain valid CMS configuration data.' }
      }

      // Build sanitized content object with only whitelisted keys
      const sanitized = { ...defaultCMSContent }
      for (const key of validKeys) {
        if (key in parsed && parsed[key] !== null && typeof parsed[key] === typeof defaultCMSContent[key]) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(sanitized as any)[key] = parsed[key]
        }
      }

      saveContent(sanitized)
      return { success: true }
    } catch {
      return { success: false, error: 'Corrupt or unreadable JSON file.' }
    }
  }

  const updateLeadStatus = (id: string, status: AdminLead['status']) => {
    setLeads(prev => {
      const updated = prev.map(lead => (lead.id === id ? { ...lead, status } : lead))
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }

  const deleteLead = (id: string) => {
    setLeads(prev => {
      const updated = prev.filter(lead => lead.id !== id)
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }

  const clearAllLeads = () => {
    setLeads([])
    localStorage.removeItem(LEADS_STORAGE_KEY)
  }

  const exportLeadsCSV = () => {
    if (leads.length === 0) return
    const headers = ['ID', 'Date', 'Type', 'Name', 'Company', 'Mobile', 'Email', 'Tender No', 'Authority', 'Status', 'Message']
    const rows = leads.map(l => [
      l.id,
      new Date(l.createdAt).toLocaleDateString('en-IN'),
      l.type,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.companyName || '').replace(/"/g, '""')}"`,
      `"${l.mobile || ''}"`,
      `"${l.email || ''}"`,
      `"${l.tenderNumber || ''}"`,
      `"${l.tenderAuthority || ''}"`,
      l.status,
      `"${(l.message || '').replace(/"/g, '""')}"`,
    ])
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `prayash-leads-${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  return (
    <ContentContext.Provider
      value={{
        content,
        updateSection,
        resetSection,
        resetAll,
        exportBackup,
        importBackup,
        leads,
        updateLeadStatus,
        deleteLead,
        clearAllLeads,
        exportLeadsCSV,
        hasCustomChanges,
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const context = useContext(ContentContext)
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider')
  }
  return context
}
