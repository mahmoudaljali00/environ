import FooterClient from './footer-client'
import { getFooterServices } from '@/app/actions/services-preview'

export default async function Footer() {
  const servicesResult = await getFooterServices()
  const services = servicesResult.success && servicesResult.data ? servicesResult.data : []

  return <FooterClient services={services} />
}