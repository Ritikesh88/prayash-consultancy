import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  ShieldCheck, LayoutDashboard, Globe, Zap, Layers, HelpCircle,
  Megaphone, PhoneCall, LogOut, Download, Upload, RotateCcw,
  ExternalLink, Inbox, CheckCircle2, Lock, Menu, X, Sparkles
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useContent } from '@/context/ContentContext'

// Sub-editors
import GeneralSettingsEditor from '@/components/admin/GeneralSettingsEditor'
import HeroSectionEditor from '@/components/admin/HeroSectionEditor'
import WorkflowSectionEditor from '@/components/admin/WorkflowSectionEditor'
import PortalsEditor from '@/components/admin/PortalsEditor'
import ServicesEditor from '@/components/admin/ServicesEditor'
import ProblemSectionEditor from '@/components/admin/ProblemSectionEditor'
import WhyUsEditor from '@/components/admin/WhyUsEditor'
import FAQEditor from '@/components/admin/FAQEditor'
import FinalCTAEditor from '@/components/admin/FinalCTAEditor'
import LeadsInbox from '@/components/admin/LeadsInbox'

type AdminTab =
  | 'leads'
  | 'general'
  | 'hero'
  | 'portals'
  | 'workflow'
  | 'services'
  | 'problem'
  | 'whyus'
  | 'faqs'
  | 'cta'
  | 'security'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>('leads')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string>('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [pwdMsg, setPwdMsg] = useState<{ text: string; error: boolean } | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const { adminEmail, logout, changePassword } = useAuth()
  const { leads, exportBackup, importBackup, resetAll, hasCustomChanges } = useContent()

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    setPwdMsg(null)
    const res = changePassword(oldPassword, newPassword)
    if (res.success) {
      setPwdMsg({ text: 'Admin password updated successfully.', error: false })
      setOldPassword('')
      setNewPassword('')
    } else {
      setPwdMsg({ text: res.error || 'Failed to update password.', error: true })
    }
  }

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      const res = importBackup(content)
      if (res.success) {
        setStatusMessage('Website configuration successfully imported!')
        setTimeout(() => setStatusMessage(''), 3000)
      } else {
        alert(res.error || 'Failed to import backup JSON.')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const navItems: { id: AdminTab; label: string; icon: typeof LayoutDashboard; badge?: number }[] = [
    { id: 'leads', label: 'Client Inquiries', icon: Inbox, badge: leads.filter(l => l.status === 'new').length },
    { id: 'general', label: 'Business & Contact', icon: PhoneCall },
    { id: 'hero', label: 'Hero & Console', icon: LayoutDashboard },
    { id: 'portals', label: 'Supported Portals', icon: Globe },
    { id: 'workflow', label: 'Tender Journey Pipeline', icon: Zap },
    { id: 'services', label: 'Core Services', icon: Layers },
    { id: 'problem', label: 'Pain vs Precision', icon: Sparkles },
    { id: 'whyus', label: 'Why Us (6 Pillars)', icon: ShieldCheck },
    { id: 'faqs', label: 'FAQ Knowledge Base', icon: HelpCircle },
    { id: 'cta', label: 'Final Call To Action', icon: Megaphone },
    { id: 'security', label: 'Admin Security', icon: Lock },
  ]

  return (
    <>
      <Helmet>
        <title>Desk Admin CMS | Prayash Consultancy</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-base)' }}>
        {/* Top Management Bar */}
        <header
          className="h-16 border-b flex items-center justify-between px-4 sm:px-6 sticky top-0 z-40 backdrop-blur-md"
          style={{ backgroundColor: 'var(--header-bg)', borderColor: 'var(--border)' }}
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg border cursor-pointer"
              style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold"
                style={{ background: 'var(--accent)' }}
              >
                <ShieldCheck size={18} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm" style={{ color: 'var(--text-primary)' }}>
                    Prayash Admin CMS
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-teal-500/10 text-teal-600 border border-teal-500/30">
                    Live Sync
                  </span>
                </div>
                <span className="text-[10px] hidden sm:inline" style={{ color: 'var(--text-muted)' }}>
                  {adminEmail}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {hasCustomChanges && (
              <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <CheckCircle2 size={12} /> Custom Content Active
              </span>
            )}

            {/* Quick Live Preview */}
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            >
              <ExternalLink size={13} />
              <span className="hidden sm:inline">View Website</span>
            </Link>

            {/* Export Backup */}
            <button
              type="button"
              onClick={exportBackup}
              className="px-2.5 py-1.5 rounded-xl border text-xs font-semibold hidden sm:flex items-center gap-1.5 transition-colors cursor-pointer"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
              title="Download entire CMS configuration as JSON"
            >
              <Download size={13} />
              <span>Backup</span>
            </button>

            {/* Import Backup */}
            <input
              type="file"
              ref={fileInputRef}
              accept=".json"
              onChange={handleFileImport}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1.5 rounded-xl border text-xs font-semibold hidden sm:flex items-center gap-1.5 transition-colors cursor-pointer"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
              title="Restore CMS configuration from JSON file"
            >
              <Upload size={13} />
              <span>Restore</span>
            </button>

            {/* Reset All */}
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Reset ALL website sections back to factory defaults?')) {
                  resetAll()
                }
              }}
              className="p-2 rounded-xl border text-xs font-semibold text-amber-500 hover:text-amber-600 transition-colors cursor-pointer"
              title="Reset all content to defaults"
            >
              <RotateCcw size={14} />
            </button>

            {/* Logout */}
            <button
              type="button"
              onClick={logout}
              className="px-3 py-1.5 rounded-xl border text-xs font-semibold text-red-500 hover:bg-red-500/10 flex items-center gap-1.5 transition-colors cursor-pointer"
              style={{ borderColor: 'rgba(239,68,68,0.3)' }}
              title="Sign out of admin"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {statusMessage && (
          <div className="bg-emerald-500 text-white text-xs font-bold py-2 px-4 text-center">
            {statusMessage}
          </div>
        )}

        {/* Dashboard Shell */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar */}
          <aside
            className={`w-64 border-r flex flex-col p-4 flex-shrink-0 transition-all duration-200 z-30 ${
              mobileMenuOpen
                ? 'fixed inset-y-0 left-0 top-16 bg-[var(--bg-surface)] shadow-2xl block'
                : 'hidden lg:flex'
            }`}
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border)',
            }}
          >
            <div className="text-[10px] font-bold uppercase tracking-wider mb-3 px-3" style={{ color: 'var(--text-muted)' }}>
              Content Management
            </div>

            <nav className="space-y-1 flex-1 overflow-y-auto">
              {navItems.map(item => {
                const Icon = item.icon
                const isActive = activeTab === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(item.id)
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive ? 'shadow-xs' : 'hover:opacity-80'
                    }`}
                    style={{
                      backgroundColor: isActive ? 'var(--accent)' : 'transparent',
                      color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon size={16} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span
                        className="px-1.5 py-0.2 rounded-full text-[10px] font-bold"
                        style={{
                          backgroundColor: isActive ? '#FFFFFF' : 'var(--accent)',
                          color: isActive ? 'var(--accent)' : '#FFFFFF',
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                )
              })}
            </nav>

            <div className="pt-4 border-t mt-auto text-[11px] text-center" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
              Prayash Desk CMS v1.2
            </div>
          </aside>

          {/* Main Content View */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10">
            <div className="max-w-5xl mx-auto">
              {activeTab === 'leads' && <LeadsInbox />}
              {activeTab === 'general' && <GeneralSettingsEditor />}
              {activeTab === 'hero' && <HeroSectionEditor />}
              {activeTab === 'portals' && <PortalsEditor />}
              {activeTab === 'workflow' && <WorkflowSectionEditor />}
              {activeTab === 'services' && <ServicesEditor />}
              {activeTab === 'problem' && <ProblemSectionEditor />}
              {activeTab === 'whyus' && <WhyUsEditor />}
              {activeTab === 'faqs' && <FAQEditor />}
              {activeTab === 'cta' && <FinalCTAEditor />}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="max-w-md space-y-6">
                  <div className="pb-5 border-b" style={{ borderColor: 'var(--border)' }}>
                    <h2 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                      Staff Security & Password
                    </h2>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                      Update the administrator access credentials for the tender desk CMS.
                    </p>
                  </div>

                  {pwdMsg && (
                    <div
                      className="p-3 rounded-xl border text-xs"
                      style={{
                        backgroundColor: pwdMsg.error ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
                        borderColor: pwdMsg.error ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)',
                        color: pwdMsg.error ? '#EF4444' : '#10B981',
                      }}
                    >
                      {pwdMsg.text}
                    </div>
                  )}

                  <form onSubmit={handlePasswordChange} className="p-6 rounded-2xl border space-y-4" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                        Current Password
                      </label>
                      <input
                        type="password"
                        required
                        value={oldPassword}
                        onChange={e => setOldPassword(e.target.value)}
                        placeholder="Enter current password"
                        className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                        style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                        New Password (min 10 characters, letters & numbers)
                      </label>
                      <input
                        type="password"
                        required
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        placeholder="Enter new strong password"
                        className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                        style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl font-bold text-xs text-white transition-all shadow-md cursor-pointer"
                      style={{ background: 'var(--accent)' }}
                    >
                      Update Password
                    </button>
                  </form>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
