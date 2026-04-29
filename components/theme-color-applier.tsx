'use client'

import { useEffect } from 'react'
import { useSettings } from '@/components/settings-provider'
import { useTheme } from '@/components/theme-provider'

const PROPS = ['--primary', '--ring', '--sidebar-primary', '--sidebar-ring',
  '--glass-bg', '--glass-border', '--glass-shadow'] as const

export function ThemeColorApplier() {
  const settings = useSettings()
  const { theme } = useTheme()

  useEffect(() => {
    const root = document.documentElement

    // Gold themes own their tokens entirely — don't override with the
    // brand "primary_color" (which is teal). This is what was breaking
    // dark-gold / light-gold from taking effect.
    const isGoldTheme = theme === 'dark-gold' || theme === 'light-gold'

    if (isGoldTheme || !settings?.primary_color) {
      // Clear any inline overrides so the theme class wins
      PROPS.forEach((p) => root.style.removeProperty(p))
      return
    }

    const color = settings.primary_color
    root.style.setProperty('--primary', color)
    root.style.setProperty('--ring', color)
    root.style.setProperty('--sidebar-primary', color)
    root.style.setProperty('--sidebar-ring', color)

    const rgb = hexToRgb(color)
    if (rgb) {
      const { r, g, b } = rgb
      root.style.setProperty('--glass-bg', `rgba(${r}, ${g}, ${b}, 0.08)`)
      root.style.setProperty('--glass-border', `rgba(${r}, ${g}, ${b}, 0.2)`)
      root.style.setProperty('--glass-shadow', `0 8px 32px rgba(${r}, ${g}, ${b}, 0.15)`)
    }
  }, [settings?.primary_color, theme])

  return null
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}
