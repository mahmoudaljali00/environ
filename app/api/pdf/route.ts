import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument, PDFFont, PDFPage, rgb, StandardFonts } from 'pdf-lib'
import { prisma } from '@/lib/prisma'
import fs from 'fs/promises'
import path from 'path'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// ─── Helpers ──────────────────────────────────────────────────────────────────
function hexToRgb(hex: string) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return m
    ? { r: parseInt(m[1], 16) / 255, g: parseInt(m[2], 16) / 255, b: parseInt(m[3], 16) / 255 }
    : { r: 0, g: 0.62, b: 0.56 }
}

function wrapLines(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  if (!text) return []
  const words = text.split(/\s+/)
  const lines: string[] = []
  let line = ''
  for (const word of words) {
    const test = line ? line + ' ' + word : word
    if (font.widthOfTextAtSize(test, size) > maxWidth && line) {
      lines.push(line)
      line = word
    } else {
      line = test
    }
  }
  if (line) lines.push(line)
  return lines
}

function truncate(text: string, font: PDFFont, size: number, maxWidth: number) {
  if (!text) return ''
  if (font.widthOfTextAtSize(text, size) <= maxWidth) return text
  let truncated = text
  while (truncated.length > 0 && font.widthOfTextAtSize(truncated + '…', size) > maxWidth) {
    truncated = truncated.slice(0, -1)
  }
  return truncated + '…'
}

// ─── Route ────────────────────────────────────────────────────────────────────
export async function GET(_req: NextRequest) {
  try {
    // Fetch fresh data
    const [settingsR, statsR, servicesR, projectsR, teamR, clientsR] = await Promise.all([
      prisma.$queryRaw<any[]>`SELECT * FROM site_settings WHERE id = 'main' LIMIT 1`,
      prisma.$queryRaw<any[]>`SELECT * FROM stats WHERE published = true ORDER BY sort_order ASC`,
      prisma.$queryRaw<any[]>`SELECT * FROM services WHERE published = true ORDER BY "createdAt" ASC LIMIT 6`,
      prisma.$queryRaw<any[]>`SELECT * FROM projects WHERE published = true ORDER BY year DESC LIMIT 4`,
      prisma.$queryRaw<any[]>`SELECT * FROM team_members WHERE published = true ORDER BY "order" ASC LIMIT 6`,
      prisma.$queryRaw<any[]>`SELECT * FROM clients WHERE published = true ORDER BY "order" ASC LIMIT 8`,
    ])

    const settings = settingsR[0] || {}
    const stats = statsR || []
    const services = servicesR || []
    const projects = projectsR || []
    const team = teamR || []
    const clients = clientsR || []

    // Init PDF
    const pdfDoc = await PDFDocument.create()
    const fontReg = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

    // Logo (optional — gracefully skipped if not available)
    const publicDir = path.join(process.cwd(), 'public')
    let logoImage: any = null
    let logoDims = { width: 0, height: 0 }
    try {
      const logoBytes = await fs.readFile(path.join(publicDir, 'logo.png'))
      logoImage = await pdfDoc.embedPng(logoBytes)
      logoDims = { width: logoImage.width, height: logoImage.height }
    } catch {}

    // Colors (matching website brand)
    const primary = hexToRgb('#009d8e')
    const accent = hexToRgb('#5dc4b8')
    const dark = hexToRgb('#0d1117')
    const card = hexToRgb('#161b22')
    const cardLight = hexToRgb('#1c232c')
    const border = hexToRgb('#30363d')
    const text = hexToRgb('#f0f6fc')
    const muted = hexToRgb('#8b949e')
    const white = rgb(1, 1, 1)

    // Layout constants
    const W = 595.28
    const H = 841.89
    const M = 50
    const CW = W - M * 2

    const COMPANY = settings.company_name || 'ENVIRON'
    const TAGLINE = (settings.tagline || 'Integrated Engineering Solutions').toUpperCase()

    // ─── Helper drawing primitives ──────────────────────────────────────────────
    const newPage = () => {
      const p = pdfDoc.addPage([W, H])
      p.drawRectangle({ x: 0, y: 0, width: W, height: H, color: rgb(dark.r, dark.g, dark.b) })
      return p
    }

    const drawLogo = (page: PDFPage, x: number, y: number, targetWidth: number) => {
      if (!logoImage) {
        // Fallback: draw company name text
        page.drawText(COMPANY, {
          x, y,
          size: 16,
          font: fontBold,
          color: rgb(primary.r, primary.g, primary.b),
        })
        return
      }
      const ratio = logoDims.height / logoDims.width
      page.drawImage(logoImage, { x, y, width: targetWidth, height: targetWidth * ratio })
    }

    const drawHeader = (page: PDFPage, pageNum: number, label: string) => {
      // Top bar
      page.drawRectangle({ x: 0, y: H - 56, width: W, height: 56, color: rgb(card.r, card.g, card.b) })
      // Accent line below
      page.drawRectangle({ x: 0, y: H - 58, width: W, height: 2, color: rgb(primary.r, primary.g, primary.b) })

      // Logo on left (small)
      if (logoImage) {
        const lh = 24
        const lw = lh * (logoDims.width / logoDims.height)
        drawLogo(page, M, H - 40, lw)
      } else {
        page.drawText(COMPANY, {
          x: M, y: H - 36,
          size: 14, font: fontBold,
          color: rgb(primary.r, primary.g, primary.b),
        })
      }

      // Section label center
      const labelW = fontReg.widthOfTextAtSize(label.toUpperCase(), 9)
      page.drawText(label.toUpperCase(), {
        x: (W - labelW) / 2,
        y: H - 35,
        size: 9,
        font: fontReg,
        color: rgb(muted.r, muted.g, muted.b),
        characterSpacing: 2,
      })

      // Page number right
      const numTxt = String(pageNum).padStart(2, '0')
      const numW = fontBold.widthOfTextAtSize(numTxt, 11)
      page.drawText(numTxt, {
        x: W - M - numW,
        y: H - 35,
        size: 11,
        font: fontBold,
        color: rgb(primary.r, primary.g, primary.b),
      })
    }

    const drawFooter = (page: PDFPage) => {
      page.drawRectangle({ x: 0, y: 0, width: W, height: 32, color: rgb(card.r, card.g, card.b) })
      page.drawRectangle({ x: 0, y: 32, width: W, height: 1, color: rgb(primary.r, primary.g, primary.b) })

      page.drawText(COMPANY, {
        x: M, y: 12,
        size: 9, font: fontBold,
        color: rgb(primary.r, primary.g, primary.b),
      })

      const right = `${settings.email || ''}    ${new Date().getFullYear()}`
      const rightW = fontReg.widthOfTextAtSize(right, 8)
      page.drawText(right, {
        x: W - M - rightW,
        y: 13,
        size: 8,
        font: fontReg,
        color: rgb(muted.r, muted.g, muted.b),
      })
    }

    const sectionLabel = (page: PDFPage, x: number, y: number, label: string) => {
      page.drawRectangle({ x, y, width: 22, height: 2, color: rgb(primary.r, primary.g, primary.b) })
      page.drawText(label.toUpperCase(), {
        x: x + 30, y: y - 4,
        size: 9, font: fontBold,
        color: rgb(primary.r, primary.g, primary.b),
        characterSpacing: 2,
      })
    }

    const sectionTitle = (page: PDFPage, x: number, y: number, title: string) => {
      page.drawText(title, {
        x, y,
        size: 30, font: fontBold,
        color: rgb(text.r, text.g, text.b),
      })
    }

    // ════════════════════════════════════════════════════════════════════════
    // PAGE 1 — COVER
    // ════════════════════════════════════════════════════════════════════════
    const p1 = newPage()

    // Top accent bar
    p1.drawRectangle({ x: 0, y: H - 6, width: W, height: 6, color: rgb(primary.r, primary.g, primary.b) })

    // Decorative corner accents
    p1.drawCircle({ x: W - 30, y: H - 110, size: 90, color: rgb(primary.r, primary.g, primary.b), opacity: 0.06 })
    p1.drawCircle({ x: W - 30, y: H - 110, size: 60, color: rgb(primary.r, primary.g, primary.b), opacity: 0.08 })
    p1.drawCircle({ x: 40, y: 200, size: 70, color: rgb(primary.r, primary.g, primary.b), opacity: 0.05 })

    // Top label
    p1.drawText('COMPANY PROFILE', {
      x: M, y: H - 95,
      size: 9, font: fontBold,
      color: rgb(accent.r, accent.g, accent.b),
      characterSpacing: 4,
    })
    p1.drawText(String(new Date().getFullYear()), {
      x: M, y: H - 115,
      size: 9, font: fontReg,
      color: rgb(muted.r, muted.g, muted.b),
    })

    // Centered logo (large)
    if (logoImage) {
      const targetW = 280
      const ratio = logoDims.height / logoDims.width
      const targetH = targetW * ratio
      p1.drawImage(logoImage, {
        x: (W - targetW) / 2,
        y: H / 2 + 40,
        width: targetW,
        height: targetH,
      })
    } else {
      const nameW = fontBold.widthOfTextAtSize(COMPANY, 56)
      p1.drawText(COMPANY, {
        x: (W - nameW) / 2,
        y: H / 2 + 60,
        size: 56,
        font: fontBold,
        color: rgb(primary.r, primary.g, primary.b),
      })
    }

    // Tagline
    const tagW = fontReg.widthOfTextAtSize(TAGLINE, 11)
    p1.drawText(TAGLINE, {
      x: (W - tagW) / 2,
      y: H / 2 + 10,
      size: 11,
      font: fontReg,
      color: rgb(text.r, text.g, text.b),
      characterSpacing: 3,
    })

    // Divider line
    p1.drawRectangle({
      x: W / 2 - 30,
      y: H / 2 - 6,
      width: 60,
      height: 1.5,
      color: rgb(primary.r, primary.g, primary.b),
    })

    // Stats grid
    if (stats.length > 0) {
      const sCount = Math.min(stats.length, 4)
      const sbW = 110, sbH = 80, gap = 14
      const totalW = sbW * sCount + gap * (sCount - 1)
      let sx = (W - totalW) / 2
      const sy = 200

      stats.slice(0, sCount).forEach((s: any) => {
        // Card
        p1.drawRectangle({
          x: sx, y: sy,
          width: sbW, height: sbH,
          color: rgb(card.r, card.g, card.b),
          borderColor: rgb(primary.r, primary.g, primary.b),
          borderWidth: 1,
        })
        // Top accent
        p1.drawRectangle({
          x: sx, y: sy + sbH - 3,
          width: sbW, height: 3,
          color: rgb(primary.r, primary.g, primary.b),
        })
        // Value
        const val = String(s.value || '')
        const vW = fontBold.widthOfTextAtSize(val, 24)
        p1.drawText(val, {
          x: sx + (sbW - vW) / 2,
          y: sy + 42,
          size: 24, font: fontBold,
          color: rgb(primary.r, primary.g, primary.b),
        })
        // Label
        const lbl = (s.label_en || s.label || '').toUpperCase()
        const truncatedLbl = truncate(lbl, fontReg, 7.5, sbW - 12)
        const lW = fontReg.widthOfTextAtSize(truncatedLbl, 7.5)
        p1.drawText(truncatedLbl, {
          x: sx + (sbW - lW) / 2,
          y: sy + 18,
          size: 7.5, font: fontReg,
          color: rgb(muted.r, muted.g, muted.b),
          characterSpacing: 1.5,
        })
        sx += sbW + gap
      })
    }

    // Bottom info bar
    p1.drawRectangle({ x: 0, y: 0, width: W, height: 90, color: rgb(card.r, card.g, card.b) })
    p1.drawRectangle({ x: 0, y: 90, width: W, height: 1, color: rgb(primary.r, primary.g, primary.b) })

    // Address & contact on cover
    p1.drawText('ADDRESS', {
      x: M, y: 60,
      size: 7, font: fontBold,
      color: rgb(primary.r, primary.g, primary.b),
      characterSpacing: 2,
    })
    p1.drawText(truncate(settings.address || 'Khartoum, Sudan', fontReg, 9, 200), {
      x: M, y: 42,
      size: 9, font: fontReg,
      color: rgb(text.r, text.g, text.b),
    })

    p1.drawText('CONTACT', {
      x: W / 2 - 40, y: 60,
      size: 7, font: fontBold,
      color: rgb(primary.r, primary.g, primary.b),
      characterSpacing: 2,
    })
    p1.drawText(settings.phone || '', {
      x: W / 2 - 40, y: 42,
      size: 9, font: fontReg,
      color: rgb(text.r, text.g, text.b),
    })

    p1.drawText('WEB', {
      x: W - M - 130, y: 60,
      size: 7, font: fontBold,
      color: rgb(primary.r, primary.g, primary.b),
      characterSpacing: 2,
    })
    p1.drawText(settings.email || '', {
      x: W - M - 130, y: 42,
      size: 9, font: fontReg,
      color: rgb(text.r, text.g, text.b),
    })

    // Year stamp
    p1.drawText(String(new Date().getFullYear()), {
      x: M, y: 14,
      size: 8, font: fontBold,
      color: rgb(muted.r, muted.g, muted.b),
      characterSpacing: 2,
    })

    // ════════════════════════════════════════════════════════════════════════
    // PAGE 2 — ABOUT
    // ════════════════════════════════════════════════════════════════════════
    const p2 = newPage()
    drawHeader(p2, 2, 'About')

    sectionLabel(p2, M, H - 110, 'About Us')
    sectionTitle(p2, M, H - 150, 'Who We Are')

    // Description
    let cursorY = H - 195
    const description = settings.description ||
      `${COMPANY} is a leading integrated engineering company delivering excellence in MEP services, energy solutions, and general contracting across East Africa. Our commitment to quality, innovation, and sustainable development has made us the trusted partner for government agencies, international organisations, and private enterprises.`

    const descLines = wrapLines(description, fontReg, 11, CW)
    descLines.slice(0, 6).forEach(line => {
      p2.drawText(line, {
        x: M, y: cursorY,
        size: 11, font: fontReg,
        color: rgb(text.r, text.g, text.b),
      })
      cursorY -= 17
    })

    // Mission & Vision side-by-side
    cursorY -= 30
    const mvW = (CW - 18) / 2
    const mvH = 110

    // Mission
    p2.drawRectangle({
      x: M, y: cursorY - mvH,
      width: mvW, height: mvH,
      color: rgb(card.r, card.g, card.b),
    })
    p2.drawRectangle({
      x: M, y: cursorY - mvH,
      width: 3, height: mvH,
      color: rgb(primary.r, primary.g, primary.b),
    })
    p2.drawText('MISSION', {
      x: M + 18, y: cursorY - 22,
      size: 9, font: fontBold,
      color: rgb(primary.r, primary.g, primary.b),
      characterSpacing: 2,
    })
    const missionText = 'To deliver innovative, sustainable engineering solutions that exceed client expectations and contribute to infrastructure development.'
    const missionLines = wrapLines(missionText, fontReg, 9, mvW - 36)
    let my = cursorY - 42
    missionLines.slice(0, 5).forEach(l => {
      p2.drawText(l, { x: M + 18, y: my, size: 9, font: fontReg, color: rgb(text.r, text.g, text.b) })
      my -= 13
    })

    // Vision
    const vx = M + mvW + 18
    p2.drawRectangle({
      x: vx, y: cursorY - mvH,
      width: mvW, height: mvH,
      color: rgb(card.r, card.g, card.b),
    })
    p2.drawRectangle({
      x: vx, y: cursorY - mvH,
      width: 3, height: mvH,
      color: rgb(accent.r, accent.g, accent.b),
    })
    p2.drawText('VISION', {
      x: vx + 18, y: cursorY - 22,
      size: 9, font: fontBold,
      color: rgb(accent.r, accent.g, accent.b),
      characterSpacing: 2,
    })
    const visionText = 'To be the leading engineering firm in East Africa, recognised for technical excellence and sustainable development.'
    const visionLines = wrapLines(visionText, fontReg, 9, mvW - 36)
    let vy = cursorY - 42
    visionLines.slice(0, 5).forEach(l => {
      p2.drawText(l, { x: vx + 18, y: vy, size: 9, font: fontReg, color: rgb(text.r, text.g, text.b) })
      vy -= 13
    })

    cursorY -= mvH + 40

    // Core values
    sectionLabel(p2, M, cursorY, 'Core Values')
    cursorY -= 32

    const values = [
      { t: 'Excellence', d: 'Highest quality standards in every project we deliver.' },
      { t: 'Innovation', d: 'Embracing modern technology and creative solutions.' },
      { t: 'Integrity', d: 'Transparent and ethical business practices throughout.' },
      { t: 'Sustainability', d: 'Environmental responsibility in all our operations.' },
    ]

    const vCardW = (CW - 18) / 2
    const vCardH = 60
    values.forEach((v, i) => {
      const vx2 = M + (i % 2) * (vCardW + 18)
      const vy2 = cursorY - Math.floor(i / 2) * (vCardH + 10) - vCardH

      p2.drawRectangle({
        x: vx2, y: vy2,
        width: vCardW, height: vCardH,
        color: rgb(cardLight.r, cardLight.g, cardLight.b),
        borderColor: rgb(border.r, border.g, border.b),
        borderWidth: 0.5,
      })
      // Bullet circle
      p2.drawCircle({
        x: vx2 + 18, y: vy2 + vCardH - 22,
        size: 5,
        color: rgb(primary.r, primary.g, primary.b),
      })
      p2.drawText(v.t, {
        x: vx2 + 32, y: vy2 + vCardH - 24,
        size: 11, font: fontBold,
        color: rgb(text.r, text.g, text.b),
      })
      p2.drawText(truncate(v.d, fontReg, 8.5, vCardW - 50), {
        x: vx2 + 32, y: vy2 + vCardH - 40,
        size: 8.5, font: fontReg,
        color: rgb(muted.r, muted.g, muted.b),
      })
    })

    drawFooter(p2)

    // ════════════════════════════════════════════════════════════════════════
    // PAGE 3 — SERVICES
    // ════════════════════════════════════════════════════════════════════════
    const p3 = newPage()
    drawHeader(p3, 3, 'Services')

    sectionLabel(p3, M, H - 110, 'Our Services')
    sectionTitle(p3, M, H - 150, 'What We Offer')

    p3.drawText('Comprehensive engineering solutions tailored to your project needs.', {
      x: M, y: H - 175,
      size: 10, font: fontReg,
      color: rgb(muted.r, muted.g, muted.b),
    })

    const svcCount = Math.min(services.length, 6)
    const scW = (CW - 16) / 2
    const scH = 95
    const svcStartY = H - 210

    services.slice(0, svcCount).forEach((svc: any, i: number) => {
      const sx = M + (i % 2) * (scW + 16)
      const sy = svcStartY - Math.floor(i / 2) * (scH + 14) - scH

      // Card
      p3.drawRectangle({
        x: sx, y: sy,
        width: scW, height: scH,
        color: rgb(card.r, card.g, card.b),
        borderColor: rgb(border.r, border.g, border.b),
        borderWidth: 0.5,
      })
      // Number badge
      p3.drawRectangle({
        x: sx, y: sy,
        width: 4, height: scH,
        color: rgb(primary.r, primary.g, primary.b),
      })

      // Service number
      const num = String(i + 1).padStart(2, '0')
      p3.drawText(num, {
        x: sx + 14, y: sy + scH - 26,
        size: 10, font: fontBold,
        color: rgb(primary.r, primary.g, primary.b),
      })

      // Service name
      const svcName = truncate(svc.name || '', fontBold, 13, scW - 30)
      p3.drawText(svcName, {
        x: sx + 14, y: sy + scH - 46,
        size: 13, font: fontBold,
        color: rgb(text.r, text.g, text.b),
      })

      // Description (wrapped)
      const descLines = wrapLines(svc.description || '', fontReg, 9, scW - 30)
      let dy = sy + scH - 65
      descLines.slice(0, 3).forEach(line => {
        p3.drawText(line, {
          x: sx + 14, y: dy,
          size: 9, font: fontReg,
          color: rgb(muted.r, muted.g, muted.b),
        })
        dy -= 13
      })
    })

    drawFooter(p3)

    // ════════════════════════════════════════════════════════════════════════
    // PAGE 4 — PROJECTS
    // ════════════════════════════════════════════════════════════════════════
    const p4 = newPage()
    drawHeader(p4, 4, 'Projects')

    sectionLabel(p4, M, H - 110, 'Our Work')
    sectionTitle(p4, M, H - 150, 'Featured Projects')

    p4.drawText('A selection of our recent successful project deliveries.', {
      x: M, y: H - 175,
      size: 10, font: fontReg,
      color: rgb(muted.r, muted.g, muted.b),
    })

    const pjCount = Math.min(projects.length, 4)
    const pjH = 100
    const pjStart = H - 210

    projects.slice(0, pjCount).forEach((pj: any, i: number) => {
      const py = pjStart - i * (pjH + 14) - pjH

      // Card
      p4.drawRectangle({
        x: M, y: py,
        width: CW, height: pjH,
        color: rgb(card.r, card.g, card.b),
        borderColor: rgb(border.r, border.g, border.b),
        borderWidth: 0.5,
      })
      // Left accent
      p4.drawRectangle({
        x: M, y: py,
        width: 4, height: pjH,
        color: rgb(primary.r, primary.g, primary.b),
      })

      // Year badge (top right)
      if (pj.year) {
        const yearStr = String(pj.year)
        const ywv = fontBold.widthOfTextAtSize(yearStr, 14)
        p4.drawRectangle({
          x: W - M - ywv - 24, y: py + pjH - 32,
          width: ywv + 16, height: 22,
          color: rgb(primary.r, primary.g, primary.b),
        })
        p4.drawText(yearStr, {
          x: W - M - ywv - 16, y: py + pjH - 27,
          size: 13, font: fontBold,
          color: white,
        })
      }

      // Title
      const titleMax = CW - 100
      const title = truncate(pj.title || '', fontBold, 15, titleMax)
      p4.drawText(title, {
        x: M + 18, y: py + pjH - 30,
        size: 15, font: fontBold,
        color: rgb(text.r, text.g, text.b),
      })

      // Client / Location row
      const meta = [pj.client, pj.location].filter(Boolean).join('  ·  ')
      if (meta) {
        p4.drawText(truncate(meta, fontReg, 9, CW - 36), {
          x: M + 18, y: py + pjH - 50,
          size: 9, font: fontReg,
          color: rgb(accent.r, accent.g, accent.b),
        })
      }

      // Description
      const descLines = wrapLines(pj.description || '', fontReg, 9.5, CW - 36)
      let dy = py + pjH - 68
      descLines.slice(0, 2).forEach(line => {
        p4.drawText(line, {
          x: M + 18, y: dy,
          size: 9.5, font: fontReg,
          color: rgb(muted.r, muted.g, muted.b),
        })
        dy -= 13
      })
    })

    drawFooter(p4)

    // ════════════════════════════════════════════════════════════════════════
    // PAGE 5 — TEAM & CLIENTS (only if data exists)
    // ════════════════════════════════════════════════════════════════════════
    const showTeamPage = team.length > 0 || clients.length > 0
    if (showTeamPage) {
      const p5 = newPage()
      drawHeader(p5, 5, 'Team')

      // Team section
      if (team.length > 0) {
        sectionLabel(p5, M, H - 110, 'Our Team')
        sectionTitle(p5, M, H - 150, 'Meet the Experts')

        const tmCount = Math.min(team.length, 6)
        const tmW = (CW - 32) / 3
        const tmH = 90
        const tmStart = H - 195

        team.slice(0, tmCount).forEach((m: any, i: number) => {
          const tx = M + (i % 3) * (tmW + 16)
          const ty = tmStart - Math.floor(i / 3) * (tmH + 14) - tmH

          p5.drawRectangle({
            x: tx, y: ty,
            width: tmW, height: tmH,
            color: rgb(card.r, card.g, card.b),
            borderColor: rgb(border.r, border.g, border.b),
            borderWidth: 0.5,
          })
          // Top accent
          p5.drawRectangle({
            x: tx, y: ty + tmH - 3,
            width: tmW, height: 3,
            color: rgb(primary.r, primary.g, primary.b),
          })

          const name = truncate(m.name || '', fontBold, 11, tmW - 24)
          p5.drawText(name, {
            x: tx + 12, y: ty + tmH - 24,
            size: 11, font: fontBold,
            color: rgb(text.r, text.g, text.b),
          })

          const role = truncate(m.role || '', fontReg, 9, tmW - 24)
          p5.drawText(role, {
            x: tx + 12, y: ty + tmH - 42,
            size: 9, font: fontReg,
            color: rgb(primary.r, primary.g, primary.b),
          })

          if (m.bio) {
            const bioLines = wrapLines(m.bio, fontReg, 8, tmW - 24)
            let by = ty + tmH - 58
            bioLines.slice(0, 2).forEach(l => {
              p5.drawText(l, {
                x: tx + 12, y: by,
                size: 8, font: fontReg,
                color: rgb(muted.r, muted.g, muted.b),
              })
              by -= 11
            })
          }
        })
      }

      // Clients section
      if (clients.length > 0) {
        const cBaseY = team.length > 0 ? H - 470 : H - 110
        sectionLabel(p5, M, cBaseY, 'Our Clients')

        if (team.length === 0) {
          sectionTitle(p5, M, cBaseY - 40, 'Trusted By')
        }

        const cStartY = team.length > 0 ? cBaseY - 30 : cBaseY - 80
        const cCount = Math.min(clients.length, 8)
        const cW = (CW - 24) / 4
        const cH = 50

        clients.slice(0, cCount).forEach((c: any, i: number) => {
          const cx = M + (i % 4) * (cW + 8)
          const cy = cStartY - Math.floor(i / 4) * (cH + 8) - cH

          p5.drawRectangle({
            x: cx, y: cy,
            width: cW, height: cH,
            color: rgb(cardLight.r, cardLight.g, cardLight.b),
            borderColor: rgb(border.r, border.g, border.b),
            borderWidth: 0.5,
          })

          const name = truncate(c.name || '', fontReg, 9, cW - 12)
          const nW = fontReg.widthOfTextAtSize(name, 9)
          p5.drawText(name, {
            x: cx + (cW - nW) / 2,
            y: cy + cH / 2 - 4,
            size: 9, font: fontReg,
            color: rgb(text.r, text.g, text.b),
          })
        })
      }

      drawFooter(p5)
    }

    // ════════════════════════════════════════════════════════════════════════
    // PAGE 6 — CONTACT
    // ════════════════════════════════════════════════════════════════════════
    const finalNum = showTeamPage ? 6 : 5
    const p6 = newPage()
    drawHeader(p6, finalNum, 'Contact')

    sectionLabel(p6, M, H - 110, 'Get In Touch')
    sectionTitle(p6, M, H - 150, 'Contact Us')

    p6.drawText("We'd love to hear about your next project.", {
      x: M, y: H - 175,
      size: 11, font: fontReg,
      color: rgb(muted.r, muted.g, muted.b),
    })

    // Contact card
    const ccY = H - 200
    const ccH = 320
    p6.drawRectangle({
      x: M, y: ccY - ccH,
      width: CW, height: ccH,
      color: rgb(card.r, card.g, card.b),
      borderColor: rgb(primary.r, primary.g, primary.b),
      borderWidth: 1,
    })
    // Left accent
    p6.drawRectangle({
      x: M, y: ccY - ccH,
      width: 4, height: ccH,
      color: rgb(primary.r, primary.g, primary.b),
    })

    const contactItems = [
      { label: 'Phone', value: settings.phone || '—' },
      { label: 'Email', value: settings.email || '—' },
      { label: 'WhatsApp', value: settings.whatsapp || settings.phone || '—' },
      { label: 'Address', value: settings.address || '—' },
      { label: 'Working Hours', value: settings.working_hours || 'Sunday — Thursday, 8:00 AM — 5:00 PM' },
    ]

    let icy = ccY - 30
    contactItems.forEach(item => {
      p6.drawText(item.label.toUpperCase(), {
        x: M + 24, y: icy,
        size: 8, font: fontBold,
        color: rgb(primary.r, primary.g, primary.b),
        characterSpacing: 2,
      })

      const valLines = wrapLines(item.value, fontReg, 11, CW - 60)
      let vyc = icy - 16
      valLines.slice(0, 2).forEach(l => {
        p6.drawText(l, {
          x: M + 24, y: vyc,
          size: 11, font: fontReg,
          color: rgb(text.r, text.g, text.b),
        })
        vyc -= 14
      })
      icy -= valLines.length > 1 ? 56 : 50
    })

    // CTA Banner
    const ctaY = 90
    const ctaH = 70
    p6.drawRectangle({
      x: M, y: ctaY,
      width: CW, height: ctaH,
      color: rgb(primary.r, primary.g, primary.b),
    })

    const ctaTitle = "Let's Build Something Great"
    const ctaTW = fontBold.widthOfTextAtSize(ctaTitle, 18)
    p6.drawText(ctaTitle, {
      x: M + (CW - ctaTW) / 2,
      y: ctaY + ctaH - 28,
      size: 18, font: fontBold,
      color: white,
    })

    const ctaSub = 'Contact us today for a free consultation'
    const ctaSW = fontReg.widthOfTextAtSize(ctaSub, 10)
    p6.drawText(ctaSub, {
      x: M + (CW - ctaSW) / 2,
      y: ctaY + ctaH - 50,
      size: 10, font: fontReg,
      color: white,
      opacity: 0.9,
    })

    drawFooter(p6)

    // ─── Save and respond ────────────────────────────────────────────────────
    const pdfBytes = await pdfDoc.save()
    const fileName = `${COMPANY.replace(/\s+/g, '-')}-Company-Profile.pdf`

    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
      },
    })
  } catch (error) {
    console.error('[/] PDF generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: String(error) },
      { status: 500 }
    )
  }
}
