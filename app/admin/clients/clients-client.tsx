'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Pencil, Trash2, Image as ImageIcon, X } from 'lucide-react'
import Image from 'next/image'
import { createClient, updateClient, deleteClient } from './actions'
import { uploadToCloudinary } from '@/lib/cloudinary'

type Client = {
  id: string
  name: string
  nameAr: string
  logo: string | null
  order: number
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export default function ClientsClient({ initialClients }: { initialClients: Client[] }) {
  const router = useRouter()
  const [clients, setClients] = useState<Client[]>(initialClients)
  const [editing, setEditing] = useState<Partial<Client> | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const url = await uploadToCloudinary(file)
      setEditing((prev) => ({ ...prev, logo: url }))
    } catch (error) {
      console.error('[/] Error uploading logo:', error)
      alert('Failed to upload logo')
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    if (!editing) return

    const data = {
      name: editing.name!,
      nameAr: editing.nameAr!,
      logo: editing.logo,
      order: editing.order ?? 0,
      published: editing.published ?? true
    }

    const result = isNew 
      ? await createClient(data)
      : await updateClient(editing.id!, data)

    if (result.success) {
      setEditing(null)
      router.push('/admin/clients')
      router.refresh()
    } else {
      alert(result.error || 'Failed to save')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this client?')) return
    const result = await deleteClient(id)
    if (result.success) {
      setClients(clients.filter(c => c.id !== id))
      router.refresh()
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Clients Management</h1>
        <button
          onClick={() => {
            setEditing({
              name: '',
              nameAr: '',
              logo: null,
              order: clients.length,
              published: true
            })
            setIsNew(true)
          }}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" />
          Add Client
        </button>
      </div>

      <div className="bg-card rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left">Logo</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Order</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-t hover:bg-muted/50">
                <td className="px-4 py-3">
                  {client.logo ? (
                    <div className="w-12 h-12 rounded overflow-hidden bg-muted relative">
                      <Image src={client.logo} alt={client.name} fill className="object-contain" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">
                      No Logo
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium">{client.name}</p>
                    <p className="text-sm text-muted-foreground">{client.nameAr}</p>
                  </div>
                </td>
                <td className="px-4 py-3">{client.order}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs ${
                    client.published ? 'bg-green-500/20 text-green-700' : 'bg-gray-500/20 text-gray-700'
                  }`}>
                    {client.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => {
                        setEditing(client)
                        setIsNew(false)
                      }}
                      className="p-2 hover:bg-muted rounded"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(client.id)}
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
          <div className="bg-background rounded-xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{isNew ? 'Add' : 'Edit'} Client</h2>
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

              <div>
                <label className="block text-sm font-medium mb-2">Logo (Optional)</label>
                <div className="flex gap-4 items-center">
                  {editing.logo && (
                    <div className="w-20 h-20 rounded overflow-hidden bg-muted relative">
                      <Image src={editing.logo} alt="Preview" fill className="object-contain" />
                    </div>
                  )}
                  <label className="flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer hover:bg-muted">
                    <ImageIcon className="w-4 h-4" />
                    {uploading ? 'Uploading...' : 'Upload Logo'}
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                disabled={!editing.name || !editing.nameAr}
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
