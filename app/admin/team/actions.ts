'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createTeamMember(data: {
  name: string
  nameAr: string
  role: string
  roleAr: string
  image: string
  bio?: string
  bioAr?: string
  order?: number
  published?: boolean
}) {
  try {
    const member = await prisma.teamMember.create({
      data: {
        id: `team-${Date.now()}`,
        name: data.name,
        nameAr: data.nameAr,
        role: data.role,
        roleAr: data.roleAr,
        image: data.image,
        bio: data.bio,
        bioAr: data.bioAr,
        order: data.order ?? 0,
        published: data.published ?? true
      }
    })
    revalidatePath('/admin/team')
    revalidatePath('/')
    return { success: true, data: member }
  } catch (error) {
    console.error('[/] Error creating team member:', error)
    return { success: false, error: 'Failed to create team member' }
  }
}

export async function updateTeamMember(id: string, data: Partial<{
  name: string
  nameAr: string
  role: string
  roleAr: string
  image: string
  bio: string
  bioAr: string
  order: number
  published: boolean
}>) {
  try {
    const member = await prisma.teamMember.update({
      where: { id },
      data
    })
    revalidatePath('/admin/team')
    revalidatePath('/')
    return { success: true, data: member }
  } catch (error) {
    console.error('[/] Error updating team member:', error)
    return { success: false, error: 'Failed to update team member' }
  }
}

export async function deleteTeamMember(id: string) {
  try {
    await prisma.teamMember.delete({ where: { id } })
    revalidatePath('/admin/team')
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('[/] Error deleting team member:', error)
    return { success: false, error: 'Failed to delete team member' }
  }
}
