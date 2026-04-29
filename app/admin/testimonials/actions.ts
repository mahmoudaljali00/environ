'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createTestimonial(data: {
  name: string
  nameAr: string
  role: string
  roleAr: string
  text: string
  textAr: string
  rating?: number
  order?: number
  published?: boolean
}) {
  try {
    const testimonial = await prisma.testimonial.create({
      data: {
        id: `testimonial-${Date.now()}`,
        name: data.name,
        nameAr: data.nameAr,
        role: data.role,
        roleAr: data.roleAr,
        text: data.text,
        textAr: data.textAr,
        rating: data.rating ?? 5,
        order: data.order ?? 0,
        published: data.published ?? true
      }
    })
    revalidatePath('/admin/testimonials')
    revalidatePath('/')
    return { success: true, data: testimonial }
  } catch (error) {
    console.error('[/] Error creating testimonial:', error)
    return { success: false, error: 'Failed to create testimonial' }
  }
}

export async function updateTestimonial(id: string, data: Partial<{
  name: string
  nameAr: string
  role: string
  roleAr: string
  text: string
  textAr: string
  rating: number
  order: number
  published: boolean
}>) {
  try {
    const testimonial = await prisma.testimonial.update({
      where: { id },
      data
    })
    revalidatePath('/admin/testimonials')
    revalidatePath('/')
    return { success: true, data: testimonial }
  } catch (error) {
    console.error('[/] Error updating testimonial:', error)
    return { success: false, error: 'Failed to update testimonial' }
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await prisma.testimonial.delete({ where: { id } })
    revalidatePath('/admin/testimonials')
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('[/] Error deleting testimonial:', error)
    return { success: false, error: 'Failed to delete testimonial' }
  }
}
