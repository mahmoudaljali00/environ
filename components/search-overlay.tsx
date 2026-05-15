'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, FileText, Briefcase, Package, FolderOpen, Users, Home, Mail, Loader2, ArrowRight } from 'lucide-react'
import { useLang } from '@/components/lang-provider'
import { cn } from '@/lib/utils'

interface SearchResult {
  type: 'service' | 'product' | 'project' | 'blog'
  title: string
  subtitle: string
  href: string
  image?: string | null
}

interface StaticPage {
  title: string
  href: string
  icon: React.ReactNode
  category: string
}

export default function SearchOverlay() {
  const { t, lang, isRTL } = useLang()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<NodeJS.Timeout>()

  // Static pages
  const staticPages: StaticPage[] = [
    { title: t.nav.home, href: '/', icon: <Home className="w-4 h-4" />, category: isRTL ? 'صفحات' : 'Pages' },
    { title: t.nav.about, href: '/about', icon: <Users className="w-4 h-4" />, category: isRTL ? 'صفحات' : 'Pages' },
    { title: t.nav.services, href: '/services', icon: <Briefcase className="w-4 h-4" />, category: isRTL ? 'صفحات' : 'Pages' },
    { title: t.nav.projects, href: '/projects', icon: <FolderOpen className="w-4 h-4" />, category: isRTL ? 'صفحات' : 'Pages' },
    { title: t.nav.products, href: '/products', icon: <Package className="w-4 h-4" />, category: isRTL ? 'صفحات' : 'Pages' },
    { title: t.nav.blog, href: '/blog', icon: <FileText className="w-4 h-4" />, category: isRTL ? 'صفحات' : 'Pages' },
    { title: t.nav.contact, href: '/contact', icon: <Mail className="w-4 h-4" />, category: isRTL ? 'صفحات' : 'Pages' },
  ]

  // Filter static pages based on query
  const filteredStaticPages = query
    ? staticPages.filter((page) =>
        page.title.toLowerCase().includes(query.toLowerCase())
      )
    : staticPages

  // Fetch search results from API
  const searchContent = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([])
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&lang=${lang}`)
      const data = await response.json()
      setResults(data.results || [])
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }, [lang])

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      searchContent(query)
    }, 300)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [query, searchContent])

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0)
  }, [results, filteredStaticPages])

  const totalItems = filteredStaticPages.length + results.length

  const handleSelect = (href: string) => {
    router.push(href)
    setIsOpen(false)
    setQuery('')
    setResults([])
  }

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      setIsOpen((prev) => !prev)
    }
    if (e.key === 'Escape') {
      setIsOpen(false)
      setQuery('')
      setResults([])
    }
  }, [])

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % totalItems)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + totalItems) % totalItems)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (selectedIndex < filteredStaticPages.length) {
        handleSelect(filteredStaticPages[selectedIndex].href)
      } else {
        const resultIndex = selectedIndex - filteredStaticPages.length
        if (results[resultIndex]) {
          handleSelect(results[resultIndex].href)
        }
      }
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'service': return <Briefcase className="w-4 h-4" />
      case 'product': return <Package className="w-4 h-4" />
      case 'project': return <FolderOpen className="w-4 h-4" />
      case 'blog': return <FileText className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  return (
    <>
      {/* Search trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground border border-border/50 rounded-full hover:border-primary/50 hover:text-foreground transition-colors bg-background/50 backdrop-blur-sm"
        aria-label="Open search"
      >
        <Search className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{isRTL ? 'بحث...' : 'Search...'}</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium bg-muted rounded">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Search modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
              onClick={() => { setIsOpen(false); setQuery(''); setResults([]) }}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-[10%] left-1/2 -translate-x-1/2 z-[101] w-full max-w-xl px-4"
            >
              <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
                {/* Search input */}
                <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  ) : (
                    <Search className="w-5 h-5 text-muted-foreground" />
                  )}
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    placeholder={isRTL ? 'ابحث عن الخدمات، المنتجات، المشاريع...' : 'Search services, products, projects...'}
                    className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
                  />
                  {query && (
                    <button
                      onClick={() => { setQuery(''); setResults([]) }}
                      className="p-1 rounded hover:bg-muted transition-colors"
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  )}
                </div>

                {/* Results */}
                <div className="max-h-[60vh] overflow-y-auto">
                  {/* Static pages */}
                  {filteredStaticPages.length > 0 && (
                    <div className="p-2">
                      <p className="px-3 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {isRTL ? 'صفحات' : 'Pages'}
                      </p>
                      {filteredStaticPages.map((page, index) => (
                        <button
                          key={page.href}
                          onClick={() => handleSelect(page.href)}
                          className={cn(
                            'w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl transition-colors',
                            selectedIndex === index ? 'bg-primary/10 text-primary' : 'hover:bg-muted',
                            isRTL ? 'flex-row-reverse text-right' : 'text-left'
                          )}
                        >
                          <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-muted text-muted-foreground">
                            {page.icon}
                          </span>
                          <span className="flex-1 font-medium">{page.title}</span>
                          <ArrowRight className={cn('w-4 h-4 text-muted-foreground', isRTL && 'rotate-180')} />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Dynamic search results */}
                  {results.length > 0 && (
                    <div className="p-2 border-t border-border">
                      <p className="px-3 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {isRTL ? 'نتائج البحث' : 'Search Results'}
                      </p>
                      {results.map((result, index) => {
                        const actualIndex = filteredStaticPages.length + index
                        return (
                          <button
                            key={`${result.type}-${result.href}`}
                            onClick={() => handleSelect(result.href)}
                            className={cn(
                              'w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl transition-colors',
                              selectedIndex === actualIndex ? 'bg-primary/10 text-primary' : 'hover:bg-muted',
                              isRTL ? 'flex-row-reverse text-right' : 'text-left'
                            )}
                          >
                            {result.image ? (
                              <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-muted">
                                <Image
                                  src={result.image}
                                  alt={result.title}
                                  fill
                                  sizes="36px"
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-muted text-muted-foreground">
                                {getTypeIcon(result.type)}
                              </span>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{result.title}</p>
                              <p className="text-xs text-muted-foreground truncate">{result.subtitle}</p>
                            </div>
                            <ArrowRight className={cn('w-4 h-4 text-muted-foreground flex-shrink-0', isRTL && 'rotate-180')} />
                          </button>
                        )
                      })}
                    </div>
                  )}

                  {/* No results */}
                  {query.length >= 2 && !isLoading && results.length === 0 && filteredStaticPages.length === 0 && (
                    <div className="py-12 text-center">
                      <Search className="w-10 h-10 text-muted-foreground/50 mx-auto mb-3" />
                      <p className="text-muted-foreground text-sm">
                        {isRTL ? 'لا توجد نتائج لـ' : 'No results for'} &quot;{query}&quot;
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer hint */}
                <div className="px-4 py-2.5 border-t border-border bg-muted/30 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-[10px]">↑↓</kbd>
                      {isRTL ? 'للتنقل' : 'Navigate'}
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-[10px]">↵</kbd>
                      {isRTL ? 'للفتح' : 'Open'}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-[10px]">Esc</kbd>
                    {isRTL ? 'للإغلاق' : 'Close'}
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
