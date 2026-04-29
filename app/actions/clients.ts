'use server'

import { prisma } from '@/lib/prisma'

export async function getClients() {
  try {
    const clients = await prisma.client.findMany({
      where: { published: true },
      orderBy: { order: 'asc' }
    })
    return { success: true, data: clients }
  } catch (error) {
    console.error('Error fetching clients:', error)
    return { success: false, error: 'Failed to fetch clients' }
  }
}
