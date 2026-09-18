import { MessageCircle } from 'lucide-react'
import { whatsappUrl } from '@/config/siteConfig'
import { trackEvent, EVENTS } from '@/lib/analytics'

export default function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent(EVENTS.WHATSAPP_CLICK, { location: 'floating_button' })}
      aria-label="Talk to a Tender Specialist on WhatsApp"
      title="Talk to a Tender Specialist on WhatsApp"
      className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5b] text-white rounded-full shadow-lg shadow-[#25D366]/25 transition-all duration-200 hover:shadow-[#25D366]/40 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-[#25D366] focus-visible:outline-offset-2"
    >
      {/* Label — visible on desktop hover */}
      <span className="hidden sm:block max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-sm font-semibold pl-0 group-hover:pl-4">
        Talk to a Tender Specialist
      </span>
      <span className="w-13 h-13 sm:w-14 sm:h-14 flex items-center justify-center flex-shrink-0">
        <MessageCircle size={24} aria-hidden="true" />
      </span>
    </a>
  )
}
