'use server'

import { prisma } from '@/lib/prisma'

export async function getTeamMembers() {
  try {
    const members = await prisma.teamMember.findMany({
      where: { published: true },
      orderBy: { order: 'asc' }
    })
    return { success: true, data: members }
  } catch (error) {
    console.error('[/] Error fetching team members:', error)
    return { success: false, error: 'Failed to fetch team members' }
  }
}
