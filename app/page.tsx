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

  const products = (productsResult.success && productsResult.data) ? productsResult.data : []
  const team = (teamResult.success && teamResult.data) ? teamResult.data : []
  const testimonials = (testimonialsResult.success && testimonialsResult.data) ? testimonialsResult.data : []
  const stats = Array.isArray(statsResult) ? statsResult : []
  const services = (servicesResult.success && servicesResult.data) ? servicesResult.data : []
  const projects = (projectsResult.success && projectsResult.data) ? projectsResult.data : []

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero stats={stats} />
      {services.length > 0 && <ServicesPreview services={services} />}
      {products.length > 0 && <ProductsPreview products={products} />}
      {projects.length > 0 && <ProjectsCarousel projects={projects} />}
      {team.length > 0 && <TeamSection team={team} />}
      {testimonials.length > 0 && <TestimonialsSection testimonials={testimonials} />}
    </main>
  )
}
