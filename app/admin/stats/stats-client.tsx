'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Edit, Trash2, Plus, Check, X, Eye, EyeOff } from 'lucide-react'
import { getAllStats, createStat, updateStat, deleteStat } from './actions'
import type { Stat } from '@prisma/client'

export default function StatsClient() {
  const [stats, setStats] = useState<Stat[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    key: '',
    value: '',
    labelEn: '',
    labelAr: '',
    sortOrder: 0,
  })

  useEffect(() => {
    loadStats()
  }, [])

  async function loadStats() {
    setIsLoading(true)
    const result = await getAllStats()
    if (result.success) {
      setStats(result.data || [])
    }
    setIsLoading(false)
  }

  async function handleCreate() {
    if (!formData.key || !formData.value || !formData.labelEn || !formData.labelAr) {
      alert('Please fill all fields')
      return
    }

    const result = await createStat({
      key: formData.key,
      value: formData.value,
      labelEn: formData.labelEn,
      labelAr: formData.labelAr,
      sortOrder: formData.sortOrder,
    })

    if (result.success) {
      setFormData({ key: '', value: '', labelEn: '', labelAr: '', sortOrder: 0 })
      setIsCreating(false)
      await loadStats()
    } else {
      alert(result.error)
    }
  }

  async function handleUpdate(id: string, data: Partial<Stat>) {
    const result = await updateStat(id, {
      value: data.value,
      labelEn: data.labelEn,
      labelAr: data.labelAr,
      sortOrder: data.sortOrder,
      published: data.published,
    })

    if (result.success) {
      setEditingId(null)
      await loadStats()
    } else {
      alert(result.error)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this stat?')) return

    const result = await deleteStat(id)
    if (result.success) {
      await loadStats()
    } else {
      alert(result.error)
    }
  }

  if (isLoading) {
    return <div className="text-center py-12">Loading stats...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Hero Stats Manager</h1>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Stat
        </button>
      </div>

      {/* Create Form */}
      {isCreating && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-border rounded-lg p-6 bg-card space-y-4"
        >
          <h2 className="text-lg font-semibold">Create New Stat</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Key</label>
              <input
                type="text"
                value={formData.key}
                onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                placeholder="e.g., projects"
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-input text-foreground"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Value</label>
              <input
                type="text"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                placeholder="e.g., 200+"
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-input text-foreground"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Label (English)</label>
              <input
                type="text"
                value={formData.labelEn}
                onChange={(e) => setFormData({ ...formData, labelEn: e.target.value })}
                placeholder="e.g., Projects Delivered"
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-input text-foreground"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Label (Arabic)</label>
              <input
                type="text"
                value={formData.labelAr}
                onChange={(e) => setFormData({ ...formData, labelAr: e.target.value })}
                placeholder="e.g., المشاريع المسلمة"
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-input text-foreground"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Sort Order</label>
              <input
                type="number"
                value={formData.sortOrder}
                onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) })}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-input text-foreground"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
            >
              <Check className="w-4 h-4" />
              Create
            </button>
            <button
              onClick={() => setIsCreating(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Stats Table */}
      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Key</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Value</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Label (EN)</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Label (AR)</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Order</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Published</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {stats.map((stat) => (
                <motion.tr
                  key={stat.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-muted/50 transition-colors"
                >
                  {editingId === stat.id ? (
                    <>
                      <td className="px-4 py-3">{stat.key}</td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          defaultValue={stat.value}
                          onChange={(e) =>
                            handleUpdate(stat.id, { ...stat, value: e.target.value })
                          }
                          className="px-2 py-1 rounded border border-border bg-input text-foreground text-sm w-full"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          defaultValue={stat.labelEn}
                          onChange={(e) =>
                            handleUpdate(stat.id, { ...stat, labelEn: e.target.value })
                          }
                          className="px-2 py-1 rounded border border-border bg-input text-foreground text-sm w-full"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          defaultValue={stat.labelAr}
                          onChange={(e) =>
                            handleUpdate(stat.id, { ...stat, labelAr: e.target.value })
                          }
                          className="px-2 py-1 rounded border border-border bg-input text-foreground text-sm w-full"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          defaultValue={stat.sortOrder}
                          onChange={(e) =>
                            handleUpdate(stat.id, {
                              ...stat,
                              sortOrder: parseInt(e.target.value),
                            })
                          }
                          className="px-2 py-1 rounded border border-border bg-input text-foreground text-sm w-20"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() =>
                            handleUpdate(stat.id, { ...stat, published: !stat.published })
                          }
                          className="text-muted-foreground hover:text-foreground"
                        >
                          {stat.published ? (
                            <Eye className="w-4 h-4" />
                          ) : (
                            <EyeOff className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setEditingId(null)}
                          className="text-green-500 hover:text-green-600"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-3 text-sm font-medium">{stat.key}</td>
                      <td className="px-4 py-3 text-sm">{stat.value}</td>
                      <td className="px-4 py-3 text-sm">{stat.labelEn}</td>
                      <td className="px-4 py-3 text-sm">{stat.labelAr}</td>
                      <td className="px-4 py-3 text-sm">{stat.sortOrder}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() =>
                            handleUpdate(stat.id, { ...stat, published: !stat.published })
                          }
                          className={`text-sm px-2 py-1 rounded ${
                            stat.published
                              ? 'bg-green-500/20 text-green-600'
                              : 'bg-red-500/20 text-red-600'
                          }`}
                        >
                          {stat.published ? 'Published' : 'Hidden'}
                        </button>
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <button
                          onClick={() => setEditingId(stat.id)}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(stat.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </>
                  )}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty state */}
      {stats.length === 0 && !isCreating && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No stats found. Create one to get started.</p>
        </div>
      )}
    </div>
  )
}
