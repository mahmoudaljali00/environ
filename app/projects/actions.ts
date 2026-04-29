'use server'

import { prisma } from '@/lib/prisma'

export async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' }
    })
    return { success: true, data: projects }
  } catch (error) {
    console.error('[/] Error fetching projects:', error)
    return { success: false, error: 'Failed to fetch projects' }
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { slug }
    })
    return { success: true, data: project }
  } catch (error) {
    console.error('[/] Error fetching project:', error)
    return { success: false, error: 'Failed to fetch project' }
  }
}
