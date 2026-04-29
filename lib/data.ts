import { prisma } from './prisma'

// Services
export async function getAllServices() {
  return await prisma.service.findMany({
    orderBy: { createdAt: 'asc' }
  })
}

export async function getServiceById(id: string) {
  return await prisma.service.findUnique({
    where: { id }
  })
}

// Products
export async function getAllProducts() {
  return await prisma.product.findMany({
    orderBy: { createdAt: 'asc' }
  })
}

export async function getProductById(id: string) {
  return await prisma.product.findUnique({
    where: { id },
    include: { service: true }
  })
}

export async function getProductsByServiceId(serviceId: string) {
  return await prisma.product.findMany({
    where: { serviceId },
    orderBy: { createdAt: 'asc' }
  })
}

export async function getProductsByCategory(category: string) {
  return await prisma.product.findMany({
    where: { category },
    orderBy: { createdAt: 'asc' }
  })
}

// Projects
export async function getAllProjects() {
  return await prisma.project.findMany({
    orderBy: { date: 'desc' }
  })
}

export async function getProjectById(id: string) {
  return await prisma.project.findUnique({
    where: { id }
  })
}

export async function getProjectsByCategory(category: string) {
  return await prisma.project.findMany({
    where: { category },
    orderBy: { date: 'desc' }
  })
}

// Blog Posts
export async function getAllBlogPosts() {
  return await prisma.blogPost.findMany({
    orderBy: { date: 'desc' }
  })
}

export async function getBlogPostById(id: string) {
  return await prisma.blogPost.findUnique({
    where: { id }
  })
}

export async function getBlogPostsByCategory(category: string) {
  return await prisma.blogPost.findMany({
    where: { category },
    orderBy: { date: 'desc' }
  })
}

// Contact Form
export async function createContactSubmission(data: {
  name: string
  email: string
  phone?: string
  service: string
  message: string
}) {
  return await prisma.contact.create({ data })
}

// Stats
export async function getStats() {
  const [servicesCount, productsCount, projectsCount, blogPostsCount] = await Promise.all([
    prisma.service.count(),
    prisma.product.count(),
    prisma.project.count(),
    prisma.blogPost.count()
  ])
  
  return {
    services: servicesCount,
    products: productsCount,
    projects: projectsCount,
    blogPosts: blogPostsCount
  }
}
