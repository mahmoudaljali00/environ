'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return { success: true, data: projects }
  } catch (error) {
    console.error('[/] Error fetching projects:', error)
    return { success: false, error: 'Failed to fetch projects' }
  }
}

export async function createProject(data: {
  title: string
  titleAr: string
  category: string
  description: string
  descriptionAr: string
  location: string
  locationAr: string
  client: string
  clientAr: string
  year: number
  duration: string
  durationAr: string
  image: string
  images?: string[]
  challenge: string
  challengeAr: string
  solution: string
  solutionAr: string
  results?: string[]
  resultsAr?: string[]
  published?: boolean
}) {
  try {
    const slug = data.title.toLowerCase().replace(/\s+/g, '-')
    const project = await prisma.project.create({
      data: {
        id: slug,
        slug,
        title: data.title,
        titleAr: data.titleAr,
        category: data.category,
        description: data.description,
        descriptionAr: data.descriptionAr,
        location: data.location,
        locationAr: data.locationAr,
        client: data.client,
        clientAr: data.clientAr,
        year: data.year,
        duration: data.duration,
        durationAr: data.durationAr,
        image: data.image,
        images: data.images || [],
        challenge: data.challenge,
        challengeAr: data.challengeAr,
        solution: data.solution,
        solutionAr: data.solutionAr,
        results: data.results || [],
        resultsAr: data.resultsAr || [],
        published: data.published ?? true
      }
    })
    revalidatePath('/admin/projects')
    revalidatePath('/projects')
    return { success: true, data: project }
  } catch (error) {
    console.error('[/] Error creating project:', error)
    return { success: false, error: 'Failed to create project or maybe the title already exists' }
  }
}

export async function updateProject(id: string, data: Partial<{
  title: string
  titleAr: string
  category: string
  description: string
  descriptionAr: string
  location: string
  locationAr: string
  client: string
  clientAr: string
  year: number
  duration: string
  durationAr: string
  image: string
  images: string[]
  challenge: string
  challengeAr: string
  solution: string
  solutionAr: string
  results: string[]
  resultsAr: string[]
  published: boolean
}>) {
  try {
    const updateData: any = { ...data }
    if (data.title) {
      updateData.slug = data.title.toLowerCase().replace(/\s+/g, '-')
    }
    
    const project = await prisma.project.update({
      where: { id },
      data: updateData
    })
    revalidatePath('/admin/projects')
    revalidatePath('/projects')
    return { success: true, data: project }
  } catch (error) {
    console.error('[/] Error updating project:', error)
    return { success: false, error: 'Failed to update project' }
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: { id }
    })
    revalidatePath('/admin/projects')
    revalidatePath('/projects')
    return { success: true }
  } catch (error) {
    console.error('[/] Error deleting project:', error)
    return { success: false, error: 'Failed to delete project' }
  }
}
