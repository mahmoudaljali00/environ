'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '@/components/lang-provider'
import { useSettings } from '@/components/settings-provider'

const DEFAULT_WHATSAPP = '+249912340960'

// Official WhatsApp SVG icon
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

export default function WhatsAppButton() {
  const { isRTL } = useLang()
  const settings = useSettings()
  const [isHovered, setIsHovered] = useState(false)
  const whatsappNumber = settings?.whatsapp || DEFAULT_WHATSAPP
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\+/g, '').replace(/\s/g, '')}?text=${encodeURIComponent(isRTL ? 'مرحباً، أود الاستفسار عن خدماتكم' : 'Hello, I would like to inquire about your services')}`

  return (
    <motion.div
      className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} z-50`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5, type: 'spring', stiffness: 200 }}
    >
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center"
      >
        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -10 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRTL ? -10 : 10 }}
              className={`absolute ${isRTL ? 'left-full ml-3' : 'right-full mr-3'} whitespace-nowrap`}
            >
              <div className="px-4 py-2 rounded-lg bg-card border border-border shadow-lg">
                <p className="text-sm font-medium text-foreground">
                  {isRTL ? 'تواصل معنا عبر واتساب' : 'Chat with us on WhatsApp'}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {isRTL ? 'رد فوري' : 'Quick response'}
                </p>
              </div>
              {/* Arrow */}
              <div className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? '-left-1.5' : '-right-1.5'} w-3 h-3 rotate-45 bg-card border-r border-b border-border`} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Button */}
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-[#25D366] blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
          
          {/* Main button */}
          <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white shadow-lg shadow-[#25D366]/25 group-hover:shadow-xl group-hover:shadow-[#25D366]/40 transition-all duration-300">
            <WhatsAppIcon className="w-7 h-7" />
          </div>
          
          {/* Online indicator */}
          <div className="absolute -top-1 -right-1 flex items-center justify-center">
            <span className="absolute w-4 h-4 rounded-full bg-green-400 animate-ping opacity-75" />
            <span className="relative w-3 h-3 rounded-full bg-green-400 border-2 border-background" />
          </div>
        </div>
      </motion.a>
    </motion.div>
  )
}
