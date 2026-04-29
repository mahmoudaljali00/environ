'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLang } from '@/components/lang-provider'
import SectionReveal from '@/components/section-reveal'

type TeamMember = {
  id: string
  name: string
  nameAr: string
  role: string
  roleAr: string
  image: string
}

export default function TeamSection({ team }: { team: TeamMember[] }) {
  const { t, lang } = useLang()

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pattern-bg opacity-[0.04]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-16">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">
            {t.team.title}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.team.title}</h2>
          <p className="text-muted-foreground">{t.team.subtitle}</p>
        </SectionReveal>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <SectionReveal key={member.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="glass-card rounded-2xl p-6 text-center flex flex-col items-center gap-4"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/30">
                  <img
                    src={member.image}
                    alt={lang === 'ar' ? member.nameAr : member.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover bg-primary/20"
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    {lang === 'ar' ? member.nameAr : member.name}
                  </p>
                  <p className="text-xs text-primary mt-0.5">
                    {lang === 'ar' ? member.roleAr : member.role}
                  </p>
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
