import { useState } from 'react'
import {
  Inbox, Search, Download, Trash2, Phone,
  Mail, FileText, AlertCircle
} from 'lucide-react'
import { useContent } from '@/context/ContentContext'
import type { AdminLead } from '@/types/content'

export default function LeadsInbox() {
  const { leads, updateLeadStatus, deleteLead, clearAllLeads, exportLeadsCSV } = useContent()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      (lead.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.companyName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.mobile || '').includes(searchTerm) ||
      (lead.tenderNumber || '').toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b" style={{ borderColor: 'var(--border)' }}>
        <div>
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <Inbox size={20} className="text-teal-500" />
            Client Inquiries & Tender Submissions ({leads.length})
          </h2>
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            Review all incoming tender feasibility requests, contact submissions, and lead phone numbers.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {leads.length > 0 && (
            <>
              <button
                type="button"
                onClick={exportLeadsCSV}
                className="px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                style={{ borderColor: 'var(--border)', color: 'var(--accent)' }}
              >
                <Download size={14} />
                <span>Export CSV</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Delete all stored inquiries? This cannot be undone.')) {
                    clearAllLeads()
                  }
                }}
                className="px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 text-red-500 transition-colors cursor-pointer"
                style={{ borderColor: 'var(--border)' }}
              >
                <Trash2 size={14} />
                <span>Clear All</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search by client name, company, phone, or tender #..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border text-xs outline-none"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['all', 'new', 'in_review', 'contacted', 'closed'].map(st => (
            <button
              key={st}
              type="button"
              onClick={() => setFilterStatus(st)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border cursor-pointer capitalize whitespace-nowrap transition-colors"
              style={{
                backgroundColor: filterStatus === st ? 'var(--accent)' : 'var(--bg-card)',
                borderColor: filterStatus === st ? 'var(--accent)' : 'var(--border)',
                color: filterStatus === st ? '#FFFFFF' : 'var(--text-secondary)',
              }}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Leads List */}
      {filteredLeads.length === 0 ? (
        <div
          className="p-12 rounded-3xl border text-center"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
        >
          <AlertCircle size={36} className="mx-auto mb-3 opacity-30" style={{ color: 'var(--text-muted)' }} />
          <h3 className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            No Inquiries Found
          </h3>
          <p className="text-xs max-w-sm mx-auto" style={{ color: 'var(--text-secondary)' }}>
            When contractors or vendors submit tender review forms or contact requests on the website, they will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredLeads.map(lead => (
            <div
              key={lead.id}
              className="p-5 rounded-2xl border transition-all shadow-xs space-y-3"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs"
                    style={{
                      backgroundColor: lead.status === 'new' ? '#10B98120' : 'var(--bg-base)',
                      color: lead.status === 'new' ? '#10B981' : 'var(--text-primary)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    {lead.name ? lead.name[0].toUpperCase() : 'U'}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                      {lead.name} {lead.companyName && <span className="font-normal text-xs text-muted">({lead.companyName})</span>}
                    </h4>
                    <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
                      Received: {new Date(lead.createdAt).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={lead.status}
                    onChange={e => updateLeadStatus(lead.id, e.target.value as AdminLead['status'])}
                    className="text-xs font-bold px-2.5 py-1 rounded-lg border outline-none cursor-pointer"
                    style={{
                      backgroundColor: 'var(--bg-base)',
                      borderColor: 'var(--border)',
                      color:
                        lead.status === 'new'
                          ? '#10B981'
                          : lead.status === 'in_review'
                          ? '#0284C7'
                          : lead.status === 'contacted'
                          ? '#F59E0B'
                          : '#64748B',
                    }}
                  >
                    <option value="new">● New Lead</option>
                    <option value="in_review">● In Review</option>
                    <option value="contacted">● Contacted</option>
                    <option value="closed">● Closed</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => deleteLead(lead.id)}
                    className="p-1 text-red-500 hover:text-red-700 cursor-pointer transition-colors"
                    title="Delete lead record"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase text-muted block mb-0.5">Mobile Phone</span>
                  <a
                    href={`tel:${lead.mobile}`}
                    className="font-mono font-semibold flex items-center gap-1.5 text-teal-600 hover:underline"
                  >
                    <Phone size={12} />
                    {lead.mobile || 'Not provided'}
                  </a>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase text-muted block mb-0.5">Email Address</span>
                  <a
                    href={`mailto:${lead.email}`}
                    className="font-medium flex items-center gap-1.5 truncate"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <Mail size={12} />
                    {lead.email || 'None'}
                  </a>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase text-muted block mb-0.5">Tender Number / Authority</span>
                  <span className="font-semibold flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
                    <FileText size={12} />
                    {lead.tenderNumber || 'General inquiry'}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase text-muted block mb-0.5">Inquiry Channel</span>
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold border"
                    style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                  >
                    {lead.type.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {lead.message && (
                <div className="p-3 rounded-xl border text-xs" style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                  <span className="font-bold text-[10px] uppercase text-muted block mb-1">Client Message / Notes:</span>
                  <p className="leading-relaxed">{lead.message}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
