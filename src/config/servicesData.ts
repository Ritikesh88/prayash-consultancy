// ============================================================
// SERVICES DATA
// Structured data for all 6 service cards.
// Update here — no need to touch component JSX.
// ============================================================

export interface ServiceItem {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  points: string[]
  cta: string
  icon: string // Lucide icon name
}

export const servicesData: ServiceItem[] = [
  {
    id: 'onboarding',
    slug: 'portal-onboarding',
    title: 'Business & Portal Onboarding',
    subtitle: 'Get set up on the right platforms',
    description:
      'Before you can participate in government tenders, your business profile must be properly established on the relevant procurement platforms. We assist with the setup process across major portals.',
    points: [
      'GeM (Government e-Marketplace) registration',
      'eTender portal registration and setup',
      'State government procurement portals',
      'PSU and central government portals',
      'Business profile setup and completion',
      'DSC-related guidance and usage',
    ],
    cta: 'Explore Onboarding',
    icon: 'Building2',
  },
  {
    id: 'discovery',
    slug: 'tender-discovery',
    title: 'Tender Discovery',
    subtitle: 'Find the right opportunities',
    description:
      'With thousands of tenders published across multiple portals, identifying the right opportunities for your business requires structured search and shortlisting. We help you focus on tenders that match your profile.',
    points: [
      'Tender identification across portals',
      'Category and product code matching',
      'Location-based tender opportunities',
      'Tender shortlisting based on your profile',
      'Deadline and timeline tracking',
      'Corrigendum and amendment monitoring',
    ],
    cta: 'Find Opportunities',
    icon: 'Search',
  },
  {
    id: 'eligibility',
    slug: 'eligibility-assessment',
    title: 'Eligibility Assessment',
    subtitle: 'Know before you bid',
    description:
      'Not every tender is right for every business. Before investing time in documentation, it is important to understand whether your company meets the basic eligibility conditions specified in the tender.',
    points: [
      'Annual turnover requirements',
      'Similar work / experience criteria',
      'Technical qualifications and certifications',
      'Registration and licence requirements',
      'EMD and bid security requirements',
      'MSME, Startup and other category conditions',
    ],
    cta: 'Check a Tender',
    icon: 'ClipboardCheck',
  },
  {
    id: 'documentation',
    slug: 'bid-documentation',
    title: 'Bid Documentation',
    subtitle: 'Prepare the right documents',
    description:
      'Government tenders require careful documentation — technical bid, financial bid, annexures, declarations and supporting certificates. We assist with organising and preparing the required documents.',
    points: [
      'Technical bid document preparation',
      'Annexures, declarations and formats',
      'Experience and credential documentation',
      'Financial document compilation',
      'Compliance checklist preparation',
      'BOQ-related document support',
    ],
    cta: 'Prepare My Bid',
    icon: 'FileText',
  },
  {
    id: 'submission',
    slug: 'submission-support',
    title: 'Submission Support',
    subtitle: 'Be ready when it matters',
    description:
      'The submission stage is where many bids fail — due to incomplete documents, incorrect portal workflow, or missed deadlines. We provide support to ensure your bid is submitted correctly and on time.',
    points: [
      'Final document review and checklist',
      'Submission readiness verification',
      'Portal upload and workflow guidance',
      'Corrigendum and amendment tracking',
      'Pre-bid meeting and query support',
      'Reverse auction guidance where applicable',
    ],
    cta: 'Prepare for Submission',
    icon: 'Send',
  },
  {
    id: 'post-award',
    slug: 'post-award-support',
    title: 'Post-Award Support',
    subtitle: 'From award to delivery',
    description:
      'Winning a tender is only the beginning. There are important documentation and communication requirements after receiving a Letter of Award or Purchase Order. We assist with post-award formalities.',
    points: [
      'LOA and Purchase Order documentation',
      'Contract-related document preparation',
      'Order acceptance and acknowledgement',
      'Invoice and delivery document support',
      'Performance security document guidance',
      'Future tender planning based on experience',
    ],
    cta: 'Explore Post-Award Support',
    icon: 'Award',
  },
]
