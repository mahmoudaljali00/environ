'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function submitContactForm(data: {
  name: string
  email: string
  phone?: string
  company?: string
  service?: string
  message: string
}) {
  try {
    const contact = await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        service: data.service || null,
        message: data.message,
        status: 'new'
      }
    })
    
    revalidatePath('/admin/contacts')
    return { success: true, data: contact }
  } catch (error) {
    console.error('[/] Error submitting contact form:', error)
    return { success: false, error: 'Failed to submit contact form' }
  }
}
