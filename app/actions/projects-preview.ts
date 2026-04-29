'use server'

import { prisma } from '@/lib/prisma'

export async function getFeaturedProjects() {
  try {
    const projects = await prisma.project.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 3
    })
    return { success: true, data: projects }
  } catch (error) {
    console.error('[/] Error fetching featured projects:', error)
    return { success: false, error: 'Failed to fetch projects' }
  }
}
