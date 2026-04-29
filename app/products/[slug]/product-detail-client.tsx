'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Package, CheckCircle, Tag, Layers, DollarSign } from 'lucide-react'
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
  description: string
  descriptionAr: string
  image: string
  specificationsEn: string[]
  specificationsAr: string[]
  featuresEn: string[]
  featuresAr: string[]
  price: number | null
  published: boolean
  service?: {
    id: string
    name: string
    nameAr: string
    slug: string
  } | null
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const { lang, isRTL } = useLang()

  const name = lang === 'ar' ? product.nameAr : product.name
  const description = lang === 'ar' ? product.descriptionAr : product.description
  const specifications = lang === 'ar' ? product.specificationsAr : product.specificationsEn
  const features = lang === 'ar' ? product.featuresAr : product.featuresEn
  const serviceName = product.service ? (lang === 'ar' ? product.service.nameAr : product.service.name) : null

  const categoryLabels: Record<string, { en: string; ar: string }> = {
    energy: { en: 'Energy Systems', ar: 'أنظمة الطاقة' },
    hvac: { en: 'HVAC Systems', ar: 'أنظمة التكييف' },
    water: { en: 'Water Systems', ar: 'أنظمة المياه' },
    security: { en: 'Security Systems', ar: 'أنظمة الأمن' },
    mep: { en: 'MEP Equipment', ar: 'معدات MEP' },
    trading: { en: 'Trading Products', ar: 'منتجات تجارية' },
  }

  const categoryLabel = categoryLabels[product.category]
    ? lang === 'ar'
      ? categoryLabels[product.category].ar
      : categoryLabels[product.category].en
    : product.category

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 pattern-bg opacity-[0.03]" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        <div className={cn('relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', isRTL && 'text-right')}>
          <SectionReveal>
            {/* Back Button */}
            <Link
              href="/products"
              className={cn(
                'inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors',
                isRTL && 'flex-row-reverse'
              )}
            >
              <ArrowLeft className={cn('w-4 h-4', isRTL && 'rotate-180')} />
              {lang === 'ar' ? 'العودة إلى المنتجات' : 'Back to Products'}
            </Link>

            {/* Category & Brand */}
            <div className={cn('flex items-center gap-3 mb-4', isRTL && 'flex-row-reverse')}>
              <Package className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                {categoryLabel}
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground font-medium">{product.brand}</span>
            </div>

            {/* Product Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-4">
              {name}
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              {description}
            </p>

            {/* Service Link */}
            {product.service && (
              <div className={cn('mt-6', isRTL && 'text-right')}>
                <Link
                  href={`/services/${product.service.slug}`}
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Layers className="w-4 h-4" />
                  {lang === 'ar' ? 'جزء من خدمة:' : 'Part of service:'} {serviceName}
                </Link>
              </div>
            )}
          </SectionReveal>
        </div>
      </section>

      {/* Product Image & Specifications */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <SectionReveal>
              <div className="relative aspect-square rounded-3xl overflow-hidden glass-card">
                <Image
                  src={product.image || '/placeholder.jpg'}
                  alt={name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </SectionReveal>

            {/* Specifications */}
            <SectionReveal delay={0.15}>
              <div className={cn('space-y-6', isRTL && 'text-right')}>
                <div>
                  <div className={cn('flex items-center gap-2 mb-4', isRTL && 'flex-row-reverse')}>
                    <Tag className="w-5 h-5 text-primary" />
                    <h2 className="text-2xl font-bold">
                      {lang === 'ar' ? 'المواصفات الفنية' : 'Technical Specifications'}
                    </h2>
                  </div>
                  
                  {specifications && specifications.length > 0 ? (
                    <div className="glass-card rounded-2xl p-6">
                      <ul className="space-y-3">
                        {specifications.map((spec, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={cn('flex items-start gap-3', isRTL && 'flex-row-reverse')}
                          >
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-foreground">{spec}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {lang === 'ar' ? 'لا توجد مواصفات متاحة' : 'No specifications available'}
                    </p>
                  )}
                </div>

                {/* Price (if available) */}
                {product.price && (
                  <div className="glass-card rounded-2xl p-6">
                    <div className={cn('flex items-center gap-2 mb-2', isRTL && 'flex-row-reverse')}>
                      <DollarSign className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold">
                        {lang === 'ar' ? 'السعر' : 'Price'}
                      </h3>
                    </div>
                    <p className="text-3xl font-bold text-primary">
                      ${product.price.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Features */}
      {features && features.length > 0 && (
        <section className="py-12 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionReveal>
              <div className={cn('mb-8', isRTL && 'text-right')}>
                <h2 className="text-3xl font-bold mb-2">
                  {lang === 'ar' ? 'الميزات الرئيسية' : 'Key Features'}
                </h2>
                <p className="text-muted-foreground">
                  {lang === 'ar'
                    ? 'ما يميز هذا المنتج'
                    : 'What makes this product stand out'}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="glass-card rounded-xl p-5"
                  >
                    <div className={cn('flex items-start gap-3', isRTL && 'flex-row-reverse text-right')}>
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-sm font-medium text-foreground leading-snug">
                        {feature}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className={cn('glass-card rounded-3xl p-8 sm:p-12 text-center', isRTL && 'text-right')}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                {lang === 'ar' ? 'مهتم بهذا المنتج؟' : 'Interested in this product?'}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                {lang === 'ar'
                  ? 'تواصل معنا للحصول على عرض سعر أو مزيد من المعلومات'
                  : 'Contact us for a quote or more information'}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                {lang === 'ar' ? 'طلب عرض سعر' : 'Request Quote'}
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  )
}
