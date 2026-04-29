'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Save, Building2, Mail, Phone, MapPin, Clock, Globe, 
  Facebook, Twitter, Linkedin, Instagram, Youtube, 
  Search, Image as ImageIcon, Palette, Upload, Check,
  MessageCircle
} from 'lucide-react'
import { updateSettings, type SiteSettings } from './actions'

interface SettingsClientProps {
  initialSettings: SiteSettings
}

type TabId = 'company' | 'contact' | 'social' | 'seo'

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'company', label: 'Company Info', icon: Building2 },
  { id: 'contact', label: 'Contact Details', icon: Phone },
  { id: 'social', label: 'Social Media', icon: Globe },
  { id: 'seo', label: 'SEO & Branding', icon: Search },
]

// Input components extracted outside to prevent recreation
function InputField({ 
  label, 
  value, 
  onChange, 
  placeholder,
  dir,
  type = 'text',
  icon: Icon
}: { 
  label: string
  value: string | null | undefined
  onChange: (val: string) => void
  placeholder?: string
  dir?: 'rtl' | 'ltr'
  type?: string
  icon?: React.ElementType
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-muted-foreground flex items-center gap-2">
        {Icon && <Icon className="w-3.5 h-3.5" />}
        {label}
      </label>
      <input
        type={type}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        dir={dir}
        className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm text-foreground focus:outline-none focus:border-primary/60 transition-colors"
      />
    </div>
  )
}

function TextAreaField({ 
  label, 
  value, 
  onChange, 
  placeholder,
  dir,
  rows = 3
}: { 
  label: string
  value: string | null | undefined
  onChange: (val: string) => void
  placeholder?: string
  dir?: 'rtl' | 'ltr'
  rows?: number
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        dir={dir}
        rows={rows}
        className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm text-foreground focus:outline-none focus:border-primary/60 transition-colors resize-none"
      />
    </div>
  )
}

function ImageUploadField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string | null | undefined
  onChange: (val: string) => void
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <div className="flex items-center gap-3">
        {value && (
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-secondary/50 border border-border/60 flex items-center justify-center">
            <img src={value} alt={label} className="w-full h-full object-contain" />
          </div>
        )}
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter image URL"
          className="flex-1 px-3 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm text-foreground focus:outline-none focus:border-primary/60"
        />
      </div>
    </div>
  )
}

export default function SettingsClient({ initialSettings }: SettingsClientProps) {
  const [settings, setSettings] = useState(initialSettings)
  const [activeTab, setActiveTab] = useState<TabId>('company')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleChange = (key: keyof SiteSettings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const result = await updateSettings({
        companyName: settings.company_name,
        companyNameAr: settings.company_name_ar,
        tagline: settings.tagline ?? '',
        taglineAr: settings.tagline_ar ?? '',
        email: settings.email ?? '',
        phone: settings.phone ?? '',
        phoneAlt: settings.phone_alt ?? '',
        whatsapp: settings.whatsapp ?? '',
        address: settings.address ?? '',
        addressAr: settings.address_ar ?? '',
        workingHours: settings.working_hours ?? '',
        workingHoursAr: settings.working_hours_ar ?? '',
        facebook: settings.facebook ?? '',
        twitter: settings.twitter ?? '',
        linkedin: settings.linkedin ?? '',
        instagram: settings.instagram ?? '',
        youtube: settings.youtube ?? '',
        metaTitle: settings.meta_title ?? '',
        metaTitleAr: settings.meta_title_ar ?? '',
        metaDescription: settings.meta_description ?? '',
        metaDescriptionAr: settings.meta_description_ar ?? '',
        ogImage: settings.og_image ?? '',
        logo: settings.logo ?? '',
        favicon: settings.favicon ?? '',
        primaryColor: settings.primary_color ?? '',
      })

      if (result.success && result.data) {
        setSettings(result.data)
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      } else {
        alert(result.error || 'Failed to save settings')
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('An error occurred while saving')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Site Settings</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Manage your website configuration</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {saved ? (
            <>
              <Check className="w-4 h-4" />
              Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Changes'}
            </>
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border/50 pb-0">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-xl transition-colors ${
              activeTab === tab.id
                ? 'bg-card text-foreground border border-border/50 border-b-card -mb-px'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content - No key to prevent remounting */}
      <div className="glass-card rounded-2xl p-6">
        {/* Company Tab */}
        {activeTab === 'company' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <InputField
              label="Company Name (English)"
              value={settings.company_name}
              onChange={(val) => handleChange('company_name', val)}
              placeholder="ENVIRON"
              icon={Building2}
            />
            <InputField
              label="Company Name (Arabic)"
              value={settings.company_name_ar}
              onChange={(val) => handleChange('company_name_ar', val)}
              placeholder="إنفايرون"
              dir="rtl"
            />
            <InputField
              label="Tagline (English)"
              value={settings.tagline}
              onChange={(val) => handleChange('tagline', val)}
              placeholder="Integrated Engineering Solutions"
            />
            <InputField
              label="Tagline (Arabic)"
              value={settings.tagline_ar}
              onChange={(val) => handleChange('tagline_ar', val)}
              placeholder="حلول هندسية متكاملة"
              dir="rtl"
            />
            <div className="md:col-span-2">
              <InputField
                label="Working Hours (English)"
                value={settings.working_hours}
                onChange={(val) => handleChange('working_hours', val)}
                placeholder="Sun - Thu: 8AM - 5PM"
                icon={Clock}
              />
            </div>
            <div className="md:col-span-2">
              <InputField
                label="Working Hours (Arabic)"
                value={settings.working_hours_ar}
                onChange={(val) => handleChange('working_hours_ar', val)}
                placeholder="الأحد - الخميس: 8 ص - 5 م"
                dir="rtl"
              />
            </div>
          </motion.div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <InputField
              label="Email Address"
              value={settings.email}
              onChange={(val) => handleChange('email', val)}
              placeholder="info@environ-sd.com"
              type="email"
              icon={Mail}
            />
            <InputField
              label="Phone Number"
              value={settings.phone}
              onChange={(val) => handleChange('phone', val)}
              placeholder="+249912340960"
              icon={Phone}
            />
            <InputField
              label="Alternative Phone"
              value={settings.phone_alt}
              onChange={(val) => handleChange('phone_alt', val)}
              placeholder="+249..."
              icon={Phone}
            />
            <InputField
              label="WhatsApp Number"
              value={settings.whatsapp}
              onChange={(val) => handleChange('whatsapp', val)}
              placeholder="+249912340960"
              icon={MessageCircle}
            />
            <div className="md:col-span-2">
              <InputField
                label="Address (English)"
                value={settings.address}
                onChange={(val) => handleChange('address', val)}
                placeholder="Khartoum, Sudan"
                icon={MapPin}
              />
            </div>
            <div className="md:col-span-2">
              <InputField
                label="Address (Arabic)"
                value={settings.address_ar}
                onChange={(val) => handleChange('address_ar', val)}
                placeholder="الخرطوم، السودان"
                dir="rtl"
              />
            </div>
          </motion.div>
        )}

        {/* Social Tab */}
        {activeTab === 'social' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <InputField
              label="Facebook URL"
              value={settings.facebook}
              onChange={(val) => handleChange('facebook', val)}
              placeholder="https://facebook.com/environ"
              icon={Facebook}
            />
            <InputField
              label="Twitter / X URL"
              value={settings.twitter}
              onChange={(val) => handleChange('twitter', val)}
              placeholder="https://twitter.com/environ"
              icon={Twitter}
            />
            <InputField
              label="LinkedIn URL"
              value={settings.linkedin}
              onChange={(val) => handleChange('linkedin', val)}
              placeholder="https://linkedin.com/company/environ"
              icon={Linkedin}
            />
            <InputField
              label="Instagram URL"
              value={settings.instagram}
              onChange={(val) => handleChange('instagram', val)}
              placeholder="https://instagram.com/environ"
              icon={Instagram}
            />
            <InputField
              label="YouTube URL"
              value={settings.youtube}
              onChange={(val) => handleChange('youtube', val)}
              placeholder="https://youtube.com/@environ"
              icon={Youtube}
            />
          </motion.div>
        )}

        {/* SEO Tab */}
        {activeTab === 'seo' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Meta Title (English)"
                value={settings.meta_title}
                onChange={(val) => handleChange('meta_title', val)}
                placeholder="ENVIRON | Integrated Engineering Solutions"
                icon={Search}
              />
              <InputField
                label="Meta Title (Arabic)"
                value={settings.meta_title_ar}
                onChange={(val) => handleChange('meta_title_ar', val)}
                placeholder="إنفايرون | حلول هندسية متكاملة"
                dir="rtl"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextAreaField
                label="Meta Description (English)"
                value={settings.meta_description}
                onChange={(val) => handleChange('meta_description', val)}
                placeholder="Comprehensive MEP, energy solutions, and contracting services..."
              />
              <TextAreaField
                label="Meta Description (Arabic)"
                value={settings.meta_description_ar}
                onChange={(val) => handleChange('meta_description_ar', val)}
                placeholder="خدمات هندسية شاملة..."
                dir="rtl"
              />
            </div>
            <div className="border-t border-border/50 pt-6">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Branding Assets
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageUploadField
                  label="Logo URL"
                  value={settings.logo}
                  onChange={(val) => handleChange('logo', val)}
                />
                <ImageUploadField
                  label="Favicon URL"
                  value={settings.favicon}
                  onChange={(val) => handleChange('favicon', val)}
                />
                <div className="md:col-span-2">
                  <ImageUploadField
                    label="Open Graph Image URL (for social sharing)"
                    value={settings.og_image}
                    onChange={(val) => handleChange('og_image', val)}
                  />
                </div>
              </div>
            </div>
            <div className="border-t border-border/50 pt-6">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Theme Color
              </h3>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={settings.primary_color || '#009d8e'}
                  onChange={(e) => handleChange('primary_color', e.target.value)}
                  className="w-12 h-12 rounded-xl cursor-pointer border-2 border-border/60"
                />
                <div className="flex-1">
                  <InputField
                    label="Primary Color (Hex)"
                    value={settings.primary_color}
                    onChange={(val) => handleChange('primary_color', val)}
                    placeholder="#009d8e"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
