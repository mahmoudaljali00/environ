'use server'

import { prisma } from '@/lib/prisma'

export async function getFeaturedProducts() {
  try {
    const products = await prisma.product.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 3
    })
    return { success: true, data: products }
  } catch (error) {
    console.error('[/] Error fetching featured products:', error)
    return { success: false, error: 'Failed to fetch products' }
  }
}
