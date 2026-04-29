import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')?.toLowerCase() || ''
  const lang = searchParams.get('lang') || 'en'

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] })
  }

  try {
    // Search services
    const services = await prisma.service.findMany({
      where: {
        published: true,
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { nameAr: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { descriptionAr: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: 5,
    })

    // Search products
    const products = await prisma.product.findMany({
      where: {
        published: true,
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { nameAr: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { descriptionAr: { contains: query, mode: 'insensitive' } },
        ],
      },
      include: {
        service: { select: { name: true, nameAr: true } },
      },
      take: 5,
    })

    // Search projects
    const projects = await prisma.project.findMany({
      where: {
        published: true,
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { titleAr: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { descriptionAr: { contains: query, mode: 'insensitive' } },
          { location: { contains: query, mode: 'insensitive' } },
          { locationAr: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: 5,
    })

    // Search blog posts
    const blogPosts = await prisma.blogPost.findMany({
      where: {
        published: true,
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { titleAr: { contains: query, mode: 'insensitive' } },
          { content: { contains: query, mode: 'insensitive' } },
          { contentAr: { contains: query, mode: 'insensitive' } },
          { excerpt: { contains: query, mode: 'insensitive' } },
          { excerptAr: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: 5,
    })

    const isAr = lang === 'ar'

    const results = [
      ...services.map((s) => ({
        type: 'service',
        title: isAr ? s.nameAr : s.name,
        subtitle: isAr ? 'خدمة' : 'Service',
        href: `/services/${s.slug}`,
        image: s.image,
      })),
      ...products.map((p) => ({
        type: 'product',
        title: isAr ? p.nameAr : p.name,
        subtitle: isAr 
          ? `منتج • ${p.service?.nameAr || ''}` 
          : `Product • ${p.service?.name || ''}`,
        href: `/products/${p.slug}`,
        image: p.image,
      })),
      ...projects.map((p) => ({
        type: 'project',
        title: isAr ? p.titleAr : p.title,
        subtitle: isAr 
          ? `مشروع • ${p.locationAr || p.location}` 
          : `Project • ${p.location}`,
        href: `/projects/${p.slug}`,
        image: p.image,
      })),
      ...blogPosts.map((b) => ({
        type: 'blog',
        title: isAr ? b.titleAr : b.title,
        subtitle: isAr ? 'مقال' : 'Blog Post',
        href: `/blog/${b.slug}`,
        image: b.image,
      })),
    ]

    return NextResponse.json({ results })
  } catch (error) {
    console.error('[/] Search error:', error)
    return NextResponse.json({ results: [], error: 'Search failed' }, { status: 500 })
  }
}
