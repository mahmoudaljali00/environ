import { notFound } from 'next/navigation'
import { getProductBySlug } from './actions'
import ProductDetailClient from './product-detail-client'

export const revalidate = 60

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const result = await getProductBySlug(slug)

  if (!result.success || !result.data) {
    notFound()
  }

  return <ProductDetailClient product={result.data} />
}
