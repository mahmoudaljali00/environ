'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Tag, Package } from 'lucide-react'
import Navbar from '@/components/navbar'
import SectionReveal from '@/components/section-reveal'
import { useLang } from '@/components/lang-provider'
import { cn } from '@/lib/utils'

type Product = {
  id: string
  name: string
  nameAr: string
  slug: string
  brand: string
  category: string
  shortDesc: string
  shortDescAr: string
  image: string
  price?: number | null
}

const categoryIcons: Record<string, string> = {
  all: '◈',
  energy: '⚡',
  hvac: '❄',
  water: '💧',
  security: '🔒',
  mep: '⚙',
  trading: '📦',
}

const categories = ['all', 'energy', 'hvac', 'water', 'security', 'mep', 'trading'] as const
type Category = typeof categories[number]

export default function ProductsClient({ initialProducts }: { initialProducts: Product[] }) {
  const { t, lang, isRTL } = useLang()
  const [active, setActive] = useState<Category>('all')

  const filtered =
    active === 'all' ? initialProducts : initialProducts.filter((p) => p.category === active)

  const catLabel = (c: Category) => {
    const labels: Record<Category, { en: string; ar: string }> = {
      all: { en: 'All Products', ar: 'كل المنتجات' },
      energy: { en: 'Energy', ar: 'الطاقة' },
      hvac: { en: 'HVAC', ar: 'التكييف' },
      water: { en: 'Water', ar: 'المياه' },
      security: { en: 'Security', ar: 'الأمن' },
      mep: { en: 'MEP', ar: 'MEP' },
      trading: { en: 'Trading', ar: 'التجارة' },
    }
    return lang === 'ar' ? labels[c].ar : labels[c].en
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Page hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pattern-bg opacity-[0.04]" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className={cn('relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', isRTL && 'text-right')}>
          <SectionReveal>
            <div className={cn('flex items-center gap-2 mb-4', isRTL && 'justify-end')}>
              <Package className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                {lang === 'ar' ? 'منتجاتنا' : 'Our Products'}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-4">
              {lang === 'ar' ? 'منتجات ومعدات عالية الجودة' : 'Premium Equipment & Products'}
            </h1>
            <p className="text-muted-foreground max-w-xl leading-relaxed text-lg">
              {lang === 'ar'
                ? 'نوفر أفضل المنتجات والمعدات من العلامات التجارية العالمية الرائدة'
                : 'High-quality products and equipment from world-leading brands'}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Category filter tabs */}
      <section className="sticky top-[64px] z-30 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn('flex items-center gap-1 overflow-x-auto py-3 scrollbar-none', isRTL && 'flex-row-reverse')}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={cn(
                  'flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                  active === cat
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/30'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                )}
              >
                <span className="text-xs">{categoryIcons[cat]}</span>
                {catLabel(cat)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filtered.map((product, i) => {
                const name = lang === 'ar' ? product.nameAr : product.name
                const desc = lang === 'ar' ? product.shortDescAr : product.shortDesc

                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                  >
                    <Link href={`/products/${product.slug}`} className="group block h-full">
                      <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                        {/* Image */}
                        <div className="relative aspect-square bg-card/50 overflow-hidden">
                          <Image
                            src={product.image || '/placeholder.jpg'}
                            alt={name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {/* Category chip */}
                          <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm text-[10px] font-semibold text-primary px-2 py-1 rounded-full border border-primary/20">
                            {catLabel(product.category as Category)}
                          </div>
                        </div>

                        {/* Info */}
                        <div className={cn('flex flex-col flex-1 p-4 gap-2', isRTL && 'text-right')}>
                          <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide">
                            {product.brand}
                          </p>
                          <h3 className="text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                            {name}
                          </h3>
                          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                            {desc}
                          </p>
                          <div className={cn('flex items-center gap-1 text-xs text-primary font-medium mt-1', isRTL && 'flex-row-reverse justify-end')}>
                            {lang === 'ar' ? 'استفسار' : 'Enquire'}
                            <ArrowRight className={cn('w-3.5 h-3.5 group-hover:translate-x-1 transition-transform', isRTL && 'rotate-180')} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-24 text-muted-foreground">
              <Package className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg">{lang === 'ar' ? 'لا توجد منتجات' : 'No products found'}</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
