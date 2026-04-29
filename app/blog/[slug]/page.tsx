import { notFound } from 'next/navigation'
import { getBlogPostBySlug } from '../actions'
import BlogDetailClient from './blog-detail-client'

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const result = await getBlogPostBySlug(slug)

  if (!result.success || !result.data) {
    notFound()
  }

  return <BlogDetailClient post={result.data} />
}
