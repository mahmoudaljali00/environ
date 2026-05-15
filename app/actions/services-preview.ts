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

export async function getHomeServices() {
  try {
    const services = await prisma.service.findMany({
      select: {
        id: true,
        name: true,
        nameAr: true,
        slug: true,
        description: true,
        descriptionAr: true,
        icon: true,
      },
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 6
    })
    return { success: true, data: services }
  } catch (error) {
    console.error(' Error fetching services:', error)
    return { success: false, error: 'Failed to fetch services', data: [] }
  }
}

export async function getFooterServices() {
  try {
    const services = await prisma.service.findMany({
      select: {
        id: true,
        name: true,
        nameAr: true,
        slug: true
      },
      orderBy: { createdAt: 'asc' },
      take: 5
    })
    return { success: true, data: services }
  } catch (error) {
    console.error(' Error fetching services:', error)
    return { success: false, error: 'Failed to fetch services', data: [] }
  }
}

