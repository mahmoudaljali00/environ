import { notFound } from 'next/navigation'
import { getProjectBySlug } from '../actions'
import ProjectDetailClient from './project-detail-client'

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const result = await getProjectBySlug(slug)

  if (!result.success || !result.data) {
    notFound()
  }

  return <ProjectDetailClient project={result.data} />
}
