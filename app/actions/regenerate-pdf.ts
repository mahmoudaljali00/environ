'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export interface PdfData {
  settings: {
    companyName: string
    tagline: string
    address: string
    phone: string
    email: string
    whatsapp: string
    workingHours: string
  }
  stats: Array<{
    value: string
    labelEn: string
    labelAr: string
  }>
  services: Array<{
    name: string
    nameAr: string
    description: string
    descriptionAr: string
  }>
  projects: Array<{
    title: string
    titleAr: string
    description: string
    descriptionAr: string
    client: string
    location: string
    year: string
  }>
  team: Array<{
    name: string
    nameAr: string
    role: string
    roleAr: string
  }>
  clients: Array<{
    name: string
    nameAr: string
  }>
  generatedAt: string
}

export async function regeneratePdfData(): Promise<{ success: boolean; error?: string }> {
  try {
    // Fetch all data from database
    const [settingsResult, statsResult, servicesResult, projectsResult, teamResult, clientsResult] = await Promise.all([
      prisma.$queryRaw<any[]>`SELECT * FROM site_settings WHERE id = 'main' LIMIT 1`,
      prisma.$queryRaw<any[]>`SELECT * FROM stats WHERE published = true ORDER BY "order" ASC`,
      prisma.$queryRaw<any[]>`SELECT * FROM services WHERE published = true ORDER BY "order" ASC LIMIT 6`,
      prisma.$queryRaw<any[]>`SELECT * FROM projects WHERE published = true ORDER BY year DESC LIMIT 6`,
      prisma.$queryRaw<any[]>`SELECT * FROM team_members WHERE published = true ORDER BY "order" ASC LIMIT 6`,
      prisma.$queryRaw<any[]>`SELECT * FROM clients WHERE published = true ORDER BY "order" ASC LIMIT 10`,
    ])

    const settings = settingsResult[0] || {}

    const pdfData: PdfData = {
      settings: {
        companyName: settings.company_name || 'ENVIRON',
        tagline: settings.tagline || 'Integrated Engineering Solutions',
        address: settings.address || 'Khartoum, Sudan',
        phone: settings.phone || '',
        email: settings.email || '',
        whatsapp: settings.whatsapp || '',
        workingHours: settings.working_hours || 'Sunday - Thursday | 8:00 AM - 5:00 PM',
      },
      stats: statsResult.map((s: any) => ({
        value: s.value || '',
        labelEn: s.label_en || s.label || '',
        labelAr: s.label_ar || '',
      })),
      services: servicesResult.map((s: any) => ({
        name: s.name || '',
        nameAr: s.name_ar || s.nameAr || '',
        description: s.description || '',
        descriptionAr: s.description_ar || s.descriptionAr || '',
      })),
      projects: projectsResult.map((p: any) => ({
        title: p.title || '',
        titleAr: p.title_ar || p.titleAr || '',
        description: p.description || '',
        descriptionAr: p.description_ar || p.descriptionAr || '',
        client: p.client || '',
        location: p.location || '',
        year: p.year || '',
      })),
      team: teamResult.map((t: any) => ({
        name: t.name || '',
        nameAr: t.name_ar || t.nameAr || '',
        role: t.role || '',
        roleAr: t.role_ar || t.roleAr || '',
      })),
      clients: clientsResult.map((c: any) => ({
        name: c.name || '',
        nameAr: c.name_ar || c.nameAr || '',
      })),
      generatedAt: new Date().toISOString(),
    }

    // Store the PDF data in the database for the API to read
    await prisma.$executeRaw`
      INSERT INTO pdf_cache (id, data, updated_at)
      VALUES ('main', ${JSON.stringify(pdfData)}::jsonb, NOW())
      ON CONFLICT (id) DO UPDATE SET
        data = ${JSON.stringify(pdfData)}::jsonb,
        updated_at = NOW()
    `

    // Revalidate the PDF API route
    revalidatePath('/api/pdf')

    return { success: true }
  } catch (error) {
    console.error('Error regenerating PDF data:', error)
    return { success: false, error: String(error) }
  }
}
