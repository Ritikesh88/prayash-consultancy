import { Helmet } from 'react-helmet-async'
import { siteConfig } from '@/config/siteConfig'
import Hero from '@/components/sections/Hero'
import TrustBar from '@/components/sections/TrustBar'
import PortalTrustSection from '@/components/sections/PortalTrustSection'
import LogoMarquee from '@/components/sections/LogoMarquee'
import ProblemSection from '@/components/sections/ProblemSection'
import ServiceGrid from '@/components/sections/ServiceGrid'
import SendTenderSection from '@/components/sections/SendTenderSection'
import HowItWorks from '@/components/sections/HowItWorks'
import IndustriesSection from '@/components/sections/IndustriesSection'
import BidReadiness from '@/components/sections/BidReadiness'
import WhyUs from '@/components/sections/WhyUs'
import TenderWorkflow from '@/components/sections/TenderWorkflow'
import FAQSection from '@/components/sections/FAQSection'
import FinalCTA from '@/components/sections/FinalCTA'

const pageTitle = `Government Tender Consultancy & GeM Support | ${siteConfig.companyName}`
const pageDesc =
  'Practical assistance with government tenders — from GeM registration and tender discovery to eligibility checks, bid documentation and submission support. Talk to a tender expert today.'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteConfig.siteUrl} />
        <link rel="canonical" href={siteConfig.siteUrl} />
      </Helmet>

      {/* Extra bottom padding on mobile for the sticky contact bar */}
      <main className="pb-[60px] lg:pb-0">
        <Hero />
        <PortalTrustSection />
        <TrustBar />
        <LogoMarquee />
        <ProblemSection />
        <div className="section-divider" />
        <ServiceGrid />
        <SendTenderSection />
        <HowItWorks />
        <div className="section-divider" />
        <IndustriesSection />
        <BidReadiness />
        <WhyUs />
        <TenderWorkflow />
        <FAQSection />
        <FinalCTA />
      </main>
    </>
  )
}
