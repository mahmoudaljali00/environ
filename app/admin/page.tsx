import DashboardClient from './dashboard-client'
import { getDashboardStats, getRecentContacts, getProjectActivityByMonth, getServiceDistribution } from './actions'

export const revalidate = 30

export default async function AdminDashboard() {
  const [statsResult, contactsResult, activityResult, distributionResult] = await Promise.all([
    getDashboardStats(),
    getRecentContacts(),
    getProjectActivityByMonth(),
    getServiceDistribution()
  ])

  const stats = statsResult.success ? statsResult.data : {
    projectsCount: 0,
    servicesCount: 0,
    blogPostsCount: 0,
    contactsCount: 0,
    unreadContactsCount: 0,
    productsCount: 0,
    teamMembersCount: 0,
    clientsCount: 0,
    testimonialsCount: 0
  }

  const recentContacts = contactsResult.success ? contactsResult.data : []
  const projectActivity = activityResult.success ? activityResult.data : []
  const serviceDistribution = distributionResult.success ? distributionResult.data : []

  return (
    <DashboardClient 
      data={{
        stats,
        recentContacts,
        projectActivity,
        serviceDistribution
      }}
    />
  )
}
