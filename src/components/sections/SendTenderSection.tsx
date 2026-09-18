import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Upload, CheckCircle2, AlertCircle, Loader2, MessageCircle, FileCheck } from 'lucide-react'
import { submitTender } from '@/lib/formService'
import { trackEvent, EVENTS } from '@/lib/analytics'
import { whatsappUrl } from '@/config/siteConfig'
import type { TenderSubmission } from '@/types/lead'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ACCEPTED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
]

const schema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  companyName: z.string().min(2, 'Please enter your company name'),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  tenderNumber: z.string().optional(),
  tenderAuthority: z.string().optional(),
  message: z.string().optional(),
  preferredContact: z.enum(['phone', 'whatsapp', 'email']).optional(),
  consent: z.boolean().refine((v) => v, 'Please agree to be contacted by our team'),
})

type FormData = z.infer<typeof schema>
type FormState = 'idle' | 'loading' | 'success' | 'error'

interface SendTenderSectionProps {
  compact?: boolean
}

export default function SendTenderSection({ compact = false }: SendTenderSectionProps) {
  const [formState, setFormState] = useState<FormState>('idle')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string>('')
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const hasStartedRef = useRef(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const validateAndSetFile = (file: File) => {
    setFileError('')
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setFileError('Please upload a PDF, Word (.docx) or Excel (.xlsx) file.')
      setUploadedFile(null)
      return
    }
    if (file.size > MAX_FILE_SIZE) {
      setFileError('File size must be under 10 MB.')
      setUploadedFile(null)
      return
    }
    setUploadedFile(file)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) validateAndSetFile(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) validateAndSetFile(file)
  }

  const handleFieldFocus = () => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true
      trackEvent(EVENTS.LEAD_FORM_START, { form: 'send_tender' })
    }
  }

  const onSubmit = async (data: FormData) => {
    setFormState('loading')
    try {
      const submission: Omit<TenderSubmission, 'id' | 'status' | 'createdAt'> = {
        ...data,
        email: data.email || undefined,
        tenderFile: uploadedFile,
      }
      await submitTender(submission)
      trackEvent(EVENTS.TENDER_FORM_SUBMIT, { has_file: String(!!uploadedFile) })
      setFormState('success')
      reset()
      setUploadedFile(null)
    } catch {
      setFormState('error')
    }
  }

  if (formState === 'success') {
    return (
      <div className={compact ? '' : 'section-padding'} style={compact ? {} : { background: 'var(--bg-base)' }}>
        <div className={compact ? '' : 'container-main max-w-2xl mx-auto'}>
          <div
            className="rounded-2xl border p-8 sm:p-12 text-center shadow-lg"
            style={{
              background: 'var(--bg-card)',
              borderColor: 'var(--accent-border)',
            }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}
            >
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Tender Review Request Received
            </h3>
            <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Our tender specialists are reviewing the document and details. We will contact you with eligibility findings shortly.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent(EVENTS.WHATSAPP_CLICK, { location: 'form_success' })}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-md text-white"
              style={{ background: '#25D366' }}
            >
              <MessageCircle size={16} />
              Connect on WhatsApp for Immediate Update
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section
      className={compact ? '' : 'section-padding'}
      style={compact ? {} : { background: 'var(--bg-base)' }}
      id="send-tender"
    >
      <div className={compact ? '' : 'container-main max-w-3xl mx-auto'}>
        {!compact && (
          <div className="text-center mb-10">
            <div className="tag tag-accent mb-4 mx-auto w-fit">Direct Assessment</div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Found a tender? <span className="gradient-text">Send it for review.</span>
            </h2>
            <p className="max-w-lg mx-auto text-sm" style={{ color: 'var(--text-secondary)' }}>
              Share the tender document or bid number with our desk. We'll examine the qualification criteria and explain exact requirements.
            </p>
          </div>
        )}

        <div
          className="rounded-2xl border p-6 sm:p-10 shadow-lg"
          style={{
            background: 'var(--bg-card)',
            borderColor: 'var(--border)',
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Name */}
              <div className="form-field">
                <label className="form-label" htmlFor="tender-name">
                  Full Name <span className="required">*</span>
                </label>
                <input
                  id="tender-name"
                  type="text"
                  autoComplete="name"
                  placeholder="e.g. Rajesh Sharma"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  onFocus={handleFieldFocus}
                  {...register('name')}
                />
                {errors.name && (
                  <p className="form-error">
                    <AlertCircle size={12} />
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Company */}
              <div className="form-field">
                <label className="form-label" htmlFor="tender-company">
                  Company Name <span className="required">*</span>
                </label>
                <input
                  id="tender-company"
                  type="text"
                  autoComplete="organization"
                  placeholder="e.g. Apex Infratech Pvt Ltd"
                  className={`form-input ${errors.companyName ? 'error' : ''}`}
                  onFocus={handleFieldFocus}
                  {...register('companyName')}
                />
                {errors.companyName && (
                  <p className="form-error">
                    <AlertCircle size={12} />
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              {/* Mobile */}
              <div className="form-field">
                <label className="form-label" htmlFor="tender-mobile">
                  Mobile Number <span className="required">*</span>
                </label>
                <input
                  id="tender-mobile"
                  type="tel"
                  autoComplete="tel"
                  placeholder="10-digit mobile number"
                  className={`form-input ${errors.mobile ? 'error' : ''}`}
                  onFocus={handleFieldFocus}
                  {...register('mobile')}
                />
                {errors.mobile && (
                  <p className="form-error">
                    <AlertCircle size={12} />
                    {errors.mobile.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="form-field">
                <label className="form-label" htmlFor="tender-email">
                  Email Address
                </label>
                <input
                  id="tender-email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@company.com (optional)"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  onFocus={handleFieldFocus}
                  {...register('email')}
                />
                {errors.email && (
                  <p className="form-error">
                    <AlertCircle size={12} />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Tender Number */}
              <div className="form-field">
                <label className="form-label" htmlFor="tender-number">
                  Tender / Bid Number
                </label>
                <input
                  id="tender-number"
                  type="text"
                  placeholder="e.g. GEM/2026/B/98214"
                  className="form-input"
                  onFocus={handleFieldFocus}
                  {...register('tenderNumber')}
                />
              </div>

              {/* Authority */}
              <div className="form-field">
                <label className="form-label" htmlFor="tender-authority">
                  Tender Authority / Department
                </label>
                <input
                  id="tender-authority"
                  type="text"
                  placeholder="e.g. Indian Railways / NTPC"
                  className="form-input"
                  onFocus={handleFieldFocus}
                  {...register('tenderAuthority')}
                />
              </div>
            </div>

            {/* Drag & Drop File Upload */}
            <div className="form-field mb-4">
              <label className="form-label" htmlFor="tender-file">
                Upload Tender Document (PDF, Word or Excel — max 10 MB)
              </label>
              <div
                className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200"
                style={{
                  backgroundColor: dragOver
                    ? 'var(--accent-dim)'
                    : uploadedFile
                      ? 'var(--accent-dim)'
                      : fileError
                        ? 'rgba(239,68,68,0.06)'
                        : 'var(--bg-subtle)',
                  borderColor: fileError
                    ? 'var(--error)'
                    : uploadedFile || dragOver
                      ? 'var(--accent)'
                      : 'var(--border-md)',
                }}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                role="button"
                tabIndex={0}
                aria-label="Upload tender document"
              >
                <input
                  ref={fileInputRef}
                  id="tender-file"
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                  className="sr-only"
                  onChange={handleFileChange}
                />
                {uploadedFile ? (
                  <div className="flex flex-col items-center gap-2">
                    <FileCheck size={28} style={{ color: 'var(--accent)' }} />
                    <p className="text-sm font-bold" style={{ color: 'var(--accent)' }}>
                      {uploadedFile.name}
                    </p>
                    <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                      {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB · Click or drag to replace
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload size={24} style={{ color: dragOver ? 'var(--accent)' : 'var(--text-muted)' }} />
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      Click to upload or drag & drop tender PDF / document
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      PDF, DOCX, XLSX (Up to 10 MB)
                    </p>
                  </div>
                )}
              </div>
              {fileError && (
                <p className="form-error mt-1">
                  <AlertCircle size={12} />
                  {fileError}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="form-field mb-4">
              <label className="form-label" htmlFor="tender-message">
                Requirement Details / Notes
              </label>
              <textarea
                id="tender-message"
                rows={3}
                placeholder="Briefly describe your questions or scope (e.g. needing help with technical criteria or EMD)..."
                className="form-input resize-none"
                onFocus={handleFieldFocus}
                {...register('message')}
              />
            </div>

            {/* Preferred contact */}
            <div className="form-field mb-5">
              <label className="form-label" htmlFor="tender-preferred-contact">
                Preferred Callback Channel
              </label>
              <select
                id="tender-preferred-contact"
                className="form-input"
                {...register('preferredContact')}
              >
                <option value="">Select preference</option>
                <option value="whatsapp">WhatsApp Consultation</option>
                <option value="phone">Direct Phone Call</option>
                <option value="email">Email Summary</option>
              </select>
            </div>

            {/* Consent */}
            <div className="mb-6">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="mt-1 w-4 h-4 rounded accent-[#0D9488] flex-shrink-0 cursor-pointer"
                  {...register('consent')}
                />
                <span className="text-xs leading-relaxed select-none" style={{ color: 'var(--text-muted)' }}>
                  I consent to being contacted by Prayash Consultancy regarding this tender review. Credentials and passwords are never requested.
                </span>
              </label>
              {errors.consent && (
                <p className="form-error mt-1">
                  <AlertCircle size={12} />
                  {errors.consent.message}
                </p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={formState === 'loading'}
              className="w-full py-4 rounded-xl text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-60"
              style={{ background: 'var(--accent)' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
            >
              {formState === 'loading' ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Submitting Request...
                </>
              ) : (
                'Request Tender Review'
              )}
            </button>

            {formState === 'error' && (
              <p className="form-error justify-center mt-3">
                <AlertCircle size={14} />
                Unable to submit. Please retry or contact us on WhatsApp directly.
              </p>
            )}

            <p className="text-[11px] text-center mt-3" style={{ color: 'var(--text-faint)' }}>
              100% Confidential. Your documents are never shared or published.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
