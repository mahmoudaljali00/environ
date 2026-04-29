'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

export async function getServices() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return { success: true, data: services }
  } catch (error) {
    console.error('Error fetching services:', error)
    return { success: false, error: 'Failed to fetch services' }
  }
}

export async function createService(data: {
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  icon: string
  featuresEn?: string[]
  featuresAr?: string[]
  benefits?: string[]
  benefitsAr?: string[]
  image?: string | null
  published?: boolean
}) {
  try {
    const slug = data.name.toLowerCase().replace(/\s+/g, '-')
    const service = await prisma.service.create({
      data: {
        id: slug,
        slug,
        name: data.name,
        nameAr: data.nameAr,
        description: data.description,
        descriptionAr: data.descriptionAr,
        icon: data.icon,
        featuresEn: data.featuresEn || [],
        featuresAr: data.featuresAr || [],
        benefits: data.benefits || [],
        benefitsAr: data.benefitsAr || [],
        image: data.image,
        published: data.published ?? true
      }
    })
    revalidatePath('/admin/services')
    revalidatePath('/services')
    return { success: true, data: service }
  } catch (error) {
    console.error('[v0] Error creating service:', error)
    return { success: false, error: 'Failed to create service or maybe the name already exists' }
  }
}

export async function updateService(id: string, data: Partial<{
  name: string
  nameAr: string
  slug: string
  description: string
  descriptionAr: string
  icon: string
  featuresEn: string[]
  featuresAr: string[]
  benefits: string[]
  benefitsAr: string[]
  image: string | null
  published: boolean
}>) {
  try {
    // Update slug if name changes
    const updateData: any = { ...data }
    if (data.name) {
      updateData.slug = data.name.toLowerCase().replace(/\s+/g, '-')
    }
    
    const service = await prisma.service.update({
      where: { id },
      data: updateData
    })
    revalidatePath('/admin/services')
    revalidatePath('/services')
    return { success: true, data: service }
  } catch (error) {
    console.error('[/] Error updating service:', error)
    return { success: false, error: 'Failed to update service' }
  }
}

export async function deleteService(id: string) {
  try {
    await prisma.service.delete({
      where: { id }
    })
    revalidatePath('/admin/services')
    revalidatePath('/services')
    return { success: true }
  } catch (error) {
    console.error('[/] Error deleting service:', error)
    return { success: false, error: 'Failed to delete service' }
  }
}
