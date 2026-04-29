import { getBlogPosts } from './actions'
import BlogClient from './blog-client'

export default async function AdminBlogPage() {
  const result = await getBlogPosts()
  const posts = result.success ? result.data : []

  return <BlogClient initialPosts={posts} />
}
