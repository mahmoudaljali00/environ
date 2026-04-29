'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        service: {
          select: { id: true, name: true, nameAr: true }
        }
      }
    })
    return { success: true, data: products }
  } catch (error) {
    console.error('[/] Error fetching products:', error)
    return { success: false, error: 'Failed to fetch products', data: [] }
  }
}

export async function createProduct(data: {
  name: string
  nameAr: string
  brand: string
  category: string
  shortDesc: string
  shortDescAr: string
  description: string
  descriptionAr: string
  specificationsEn?: string[]
  specificationsAr?: string[]
  featuresEn?: string[]
  featuresAr?: string[]
  image?: string | null
  price?: number | null
  serviceId?: string | null
  published?: boolean
}) {
  try {
    const slug = data.name.toLowerCase().replace(/\s+/g, '-')
    const product = await prisma.product.create({
      data: {
        id: slug,
        slug,
        name: data.name,
        nameAr: data.nameAr,
        brand: data.brand,
        category: data.category,
        shortDesc: data.shortDesc,
        shortDescAr: data.shortDescAr,
        description: data.description,
        descriptionAr: data.descriptionAr,
        specificationsEn: data.specificationsEn || [],
        specificationsAr: data.specificationsAr || [],
        featuresEn: data.featuresEn || [],
        featuresAr: data.featuresAr || [],
        image: data.image || '/products/placeholder.jpg',
        price: data.price,
        serviceId: data.serviceId,
        published: data.published ?? true
      }
    })
    revalidatePath('/admin/products')
    revalidatePath('/products')
    return { success: true, data: product }
  } catch (error) {
    console.error('[/] Error creating product:', error)
    return { success: false, error: 'Failed to create product or maybe the name already exists' }
  }
}

export async function updateProduct(id: string, data: Partial<{
  name: string
  nameAr: string
  slug: string
  brand: string
  category: string
  shortDesc: string
  shortDescAr: string
  description: string
  descriptionAr: string
  specificationsEn: string[]
  specificationsAr: string[]
  featuresEn: string[]
  featuresAr: string[]
  image: string | null
  price: number | null
  serviceId: string | null
  published: boolean
}>) {
  try {
    const updateData: any = { ...data }
    if (data.name) {
      updateData.slug = data.name.toLowerCase().replace(/\s+/g, '-')
    }
    
    const product = await prisma.product.update({
      where: { id },
      data: updateData
    })
    revalidatePath('/admin/products')
    revalidatePath('/products')
    return { success: true, data: product }
  } catch (error) {
    console.error('[/] Error updating product:', error)
    return { success: false, error: 'Failed to update product' }
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id }
    })
    revalidatePath('/admin/products')
    revalidatePath('/products')
    return { success: true }
  } catch (error) {
    console.error('[/] Error deleting product:', error)
    return { success: false, error: 'Failed to delete product' }
  }
}

export async function getServices() {
  try {
    const services = await prisma.service.findMany({
      select: { id: true, name: true, nameAr: true }
    })
    return { success: true, data: services }
  } catch (error) {
    console.error('[/] Error fetching services:', error)
    return { success: false, data: [] }
  }
}
