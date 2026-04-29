'use server'

import { prisma } from '@/lib/prisma'

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      where: { published: true },
      include: {
        service: {
          select: { id: true, name: true, nameAr: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    return { success: true, data: products }
  } catch (error) {
    console.error('[/] Error fetching products:', error)
    return { success: false, data: [] }
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        service: {
          select: { id: true, name: true, nameAr: true }
        }
      }
    })
    return { success: true, data: product }
  } catch (error) {
    console.error('[/] Error fetching product:', error)
    return { success: false, data: null }
  }
}
