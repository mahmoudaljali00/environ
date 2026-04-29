'use server'

import { prisma } from '@/lib/prisma'

export async function getTestimonials() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { order: 'asc' }
    })
    return { success: true, data: testimonials }
  } catch (error) {
    console.error('[/] Error fetching testimonials:', error)
    return { success: false, error: 'Failed to fetch testimonials' }
  }
}
