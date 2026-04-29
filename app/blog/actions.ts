'use server'

import { prisma } from '@/lib/prisma'

export async function getBlogPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' }
    })
    return { success: true, data: posts }
  } catch (error) {
    console.error('[/] Error fetching blog posts:', error)
    return { success: false, data: [] }
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug }
    })
    return { success: true, data: post }
  } catch (error) {
    console.error('[/] Error fetching blog post:', error)
    return { success: false, data: null }
  }
}
