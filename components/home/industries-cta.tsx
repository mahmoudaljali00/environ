'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Heart, GraduationCap, Landmark, Building2, Users } from 'lucide-react'
import { useLang } from '@/components/lang-provider'
import SectionReveal from '@/components/section-reveal'

const icons = [Zap, Heart, GraduationCap, Landmark, Building2, Users]

export default function IndustriesCTA() {
  const { t, isRTL } = useLang()

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-card/60" />
      <div className="absolute inset-0 pattern-bg opacity-[0.05]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          {/* Industries */}
          <div>
            <SectionReveal>
              <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">
                {t.industries.title}
              </span>
              <h2 className={`text-3xl sm:text-4xl font-bold mb-8 text-balance ${isRTL ? 'text-right' : ''}`}>
                {t.industries.subtitle}
              </h2>
            </SectionReveal>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {t.industries.items.map((ind, i) => {
                const Icon = icons[i % icons.length]
                return (
                  <SectionReveal key={ind.title} delay={i * 0.08}>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -4 }}
                      className="glass-card rounded-xl p-4 text-center flex flex-col items-center gap-2"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-xs font-medium text-muted-foreground">{ind.title}</p>
                    </motion.div>
                  </SectionReveal>
                )
              })}
            </div>
          </div>

          {/* CTA */}
          <SectionReveal delay={0.2}>
            <div className="glass-card rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-2">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-balance">
                {t.contact.subtitle}
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-sm">
                {t.about.overview}
              </p>
              <Link
                href="/contact"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all hover:scale-105 active:scale-100 ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                {t.industries.cta} <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </Link>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
