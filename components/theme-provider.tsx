'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Theme = 'dark-green' | 'dark-gold' | 'light-green' | 'light-gold'

interface ThemeContextValue {
  theme: Theme
  setTheme: (t: Theme) => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = 'environ-theme'
const DEFAULT_THEME: Theme = 'dark-green'
const VALID: Theme[] = ['dark-green', 'dark-gold', 'light-green', 'light-gold']

function applyTheme(t: Theme) {
  const html = document.documentElement
  html.classList.remove(...VALID, 'dark')
  html.classList.add(t)
  if (t.startsWith('dark')) html.classList.add('dark')
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    const initial = stored && VALID.includes(stored) ? stored : DEFAULT_THEME
    applyTheme(initial)
    setThemeState(initial)
  }, [])

  function setTheme(t: Theme) {
    setThemeState(t)
    applyTheme(t)
    localStorage.setItem(STORAGE_KEY, t)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark: theme.startsWith('dark') }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
