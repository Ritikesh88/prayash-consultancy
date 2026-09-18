import { useState, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Phone, MessageCircle, Mail, MapPin, Clock,
  CheckCircle2, AlertCircle, Loader2, Send
} from 'lucide-react'
import { siteConfig, whatsappUrl } from '@/config/siteConfig'
import { submitContact } from '@/lib/formService'
import { trackEvent, EVENTS } from '@/lib/analytics'
import { REQUIREMENT_TYPES } from '@/types/lead'
import type { ContactRequest } from '@/types/lead'

const pageTitle = `Contact & Tender Consultation | ${siteConfig.companyName}`
const pageDesc =
  'Contact our team to discuss your government tender requirement. Request a callback, WhatsApp us or send a tender for review.'

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  companyName: z.string().optional(),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit mobile number'),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  requirementType: z.string().optional(),
  tenderNumber: z.string().optional(),
  message: z.string().min(5, 'Please describe your requirement briefly'),
})

type FormData = z.infer<typeof schema>

export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const hasStartedRef = useRef(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const handleFieldFocus = () => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true
      trackEvent(EVENTS.LEAD_FORM_START, { form: 'contact' })
    }
  }

  const onSubmit = async (data: FormData) => {
    setFormState('loading')
    try {
      const request: Omit<ContactRequest, 'id' | 'createdAt'> = {
        ...data,
        email: data.email || undefined,
        requirementType: data.requirementType as ContactRequest['requirementType'],
      }
      await submitContact(request)
      trackEvent(EVENTS.CONTACT_FORM_SUBMIT)
      setFormState('success')
      reset()
    } catch {
      setFormState('error')
    }
  }

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={`${siteConfig.siteUrl}/contact`} />
      </Helmet>

      <main style={{ background: 'var(--bg-base)' }}>
        <section className="pt-40 pb-10" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="container-main">
            <div className="tag tag-accent mb-4 w-fit">Direct Support</div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Let's discuss your tender requirement.
            </h1>
            <p className="text-lg max-w-2xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Speak directly with an experienced tender specialist. Whether you need registration support, eligibility vetting, or complete bid handling.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-main">
            <div className="grid lg:grid-cols-5 gap-12 items-start">
              {/* Left — contact details */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                  Ways to reach us
                </h2>

                <div className="flex flex-col gap-4 mb-8">
                  <a
                    href={siteConfig.phoneHref}
                    onClick={() => trackEvent(EVENTS.PHONE_CLICK, { location: 'contact_page' })}
                    className="flex items-start gap-3.5 p-3.5 rounded-xl border transition-all group"
                    style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}
                    >
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: 'var(--text-faint)' }}>
                        Direct Call
                      </p>
                      <p className="text-sm font-bold group-hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--text-primary)' }}>
                        {siteConfig.phone}
                      </p>
                    </div>
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent(EVENTS.WHATSAPP_CLICK, { location: 'contact_page' })}
                    className="flex items-start gap-3.5 p-3.5 rounded-xl border transition-all group"
                    style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(37,211,102,0.12)', color: '#25D366' }}
                    >
                      <MessageCircle size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: 'var(--text-faint)' }}>
                        WhatsApp Business
                      </p>
                      <p className="text-sm font-bold group-hover:text-[#25D366] transition-colors" style={{ color: 'var(--text-primary)' }}>
                        {siteConfig.whatsapp}
                      </p>
                    </div>
                  </a>

                  <a
                    href={siteConfig.emailHref}
                    onClick={() => trackEvent(EVENTS.EMAIL_CLICK, { location: 'contact_page' })}
                    className="flex items-start gap-3.5 p-3.5 rounded-xl border transition-all group"
                    style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(8,145,178,0.12)', color: '#0891B2' }}
                    >
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: 'var(--text-faint)' }}>
                        Official Email
                      </p>
                      <p className="text-sm font-bold group-hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--text-primary)' }}>
                        {siteConfig.email}
                      </p>
                    </div>
                  </a>

                  <div
                    className="flex items-start gap-3.5 p-3.5 rounded-xl border"
                    style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--bg-subtle)', color: 'var(--text-muted)' }}
                    >
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: 'var(--text-faint)' }}>
                        Registered Office
                      </p>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{siteConfig.addressFull}</p>
                    </div>
                  </div>

                  <div
                    className="flex items-start gap-3.5 p-3.5 rounded-xl border"
                    style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--bg-subtle)', color: 'var(--text-muted)' }}
                    >
                      <Clock size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: 'var(--text-faint)' }}>
                        Consultancy Hours
                      </p>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{siteConfig.businessHours}</p>
                    </div>
                  </div>
                </div>

                <div
                  className="rounded-xl border p-5 text-xs leading-relaxed"
                  style={{ background: 'var(--bg-subtle)', borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                >
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Fast-track response: </span>
                  For urgent tender deadlines within 48 hours, message us directly on WhatsApp with the tender number.
                </div>
              </div>

              {/* Right — form */}
              <div className="lg:col-span-3">
                {formState === 'success' ? (
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
                      Callback Request Submitted
                    </h3>
                    <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
                      A tender desk specialist has received your inquiry and will call you during business hours.
                    </p>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent(EVENTS.WHATSAPP_CLICK, { location: 'contact_success' })}
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-md text-white"
                      style={{ background: '#25D366' }}
                    >
                      <MessageCircle size={16} />
                      WhatsApp for Instant Assistance
                    </a>
                  </div>
                ) : (
                  <div
                    className="rounded-2xl border p-6 sm:p-10 shadow-lg"
                    style={{
                      background: 'var(--bg-card)',
                      borderColor: 'var(--border)',
                    }}
                  >
                    <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                      Request a Consultation Callback
                    </h3>
                    <p className="text-xs mb-6" style={{ color: 'var(--text-muted)' }}>
                      Fill in your business details and what you need assistance with.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="form-field">
                          <label className="form-label" htmlFor="contact-name">
                            Your Name <span className="required">*</span>
                          </label>
                          <input
                            id="contact-name"
                            type="text"
                            autoComplete="name"
                            placeholder="e.g. Ramesh Patel"
                            className={`form-input ${errors.name ? 'error' : ''}`}
                            onFocus={handleFieldFocus}
                            {...register('name')}
                          />
                          {errors.name && (
                            <p className="form-error"><AlertCircle size={12} />{errors.name.message}</p>
                          )}
                        </div>

                        <div className="form-field">
                          <label className="form-label" htmlFor="contact-company">Company / Enterprise</label>
                          <input
                            id="contact-company"
                            type="text"
                            autoComplete="organization"
                            placeholder="Company or firm name"
                            className="form-input"
                            onFocus={handleFieldFocus}
                            {...register('companyName')}
                          />
                        </div>

                        <div className="form-field">
                          <label className="form-label" htmlFor="contact-phone">
                            Mobile Number <span className="required">*</span>
                          </label>
                          <input
                            id="contact-phone"
                            type="tel"
                            autoComplete="tel"
                            placeholder="10-digit mobile number"
                            className={`form-input ${errors.phone ? 'error' : ''}`}
                            onFocus={handleFieldFocus}
                            {...register('phone')}
                          />
                          {errors.phone && (
                            <p className="form-error"><AlertCircle size={12} />{errors.phone.message}</p>
                          )}
                        </div>

                        <div className="form-field">
                          <label className="form-label" htmlFor="contact-email">Email Address</label>
                          <input
                            id="contact-email"
                            type="email"
                            autoComplete="email"
                            placeholder="name@company.com (optional)"
                            className={`form-input ${errors.email ? 'error' : ''}`}
                            onFocus={handleFieldFocus}
                            {...register('email')}
                          />
                          {errors.email && (
                            <p className="form-error"><AlertCircle size={12} />{errors.email.message}</p>
                          )}
                        </div>

                        <div className="form-field">
                          <label className="form-label" htmlFor="contact-requirement">
                            Requirement Category
                          </label>
                          <select
                            id="contact-requirement"
                            className="form-input"
                            {...register('requirementType')}
                          >
                            <option value="">Select requirement type</option>
                            {REQUIREMENT_TYPES.map((r) => (
                              <option key={r} value={r}>{r}</option>
                            ))}
                          </select>
                        </div>

                        <div className="form-field">
                          <label className="form-label" htmlFor="contact-tender-number">
                            Tender Number (if any)
                          </label>
                          <input
                            id="contact-tender-number"
                            type="text"
                            placeholder="e.g. GEM/2026/B/12345"
                            className="form-input"
                            {...register('tenderNumber')}
                          />
                        </div>
                      </div>

                      <div className="form-field mb-6">
                        <label className="form-label" htmlFor="contact-message">
                          Requirement Details <span className="required">*</span>
                        </label>
                        <textarea
                          id="contact-message"
                          rows={4}
                          placeholder="Briefly describe what assistance or guidance you need with government procurement..."
                          className={`form-input resize-none ${errors.message ? 'error' : ''}`}
                          onFocus={handleFieldFocus}
                          {...register('message')}
                        />
                        {errors.message && (
                          <p className="form-error"><AlertCircle size={12} />{errors.message.message}</p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={formState === 'loading'}
                        className="w-full py-4 rounded-xl text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-60"
                        style={{ background: 'var(--accent)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
                      >
                        {formState === 'loading' ? (
                          <><Loader2 size={16} className="animate-spin" />Processing...</>
                        ) : (
                          <>
                            <Send size={15} />
                            Request Callback
                          </>
                        )}
                      </button>

                      {formState === 'error' && (
                        <p className="form-error justify-center mt-3">
                          <AlertCircle size={14} />
                          Something went wrong. Please try again or reach us on WhatsApp.
                        </p>
                      )}
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
