'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Check } from 'lucide-react'
import { useTheme, type Theme } from '@/components/theme-provider'
import { useLang } from '@/components/lang-provider'
import { cn } from '@/lib/utils'

interface ThemeOption {
  id: Theme
  labelEn: string
  labelAr: string
  mode: 'dark' | 'light'
  primary: string
  secondary: string
}

const THEMES: ThemeOption[] = [
  {
    id: 'dark-green',
    labelEn: 'Dark & Green',
    labelAr: 'داكن وأخضر',
    mode: 'dark',
    primary: '#009d8e',
    secondary: '#0a1a19',
  },
  {
    id: 'dark-gold',
    labelEn: 'Dark & Gold',
    labelAr: 'داكن وذهبي',
    mode: 'dark',
    primary: '#d4a017',
    secondary: '#1a1508',
  },
  {
    id: 'light-green',
    labelEn: 'Light & Green',
    labelAr: 'فاتح وأخضر',
    mode: 'light',
    primary: '#009d8e',
    secondary: '#f0faf9',
  },
  {
    id: 'light-gold',
    labelEn: 'Light & Gold',
    labelAr: 'فاتح وذهبي',
    mode: 'light',
    primary: '#d4a017',
    secondary: '#fdf8ec',
  },
]

export default function ThemeToggle() {
  const { theme, setTheme, isDark } = useTheme()
  const { isRTL } = useLang()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setOpen((p) => !p)}
        aria-label="Change theme"
        className={cn(
          'flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-200',
          'border-border/60 hover:border-primary/60 bg-secondary/50 hover:bg-secondary',
          open && 'border-primary/80 bg-secondary'
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ rotate: -30, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 30, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="w-4 h-4 text-primary" />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ rotate: 30, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -30, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="w-4 h-4 text-primary" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -6 }}
            transition={{ duration: 0.18 }}
            className={cn(
              'absolute top-11 z-50 w-56 rounded-2xl border border-border bg-card shadow-xl shadow-black/20 overflow-hidden',
              isRTL ? 'left-0' : 'right-0'
            )}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-border/60">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {isRTL ? 'مظهر الموقع' : 'Appearance'}
              </p>
            </div>

            {/* Options */}
            <div className="p-2 flex flex-col gap-1">
              {THEMES.map((opt) => {
                const active = theme === opt.id
                return (
                  <button
                    key={opt.id}
                    onClick={() => { setTheme(opt.id); setOpen(false) }}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all',
                      active
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-secondary text-foreground'
                    )}
                  >
                    {/* Colour swatch */}
                    <span
                      className="flex-shrink-0 w-7 h-7 rounded-lg border border-border/40 overflow-hidden"
                      style={{ background: opt.secondary }}
                    >
                      <span
                        className="block w-full h-1/2"
                        style={{ background: opt.primary }}
                      />
                    </span>

                    <span className="flex-1 text-left font-medium leading-tight">
                      {isRTL ? opt.labelAr : opt.labelEn}
                    </span>

                    {/* Mode icon */}
                    {opt.mode === 'dark'
                      ? <Moon className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                      : <Sun className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                    }

                    {/* Active check */}
                    {active && (
                      <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    )}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
