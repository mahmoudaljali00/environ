'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, Upload, X, Image as ImageIcon } from 'lucide-react'
import { createProject, updateProject, deleteProject } from './actions'
import { uploadToCloudinary } from '@/lib/cloudinary'

type Project = {
  id: string
  title: string
  titleAr: string
  slug: string
  category: string
  description: string
  descriptionAr: string
  location: string
  locationAr: string
  client: string
  clientAr: string
  year: number
  duration: string
  durationAr: string
  image: string
  images: string[]
  challenge: string
  challengeAr: string
  solution: string
  solutionAr: string
  results: string[]
  resultsAr: string[]
  published: boolean
}

export default function ProjectsClient({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [editing, setEditing] = useState<Partial<Project> | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadingMultiple, setUploadingMultiple] = useState(false)

  const openNew = () => {
    setIsNew(true)
    setEditing({
      title: '',
      titleAr: '',
      category: 'Engineering',
      description: '',
      descriptionAr: '',
      location: '',
      locationAr: '',
      client: '',
      clientAr: '',
      year: new Date().getFullYear(),
      duration: '',
      durationAr: '',
      image: '',
      images: [],
      challenge: '',
      challengeAr: '',
      solution: '',
      solutionAr: '',
      results: [],
      resultsAr: [],
      published: true
    })
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

  const handleMultipleImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return
    
    setUploadingMultiple(true)
    try {
      const uploadPromises = files.map(file => uploadToCloudinary(file))
      const urls = await Promise.all(uploadPromises)
      setEditing(prev => prev ? { ...prev, images: [...(prev.images || []), ...urls] } : null)
    } catch (error) {
      console.error('[/] Error uploading images:', error)
      alert('Failed to upload images')
    } finally {
      setUploadingMultiple(false)
    }
  }

  const removeImage = (index: number) => {
    setEditing(prev => prev ? {
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index)
    } : null)
  }

  const handleSave = async () => {
    if (!editing) return
    
    const result = isNew
      ? await createProject(editing as any)
      : await updateProject(editing.id!, editing as any)
    
    if (result.success) {
      if (isNew) {
        setProjects([result.data, ...projects])
      } else {
        setProjects(projects.map(p => p.id === editing.id ? result.data : p))
      }
      setEditing(null)
      setIsNew(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return
    const result = await deleteProject(id)
    if (result.success) {
      setProjects(projects.filter(p => p.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Projects Management</h1>
          <button
            onClick={openNew}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:opacity-90"
          >
            <Plus className="w-4 h-4" /> Add Project
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {projects.map(project => (
            <div key={project.id} className="glass-card p-4 rounded-xl">
              <div className="relative h-40 mb-3 rounded-lg overflow-hidden">
                {project.image ? (
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-secondary/50 flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-muted-foreground" />
                  </div>
                )}
              </div>
              <h3 className="font-semibold mb-1">{project.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{project.category} • {project.year}</p>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => { setEditing(project); setIsNew(false) }}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-secondary rounded-lg hover:bg-secondary/80 text-sm"
                >
                  <Pencil className="w-3 h-3" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 text-sm"
                >
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Modal */}
        {editing && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="glass-card rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{isNew ? 'Add Project' : 'Edit Project'}</h2>
                <button onClick={() => { setEditing(null); setIsNew(false) }} className="p-2 hover:bg-secondary rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Title (English)</label>
                  <input
                    type="text"
                    value={editing.title || ''}
                    onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                    className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Title (Arabic)</label>
                  <input
                    type="text"
                    value={editing.titleAr || ''}
                    onChange={(e) => setEditing({ ...editing, titleAr: e.target.value })}
                    className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm text-right"
                    dir="rtl"
                  />
                </div>

                {/* Category & Year */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Category</label>
                  <select
                    value={editing.category || ''}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                    className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Energy">Energy</option>
                    <option value="MEP">MEP</option>
                    <option value="Infrastructure">Infrastructure</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Year</label>
                  <input
                    type="number"
                    value={editing.year || new Date().getFullYear()}
                    onChange={(e) => setEditing({ ...editing, year: parseInt(e.target.value) })}
                    className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm"
                  />
                </div>

                {/* Location */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Location (English)</label>
                  <input
                    type="text"
                    value={editing.location || ''}
                    onChange={(e) => setEditing({ ...editing, location: e.target.value })}
                    className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Location (Arabic)</label>
                  <input
                    type="text"
                    value={editing.locationAr || ''}
                    onChange={(e) => setEditing({ ...editing, locationAr: e.target.value })}
                    className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm text-right"
                    dir="rtl"
                  />
                </div>

                {/* Client */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Client (English)</label>
                  <input
                    type="text"
                    value={editing.client || ''}
                    onChange={(e) => setEditing({ ...editing, client: e.target.value })}
                    className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Client (Arabic)</label>
                  <input
                    type="text"
                    value={editing.clientAr || ''}
                    onChange={(e) => setEditing({ ...editing, clientAr: e.target.value })}
                    className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm text-right"
                    dir="rtl"
                  />
                </div>

                {/* Duration */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Duration (English)</label>
                  <input
                    type="text"
                    value={editing.duration || ''}
                    onChange={(e) => setEditing({ ...editing, duration: e.target.value })}
                    placeholder="e.g., 8 months"
                    className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Duration (Arabic)</label>
                  <input
                    type="text"
                    value={editing.durationAr || ''}
                    onChange={(e) => setEditing({ ...editing, durationAr: e.target.value })}
                    placeholder="مثال: 8 أشهر"
                    className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm text-right"
                    dir="rtl"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Description (English)</label>
                  <textarea
                    value={editing.description || ''}
                    onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                    rows={2}
                    className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm resize-none"
                  />
                </div>
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Description (Arabic)</label>
                  <textarea
                    value={editing.descriptionAr || ''}
                    onChange={(e) => setEditing({ ...editing, descriptionAr: e.target.value })}
                    rows={2}
                    className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm resize-none text-right"
                    dir="rtl"
                  />
                </div>

                {/* Challenge */}
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Challenge (English)</label>
                  <textarea
                    value={editing.challenge || ''}
                    onChange={(e) => setEditing({ ...editing, challenge: e.target.value })}
                    rows={2}
                    className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm resize-none"
                  />
                </div>
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Challenge (Arabic)</label>
                  <textarea
                    value={editing.challengeAr || ''}
                    onChange={(e) => setEditing({ ...editing, challengeAr: e.target.value })}
                    rows={2}
                    className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm resize-none text-right"
                    dir="rtl"
                  />
                </div>

                {/* Solution */}
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Solution (English)</label>
                  <textarea
                    value={editing.solution || ''}
                    onChange={(e) => setEditing({ ...editing, solution: e.target.value })}
                    rows={2}
                    className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm resize-none"
                  />
                </div>
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Solution (Arabic)</label>
                  <textarea
                    value={editing.solutionAr || ''}
                    onChange={(e) => setEditing({ ...editing, solutionAr: e.target.value })}
                    rows={2}
                    className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm resize-none text-right"
                    dir="rtl"
                  />
                </div>

                {/* Results */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Results (English, one per line)</label>
                  <textarea
                    value={editing.results?.join('\n') || ''}
                    onChange={(e) => setEditing({ ...editing, results: e.target.value.split('\n').filter(Boolean) })}
                    rows={3}
                    className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm resize-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Results (Arabic, one per line)</label>
                  <textarea
                    value={editing.resultsAr?.join('\n') || ''}
                    onChange={(e) => setEditing({ ...editing, resultsAr: e.target.value.split('\n').filter(Boolean) })}
                    rows={3}
                    className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm resize-none text-right"
                    dir="rtl"
                  />
                </div>

                {/* Main Image Upload */}
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Main Image</label>
                  <div className="flex gap-3 items-center">
                    {editing.image && (
                      <img src={editing.image} alt="Preview" className="w-24 h-24 object-cover rounded-lg" />
                    )}
                    <label className="flex-1 flex items-center justify-center gap-2 px-4 py-8 border-2 border-dashed border-border/60 rounded-xl hover:border-primary/50 cursor-pointer">
                      <Upload className="w-5 h-5" />
                      <span className="text-sm">{uploading ? 'Uploading...' : 'Upload Main Image'}</span>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                    </label>
                  </div>
                </div>

                {/* Multiple Images Upload */}
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Gallery Images</label>
                  <label className="flex items-center justify-center gap-2 px-4 py-4 border-2 border-dashed border-border/60 rounded-xl hover:border-primary/50 cursor-pointer mb-2">
                    <Upload className="w-5 h-5" />
                    <span className="text-sm">{uploadingMultiple ? 'Uploading...' : 'Upload Gallery Images'}</span>
                    <input type="file" accept="image/*" multiple onChange={handleMultipleImagesUpload} className="hidden" disabled={uploadingMultiple} />
                  </label>
                  {editing.images && editing.images.length > 0 && (
                    <div className="grid grid-cols-4 gap-2">
                      {editing.images.map((img, idx) => (
                        <div key={idx} className="relative group">
                          <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-20 object-cover rounded-lg" />
                          <button
                            onClick={() => removeImage(idx)}
                            className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Published */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editing.published ?? true}
                    onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label className="text-sm">Published</label>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl hover:opacity-90"
                >
                  {isNew ? 'Create Project' : 'Update Project'}
                </button>
                <button
                  onClick={() => { setEditing(null); setIsNew(false) }}
                  className="px-4 py-2.5 border border-border/60 rounded-xl hover:bg-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
