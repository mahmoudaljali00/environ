import { getProjects } from './actions'
import ProjectsClient from './projects-client'

export default async function AdminProjectsPage() {
  const result = await getProjects()

  return <ProjectsClient initialProjects={result.success ? result.data : []} />
}
