'use server'

import { prisma } from '@/lib/prisma'

export async function getDashboardStats() {
  try {
    const [
      projectsCount,
      servicesCount,
      blogPostsCount,
      contactsCount,
      unreadContactsCount,
      productsCount,
      teamMembersCount,
      clientsCount,
      testimonialsCount
    ] = await Promise.all([
      prisma.project.count({ where: { published: true } }),
      prisma.service.count({ where: { published: true } }),
      prisma.blogPost.count({ where: { published: true } }),
      prisma.contact.count(),
      prisma.contact.count({ where: { status: 'new' } }),
      prisma.product.count({ where: { published: true } }),
      prisma.teamMember.count({ where: { published: true } }),
      prisma.client.count({ where: { published: true } }),
      prisma.testimonial.count({ where: { published: true } })
    ])

    return {
      success: true,
      data: {
        projectsCount,
        servicesCount,
        blogPostsCount,
        contactsCount,
        unreadContactsCount,
        productsCount,
        teamMembersCount,
        clientsCount,
        testimonialsCount
      }
    }
  } catch (error) {
    console.error('[/] Error fetching dashboard stats:', error)
    return { success: false, error: 'Failed to fetch stats' }
  }
}

export async function getRecentContacts() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
      take: 4,
      select: {
        id: true,
        name: true,
        service: true,
        status: true,
        createdAt: true
      }
    })

    return { success: true, data: contacts }
  } catch (error) {
    console.error('[/] Error fetching recent contacts:', error)
    return { success: false, error: 'Failed to fetch contacts' }
  }
}

export async function getProjectActivityByMonth() {
  try {
    // Get projects from the last 12 months
    const twelveMonthsAgo = new Date()
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12)

    const projects = await prisma.project.findMany({
      where: {
        createdAt: {
          gte: twelveMonthsAgo
        }
      },
      select: {
        createdAt: true
      }
    })

    // Group by month
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    
    const monthlyData = []
    for (let i = 11; i >= 0; i--) {
      const targetMonth = (currentMonth - i + 12) % 12
      const targetYear = currentMonth - i < 0 ? currentYear - 1 : currentYear
      
      const count = projects.filter(p => {
        const pMonth = p.createdAt.getMonth()
        const pYear = p.createdAt.getFullYear()
        return pMonth === targetMonth && pYear === targetYear
      }).length

      monthlyData.push({
        month: monthNames[targetMonth],
        projects: count
      })
    }

    return { success: true, data: monthlyData }
  } catch (error) {
    console.error('[/] Error fetching project activity:', error)
    return { success: false, error: 'Failed to fetch project activity' }
  }
}

export async function getServiceDistribution() {
  try {
    const services = await prisma.service.findMany({
      where: { published: true },
      select: {
        name: true,
        _count: {
          select: {
            products: true
          }
        }
      }
    })

    const distribution = services.map(service => ({
      name: service.name,
      value: service._count.products
    }))

    return { success: true, data: distribution }
  } catch (error) {
    console.error('[/] Error fetching service distribution:', error)
    return { success: false, error: 'Failed to fetch distribution' }
  }
}
