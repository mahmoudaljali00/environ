'use server'

import { prisma } from '@/lib/prisma'

export async function getStats() {
  try {
    const stats = await prisma.stat.findMany({
      where: { published: true },
      orderBy: { sortOrder: 'asc' },
    })
    return { success: true, data: stats }
  } catch (error) {
    console.error('[/] Error fetching stats:', error)
    return { success: false, error: 'Failed to fetch stats' }
  }
}

export async function getAllStats() {
  try {
    const stats = await prisma.stat.findMany({
      orderBy: { sortOrder: 'asc' },
    })
    return { success: true, data: stats }
  } catch (error) {
    console.error('[/] Error fetching all stats:', error)
    return { success: false, error: 'Failed to fetch stats' }
  }
}

export async function createStat(data: {
  key: string
  value: string
  labelEn: string
  labelAr: string
  sortOrder?: number
}) {
  try {
    const stat = await prisma.stat.create({
      data: {
        key: data.key,
        value: data.value,
        labelEn: data.labelEn,
        labelAr: data.labelAr,
        sortOrder: data.sortOrder ?? 0,
      },
    })
    return { success: true, data: stat }
  } catch (error) {
    console.error('[/] Error creating stat:', error)
    return { success: false, error: 'Failed to create stat' }
  }
}

export async function updateStat(
  id: string,
  data: {
    value?: string
    labelEn?: string
    labelAr?: string
    sortOrder?: number
    published?: boolean
  }
) {
  try {
    const stat = await prisma.stat.update({
      where: { id },
      data,
    })
    return { success: true, data: stat }
  } catch (error) {
    console.error('[/] Error updating stat:', error)
    return { success: false, error: 'Failed to update stat' }
  }
}

export async function deleteStat(id: string) {
  try {
    await prisma.stat.delete({
      where: { id },
    })
    return { success: true }
  } catch (error) {
    console.error('[/] Error deleting stat:', error)
    return { success: false, error: 'Failed to delete stat' }
  }
}
