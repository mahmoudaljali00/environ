'use server'

import { prisma } from '@/lib/prisma'

export async function getProductBySlug(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        service: true
      }
    })
    
    if (!product) {
      return { success: false, error: 'Product not found' }
    }
    
    return { success: true, data: product }
  } catch (error) {
    console.error('[/] Error fetching product:', error)
    return { success: false, error: 'Failed to fetch product' }
  }
}
