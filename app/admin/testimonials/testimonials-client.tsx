'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Pencil, Trash2, Star, X } from 'lucide-react'
import { createTestimonial, updateTestimonial, deleteTestimonial } from './actions'

type Testimonial = {
  id: string
  name: string
  nameAr: string
  role: string
  roleAr: string
  text: string
  textAr: string
  rating: number
  order: number
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export default function TestimonialsClient({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
  const router = useRouter()
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials)
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null)
  const [isNew, setIsNew] = useState(false)

  const handleSave = async () => {
    if (!editing) return

    const data = {
      name: editing.name!,
      nameAr: editing.nameAr!,
      role: editing.role!,
      roleAr: editing.roleAr!,
      text: editing.text!,
      textAr: editing.textAr!,
      rating: editing.rating ?? 5,
      order: editing.order ?? 0,
      published: editing.published ?? true
    }

    const result = isNew 
      ? await createTestimonial(data)
      : await updateTestimonial(editing.id!, data)

    if (result.success) {
      setEditing(null)
      router.push('/admin/testimonials')
      router.refresh()
    } else {
      alert(result.error || 'Failed to save')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return
    const result = await deleteTestimonial(id)
    if (result.success) {
      setTestimonials(testimonials.filter(t => t.id !== id))
      router.refresh()
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Testimonials Management</h1>
        <button
          onClick={() => {
            setEditing({
              name: '',
              nameAr: '',
              role: '',
              roleAr: '',
              text: '',
              textAr: '',
              rating: 5,
              order: testimonials.length,
              published: true
            })
            setIsNew(true)
          }}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" />
          Add Testimonial
        </button>
      </div>

      <div className="bg-card rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Text</th>
              <th className="px-4 py-3 text-left">Rating</th>
              <th className="px-4 py-3 text-left">Order</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((testimonial) => (
              <tr key={testimonial.id} className="border-t hover:bg-muted/50">
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.nameAr}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div>
                    <p className="text-sm">{testimonial.role}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.roleAr}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm line-clamp-2">{testimonial.text}</p>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">{testimonial.order}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs ${
                    testimonial.published ? 'bg-green-500/20 text-green-700' : 'bg-gray-500/20 text-gray-700'
                  }`}>
                    {testimonial.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => {
                        setEditing(testimonial)
                        setIsNew(false)
                      }}
                      className="p-2 hover:bg-muted rounded"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      className="p-2 hover:bg-destructive/10 text-destructive rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{isNew ? 'Add' : 'Edit'} Testimonial</h2>
              <button onClick={() => setEditing(null)} className="p-2 hover:bg-muted rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name (English)</label>
                  <input
                    type="text"
                    value={editing.name || ''}
                    onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Name (Arabic)</label>
                  <input
                    type="text"
                    value={editing.nameAr || ''}
                    onChange={(e) => setEditing({ ...editing, nameAr: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Role (English)</label>
                  <input
                    type="text"
                    value={editing.role || ''}
                    onChange={(e) => setEditing({ ...editing, role: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Role (Arabic)</label>
                  <input
                    type="text"
                    value={editing.roleAr || ''}
                    onChange={(e) => setEditing({ ...editing, roleAr: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Testimonial (English)</label>
                  <textarea
                    value={editing.text || ''}
                    onChange={(e) => setEditing({ ...editing, text: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={5}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Testimonial (Arabic)</label>
                  <textarea
                    value={editing.textAr || ''}
                    onChange={(e) => setEditing({ ...editing, textAr: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={5}
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  <select
                    value={editing.rating ?? 5}
                    onChange={(e) => setEditing({ ...editing, rating: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    {[1, 2, 3, 4, 5].map((r) => (
                      <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Display Order</label>
                  <input
                    type="number"
                    value={editing.order ?? 0}
                    onChange={(e) => setEditing({ ...editing, order: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 mt-8">
                    <input
                      type="checkbox"
                      checked={editing.published ?? true}
                      onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">Published</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setEditing(null)}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                disabled={!editing.name || !editing.role || !editing.text}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
