'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export interface SiteSettings {
  id: string
  company_name: string
  company_name_ar: string
  tagline: string | null
  tagline_ar: string | null
  email: string | null
  phone: string | null
  phone_alt: string | null
  whatsapp: string | null
  address: string | null
  address_ar: string | null
  working_hours: string | null
  working_hours_ar: string | null
  facebook: string | null
  twitter: string | null
  linkedin: string | null
  instagram: string | null
  youtube: string | null
  meta_title: string | null
  meta_title_ar: string | null
  meta_description: string | null
  meta_description_ar: string | null
  og_image: string | null
  logo: string | null
  favicon: string | null
  primary_color: string | null
}

export async function getSettings(): Promise<{ success: boolean; data?: SiteSettings; error?: string }> {
  try {
    const result = await prisma.$queryRaw<SiteSettings[]>`
      SELECT * FROM site_settings WHERE id = 'main' LIMIT 1
    `
    
    if (result.length === 0) {
      // Create default settings if not exist
      await prisma.$executeRaw`
        INSERT INTO site_settings (id) VALUES ('main') ON CONFLICT (id) DO NOTHING
      `
      const newResult = await prisma.$queryRaw<SiteSettings[]>`
        SELECT * FROM site_settings WHERE id = 'main' LIMIT 1
      `
      return { success: true, data: newResult[0] }
    }
    
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('Error fetching settings:', error)
    return { success: false, error: 'Failed to fetch settings' }
  }
}

export async function updateSettings(data: {
  companyName: string
  companyNameAr: string
  tagline: string
  taglineAr: string
  email: string
  phone: string
  phoneAlt: string
  whatsapp: string
  address: string
  addressAr: string
  workingHours: string
  workingHoursAr: string
  facebook: string
  twitter: string
  linkedin: string
  instagram: string
  youtube: string
  metaTitle: string
  metaTitleAr: string
  metaDescription: string
  metaDescriptionAr: string
  ogImage: string
  logo: string
  favicon: string
  primaryColor: string
}): Promise<{ success: boolean; data?: SiteSettings; error?: string }> {
  try {
    // Convert empty strings to null for optional fields
    const toNullable = (val: string) => val.trim() === '' ? null : val.trim()

    await prisma.$executeRaw`
      UPDATE site_settings SET
        company_name = ${data.companyName || 'ENVIRON'},
        company_name_ar = ${data.companyNameAr || 'إنفايرون'},
        tagline = ${toNullable(data.tagline)},
        tagline_ar = ${toNullable(data.taglineAr)},
        email = ${toNullable(data.email)},
        phone = ${toNullable(data.phone)},
        phone_alt = ${toNullable(data.phoneAlt)},
        whatsapp = ${toNullable(data.whatsapp)},
        address = ${toNullable(data.address)},
        address_ar = ${toNullable(data.addressAr)},
        working_hours = ${toNullable(data.workingHours)},
        working_hours_ar = ${toNullable(data.workingHoursAr)},
        facebook = ${toNullable(data.facebook)},
        twitter = ${toNullable(data.twitter)},
        linkedin = ${toNullable(data.linkedin)},
        instagram = ${toNullable(data.instagram)},
        youtube = ${toNullable(data.youtube)},
        meta_title = ${toNullable(data.metaTitle)},
        meta_title_ar = ${toNullable(data.metaTitleAr)},
        meta_description = ${toNullable(data.metaDescription)},
        meta_description_ar = ${toNullable(data.metaDescriptionAr)},
        og_image = ${toNullable(data.ogImage)},
        logo = ${toNullable(data.logo)},
        favicon = ${toNullable(data.favicon)},
        primary_color = ${toNullable(data.primaryColor)},
        updated_at = NOW()
      WHERE id = 'main'
    `

    const result = await prisma.$queryRaw<SiteSettings[]>`
      SELECT * FROM site_settings WHERE id = 'main' LIMIT 1
    `

    revalidatePath('/', 'layout')
    revalidatePath('/admin/settings')
    revalidatePath('/contact')

    return { success: true, data: result[0] }
  } catch (error) {
    console.error('Error updating settings:', error)
    return { success: false, error: 'Failed to update settings' }
  }
}
