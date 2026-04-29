import Navbar from '@/components/navbar'
import Hero from '@/components/home/hero'
import ServicesPreview from '@/components/home/services-preview'
import ProductsPreview from '@/components/home/products-preview'
import ProjectsCarousel from '@/components/home/projects-carousel'
import TeamSection from '@/components/home/team-section'
import TestimonialsSection from '@/components/home/testimonials-section'
import { getFeaturedProducts } from './actions/products-preview'
import { getTeamMembers } from './actions/team'
import { getTestimonials } from './actions/testimonials'
import { getHeroStats } from './actions'
import { getAllServices } from './actions/services'
import { getFeaturedProjects } from './actions/projects-preview'
// import { getClients } from './actions/clients'
// import ClientsSection from '@/components/home/clients-section'
// import ServicesPageClient from './services/services-client'
// import BlogPreview from '@/components/home/blog-preview'

export const revalidate = 60

export default async function HomePage() {
  const [productsResult, teamResult, testimonialsResult, statsResult, servicesResult, projectsResult] = await Promise.all([
    getFeaturedProducts(),
    getTeamMembers(),
    getTestimonials(),
    getHeroStats(),
    getAllServices(),
    getFeaturedProjects()
  ])

  const products = productsResult.success ? productsResult.data : []
  const team = teamResult.success ? teamResult.data : []
  // const clients = clientsResult.success ? clientsResult.data : []
  const testimonials = testimonialsResult.success ? testimonialsResult.data : []
  const stats = Array.isArray(statsResult) ? statsResult : []
  const services = servicesResult.success ? servicesResult.data : []
  const projects = projectsResult.success ? projectsResult.data : []

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero stats={stats} />
      <ServicesPreview services={services} />
      <ProductsPreview products={products} />
      <ProjectsCarousel projects={projects} />
      <TeamSection team={team} />
      <TestimonialsSection testimonials={testimonials} />
      {/* <ServicesPageClient services={services} /> */}
      {/* <ClientsSection clients={clients} /> */}
      {/* <BlogPreview /> */}
    </main>
  )
}
