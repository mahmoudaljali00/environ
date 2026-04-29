'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, Zap, Wind, Wrench, Droplets, Shield, HardHat, ShoppingBag, Settings } from 'lucide-react'
import Navbar from '@/components/navbar'
import SectionReveal from '@/components/section-reveal'
import { useLang } from '@/components/lang-provider'

const icons = {
  Settings,
  Zap,
  Sun: Zap,
  Wind,
  Wrench,
  Droplets,
  Shield,
  HardHat,
  ShoppingBag
}

type Service = {
  id: string
  name: string
  nameAr: string
  slug: string
  description: string
  descriptionAr: string
  icon: string
  featuresEn: string[]
  featuresAr: string[]
  benefits: string[]
  benefitsAr: string[]
  image: string | null
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export default function ServiceDetailClient({ service }: { service: Service }) {
  const { t, isRTL, lang } = useLang()
  
  const Icon = icons[service.icon as keyof typeof icons] || Settings
  const serviceName = lang === 'ar' ? service.nameAr : service.name
  const serviceDesc = lang === 'ar' ? service.descriptionAr : service.description
  const features = lang === 'ar' ? service.featuresAr : service.featuresEn
  const benefits = lang === 'ar' ? service.benefitsAr : service.benefits

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pattern-bg opacity-[0.05]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/8 blur-[80px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className={`inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            {t.services.back_to_services || 'Back to Services'}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <SectionReveal>
              <div className={isRTL ? 'text-right' : ''}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">
                  {serviceName}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {serviceDesc}
                </p>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div className="relative h-[400px] rounded-3xl overflow-hidden">
                {service.image ? (
                  <Image
                    src={service.image}
                    alt={serviceName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Icon className="w-32 h-32 text-primary/40" />
                  </div>
                )}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {features && features.length > 0 && (
        <section className="py-16 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionReveal>
              <h2 className={`text-3xl font-bold mb-8 ${isRTL ? 'text-right' : ''}`}>
                {t.services.features || 'Features'}
              </h2>
            </SectionReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <SectionReveal key={i} delay={i * 0.05}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`glass-card rounded-xl p-6 flex items-start gap-4 ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-sm text-foreground font-medium">{feature}</p>
                  </motion.div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      {benefits && benefits.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionReveal>
              <h2 className={`text-3xl font-bold mb-8 ${isRTL ? 'text-right' : ''}`}>
                {t.services.benefits || 'Benefits'}
              </h2>
            </SectionReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, i) => (
                <SectionReveal key={i} delay={i * 0.05}>
                  <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <p className="text-base text-muted-foreground">{benefit}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
