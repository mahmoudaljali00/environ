'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { useLang } from '@/components/lang-provider'
import SectionReveal from '@/components/section-reveal'

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

export default function ProjectsCarousel({ projects }: { projects: Project[] }) {
  const { t } = useLang()
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c - 1 + projects.length) % projects.length)
  const next = () => setCurrent((c) => (c + 1) % projects.length)

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-primary/20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">
              {t.nav.projects}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
              {t.projects.title}
            </h2>
          </div>
          <Link
            href="/projects"
            className="flex-shrink-0 text-sm font-medium text-primary hover:underline flex items-center gap-1"
          >
            {t.projects.view_all} <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </SectionReveal>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden glass-card">
                <Image
                  src={projects[current].image}
                  alt={projects[current].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-background/20" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    {projects[current].category}
                  </span>
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {String(current + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3">{projects[current].title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{projects[current].description}</p>
                </div>
                <Link
                  href={`/projects/${projects[current].id}`}
                  className="inline-flex items-center gap-2 text-primary text-sm font-semibold hover:gap-3 transition-all"
                >
                  View Project <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center gap-3 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-colors"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? 'w-6 h-2 bg-primary' : 'w-2 h-2 bg-border/60 hover:bg-primary/50'
                  }`}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-colors"
              aria-label="Next project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
