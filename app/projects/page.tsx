import { Metadata } from 'next'
import { getProjects } from './actions'
import ProjectsClient from './projects-client'

export const metadata: Metadata = {
  title: 'Our Projects',
  description: 'Explore our portfolio of successful engineering projects across Sudan including solar installations, MEP systems, infrastructure, and more.',
  keywords: ['engineering projects Sudan', 'solar projects', 'infrastructure projects', 'MEP installations', 'construction projects'],
  openGraph: {
    title: 'Our Projects | ENVIRON',
    description: 'View our completed engineering and infrastructure projects across Sudan and East Africa.',
    images: ['/og-projects.jpg'],
  },
}

export const revalidate = 60

export default async function ProjectsPage() {
  const result = await getProjects()

  return <ProjectsClient projects={result.success ? result.data : []} />
}
