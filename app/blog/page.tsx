import { Metadata } from 'next'
import { getBlogPosts } from './actions'
import BlogClient from './blog-client'

export const metadata: Metadata = {
  title: 'Blog & News',
  description: 'Latest news, insights, and updates from ENVIRON about engineering, energy solutions, and industry trends in Sudan.',
  keywords: ['engineering blog', 'energy news Sudan', 'MEP insights', 'construction updates', 'infrastructure news'],
  openGraph: {
    title: 'Blog & News | ENVIRON',
    description: 'Stay updated with the latest engineering and energy industry news.',
    images: ['/og-blog.jpg'],
  },
}

export const revalidate = 60

export default async function BlogPage() {
  const result = await getBlogPosts()
  return <BlogClient posts={result.data || []} />
}
