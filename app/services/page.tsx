import { Metadata } from 'next'
import { getAllServices } from './actions'
import ServicesPageClient from './services-client'

export const metadata: Metadata = {
  title: 'Engineering & MEP Services',
  description: 'Comprehensive engineering services including MEP, solar energy, HVAC, water systems, security solutions, and contracting services in Sudan.',
  keywords: ['MEP services Sudan', 'engineering services', 'solar installation', 'HVAC Sudan', 'water pump systems', 'security systems'],
  openGraph: {
    title: 'Engineering & MEP Services | ENVIRON',
    description: 'Professional engineering, MEP, and energy solutions for industries across Sudan.',
    images: ['/og-services.jpg'],
  },
}

export const revalidate = 60

export default async function ServicesPage() {
  const result = await getAllServices()
  const services = result.success ? result.data : []

  return <ServicesPageClient services={services} />
}
