'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Zap, Wind, Wrench, Droplets, Shield, HardHat, ShoppingBag, Settings,
} from 'lucide-react'
import { useLang } from '@/components/lang-provider'
import SectionReveal from '@/components/section-reveal'

const icons = [Settings, Zap, Wind, Wrench, Droplets, Shield, HardHat, ShoppingBag]

type Service = {
  id: string
  name: string
  nameAr: string
  slug: string
  description: string
  descriptionAr: string
  icon: string
}

export default function ServicesPreview({ services }: { services: Service[] }) {
  const { t, isRTL } = useLang()

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 pattern-bg opacity-[0.04]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-16">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">
            {t.nav.services}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance mb-4">
            {t.services.title}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {t.services.subtitle}
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => {
            const Icon = icons[i % icons.length]
            return (
              <SectionReveal key={service.id} delay={i * 0.07}>
                <Link href={`/services/${service.slug}`} className="block h-full">
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="glass-card rounded-2xl p-6 h-full flex flex-col gap-4 group cursor-pointer"
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>

                    {/* Number badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-muted-foreground">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="w-6 h-0.5 bg-primary/30 group-hover:w-12 group-hover:bg-primary transition-all duration-300 rounded-full" />
                    </div>

                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {isRTL ? service.nameAr : service.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {isRTL ? service.descriptionAr.slice(0, 100) : service.description.slice(0, 100)}
                    </p>

                    <span className="text-xs text-primary font-medium group-hover:underline mt-auto">
                      {t.services.view_details} →
                    </span>
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
