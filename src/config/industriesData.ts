// ============================================================
// INDUSTRIES DATA
// Structured data for industry category cards.
// ============================================================

export interface IndustryItem {
  id: string
  title: string
  description: string
  icon: string // Lucide icon name
  keywords: string[] // for search/matching later
}

export const industriesData: IndustryItem[] = [
  {
    id: 'civil',
    title: 'Civil & Infrastructure',
    description:
      'Road construction, bridges, buildings, drainage, municipal works and related civil engineering projects.',
    icon: 'HardHat',
    keywords: ['civil', 'infrastructure', 'construction', 'road', 'bridge'],
  },
  {
    id: 'electrical',
    title: 'Electrical & Mechanical',
    description:
      'Electrical installations, substations, HVAC, mechanical equipment supply and maintenance contracts.',
    icon: 'Zap',
    keywords: ['electrical', 'mechanical', 'HVAC', 'substation', 'wiring'],
  },
  {
    id: 'it',
    title: 'IT & Software',
    description:
      'IT infrastructure, software development, networking, hardware supply and managed IT services.',
    icon: 'Monitor',
    keywords: ['IT', 'software', 'hardware', 'networking', 'technology'],
  },
  {
    id: 'medical',
    title: 'Medical & Healthcare',
    description:
      'Medical equipment supply, hospital consumables, medicines, diagnostics and healthcare services.',
    icon: 'HeartPulse',
    keywords: ['medical', 'healthcare', 'hospital', 'pharmaceutical', 'equipment'],
  },
  {
    id: 'security',
    title: 'Security Services',
    description:
      'Manpower-based security, CCTV, access control systems and integrated security solutions.',
    icon: 'Shield',
    keywords: ['security', 'guarding', 'CCTV', 'surveillance', 'manpower'],
  },
  {
    id: 'manpower',
    title: 'Manpower & Facility Management',
    description:
      'Housekeeping, staffing, facility management, cleaning services and support staff supply.',
    icon: 'Users',
    keywords: ['manpower', 'facility', 'housekeeping', 'staffing', 'cleaning'],
  },
  {
    id: 'equipment',
    title: 'Industrial Equipment',
    description:
      'Heavy machinery, industrial tools, plant equipment, generators and specialized equipment supply.',
    icon: 'Wrench',
    keywords: ['equipment', 'machinery', 'industrial', 'plant', 'tools'],
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    description:
      'Manufactured goods, components, assemblies and production-based supply contracts for government buyers.',
    icon: 'Factory',
    keywords: ['manufacturing', 'production', 'fabrication', 'assembly'],
  },
  {
    id: 'trading',
    title: 'Trading & Supply',
    description:
      'General trading, commodity supply, materials procurement and retail/wholesale supply to government.',
    icon: 'Package',
    keywords: ['trading', 'supply', 'materials', 'goods', 'procurement'],
  },
  {
    id: 'construction',
    title: 'Construction & Works',
    description:
      'Interior works, renovation, civil maintenance, painting, waterproofing and building works.',
    icon: 'Hammer',
    keywords: ['construction', 'renovation', 'interior', 'maintenance', 'works'],
  },
  {
    id: 'msme',
    title: 'Other MSMEs',
    description:
      'Small and medium enterprises across sectors not listed above — including niche products and services.',
    icon: 'Briefcase',
    keywords: ['MSME', 'small business', 'SME', 'startup', 'entrepreneur'],
  },
]
