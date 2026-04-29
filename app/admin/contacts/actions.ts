'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getAllContacts() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return { success: true, data: contacts }
  } catch (error) {
    console.error('[/] Error fetching contacts:', error)
    return { success: false, error: 'Failed to fetch contacts' }
  }
}

export async function updateContactStatus(id: string, status: string) {
  try {
    const contact = await prisma.contact.update({
      where: { id },
      data: { status }
    })
    revalidatePath('/admin/contacts')
    return { success: true, data: contact }
  } catch (error) {
    console.error('[/] Error updating contact status:', error)
    return { success: false, error: 'Failed to update contact status' }
  }
}

export async function deleteContact(id: string) {
  try {
    await prisma.contact.delete({
      where: { id }
    })
    revalidatePath('/admin/contacts')
    return { success: true }
  } catch (error) {
    console.error('[/] Error deleting contact:', error)
    return { success: false, error: 'Failed to delete contact' }
  }
}
