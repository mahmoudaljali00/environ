'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Wind, Wrench, Droplets, Shield, HardHat, ShoppingBag, Settings } from 'lucide-react'
import Navbar from '@/components/navbar'
import SectionReveal from '@/components/section-reveal'
import { useLang } from '@/components/lang-provider'

const icons = [Settings, Zap, Wind, Wrench, Droplets, Shield, HardHat, ShoppingBag]

type Service = {
  id: string
  name: string
  nameAr: string
  slug: string
  description: string
  descriptionAr: string
  icon: string
  image?: string | null
}

export default function ServicesPageClient({ services }: { services: Service[] }) {
  const { t, isRTL, lang } = useLang()

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pattern-bg opacity-[0.05]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/8 blur-[80px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal>
            <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">
              {t.services.what_we_do}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-balance">
              {t.services.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t.services.subtitle}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = icons[i % icons.length]
              const serviceName = lang === 'ar' ? service.nameAr : service.name
              const serviceDesc = lang === 'ar' ? service.descriptionAr : service.description
              
              return (
                <SectionReveal key={service.id} delay={i * 0.06}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="glass-card rounded-2xl overflow-hidden h-full flex flex-col"
                  >
                    {/* Image */}
                    <div
                      className="relative h-48 bg-cover bg-center overflow-hidden"
                      style={{ backgroundImage: `url(${service.image ?? '/project-1.jpg'})` }}
                    >
                      <div className="absolute inset-0 bg-background/60" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-2xl bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                      </div>
                      <div className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'}`}>
                        <span className="text-xs font-semibold text-muted-foreground bg-background/60 backdrop-blur-sm px-2 py-1 rounded-full">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`p-6 flex flex-col gap-3 flex-1 ${isRTL ? 'text-right' : ''}`}>
                      <h3 className="text-lg font-semibold text-foreground">{serviceName}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                        {serviceDesc.slice(0, 120)}...
                      </p>
                      <Link
                        href={`/services/${service.slug}`}
                        className={`inline-flex items-center gap-1.5 text-primary text-sm font-medium hover:gap-2.5 transition-all mt-2 ${isRTL ? 'flex-row-reverse' : ''}`}
                      >
                        {t.services.view_details} <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                      </Link>
                    </div>
                  </motion.div>
                </SectionReveal>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
