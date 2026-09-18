// ============================================================
// FAQ DATA
// Structured FAQ data — used for accordion + JSON-LD schema.
// ============================================================

export interface FAQItem {
  id: string
  question: string
  answer: string
}

export const faqData: FAQItem[] = [
  {
    id: 'tender-types',
    question: 'What types of government tenders do you support?',
    answer:
      'We support participation across various government procurement formats — including GeM (Government e-Marketplace) orders, open tenders, limited tenders, two-bid system tenders and rate contracts across central government, state government, PSUs and autonomous bodies. If you are unsure whether your category is covered, send us a tender or contact us to discuss.',
  },
  {
    id: 'gem-registration',
    question: 'Do you help with GeM registration?',
    answer:
      'Yes. GeM seller registration is one of the onboarding services we provide. We assist with the registration process, profile setup, product and service listing, and guidance on completing your GeM profile correctly. GeM is one of several platforms we support — we also assist with eTender portals and state procurement platforms.',
  },
  {
    id: 'first-time',
    question: 'Can you help if I have never participated in a government tender?',
    answer:
      'Absolutely. Many of the contractors and businesses we work with are participating in government tenders for the first time. We start from the basics — understanding your business, which platforms are relevant, what registrations you need, and what the process looks like. There is no assumption of prior experience.',
  },
  {
    id: 'review-before-bid',
    question: 'Can you review a tender before I bid?',
    answer:
      'Yes. You can send us a tender document or bid number and we will review the basic requirements — eligibility criteria, required documents, submission timeline and other key conditions. This helps you understand whether the tender is suitable and what you would need to prepare. Use the "Send Your Tender" form on this website to share a tender with us.',
  },
  {
    id: 'documents-needed',
    question: 'What documents do I normally need for a government tender?',
    answer:
      'The required documents vary by tender. Commonly required documents include: Certificate of Incorporation / firm registration, PAN card, GST registration, MSME/Udyam certificate (where applicable), audited financial statements, bank solvency certificate, experience certificates / work orders from past projects, ISO or other certifications (if specified), and any other documents specified in the tender. We help you map the exact documents required for each specific tender you are pursuing.',
  },
  {
    id: 'technical-bid',
    question: 'Can you help with technical bid preparation?',
    answer:
      'Yes. Technical bid preparation — including document compilation, annexures, declarations, compliance statements and format adherence — is part of our bid documentation service. We work with you to understand the technical bid requirements of each specific tender and assist in putting the documents together correctly.',
  },
  {
    id: 'state-portals',
    question: 'Do you support state eTender portals?',
    answer:
      'Yes. Many government tenders are published on state-level eTender portals rather than central government platforms. We provide support across major state eTender portals in addition to central platforms like CPPP (Central Public Procurement Portal) and GeM. If you have a specific state portal in mind, contact us to discuss.',
  },
  {
    id: 'reverse-auction',
    question: 'Do you help with reverse auctions?',
    answer:
      'We provide guidance on reverse auction processes where they are part of a tender you are participating in. A reverse auction is a price-competition stage that follows the technical evaluation in some tenders. We help you understand the process, timing and how to participate effectively. We do not control or guarantee auction outcomes.',
  },
  {
    id: 'send-tender',
    question: 'How do I send you a tender for review?',
    answer:
      'Use the "Send Your Tender" form on this website. You can provide the tender or bid number, the issuing authority, and upload the tender document (PDF, DOCX, XLSX). Our team will review the submission and contact you to discuss the requirements and next steps. You can also WhatsApp us directly with the tender details.',
  },
  {
    id: 'consultation-process',
    question: 'How does the consultation process work?',
    answer:
      'The process starts when you share your requirement — either through the contact form, the tender submission form, or directly on WhatsApp. Our team reviews your requirement, understands your business profile and the specific tender or category you are interested in. We then map out what is needed — documents, eligibility, timeline — and work with you from there. The process is practical and step-by-step.',
  },
  {
    id: 'guarantee',
    question: 'Do you guarantee that my bid will win?',
    answer:
      'No. No honest consultant can guarantee government tender outcomes — bid evaluation is a government process governed by published criteria, and the final decision rests with the procuring authority. What we do is help ensure that your bid is properly prepared, complete, compliant and submitted correctly. A well-prepared bid gives your business a realistic opportunity to compete on merit.',
  },
  {
    id: 'password-security',
    question: 'Do you store my government portal password?',
    answer:
      'No. We follow secure practices and do not request or store government portal passwords, DSC private keys or related credentials. Portal authentication is the responsibility of the authorised user — i.e., you or your designated team member. Any portal work we assist with is coordinated with you directly, not through credential sharing. We treat the security of your portal access as a serious concern.',
  },
]
