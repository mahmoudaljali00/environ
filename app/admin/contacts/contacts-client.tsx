'use client'

import { useState } from 'react'
import { Trash2, Mail, Phone, Building2, Calendar, Eye, Check, Archive } from 'lucide-react'
import { updateContactStatus, deleteContact } from './actions'

type Contact = {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  service: string | null
  message: string
  status: string
  createdAt: Date
  updatedAt: Date
}

export default function ContactsClient({ initialContacts }: { initialContacts: Contact[] }) {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts)
  const [viewing, setViewing] = useState<Contact | null>(null)
  const [filter, setFilter] = useState<string>('all')

  const handleStatusChange = async (id: string, status: string) => {
    const result = await updateContactStatus(id, status)
    if (result.success) {
      setContacts(contacts.map(c => c.id === id ? { ...c, status } : c))
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) return
    const result = await deleteContact(id)
    if (result.success) {
      setContacts(contacts.filter(c => c.id !== id))
      if (viewing?.id === id) setViewing(null)
    }
  }

  const filteredContacts = filter === 'all' 
    ? contacts 
    : contacts.filter(c => c.status === filter)

  const statusColors = {
    new: 'bg-blue-500/20 text-blue-600 border-blue-500/30',
    read: 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30',
    replied: 'bg-green-500/20 text-green-600 border-green-500/30',
    archived: 'bg-gray-500/20 text-gray-600 border-gray-500/30'
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Contact Submissions</h1>
        <div className="flex gap-2">
          {['all', 'new', 'read', 'replied', 'archived'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                filter === f 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
              }`}
            >
              {f} {f === 'all' ? `(${contacts.length})` : `(${contacts.filter(c => c.status === f).length})`}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* List */}
        <div className="flex flex-col gap-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
          {filteredContacts.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No {filter !== 'all' ? filter : ''} contacts found
            </div>
          ) : (
            filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className={`glass-card rounded-xl p-4 cursor-pointer transition-all hover:border-primary/40 ${
                  viewing?.id === contact.id ? 'border-primary/60 bg-primary/5' : ''
                }`}
                onClick={() => setViewing(contact)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1">{contact.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Mail className="w-3 h-3" />
                      <span className="truncate">{contact.email}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium border ${statusColors[contact.status as keyof typeof statusColors]}`}>
                    {contact.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-2">
                  {contact.message}
                </p>
                <div className="flex items-center gap-3 mt-3 text-[10px] text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </div>
                  {contact.service && (
                    <div className="px-2 py-0.5 rounded bg-secondary text-foreground">
                      {contact.service}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Detail */}
        <div className="glass-card rounded-xl p-6 sticky top-6 h-fit max-h-[calc(100vh-200px)] overflow-y-auto">
          {viewing ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-1">{viewing.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {new Date(viewing.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(viewing.id)}
                  className="p-2 rounded-lg hover:bg-destructive/20 text-destructive transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <a href={`mailto:${viewing.email}`} className="text-primary hover:underline">
                    {viewing.email}
                  </a>
                </div>
                {viewing.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <a href={`tel:${viewing.phone}`} className="text-primary hover:underline" dir="ltr">
                      {viewing.phone}
                    </a>
                  </div>
                )}
                {viewing.company && (
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <span>{viewing.company}</span>
                  </div>
                )}
              </div>

              {viewing.service && (
                <div className="p-3 rounded-lg bg-secondary/50">
                  <p className="text-xs text-muted-foreground mb-1">Interested Service</p>
                  <p className="text-sm font-medium">{viewing.service}</p>
                </div>
              )}

              <div className="p-4 rounded-lg bg-secondary/30 border border-border/40">
                <p className="text-xs text-muted-foreground mb-2">Message</p>
                <p className="text-sm whitespace-pre-wrap">{viewing.message}</p>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-xs font-medium text-muted-foreground">Update Status</p>
                <div className="grid grid-cols-2 gap-2">
                  {['new', 'read', 'replied', 'archived'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(viewing.id, status)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium capitalize transition-all ${
                        viewing.status === status
                          ? statusColors[status as keyof typeof statusColors]
                          : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
              <Eye className="w-12 h-12 mb-3 opacity-30" />
              <p className="text-sm">Select a contact to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
