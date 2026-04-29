import { prisma } from '@/lib/prisma'
import TeamClient from './team-client'

export default async function TeamManagementPage() {
  const members = await prisma.teamMember.findMany({
    orderBy: { order: 'asc' }
  })

  return <TeamClient initialMembers={members} />
}
