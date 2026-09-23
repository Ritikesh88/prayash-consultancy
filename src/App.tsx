import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { useEffect } from 'react'
import { ThemeProvider } from '@/context/ThemeContext'
import { AuthProvider } from '@/context/AuthContext'
import { ContentProvider } from '@/context/ContentContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp'
import MobileContactBar from '@/components/ui/MobileContactBar'
import TenderTicker from '@/components/ui/TenderTicker'
import AdminGuard from '@/components/admin/AdminGuard'
import { siteConfig } from '@/config/siteConfig'

// Eagerly load the Home page (critical path)
import Home from '@/pages/Home'

// Lazy-load secondary pages for code splitting
const Services       = lazy(() => import('@/pages/Services'))
const HowItWorksPage = lazy(() => import('@/pages/HowItWorksPage'))
const Industries     = lazy(() => import('@/pages/Industries'))
const About          = lazy(() => import('@/pages/About'))
const FAQPage        = lazy(() => import('@/pages/FAQPage'))
const Contact        = lazy(() => import('@/pages/Contact'))
const SendTender     = lazy(() => import('@/pages/SendTender'))
const PrivacyPolicy  = lazy(() => import('@/pages/PrivacyPolicy'))
const TermsConditions = lazy(() => import('@/pages/TermsConditions'))
const ClientLogin    = lazy(() => import('@/pages/ClientLogin'))
const NotFound       = lazy(() => import('@/pages/NotFound'))

// Admin CMS Pages
const AdminLogin     = lazy(() => import('@/pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'))

// Organization JSON-LD schema
const orgSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: siteConfig.companyName,
  description: siteConfig.description,
  url: siteConfig.siteUrl,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: { '@type': 'PostalAddress', addressLocality: 'New Delhi', addressCountry: 'IN' },
  areaServed: 'IN',
  serviceType: 'Government Tender Consultancy',
})

function PageLoader() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'var(--bg-base)' }}
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }}
        />
        <p className="text-xs" style={{ color: 'var(--text-faint)' }}>Loading…</p>
      </div>
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function AppLayout() {
  const { pathname } = useLocation()
  const isAdminRoute = pathname.startsWith('/admin')

  if (isAdminRoute) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-base)' }}>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <AdminGuard>
                  <AdminDashboard />
                </AdminGuard>
              }
            />
          </Routes>
        </Suspense>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-base)' }}>
      <Helmet>
        <script type="application/ld+json">{orgSchema}</script>
      </Helmet>

      <ScrollToTop />

      {/* ── Fixed top bar: Header stacked above TenderTicker ── */}
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
        <Header />
        <TenderTicker />
      </div>

      <div className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/"              element={<Home />} />
            <Route path="/services"      element={<Services />} />
            <Route path="/how-it-works"  element={<HowItWorksPage />} />
            <Route path="/industries"    element={<Industries />} />
            <Route path="/about"         element={<About />} />
            <Route path="/faqs"          element={<FAQPage />} />
            <Route path="/contact"       element={<Contact />} />
            <Route path="/send-tender"   element={<SendTender />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms"         element={<TermsConditions />} />
            <Route path="/client-login"  element={<ClientLogin />} />
            <Route path="*"              element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>

      <Footer />
      <FloatingWhatsApp />
      <MobileContactBar />
    </div>
  )
}

function ThemedApp() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ContentProvider>
          <BrowserRouter>
            <AppLayout />
          </BrowserRouter>
        </ContentProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <ThemedApp />
    </HelmetProvider>
  )
}
