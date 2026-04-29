import { prisma } from '@/lib/prisma'
import ContactsClient from './contacts-client'

export const revalidate = 0

export default async function AdminContactsPage() {
  const contacts = await prisma.contact.findMany({ orderBy: { createdAt: 'desc' } })
  return <ContactsClient initialContacts={contacts} />
}
