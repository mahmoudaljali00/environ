'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Tag } from 'lucide-react'
import { useLang } from '@/components/lang-provider'
import SectionReveal from '@/components/section-reveal'
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
  image: string | null
  specificationsEn: string[]
  published: boolean
}

export default function ProductsPreview({ products }: { products: Product[] }) {
  const featured = products.slice(0, 6)
  const { t, lang, isRTL } = useLang()

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 pattern-bg opacity-[0.03]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionReveal>
          <div className={cn('flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14', isRTL && 'sm:flex-row-reverse text-right')}>
            <div>
              <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">
                {t.products.label}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
                {t.products.featured}
              </h2>
              <p className="text-muted-foreground max-w-md leading-relaxed mt-3">
                {t.products.subtitle}
              </p>
            </div>
            <Link
              href="/products"
              className={cn(
                'flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/50 text-primary text-sm font-medium hover:bg-primary/10 transition-colors',
                isRTL && 'flex-row-reverse'
              )}
            >
              {t.products.view_all}
              <ArrowRight className={cn('w-4 h-4', isRTL && 'rotate-180')} />
            </Link>
          </div>
        </SectionReveal>

        {/* Bento-style product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product, i) => {
            const name = lang === 'ar' ? product.nameAr : product.name
            const desc = lang === 'ar' ? product.shortDescAr : product.shortDesc

            return (
              <SectionReveal key={product.id} delay={i * 0.08}>
                <Link href={`/products/${product.slug}`} className="group block h-full">
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className="glass-card rounded-2xl overflow-hidden h-full flex flex-col border border-border/40 hover:border-primary/40 transition-colors duration-300 hover:shadow-xl hover:shadow-primary/10"
                  >
                    {/* Product image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-card/50">
                      <Image
                        src={product.image}
                        alt={name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />



                      {/* Brand chip */}
                      <div className="absolute bottom-3 right-3 bg-background/75 backdrop-blur-sm text-[10px] font-semibold text-primary px-2 py-1 rounded-full border border-primary/20">
                        {product.brand}
                      </div>
                    </div>

                    {/* Content */}
                    <div className={cn('flex flex-col flex-1 p-5 gap-2.5', isRTL && 'text-right')}>
                      <span className="text-[10px] font-semibold text-primary/70 uppercase tracking-widest">
                        {t.products.categories[product.category as keyof typeof t.products.categories]}
                      </span>
                      <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {name}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                        {desc}
                      </p>

                      {/* Specs preview — first 2 specs */}
                      {product.specificationsEn && product.specificationsEn.length > 0 && (
                        <div className={cn('flex items-center gap-3 mt-1', isRTL && 'flex-row-reverse')}>
                          {product.specificationsEn.slice(0, 2).map((spec, si) => (
                            <div key={si} className={cn('flex flex-col', isRTL && 'items-end')}>
                              <span className="text-[10px] text-muted-foreground">Spec {si + 1}</span>
                              <span className="text-xs font-bold text-foreground line-clamp-1">{spec}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className={cn('flex items-center gap-1 text-xs text-primary font-semibold mt-1 pt-2 border-t border-border/30', isRTL && 'flex-row-reverse justify-end')}>
                        {t.products.enquire}
                        <ArrowRight className={cn('w-3.5 h-3.5 group-hover:translate-x-1 transition-transform', isRTL && 'rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0')} />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </SectionReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
