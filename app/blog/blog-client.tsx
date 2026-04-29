'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLang } from '@/components/lang-provider'
import SectionReveal from '@/components/section-reveal'
import Navbar from '@/components/navbar'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

type BlogPost = {
  id: string
  title: string
  titleAr: string
  slug: string
  category: string
  excerpt: string
  excerptAr: string
  image: string
  authorName: string
  readingTime: number
  publishedAt: Date
}

export default function BlogClient({ posts }: { posts: BlogPost[] }) {
  const { t, isRTL } = useLang()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = ['all', ...Array.from(new Set(posts.map((p) => p.category)))]

  const filteredPosts =
    selectedCategory === 'all'
      ? posts
      : posts.filter((p) => p.category === selectedCategory)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 border-b border-border/30">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionReveal>
            <div className={cn('text-center', isRTL && 'text-right')}>
              <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">
                {t.blog.label}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                {t.blog.title}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                {t.blog.subtitle}
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b border-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn('flex flex-wrap gap-3', isRTL && 'flex-row-reverse')}>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat
              const label = cat === 'all' ? t.blog.all_posts : cat
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    'px-4 py-1.5 rounded-full text-sm font-medium transition-all',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-card/50 text-muted-foreground hover:bg-card border border-border/50'
                  )}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">{t.blog.no_posts}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, i) => {
                const title = isRTL ? post.titleAr : post.title
                const excerpt = isRTL ? post.excerptAr : post.excerpt
                const date = new Date(post.publishedAt).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })
                return (
                  <SectionReveal key={post.id} delay={i * 0.08}>
                    <Link href={`/blog/${post.slug}`} className="group block h-full">
                      <article className="glass-card rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300 flex flex-col h-full">
                        {/* Image */}
                        <div className="relative aspect-video">
                          <Image
                            src={post.image}
                            alt={title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {/* Category Badge */}
                          <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-[10px] font-semibold uppercase tracking-wide rounded-full">
                              {post.category}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className={cn('p-5 flex flex-col flex-1', isRTL && 'text-right')}>
                          {/* Meta */}
                          <div
                            className={cn(
                              'flex items-center gap-4 text-xs text-muted-foreground mb-3',
                              isRTL && 'flex-row-reverse'
                            )}
                          >
                            <div className={cn('flex items-center gap-1', isRTL && 'flex-row-reverse')}>
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{date}</span>
                            </div>
                            <div className={cn('flex items-center gap-1', isRTL && 'flex-row-reverse')}>
                              <Clock className="w-3.5 h-3.5" />
                              <span>{post.readingTime} {t.blog.reading_time}</span>
                            </div>
                          </div>

                          {/* Title */}
                          <h2 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2 text-balance">
                            {title}
                          </h2>

                          {/* Excerpt */}
                          <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1 text-pretty">
                            {excerpt}
                          </p>

                          {/* Read More */}
                          <div
                            className={cn(
                              'flex items-center gap-1.5 text-sm text-primary font-medium',
                              isRTL && 'flex-row-reverse justify-end'
                            )}
                          >
                            <span>{t.blog.read_more}</span>
                            <ArrowRight className={cn('w-4 h-4 group-hover:translate-x-1 transition-transform', isRTL && 'rotate-180 group-hover:-translate-x-1')} />
                          </div>
                        </div>
                      </article>
                    </Link>
                  </SectionReveal>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
