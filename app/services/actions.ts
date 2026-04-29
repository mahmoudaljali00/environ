'use server'

import { prisma } from '@/lib/prisma'

export async function getAllServices() {
  try {
    const services = await prisma.service.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' }
    })
    return { success: true, data: services }
  } catch (error) {
    console.error(' Error fetching services:', error)
    return { success: false, error: 'Failed to fetch services', data: [] }
  }
}

export async function getServiceBySlug(slug: string) {
  try {
    const service = await prisma.service.findUnique({
      where: { slug },
      include: {
        products: {
          where: { published: true },
          take: 6
        }
      }
    })
    
    if (!service) {
      return { success: false, error: 'Service not found', data: null }
    }
    
    return { success: true, data: service }
  } catch (error) {
    console.error('[/] Error fetching service:', error)
    return { success: false, error: 'Failed to fetch service', data: null }
  }
}
