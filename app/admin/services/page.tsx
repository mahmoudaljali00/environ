import { getServices } from './actions'
import ServicesClient from './services-client'

export default async function AdminServicesPage() {
  const result = await getServices()
  const services = result.success ? result.data : []

  return <ServicesClient initialServices={services} />
}
