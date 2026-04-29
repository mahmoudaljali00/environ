'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { SiteSettings } from '@/app/admin/settings/actions'

interface SettingsContextValue {
  settings: SiteSettings | null
}

const SettingsContext = createContext<SettingsContextValue>({ settings: null })

export function SettingsProvider({ 
  children, 
  settings 
}: { 
  children: ReactNode
  settings: SiteSettings | null 
}) {
  return (
    <SettingsContext.Provider value={{ settings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  return ctx.settings
}

// Helper function to get a setting value with fallback
export function useSetting<K extends keyof SiteSettings>(
  key: K,
  fallback: SiteSettings[K]
): SiteSettings[K] {
  const settings = useSettings()
  return settings?.[key] ?? fallback
}
