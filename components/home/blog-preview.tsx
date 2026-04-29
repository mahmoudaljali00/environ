'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'
import { useLang } from '@/components/lang-provider'
import SectionReveal from '@/components/section-reveal'

const posts = [
  {
    id: 'solar-future-sudan',
    title: 'The Future of Solar Energy in Sudan',
    excerpt: 'How renewable energy is transforming the power landscape across East Africa and what it means for infrastructure development.',
    date: '2025-03-15',
    category: 'Energy',
  },
  {
    id: 'mep-best-practices',
    title: 'MEP Best Practices for Commercial Buildings',
    excerpt: 'A comprehensive guide to designing and installing mechanical, electrical, and plumbing systems that meet international standards.',
    date: '2025-02-28',
    category: 'Engineering',
  },
  {
    id: 'water-systems-africa',
    title: 'Water Pump Systems in Arid Environments',
    excerpt: 'Engineering reliable water distribution networks in challenging desert climates requires specialized expertise and adaptive design.',
    date: '2025-02-10',
    category: 'Infrastructure',
  },
]

export default function BlogPreview() {
  const { t } = useLang()

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pattern-bg opacity-[0.04]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-16">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">
            {t.blog.label}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.blog.title}</h2>
          <p className="text-muted-foreground">{t.blog.subtitle}</p>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <SectionReveal key={post.id} delay={i * 0.1}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="glass-card rounded-2xl p-6 flex flex-col gap-4 h-full"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/15 text-primary">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                <h3 className="font-semibold text-foreground leading-snug">{post.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{post.excerpt}</p>

                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all mt-auto"
                >
                  {t.blog.read_more} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
