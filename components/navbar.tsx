'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLang } from '@/components/lang-provider'
import { useSettings } from '@/components/settings-provider'
import { cn } from '@/lib/utils'
import SearchOverlay from '@/components/search-overlay'
import ThemeToggle from '@/components/theme-toggle'

const navLinks = [
  { key: 'home' as const, href: '/' },
  { key: 'about' as const, href: '/about' },
  { key: 'services' as const, href: '/services' },
  { key: 'projects' as const, href: '/projects' },
  { key: 'products' as const, href: '/products' },
  { key: 'blog' as const, href: '/blog' },
  { key: 'contact' as const, href: '/contact' },
]

export default function Navbar() {
  const { t, lang, setLang, isRTL } = useLang()
  const settings = useSettings()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const logo = settings?.logo || '/logo.svg'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`
        fixed top-0 inset-x-0 z-50 transition-all duration-500
        ${scrolled ? 'glass border-b border-border/60 py-2' : 'bg-transparent py-4'}`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src={logo}
            alt="ENVIRON Logo"
            width={140}
            height={48}
            className="h-10 w-auto dark:brightness-[2] dark:saturate-150"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <ul className={cn('hidden md:flex items-center gap-6')}>
          {navLinks.map(({ key, href }) => (
            <li key={key}>
              <Link
                href={href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200 relative group"
              >
                {t.nav[key]}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 rounded-full" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className={cn('flex items-center gap-3')}>
          {/* Search */}
          <SearchOverlay />
          
          {/* Theme toggle */}
          <div className="hidden md:flex">
            <ThemeToggle />
          </div>

          {/* Language switcher */}
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
             className="hidden md:inline-flex items-center px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors"
            // className="hidden md:flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-colors"
            aria-label="Switch language"
          >
            {lang === 'en' ? 'عربي' : 'EN'}
          </button>

          {/* Admin link */}
          {/* <Link
            href="/admin"
            className="hidden md:inline-flex items-center px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors"
          >
            {t.nav.admin}
          </Link> */}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass border-t border-border/60 overflow-auto"
          >
            <ul className={cn('flex flex-col px-6 py-4 gap-4')}>
              {navLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="block z-50 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {t.nav[key]}
                  </Link>
                </li>
              ))}
              <li className="flex flex-row items-center justify-between gap-3 pt-2 border-t border-border/60  ">
                <button
                  onClick={() => { setLang(lang === 'en' ? 'ar' : 'en'); setOpen(false) }}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  {lang === 'en' ? 'عربي' : 'EN'}
                </button>
                <ThemeToggle />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
