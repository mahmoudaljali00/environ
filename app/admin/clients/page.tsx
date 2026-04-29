import { prisma } from '@/lib/prisma'
import ClientsClient from './clients-client'

export default async function ClientsManagementPage() {
  const clients = await prisma.client.findMany({
    orderBy: { order: 'asc' }
  })

  return <ClientsClient initialClients={clients} />
}
