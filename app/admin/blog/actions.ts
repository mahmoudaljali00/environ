'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

export async function getBlogPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return { success: true, data: posts }
  } catch (error) {
    console.error('[/] Error fetching blog posts:', error)
    return { success: false, error: 'Failed to fetch blog posts' }
  }
}

export async function createBlogPost(data: {
  title: string
  titleAr: string
  category: string
  excerpt: string
  excerptAr: string
  content: string
  contentAr: string
  image: string
  authorName: string
  authorRole: string
  readingTime: number
  published?: boolean
}) {
  try {
    const slug = data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    const post = await prisma.blogPost.create({
      data: {
        id: slug,
        slug,
        title: data.title,
        titleAr: data.titleAr,
        category: data.category,
        excerpt: data.excerpt,
        excerptAr: data.excerptAr,
        content: data.content,
        contentAr: data.contentAr,
        image: data.image,
        authorName: data.authorName,
        authorRole: data.authorRole,
        readingTime: data.readingTime,
        published: data.published ?? true
      }
    })
    revalidatePath('/admin/blog')
    revalidatePath('/blog')
    return { success: true, data: post }
  } catch (error) {
    console.error('[/] Error creating blog post:', error)
    return { success: false, error: 'Failed to create blog post or maybe the title already exists' }
  }
}

export async function updateBlogPost(id: string, data: Partial<{
  title: string
  titleAr: string
  category: string
  excerpt: string
  excerptAr: string
  content: string
  contentAr: string
  image: string
  authorName: string
  authorRole: string
  readingTime: number
  published: boolean
}>) {
  try {
    const updateData: any = { ...data }
    if (data.title) {
      updateData.slug = data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    }
    
    const post = await prisma.blogPost.update({
      where: { id },
      data: updateData
    })
    revalidatePath('/admin/blog')
    revalidatePath('/blog')
    return { success: true, data: post }
  } catch (error) {
    console.error('[/] Error updating blog post:', error)
    return { success: false, error: 'Failed to update blog post' }
  }
}

export async function deleteBlogPost(id: string) {
  try {
    await prisma.blogPost.delete({
      where: { id }
    })
    revalidatePath('/admin/blog')
    revalidatePath('/blog')
    return { success: true }
  } catch (error) {
    console.error('[/] Error deleting blog post:', error)
    return { success: false, error: 'Failed to delete blog post' }
  }
}
