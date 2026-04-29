'use server'

import { prisma } from '@/lib/prisma'

export async function getServiceBySlug(slug: string) {
  try {
    const service = await prisma.service.findUnique({
      where: { slug }
    })
    
    if (!service) {
      return { success: false, error: 'Service not found' }
    }
    
    return { success: true, data: service }
  } catch (error) {
    console.error('[/] Error fetching service:', error)
    return { success: false, error: 'Failed to fetch service' }
  }
}