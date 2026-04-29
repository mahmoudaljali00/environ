import { getProducts } from './actions'
import ProductsClient from './products-client'

export default async function AdminProductsPage() {
  const result = await getProducts()
  const products = result.success ? result.data : []

  return <ProductsClient initialProducts={products} />
}
