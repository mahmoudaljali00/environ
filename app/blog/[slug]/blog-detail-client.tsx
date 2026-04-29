'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLang } from '@/components/lang-provider'
import Navbar from '@/components/navbar'
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import { cn } from '@/lib/utils'

type BlogPost = {
  id: string
  title: string
  titleAr: string
  slug: string
  category: string
  excerpt: string
  excerptAr: string
  content: string
  contentAr: string
  image: string
  authorName: string
  authorRole: string
  readingTime: number
  publishedAt: Date
}

export default function BlogDetailClient({ post }: { post: BlogPost }) {
  const { isRTL } = useLang()
  const title = isRTL ? post.titleAr : post.title
  const content = isRTL ? post.contentAr : post.content
  const date = new Date(post.publishedAt).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <article className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            href="/blog"
            className={cn(
              'inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8',
              isRTL && 'flex-row-reverse'
            )}
          >
            <ArrowLeft className={cn('w-4 h-4', isRTL && 'rotate-180')} />
            <span>{isRTL ? 'العودة إلى المدونة' : 'Back to Blog'}</span>
          </Link>

          {/* Category & Meta */}
          <div className={cn('flex items-center gap-4 mb-6', isRTL && 'flex-row-reverse')}>
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
              {post.category}
            </span>
            <div className={cn('flex items-center gap-4 text-sm text-muted-foreground', isRTL && 'flex-row-reverse')}>
              <div className={cn('flex items-center gap-1', isRTL && 'flex-row-reverse')}>
                <Calendar className="w-4 h-4" />
                <span>{date}</span>
              </div>
              <div className={cn('flex items-center gap-1', isRTL && 'flex-row-reverse')}>
                <Clock className="w-4 h-4" />
                <span>{post.readingTime} {isRTL ? 'دقيقة' : 'min'}</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className={cn('text-4xl md:text-5xl font-bold mb-6 text-balance', isRTL && 'text-right')}>
            {title}
          </h1>

          {/* Author */}
          <div className={cn('flex items-center gap-3 mb-10 pb-10 border-b border-border', isRTL && 'flex-row-reverse')}>
            <User className="w-10 h-10 p-2 rounded-full bg-primary/10 text-primary" />
            <div className={cn(isRTL && 'text-right')}>
              <div className="font-semibold">{post.authorName}</div>
              <div className="text-sm text-muted-foreground">{post.authorRole}</div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-10">
            <Image
              src={post.image}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div className={cn('prose prose-neutral dark:prose-invert max-w-none', isRTL && 'text-right')} dir={isRTL ? 'rtl' : 'ltr'}>
            {content.split('\n').map((paragraph, i) => (
              paragraph.trim() && (
                <p key={i} className="text-lg leading-relaxed mb-6 text-pretty">
                  {paragraph}
                </p>
              )
            ))}
          </div>
        </div>
      </article>
    </main>
  )
}
