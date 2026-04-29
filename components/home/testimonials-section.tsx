'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useLang } from '@/components/lang-provider'
import SectionReveal from '@/components/section-reveal'

type Testimonial = {
  id: string
  name: string
  nameAr: string
  role: string
  roleAr: string
  text: string
  textAr: string
  rating: number
}

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const { t, lang } = useLang()
  const [idx, setIdx] = useState(0)
  
  if (testimonials.length === 0) return null

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-primary/20" />
      <div className="absolute inset-0 bg-card/40" />
      <div className="absolute inset-0 pattern-bg opacity-[0.04]" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-12">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">
            {t.testimonials.label}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.testimonials.title}</h2>
          <p className="text-muted-foreground">{t.testimonials.subtitle}</p>
        </SectionReveal>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="glass-card rounded-3xl p-8 sm:p-12 text-center"
            >
              <Quote className="w-10 h-10 text-primary/40 mx-auto mb-6" />

              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: testimonials[idx].rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              <p className="text-lg sm:text-xl text-foreground/90 leading-relaxed mb-8 italic">
                &ldquo;{lang === 'ar' ? testimonials[idx].textAr : testimonials[idx].text}&rdquo;
              </p>

              <div>
                <p className="font-semibold text-foreground">
                  {lang === 'ar' ? testimonials[idx].nameAr : testimonials[idx].name}
                </p>
                <p className="text-sm text-primary mt-0.5">
                  {lang === 'ar' ? testimonials[idx].roleAr : testimonials[idx].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === idx ? 'w-6 h-2 bg-primary' : 'w-2 h-2 bg-border/60 hover:bg-primary/50'
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setIdx((i) => (i + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
