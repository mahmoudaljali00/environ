'use client'

import { motion } from 'framer-motion'
import { useLang } from '@/components/lang-provider'
import SectionReveal from '@/components/section-reveal'

type Client = {
  id: string
  name: string
  nameAr: string
}

export default function ClientsSection({ clients }: { clients: Client[] }) {
  const { t, lang } = useLang()

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-card/30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-12">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">
            {t.clients.title}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">{t.clients.title}</h2>
          <p className="text-muted-foreground text-sm">{t.clients.subtitle}</p>
        </SectionReveal>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {clients.map((client, i) => (
            <SectionReveal key={client.id} delay={i * 0.06}>
              <motion.div
                whileHover={{ scale: 1.04 }}
                className="glass-card rounded-xl py-5 px-4 flex items-center justify-center text-center cursor-default"
              >
                <p className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                  {lang === 'ar' ? client.nameAr : client.name}
                </p>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
