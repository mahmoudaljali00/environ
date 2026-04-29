'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createClient(data: {
  name: string
  nameAr: string
  logo?: string
  order?: number
  published?: boolean
}) {
  try {
    const client = await prisma.client.create({
      data: {
        id: `client-${Date.now()}`,
        name: data.name,
        nameAr: data.nameAr,
        logo: data.logo,
        order: data.order ?? 0,
        published: data.published ?? true
      }
    })
    revalidatePath('/admin/clients')
    revalidatePath('/')
    return { success: true, data: client }
  } catch (error) {
    console.error('[/] Error creating client:', error)
    return { success: false, error: 'Failed to create client or maybe the name already exists' }
  }
}

export async function updateClient(id: string, data: Partial<{
  name: string
  nameAr: string
  logo: string | null
  order: number
  published: boolean
}>) {
  try {
    const client = await prisma.client.update({
      where: { id },
      data
    })
    revalidatePath('/admin/clients')
    revalidatePath('/')
    return { success: true, data: client }
  } catch (error) {
    console.error('[/] Error updating client:', error)
    return { success: false, error: 'Failed to update client' }
  }
}

export async function deleteClient(id: string) {
  try {
    await prisma.client.delete({ where: { id } })
    revalidatePath('/admin/clients')
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('[/] Error deleting client:', error)
    return { success: false, error: 'Failed to delete client' }
  }
}
