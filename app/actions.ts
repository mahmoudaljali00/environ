'use server'

import { prisma } from '@/lib/prisma'

export async function getHeroStats() {
  try {
    const stats = await prisma.stat.findMany({
      where: { published: true },
      orderBy: { sortOrder: 'asc' },
    })
    return stats
  } catch (error) {
    console.error('Error fetching hero stats:', error)
    // Return fallback stats if DB fails
    return [
      { id: '1', key: 'projects', value: '200+', labelEn: 'Projects Delivered', labelAr: 'المشاريع المسلمة', sortOrder: 0, published: true, createdAt: new Date(), updatedAt: new Date() },
      { id: '2', key: 'clients', value: '150+', labelEn: 'Clients Served', labelAr: 'العملاء الذين تم خدمتهم', sortOrder: 1, published: true, createdAt: new Date(), updatedAt: new Date() },
      { id: '3', key: 'years', value: '15+', labelEn: 'Years Experience', labelAr: 'سنوات الخبرة', sortOrder: 2, published: true, createdAt: new Date(), updatedAt: new Date() },
      { id: '4', key: 'countries', value: '5+', labelEn: 'Countries Reached', labelAr: 'الدول المخدومة', sortOrder: 3, published: true, createdAt: new Date(), updatedAt: new Date() },
    ]
  }
}
