'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, X, Save, Wrench, Upload, Image as ImageIcon } from 'lucide-react'
import { createService, updateService, deleteService } from './actions'
import { uploadToCloudinary } from '@/lib/cloudinary'

type Service = {
  id: string
  name: string
  nameAr: string
  slug: string
  description: string
  descriptionAr: string
  icon: string
  featuresEn: string[]
  featuresAr: string[]
  benefits: string[]
  benefitsAr: string[]
  image?: string | null
  published?: boolean
}

export default function ServicesClient({ initialServices }: { initialServices: Service[] }) {
  const [services, setServices] = useState(initialServices)
  const [editing, setEditing] = useState<Partial<Service> | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const openNew = () => {
    setIsNew(true)
    setEditing({
      name: '',
      nameAr: '',
      description: '',
      descriptionAr: '',
      icon: 'Wrench',
      featuresEn: [],
      featuresAr: [],
      benefits: [],
      benefitsAr: [],
      image: '',
      published: true
    })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const imageUrl = await uploadToCloudinary(file)
      setEditing((p) => p && { ...p, image: imageUrl })
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const save = async () => {
    if (!editing || !editing.name || !editing.nameAr) {
      alert('Please fill in both English and Arabic names')
      return
    }
    setLoading(true)
    
    try {
      if (isNew) {
        const result = await createService(editing as any)
        if (result.success && result.data) {
          setServices((prev) => [...prev, result.data])
        } else {
          alert(result.error || 'Failed to create service')
        }
      } else if (editing.id) {
        const result = await updateService(editing.id, editing)
        if (result.success && result.data) {
          setServices((prev) => prev.map((s) => (s.id === editing.id ? result.data : s)))
        } else {
          alert(result.error || 'Failed to update service')
        }
      }
      setEditing(null)
      setIsNew(false)
    } catch (error) {
      console.error('Error saving service:', error)
      alert('An error occurred while saving')
    } finally {
      setLoading(false)
    }
  }

  const remove = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return
    setLoading(true)
    
    try {
      const result = await deleteService(id)
      if (result.success) {
        setServices((prev) => prev.filter((s) => s.id !== id))
      } else {
        alert(result.error || 'Failed to delete service')
      }
    } catch (error) {
      console.error('Error deleting service:', error)
      alert('An error occurred while deleting')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Services Manager</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{services.length} services total</p>
        </div>
        <button
          onClick={openNew}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <motion.div
            key={service.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-2xl p-5 flex flex-col gap-3"
          >
            {service.image && (
              <div className="w-full h-32 rounded-lg overflow-hidden bg-secondary/50">
                <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                <Wrench className="w-5 h-5 text-primary" />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setEditing(service); setIsNew(false) }}
                  disabled={loading}
                  className="p-1.5 rounded-lg hover:bg-secondary/60 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => remove(service.id)}
                  disabled={loading}
                  className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-foreground">{service.name}</h3>
              <h3 className="font-semibold text-sm text-muted-foreground" dir="rtl">{service.nameAr}</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{service.description}</p>
            {!service.published && (
              <span className="text-xs text-orange-500">Unpublished</span>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => { setEditing(null); setIsNew(false) }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-3xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold">{isNew ? 'Add New Service' : 'Edit Service'}</h2>
                <button
                  onClick={() => { setEditing(null); setIsNew(false) }}
                  className="p-1.5 rounded-lg hover:bg-secondary/60 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {/* Image Upload */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Service Image</label>
                  <div className="flex items-center gap-3">
                    {editing.image && (
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-secondary/50">
                        <img src={editing.image} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <label className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm cursor-pointer hover:bg-secondary transition-colors">
                      <Upload className="w-4 h-4" />
                      {uploading ? 'Uploading...' : 'Upload Image'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* English Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Name (English) *</label>
                    <input
                      value={editing.name || ''}
                      onChange={(e) => setEditing((p) => p && { ...p, name: e.target.value })}
                      placeholder="MEP Engineering"
                      className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm text-foreground focus:outline-none focus:border-primary/60"
                    />
                  </div>

                  {/* Arabic Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Name (Arabic) *</label>
                    <input
                      value={editing.nameAr || ''}
                      onChange={(e) => setEditing((p) => p && { ...p, nameAr: e.target.value })}
                      placeholder="هندسة MEP"
                      dir="rtl"
                      className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm text-foreground focus:outline-none focus:border-primary/60"
                    />
                  </div>
                </div>

                {/* English Description */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Description (English) *</label>
                  <textarea
                    value={editing.description || ''}
                    onChange={(e) => setEditing((p) => p && { ...p, description: e.target.value })}
                    rows={3}
                    placeholder="Complete mechanical, electrical, and plumbing design..."
                    className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm text-foreground focus:outline-none focus:border-primary/60 resize-none"
                  />
                </div>

                {/* Arabic Description */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Description (Arabic) *</label>
                  <textarea
                    value={editing.descriptionAr || ''}
                    onChange={(e) => setEditing((p) => p && { ...p, descriptionAr: e.target.value })}
                    rows={3}
                    placeholder="تصميم وتركيب كامل للأنظمة الميكانيكية والكهربائية والسباكة..."
                    dir="rtl"
                    className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm text-foreground focus:outline-none focus:border-primary/60 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Features English */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Features (English, one per line)</label>
                    <textarea
                      value={editing.featuresEn?.join('\n') || ''}
                      onChange={(e) => setEditing((p) => p && { ...p, featuresEn: e.target.value.split('\n').filter(Boolean) })}
                      rows={4}
                      placeholder="HVAC Design&#10;Electrical Distribution&#10;Plumbing Systems&#10;Fire Protection"
                      className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm text-foreground focus:outline-none focus:border-primary/60 resize-none"
                    />
                  </div>

                  {/* Features Arabic */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Features (Arabic, one per line)</label>
                    <textarea
                      value={editing.featuresAr?.join('\n') || ''}
                      onChange={(e) => setEditing((p) => p && { ...p, featuresAr: e.target.value.split('\n').filter(Boolean) })}
                      rows={4}
                      placeholder="تصميم HVAC&#10;التوزيع الكهربائي&#10;أنظمة السباكة&#10;الحماية من الحريق"
                      dir="rtl"
                      className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm text-foreground focus:outline-none focus:border-primary/60 resize-none"
                    />
                  </div>

                  {/* Benefits English */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Benefits (English, one per line)</label>
                    <textarea
                      value={editing.benefits?.join('\n') || ''}
                      onChange={(e) => setEditing((p) => p && { ...p, benefits: e.target.value.split('\n').filter(Boolean) })}
                      rows={4}
                      placeholder="Energy-efficient designs&#10;Code compliance&#10;Reduced costs&#10;24/7 support"
                      className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm text-foreground focus:outline-none focus:border-primary/60 resize-none"
                    />
                  </div>

                  {/* Benefits Arabic */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Benefits (Arabic, one per line)</label>
                    <textarea
                      value={editing.benefitsAr?.join('\n') || ''}
                      onChange={(e) => setEditing((p) => p && { ...p, benefitsAr: e.target.value.split('\n').filter(Boolean) })}
                      rows={4}
                      placeholder="تصاميم موفرة للطاقة&#10;الامتثال للمعايير&#10;تقليل التكاليف&#10;دعم على مدار الساعة"
                      dir="rtl"
                      className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm text-foreground focus:outline-none focus:border-primary/60 resize-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Icon */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Icon Name</label>
                    <input
                      value={editing.icon || ''}
                      onChange={(e) => setEditing((p) => p && { ...p, icon: e.target.value })}
                      placeholder="Wrench"
                      className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm text-foreground focus:outline-none focus:border-primary/60"
                    />
                  </div>

                  {/* Published */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Status</label>
                    <label className="flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editing.published ?? true}
                        onChange={(e) => setEditing((p) => p && { ...p, published: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Published</span>
                    </label>
                  </div>
                </div>

                <button
                  onClick={save}
                  disabled={loading || uploading}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4" /> {loading ? 'Saving...' : 'Save Service'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
