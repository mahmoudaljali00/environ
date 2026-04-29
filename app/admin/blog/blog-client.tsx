'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Pencil, Trash2, Image as ImageIcon } from 'lucide-react'
import { createBlogPost, updateBlogPost, deleteBlogPost } from './actions'
import { uploadToCloudinary } from '@/lib/cloudinary'

type BlogPost = {
  id: string
  title: string
  titleAr: string
  slug: string
  category: string
  excerpt: string
  excerptAr: string
  content: string
  contentAr: string
  image: string
  authorName: string
  authorRole: string
  readingTime: number
  published: boolean
}

export default function BlogClient({ initialPosts }: { initialPosts: BlogPost[] }) {
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts)
  const [editing, setEditing] = useState<Partial<BlogPost> | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [uploading, setUploading] = useState(false)

  const openNew = () => {
    setIsNew(true)
    setEditing({
      title: '',
      titleAr: '',
      category: '',
      excerpt: '',
      excerptAr: '',
      content: '',
      contentAr: '',
      image: '',
      authorName: '',
      authorRole: '',
      readingTime: 5,
      published: true
    })
  }

  const handleSave = async () => {
    if (!editing) return
    
    const data = {
      title: editing.title!,
      titleAr: editing.titleAr!,
      category: editing.category!,
      excerpt: editing.excerpt!,
      excerptAr: editing.excerptAr!,
      content: editing.content!,
      contentAr: editing.contentAr!,
      image: editing.image!,
      authorName: editing.authorName!,
      authorRole: editing.authorRole!,
      readingTime: editing.readingTime!,
      published: editing.published ?? true
    }

    const result = isNew 
      ? await createBlogPost(data)
      : await updateBlogPost(editing.id!, data)

    if (result.success) {
      setEditing(null)
      router.push('/admin/blog')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return
    const result = await deleteBlogPost(id)
    if (result.success) {
      setPosts(posts.filter(p => p.id !== id))
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const url = await uploadToCloudinary(file)
      setEditing(prev => prev ? { ...prev, image: url } : null)
    } catch (error) {
      console.error('[/] Error uploading image:', error)
      alert('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
        >
          <Plus className="w-4 h-4" />
          Add Post
        </button>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-background rounded-xl p-6 max-w-4xl w-full my-8">
            <h2 className="text-xl font-bold mb-4">{isNew ? 'New' : 'Edit'} Blog Post</h2>
            <div className="grid grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Title (English)</label>
                <input
                  value={editing.title || ''}
                  onChange={(e) => setEditing((p) => p && { ...p, title: e.target.value })}
                  placeholder="The Future of Solar Energy"
                  className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm focus:outline-none focus:border-primary/60"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Title (Arabic)</label>
                <input
                  value={editing.titleAr || ''}
                  onChange={(e) => setEditing((p) => p && { ...p, titleAr: e.target.value })}
                  placeholder="مستقبل الطاقة الشمسية"
                  className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm focus:outline-none focus:border-primary/60"
                  dir="rtl"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Category</label>
                <select
                  value={editing.category || ''}
                  onChange={(e) => setEditing((p) => p && { ...p, category: e.target.value })}
                  className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm focus:outline-none focus:border-primary/60"
                >
                  <option value="">Select category</option>
                  <option value="Energy">Energy</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Projects">Projects</option>
                  <option value="Sustainability">Sustainability</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Reading Time (minutes)</label>
                <input
                  type="number"
                  value={editing.readingTime || 5}
                  onChange={(e) => setEditing((p) => p && { ...p, readingTime: parseInt(e.target.value) })}
                  className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm focus:outline-none focus:border-primary/60"
                />
              </div>

              <div className="flex flex-col gap-1.5 col-span-2">
                <label className="text-xs font-medium text-muted-foreground">Excerpt (English)</label>
                <textarea
                  value={editing.excerpt || ''}
                  onChange={(e) => setEditing((p) => p && { ...p, excerpt: e.target.value })}
                  rows={2}
                  placeholder="Brief description..."
                  className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm resize-none focus:outline-none focus:border-primary/60"
                />
              </div>

              <div className="flex flex-col gap-1.5 col-span-2">
                <label className="text-xs font-medium text-muted-foreground">Excerpt (Arabic)</label>
                <textarea
                  value={editing.excerptAr || ''}
                  onChange={(e) => setEditing((p) => p && { ...p, excerptAr: e.target.value })}
                  rows={2}
                  placeholder="وصف مختصر..."
                  className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm resize-none focus:outline-none focus:border-primary/60"
                  dir="rtl"
                />
              </div>

              <div className="flex flex-col gap-1.5 col-span-2">
                <label className="text-xs font-medium text-muted-foreground">Content (English)</label>
                <textarea
                  value={editing.content || ''}
                  onChange={(e) => setEditing((p) => p && { ...p, content: e.target.value })}
                  rows={6}
                  placeholder="Full article content..."
                  className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm resize-none focus:outline-none focus:border-primary/60"
                />
              </div>

              <div className="flex flex-col gap-1.5 col-span-2">
                <label className="text-xs font-medium text-muted-foreground">Content (Arabic)</label>
                <textarea
                  value={editing.contentAr || ''}
                  onChange={(e) => setEditing((p) => p && { ...p, contentAr: e.target.value })}
                  rows={6}
                  placeholder="محتوى المقال الكامل..."
                  className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm resize-none focus:outline-none focus:border-primary/60"
                  dir="rtl"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Author Name</label>
                <input
                  value={editing.authorName || ''}
                  onChange={(e) => setEditing((p) => p && { ...p, authorName: e.target.value })}
                  placeholder="Ahmed Hassan"
                  className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm focus:outline-none focus:border-primary/60"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Author Role</label>
                <input
                  value={editing.authorRole || ''}
                  onChange={(e) => setEditing((p) => p && { ...p, authorRole: e.target.value })}
                  placeholder="CEO & Founder"
                  className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm focus:outline-none focus:border-primary/60"
                />
              </div>

              <div className="flex flex-col gap-1.5 col-span-2">
                <label className="text-xs font-medium text-muted-foreground">Featured Image</label>
                <div className="flex gap-3 items-center">
                  <label className="flex-1 px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm cursor-pointer hover:border-primary/40 transition-colors flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    <span>{uploading ? 'Uploading...' : editing.image ? 'Change Image' : 'Upload Image'}</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                  </label>
                  {editing.image && (
                    <img src={editing.image} alt="Preview" className="w-16 h-16 rounded-lg object-cover" />
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 col-span-2">
                <input
                  type="checkbox"
                  checked={editing.published ?? true}
                  onChange={(e) => setEditing((p) => p && { ...p, published: e.target.checked })}
                  className="w-4 h-4"
                />
                <label className="text-sm">Published</label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSave}
                disabled={uploading}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:opacity-90 disabled:opacity-50"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/80"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {posts.map((post) => (
          <div key={post.id} className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border">
            {post.image && (
              <img src={post.image} alt={post.title} className="w-20 h-20 rounded-lg object-cover" />
            )}
            <div className="flex-1">
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">{post.excerpt}</p>
              <div className="flex gap-2 mt-1">
                <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded">{post.category}</span>
                <span className="text-xs text-muted-foreground">{post.readingTime} min</span>
                {!post.published && <span className="text-xs px-2 py-0.5 bg-red-500/10 text-red-500 rounded">Draft</span>}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsNew(false)
                  setEditing(post)
                }}
                className="p-2 hover:bg-secondary rounded-lg"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="p-2 hover:bg-destructive/10 text-destructive rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
