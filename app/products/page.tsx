import { Metadata } from 'next'
import { getProducts } from './actions'
import ProductsClient from './products-client'

export const metadata: Metadata = {
  title: 'Products & Equipment',
  description: 'Quality engineering products including solar panels, HVAC equipment, water pumps, generators, and security systems available in Sudan.',
  keywords: ['engineering products Sudan', 'solar panels', 'HVAC equipment', 'water pumps', 'generators', 'security equipment'],
  openGraph: {
    title: 'Products & Equipment | ENVIRON',
    description: 'Premium engineering and industrial products for your projects.',
    images: ['/og-products.jpg'],
  },
}

export const revalidate = 60

export default async function ProductsPage() {
  const result = await getProducts()
  const products = result.success ? result.data : []

  return <ProductsClient initialProducts={products} />
}
