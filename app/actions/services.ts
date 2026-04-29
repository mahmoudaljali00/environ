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
