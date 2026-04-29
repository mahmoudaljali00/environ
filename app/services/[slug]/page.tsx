import { notFound } from 'next/navigation'
import { getServiceBySlug } from './actions'
import ServiceDetailClient from './service-detail-client'

export const revalidate = 60

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const result = await getServiceBySlug(slug)
  
  if (!result.success || !result.data) {
    notFound()
  }

  return <ServiceDetailClient service={result.data}/>
}
