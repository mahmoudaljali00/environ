'use client'

import { useState, useTransition, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, X, Save, Package, Image as ImageIcon, Upload } from 'lucide-react'
import Image from 'next/image'
import { createProduct, updateProduct, deleteProduct, getServices } from './actions'
import { uploadToCloudinary } from '@/lib/cloudinary'

type Product = {
  id: string
  name: string
  nameAr: string
  slug: string
  brand: string
  category: string
  shortDesc: string
  shortDescAr: string
  description: string
  descriptionAr: string
  specificationsEn: string[]
  specificationsAr: string[]
  featuresEn: string[]
  featuresAr: string[]
  image: string
  price: number | null
  serviceId: string | null
  published: boolean
  service?: { id: string; name: string; nameAr: string } | null
}

type Service = {
  id: string
  name: string
  nameAr: string
}

const categories = ['energy', 'hvac', 'water', 'security', 'mep', 'trading']

export default function ProductsClient({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [services, setServices] = useState<Service[]>([])
  const [editing, setEditing] = useState<Partial<Product> | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    getServices().then((result) => {
      if (result.success) setServices(result.data)
    })
  }, [])

  const openNew = () => {
    setIsNew(true)
    setEditing({
      name: '',
      nameAr: '',
      brand: '',
      category: 'energy',
      shortDesc: '',
      shortDescAr: '',
      description: '',
      descriptionAr: '',
      specificationsEn: [],
      specificationsAr: [],
      featuresEn: [],
      featuresAr: [],
      image: '/products/placeholder.jpg',
      price: null,
      serviceId: null,
      published: true
    })
    setImageFile(null)
    setImagePreview(null)
  }

  const save = async () => {
    if (!editing || !editing.name || !editing.nameAr) return

    // Upload image if selected
    let imageUrl = editing.image || '/products/placeholder.jpg'
    if (imageFile) {
      setIsUploading(true)
      try {
        imageUrl = await uploadToCloudinary(imageFile)
      } catch (error) {
        console.error('[/] Error uploading image:', error)
        alert('Failed to upload image. Using default.')
      } finally {
        setIsUploading(false)
      }
    }

    startTransition(async () => {
      if (isNew) {
        const result = await createProduct({
          name: editing.name!,
          nameAr: editing.nameAr!,
          brand: editing.brand || '',
          category: editing.category || 'energy',
          shortDesc: editing.shortDesc || '',
          shortDescAr: editing.shortDescAr || '',
          description: editing.description || '',
          descriptionAr: editing.descriptionAr || '',
          specificationsEn: editing.specificationsEn || [],
          specificationsAr: editing.specificationsAr || [],
          featuresEn: editing.featuresEn || [],
          featuresAr: editing.featuresAr || [],
          image: imageUrl,
          price: editing.price,
          serviceId: editing.serviceId,
          published: editing.published ?? true
        })
        if (result.success && result.data) {
          setProducts((prev) => [result.data!, ...prev])
        }
      } else if (editing.id) {
        const result = await updateProduct(editing.id, {
          name: editing.name,
          nameAr: editing.nameAr,
          brand: editing.brand,
          category: editing.category,
          shortDesc: editing.shortDesc,
          shortDescAr: editing.shortDescAr,
          description: editing.description,
          descriptionAr: editing.descriptionAr,
          specificationsEn: editing.specificationsEn,
          specificationsAr: editing.specificationsAr,
          featuresEn: editing.featuresEn,
          featuresAr: editing.featuresAr,
          image: imageUrl,
          price: editing.price,
          serviceId: editing.serviceId,
          published: editing.published
        })
        if (result.success && result.data) {
          setProducts((prev) => prev.map((p) => (p.id === result.data!.id ? result.data! : p)))
        }
      }
      setEditing(null)
      setIsNew(false)
      setImageFile(null)
      setImagePreview(null)
    })
  }

  const remove = (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    startTransition(async () => {
      const result = await deleteProduct(id)
      if (result.success) {
        setProducts((prev) => prev.filter((p) => p.id !== id))
      }
    })
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products Manager</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{products.length} products total</p>
        </div>
        <button
          onClick={openNew}
          disabled={isPending}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass-card rounded-2xl overflow-hidden flex flex-col"
          >
            <div className="relative aspect-square bg-card/50">
              <Image
                src={product.image || '/products/placeholder.jpg'}
                alt={product.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2 px-2 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-[10px] font-bold rounded">
                {product.category}
              </div>
            </div>
            <div className="flex flex-col flex-1 p-4 gap-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide truncate">
                    {product.brand}
                  </p>
                  <h3 className="font-semibold text-sm text-foreground leading-snug line-clamp-2">
                    {product.name}
                  </h3>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => {
                      setEditing(product)
                      setIsNew(false)
                      setImageFile(null)
                      setImagePreview(null)
                    }}
                    className="p-1.5 rounded-lg hover:bg-secondary/60 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => remove(product.id)}
                    disabled={isPending}
                    className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {product.shortDesc}
              </p>
              {product.price && (
                <p className="text-sm font-bold text-primary">${product.price.toFixed(2)}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => !isPending && setEditing(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-3xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold">{isNew ? 'Add Product' : 'Edit Product'}</h2>
                <button
                  onClick={() => !isPending && setEditing(null)}
                  disabled={isPending}
                  className="p-1.5 rounded-lg hover:bg-secondary/60 transition-colors disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Image Upload */}
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Product Image</label>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-secondary/50 border border-border/60">
                    {(imagePreview || editing.image) && (
                      <Image
                        src={imagePreview || editing.image || '/products/placeholder.jpg'}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    )}
                    <label className="absolute inset-0 flex items-center justify-center cursor-pointer hover:bg-black/20 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                        disabled={isPending || isUploading}
                      />
                      <div className="flex flex-col items-center gap-2 text-white">
                        <Upload className="w-6 h-6" />
                        <span className="text-xs font-medium">
                          {isUploading ? 'Uploading...' : 'Upload Image'}
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Name (English) */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Name (English) *</label>
                  <input
                    value={editing.name || ''}
                    onChange={(e) => setEditing((p) => p && { ...p, name: e.target.value })}
                    className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm text-foreground focus:outline-none focus:border-primary/60"
                    placeholder="400W Solar Panel"
                  />
                </div>

                {/* Name (Arabic) */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Name (Arabic) *</label>
                  <input
                    value={editing.nameAr || ''}
                    onChange={(e) => setEditing((p) => p && { ...p, nameAr: e.target.value })}
                    className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm text-foreground focus:outline-none focus:border-primary/60 text-right"
                    placeholder="لوح طاقة شمسية 400 واط"
                  />
                </div>

                {/* Brand */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Brand</label>
                  <input
                    value={editing.brand || ''}
                    onChange={(e) => setEditing((p) => p && { ...p, brand: e.target.value })}
                    className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm text-foreground focus:outline-none focus:border-primary/60"
                    placeholder="Longi Solar"
                  />
                </div>

                {/* Category */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Category</label>
                  <select
                    value={editing.category || 'energy'}
                    onChange={(e) => setEditing((p) => p && { ...p, category: e.target.value })}
                    className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm text-foreground focus:outline-none focus:border-primary/60"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Price (USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editing.price || ''}
                    onChange={(e) =>
                      setEditing((p) => p && { ...p, price: e.target.value ? parseFloat(e.target.value) : null })
                    }
                    className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm text-foreground focus:outline-none focus:border-primary/60"
                    placeholder="999.00"
                  />
                </div>

                {/* Service Link */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Linked Service</label>
                  <select
                    value={editing.serviceId || ''}
                    onChange={(e) => setEditing((p) => p && { ...p, serviceId: e.target.value || null })}
                    className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm text-foreground focus:outline-none focus:border-primary/60"
                  >
                    <option value="">None</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Short Description (English) */}
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Short Description (English)</label>
                  <textarea
                    value={editing.shortDesc || ''}
                    onChange={(e) => setEditing((p) => p && { ...p, shortDesc: e.target.value })}
                    rows={2}
                    className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm text-foreground focus:outline-none focus:border-primary/60 resize-none"
                    placeholder="High-efficiency panel for residential use..."
                  />
                </div>

                {/* Short Description (Arabic) */}
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Short Description (Arabic)</label>
                  <textarea
                    value={editing.shortDescAr || ''}
                    onChange={(e) => setEditing((p) => p && { ...p, shortDescAr: e.target.value })}
                    rows={2}
                    className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm text-foreground focus:outline-none focus:border-primary/60 resize-none text-right"
                    placeholder="لوح عالي الكفاءة للاستخدام السكني..."
                  />
                </div>

                {/* Full Description (English) */}
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Full Description (English)</label>
                  <textarea
                    value={editing.description || ''}
                    onChange={(e) => setEditing((p) => p && { ...p, description: e.target.value })}
                    rows={3}
                    className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm text-foreground focus:outline-none focus:border-primary/60 resize-none"
                    placeholder="Detailed product description..."
                  />
                </div>

                {/* Full Description (Arabic) */}
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Full Description (Arabic)</label>
                  <textarea
                    value={editing.descriptionAr || ''}
                    onChange={(e) => setEditing((p) => p && { ...p, descriptionAr: e.target.value })}
                    rows={3}
                    className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm text-foreground focus:outline-none focus:border-primary/60 resize-none text-right"
                    placeholder="وصف تفصيلي للمنتج..."
                  />
                </div>

                {/* Specifications (English) */}
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">
                    Specifications (English, one per line)
                  </label>
                  <textarea
                    value={editing.specificationsEn?.join('\n') || ''}
                    onChange={(e) =>
                      setEditing((p) => p && { ...p, specificationsEn: e.target.value.split('\n').filter(Boolean) })
                    }
                    rows={4}
                    placeholder="Peak Power: 400 Wp&#10;Efficiency: 21.3%&#10;Dimensions: 1755 × 1038 × 35 mm"
                    className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm text-foreground focus:outline-none focus:border-primary/60 resize-none font-mono text-xs"
                  />
                </div>

                {/* Specifications (Arabic) */}
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">
                    Specifications (Arabic, one per line)
                  </label>
                  <textarea
                    value={editing.specificationsAr?.join('\n') || ''}
                    onChange={(e) =>
                      setEditing((p) => p && { ...p, specificationsAr: e.target.value.split('\n').filter(Boolean) })
                    }
                    rows={4}
                    placeholder="الطاقة القصوى: 400 واط&#10;الكفاءة: 21.3%&#10;الأبعاد: 1755 × 1038 × 35 مم"
                    className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm text-foreground focus:outline-none focus:border-primary/60 resize-none font-mono text-xs text-right"
                  />
                </div>

                {/* Features (English) */}
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Features (English, one per line)</label>
                  <textarea
                    value={editing.featuresEn?.join('\n') || ''}
                    onChange={(e) =>
                      setEditing((p) => p && { ...p, featuresEn: e.target.value.split('\n').filter(Boolean) })
                    }
                    rows={3}
                    placeholder="PERC monocrystalline technology&#10;Half-cut cell design&#10;Anti-PID technology"
                    className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm text-foreground focus:outline-none focus:border-primary/60 resize-none"
                  />
                </div>

                {/* Features (Arabic) */}
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Features (Arabic, one per line)</label>
                  <textarea
                    value={editing.featuresAr?.join('\n') || ''}
                    onChange={(e) =>
                      setEditing((p) => p && { ...p, featuresAr: e.target.value.split('\n').filter(Boolean) })
                    }
                    rows={3}
                    placeholder="تقنية أحادية البلورة PERC&#10;تصميم نصف مقطوع&#10;تقنية مقاومة التدهور"
                    className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm text-foreground focus:outline-none focus:border-primary/60 resize-none text-right"
                  />
                </div>

                {/* Published Toggle */}
                <div className="md:col-span-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editing.published ?? true}
                    onChange={(e) => setEditing((p) => p && { ...p, published: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label className="text-sm font-medium">Published (visible on website)</label>
                </div>
              </div>

              <button
                onClick={save}
                disabled={isPending || isUploading || !editing.name || !editing.nameAr}
                className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isPending ? 'Saving...' : isUploading ? 'Uploading Image...' : 'Save Product'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
