'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, ArrowRight } from 'lucide-react'
import Navbar from '@/components/navbar'
import SectionReveal from '@/components/section-reveal'
import { useLang } from '@/components/lang-provider'

type Project = {
  id: string
  title: string
  titleAr: string
  slug: string
  category: string
  description: string
  descriptionAr: string
  location: string
  locationAr: string
  year: number
  image: string
  images: string[]
}

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const { t, isRTL, lang } = useLang()
  const [activeFilter, setActiveFilter] = useState(0)

  const englishFilters = ['All', 'Engineering', 'Energy', 'MEP', 'Infrastructure']

  const filtered = activeFilter === 0
    ? projects
    : projects.filter((p) => p.category === englishFilters[activeFilter])

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
              {t.projects.portfolio}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-balance">
              {t.projects.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              {t.projects.subtitle}
            </p>
          </SectionReveal>

          {/* Filters */}
          <SectionReveal delay={0.1}>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
              {t.projects.filters.map((cat: string, idx: number) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(idx)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    activeFilter === idx
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border/60 text-muted-foreground hover:border-primary/50 hover:text-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -8 }}
                  className="glass-card rounded-2xl overflow-hidden flex flex-col group"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={lang === 'ar' ? project.titleAr : project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-colors" />
                    <div className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'}`}>
                      <span className="px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                        {project.category}
                      </span>
                    </div>
                    <div className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'}`}>
                      <span className="px-2.5 py-1 rounded-full bg-background/60 backdrop-blur-sm text-foreground text-xs">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`p-5 flex flex-col gap-3 flex-1 ${isRTL ? 'text-right' : ''}`}>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {lang === 'ar' ? project.titleAr : project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {lang === 'ar' ? project.descriptionAr : project.description}
                    </p>

                    <div className={`flex items-center gap-1 text-xs text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <MapPin className="w-3 h-3 text-primary" />
                      {lang === 'ar' ? project.locationAr : project.location}
                    </div>

                    <Link
                      href={`/projects/${project.slug}`}
                      className={`inline-flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                      {t.projects.view_project} <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  )
}
