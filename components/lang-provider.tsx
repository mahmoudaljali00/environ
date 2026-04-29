'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { translations, type Lang } from '@/lib/i18n'

interface LangContextValue {
  lang: Lang
  t: typeof translations['en']
  setLang: (l: Lang) => void
  isRTL: boolean
}

const LangContext = createContext<LangContextValue | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  const setLang = (l: Lang) => {
    setLangState(l)
    if (typeof document !== 'undefined') {
      document.documentElement.lang = l
      document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr'
      // Apply Arabic font class when RTL
      if (l === 'ar') {
        document.documentElement.classList.add('font-arabic-active')
        document.body.style.fontFamily = 'var(--font-arabic), "Noto Sans Arabic", sans-serif'
      } else {
        document.documentElement.classList.remove('font-arabic-active')
        document.body.style.fontFamily = ''
      }
    }
  }

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    if (lang === 'ar') {
      document.body.style.fontFamily = 'var(--font-arabic), "Noto Sans Arabic", sans-serif'
    } else {
      document.body.style.fontFamily = ''
    }
  }, [lang])

  const value: LangContextValue = {
    lang,
    t: translations[lang] as typeof translations['en'],
    setLang,
    isRTL: lang === 'ar',
  }

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}
