#!/usr/bin/env node

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

console.log('📄 Generating company profile PDF with database data...\n');

// Paths
const publicDir = path.join(__dirname, '../public');
const outPath = path.join(publicDir, 'company-profile.pdf');
const logoPath = path.join(publicDir, 'logo.png');
const patternPath = path.join(publicDir, 'pattern.png');
const dataPath = path.join(publicDir, 'pdf-data.json');

// Load data from JSON (populated from database)
let data;
try {
  data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  console.log('✓ Loaded data from pdf-data.json (database export)');
} catch (err) {
  console.error('✗ Error loading pdf-data.json:', err.message);
  process.exit(1);
}

const { settings, stats, services, projects, team, clients } = data;

// Check assets
const hasLogo = fs.existsSync(logoPath);
const hasPattern = fs.existsSync(patternPath);

console.log(`✓ Logo: ${hasLogo ? 'Found' : 'NOT FOUND'}`);
console.log(`✓ Pattern: ${hasPattern ? 'Found' : 'NOT FOUND'}`);
console.log(`✓ Stats: ${stats.length} items`);
console.log(`✓ Services: ${services.length} items`);
console.log(`✓ Projects: ${projects.length} items`);
console.log(`✓ Team: ${team.length} members`);
console.log(`✓ Clients: ${clients.length} clients\n`);

// Colors from settings
const C = {
  primary: settings.primary_color || '#009d8e',
  primaryDark: '#007a6e',
  accent: '#5dc4b8',
  gold: '#d4a017',
  dark: '#0d1117',
  darkCard: '#161b22',
  border: '#30363d',
  text: '#f0f6fc',
  muted: '#8b949e',
};

try {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 0, bottom: 0, left: 0, right: 0 },
    info: {
      Title: `${settings.company_name} - Company Profile`,
      Author: settings.company_name,
      Subject: 'Company Profile',
    },
  });

  const stream = fs.createWriteStream(outPath);
  doc.pipe(stream);

  const W = 595.28, H = 841.89, M = 50, CW = W - M * 2;
  const currentYear = new Date().getFullYear();

  // ═══════════════════════════════════════════════════════════════════════════
  // HELPERS
  // ═══════════════════════════════════════════════════════════════════════════

  function pageBg(opacity = 0.035) {
    doc.rect(0, 0, W, H).fill(C.dark);
    if (hasPattern) {
      doc.save().opacity(opacity);
      const tile = 160;
      for (let x = 0; x < W; x += tile)
        for (let y = 0; y < H; y += tile)
          doc.image(patternPath, x, y, { width: tile, height: tile });
      doc.restore();
    }
  }

  function logo(x, y, w) {
    if (hasLogo) {
      try {
        doc.image(logoPath, x, y, { width: w });
      } catch (err) {
        console.warn('⚠ Could not embed logo:', err.message);
      }
    }
  }

  function pageHeader(num) {
    doc.rect(0, 0, W, 68).fill(C.darkCard);
    doc.rect(0, 68, W, 2.5).fill(C.primary);
    logo(M, 16, 110);
    doc.fontSize(7.5).font('Helvetica').fillColor(C.muted)
      .text(`Company Profile  ·  ${currentYear}`, M, 47);
    doc.fontSize(9).font('Helvetica-Bold').fillColor(C.muted)
      .text(`0${num}`, W - M - 20, 28, { width: 20, align: 'right' });
  }

  function pageFooter() {
    doc.rect(0, H - 42, W, 42).fill(C.darkCard);
    logo(M, H - 32, 80);
    doc.fontSize(7).font('Helvetica').fillColor(C.muted)
      .text(`© ${currentYear} ${settings.company_name}`, W - M - 150, H - 28, { width: 150, align: 'right' });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PAGE 1: COVER
  // ═══════════════════════════════════════════════════════════════════════════
  console.log('📄 Page 1: Cover...');
  pageBg(0.06);
  doc.rect(0, 0, W, 5).fill(C.primary);

  // Glow effects
  [[80, 0.09], [120, 0.05], [170, 0.025]].forEach(([r, op]) => {
    doc.circle(W - 55, 90, r).fillOpacity(op).fill(C.primary);
  });
  [[60, 0.07], [95, 0.035]].forEach(([r, op]) => {
    doc.circle(55, H - 110, r).fillOpacity(op).fill(C.primary);
  });
  doc.fillOpacity(1);

  // Main logo centered
  const logoW = 310;
  logo((W - logoW) / 2, H / 2 - 130, logoW);

  // Divider
  const divCY = H / 2 + 20;
  doc.moveTo(W / 2 - 110, divCY).lineTo(W / 2 + 110, divCY)
    .strokeColor(C.primary).lineWidth(1.5).stroke();

  // Tagline from database
  doc.fontSize(10.5).font('Helvetica').fillColor(C.text)
    .text((settings.tagline || 'INTEGRATED ENGINEERING SOLUTIONS').toUpperCase(), 0, divCY + 14,
      { width: W, align: 'center', characterSpacing: 2.5 });

  // Address from database
  doc.fontSize(9).fillColor(C.muted)
    .text(settings.address || 'Khartoum, Sudan', 0, divCY + 34,
      { width: W, align: 'center' });

  // Stats from database
  const sbW = 105, sbH = 78, sbGap = 18;
  const sbTotalW = sbW * 4 + sbGap * 3;
  let sbX = (W - sbTotalW) / 2;
  const sbY = H - 195;

  stats.slice(0, 4).forEach(s => {
    doc.roundedRect(sbX, sbY, sbW, sbH, 8).fill(C.darkCard);
    doc.roundedRect(sbX, sbY, sbW, sbH, 8)
      .strokeColor(C.primary).lineWidth(0.8).stroke();
    doc.fontSize(27).font('Helvetica-Bold').fillColor(C.primary)
      .text(s.value, sbX, sbY + 17, { width: sbW, align: 'center' });
    doc.fontSize(7.5).font('Helvetica').fillColor(C.muted)
      .text(s.label, sbX, sbY + 52, { width: sbW, align: 'center' });
    sbX += sbW + sbGap;
  });

  // Cover footer
  doc.rect(0, H - 48, W, 48).fill(C.darkCard);
  logo(M, H - 37, 90);
  doc.fontSize(7).font('Helvetica').fillColor(C.muted)
    .text(`© ${currentYear} All rights reserved`, W - M - 130, H - 28, { width: 130, align: 'right' });

  // ═══════════════════════════════════════════════════════════════════════════
  // PAGE 2: ABOUT
  // ═══════════════════════════════════════════════════════════════════════════
  doc.addPage();
  console.log('📄 Page 2: About...');
  pageBg();
  pageHeader(2);

  const ay = 100;
  doc.fontSize(8).font('Helvetica-Bold').fillColor(C.primary).text('ABOUT US', M, ay);
  doc.fontSize(26).fillColor(C.text).text('Who We Are', M, ay + 16);

  // About text using database settings
  const aboutText = `${settings.company_name} is a leading integrated engineering company headquartered in ${settings.address}. ` +
    `${settings.meta_description}\n\n` +
    'Our commitment to quality, innovation, and sustainable development has made us the trusted partner for government agencies, international organisations, and private enterprises across the region.';

  doc.fontSize(9.5).font('Helvetica').fillColor(C.muted)
    .text(aboutText, M, ay + 52, { width: CW, lineGap: 4, align: 'justify' });

  // Mission / Vision
  const mvY = 260, mvW = (CW - 18) / 2, mvH = 105;
  [
    { title: 'OUR MISSION', color: C.primary,
      text: 'To deliver innovative, sustainable engineering solutions that exceed client expectations and contribute to infrastructure development across Africa.' },
    { title: 'OUR VISION', color: C.accent,
      text: 'To be the leading engineering firm in East Africa, recognised for technical excellence, innovation, and commitment to sustainable development.' },
  ].forEach((card, i) => {
    const cx = M + i * (mvW + 18);
    doc.roundedRect(cx, mvY, mvW, mvH, 9).fill(C.darkCard);
    doc.roundedRect(cx, mvY, mvW, mvH, 9)
      .strokeColor(card.color).lineWidth(0.8).stroke();
    doc.fontSize(9).font('Helvetica-Bold').fillColor(card.color)
      .text(card.title, cx + 18, mvY + 16);
    doc.fontSize(8.5).font('Helvetica').fillColor(C.muted)
      .text(card.text, cx + 18, mvY + 36, { width: mvW - 36, lineGap: 3 });
  });

  // Core Values
  doc.fontSize(8.5).font('Helvetica-Bold').fillColor(C.primary).text('CORE VALUES', M, 395);
  const vals = [
    { t: 'Excellence', d: 'Commitment to highest standards' },
    { t: 'Integrity', d: 'Transparent and ethical practices' },
    { t: 'Innovation', d: 'Embracing new technologies' },
    { t: 'Sustainability', d: 'Environmental responsibility' },
  ];
  vals.forEach((v, i) => {
    const vx = M + (i % 2) * (CW / 2 + 8), vy = 418 + Math.floor(i / 2) * 44;
    doc.circle(vx + 8, vy + 9, 6).fill(C.primary);
    doc.fontSize(9.5).font('Helvetica-Bold').fillColor(C.text).text(v.t, vx + 24, vy + 3);
    doc.fontSize(8).font('Helvetica').fillColor(C.muted).text(v.d, vx + 24, vy + 18);
  });

  // Why Choose Us - using stats from database
  doc.fontSize(8.5).font('Helvetica-Bold').fillColor(C.primary).text('WHY CHOOSE US', M, 530);
  const yearsExp = stats.find(s => s.label.toLowerCase().includes('years'))?.value || '15+';
  const why = [
    `${yearsExp} years of engineering excellence across East Africa`,
    'ISO-aligned quality processes and certified engineers',
    'End-to-end project delivery – design through commissioning',
    'Cutting-edge technology and energy monitoring tools',
  ];
  why.forEach((item, i) => {
    const wy = 552 + i * 24;
    doc.roundedRect(M, wy, 13, 13, 2).fill(C.primary);
    doc.fontSize(8.5).font('Helvetica').fillColor(C.text).text(item, M + 22, wy + 1.5);
  });

  pageFooter();

  // ═══════════════════════════════════════════════════════════════════════════
  // PAGE 3: SERVICES (from database)
  // ═══════════════════════════════════════════════════════════════════════════
  doc.addPage();
  console.log('📄 Page 3: Services...');
  pageBg();
  pageHeader(3);

  doc.fontSize(8).font('Helvetica-Bold').fillColor(C.primary).text('OUR SERVICES', M, 100);
  doc.fontSize(26).fillColor(C.text).text('What We Offer', M, 116);
  doc.fontSize(9.5).font('Helvetica').fillColor(C.muted)
    .text('Comprehensive engineering solutions tailored to your needs.', M, 155);

  const scW = (CW - 18) / 2, scH = 88;
  services.slice(0, 6).forEach((s, i) => {
    const sx = M + (i % 2) * (scW + 18);
    const sy = 175 + Math.floor(i / 2) * (scH + 14);
    doc.roundedRect(sx, sy, scW, scH, 8).fill(C.darkCard);
    doc.roundedRect(sx, sy, scW, scH, 8)
      .strokeColor(C.border).lineWidth(0.4).stroke();
    doc.roundedRect(sx, sy, scW, 3.5, 2).fill(C.primary);
    doc.fontSize(10.5).font('Helvetica-Bold').fillColor(C.text)
      .text(s.name, sx + 14, sy + 16);
    doc.fontSize(8).font('Helvetica').fillColor(C.muted)
      .text(s.description, sx + 14, sy + 35, { width: scW - 28, lineGap: 2.5 });
  });

  // Additional services
  doc.fontSize(8.5).font('Helvetica-Bold').fillColor(C.primary).text('ALSO PROVIDED', M, 538);
  const add = ['Emergency Generator Supply', 'Fire Fighting Systems', 'Building Management (BMS)',
    'Energy Auditing', 'Maintenance Contracts', 'Supply Chain Services'];
  add.forEach((item, i) => {
    const ax2 = M + (i % 3) * (CW / 3), ay2 = 558 + Math.floor(i / 3) * 22;
    doc.fontSize(8.5).font('Helvetica').fillColor(C.primary).text('▶', ax2, ay2);
    doc.fillColor(C.muted).text(item, ax2 + 16, ay2);
  });

  pageFooter();

  // ═══════════════════════════════════════════════════════════════════════════
  // PAGE 4: PROJECTS (from database)
  // ═══════════════════════════════════════════════════════════════════════════
  doc.addPage();
  console.log('📄 Page 4: Projects...');
  pageBg();
  pageHeader(4);

  doc.fontSize(8).font('Helvetica-Bold').fillColor(C.primary).text('TRACK RECORD', M, 100);
  doc.fontSize(26).fillColor(C.text).text('Projects & Achievements', M, 116);

  // Mini stats row
  const msW = 112, msH = 60, msGap = (CW - msW * 4) / 3;
  stats.slice(0, 4).forEach((s, i) => {
    const mx = M + i * (msW + msGap);
    doc.roundedRect(mx, 155, msW, msH, 7).fill(C.darkCard);
    doc.roundedRect(mx, 155, msW, msH, 7)
      .strokeColor(C.primary).lineWidth(0.6).stroke();
    doc.fontSize(22).font('Helvetica-Bold').fillColor(C.primary)
      .text(s.value, mx, 163, { width: msW, align: 'center' });
    doc.fontSize(7.5).font('Helvetica').fillColor(C.muted)
      .text(s.label, mx, 193, { width: msW, align: 'center' });
  });

  // Key Projects from database
  doc.fontSize(8.5).font('Helvetica-Bold').fillColor(C.primary).text('KEY PROJECTS', M, 238);

  projects.slice(0, 4).forEach((p, i) => {
    const py = 260 + i * 68;
    doc.roundedRect(M, py, CW, 58, 7).fill(C.darkCard);
    doc.roundedRect(M, py, CW, 58, 7)
      .strokeColor(C.border).lineWidth(0.4).stroke();
    doc.rect(M, py, 3.5, 58).fill(C.primary);
    doc.fontSize(10.5).font('Helvetica-Bold').fillColor(C.text)
      .text(p.title, M + 18, py + 10);
    doc.fontSize(8).font('Helvetica').fillColor(C.muted)
      .text(p.description, M + 18, py + 27, { width: CW - 100 });
    doc.fontSize(7).fillColor(C.muted)
      .text(`${p.client} · ${p.location}`, M + 18, py + 42);
    doc.fontSize(14).font('Helvetica-Bold').fillColor(C.primary)
      .text(p.year.toString(), W - M - 50, py + 20, { width: 45, align: 'right' });
  });

  // Sectors
  doc.fontSize(8.5).font('Helvetica-Bold').fillColor(C.primary).text('SECTORS SERVED', M, 545);
  const sectors = ['Government', 'UN Agencies', 'NGOs', 'Banking', 'Healthcare', 'Industrial', 'Commercial', 'Residential'];
  sectors.forEach((s, i) => {
    const bx = M + (i % 4) * 118, by = 565 + Math.floor(i / 4) * 32;
    doc.roundedRect(bx, by, 108, 22, 4).fill(C.darkCard);
    doc.roundedRect(bx, by, 108, 22, 4)
      .strokeColor(C.border).lineWidth(0.4).stroke();
    doc.fontSize(8).font('Helvetica').fillColor(C.muted)
      .text(s, bx, by + 7, { width: 108, align: 'center' });
  });

  pageFooter();

  // ═══════════════════════════════════════════════════════════════════════════
  // PAGE 5: TEAM & CLIENTS (from database)
  // ═══════════════════════════════════════════════════════════════════════════
  doc.addPage();
  console.log('📄 Page 5: Team & Clients...');
  pageBg();
  pageHeader(5);

  doc.fontSize(8).font('Helvetica-Bold').fillColor(C.primary).text('OUR TEAM', M, 100);
  doc.fontSize(26).fillColor(C.text).text('Leadership', M, 116);

  // Team members from database
  const tmW = (CW - 36) / 4, tmH = 70;
  team.slice(0, 4).forEach((t, i) => {
    const tx = M + i * (tmW + 12);
    doc.roundedRect(tx, 155, tmW, tmH, 8).fill(C.darkCard);
    doc.roundedRect(tx, 155, tmW, tmH, 8)
      .strokeColor(C.border).lineWidth(0.4).stroke();
    doc.fontSize(9).font('Helvetica-Bold').fillColor(C.text)
      .text(t.name, tx + 10, 170, { width: tmW - 20, align: 'center' });
    doc.fontSize(7).font('Helvetica').fillColor(C.primary)
      .text(t.role, tx + 10, 188, { width: tmW - 20, align: 'center' });
  });

  // Clients section from database
  doc.fontSize(8.5).font('Helvetica-Bold').fillColor(C.primary).text('OUR CLIENTS', M, 260);
  doc.fontSize(9).font('Helvetica').fillColor(C.muted)
    .text('Trusted by leading organizations across Sudan and East Africa.', M, 278);

  const clW = (CW - 24) / 4, clH = 42;
  clients.slice(0, 8).forEach((c, i) => {
    const cx = M + (i % 4) * (clW + 8);
    const cy = 305 + Math.floor(i / 4) * (clH + 10);
    doc.roundedRect(cx, cy, clW, clH, 6).fill(C.darkCard);
    doc.roundedRect(cx, cy, clW, clH, 6)
      .strokeColor(C.border).lineWidth(0.3).stroke();
    doc.fontSize(7.5).font('Helvetica').fillColor(C.text)
      .text(c, cx + 8, cy + 16, { width: clW - 16, align: 'center' });
  });

  // Certifications
  doc.fontSize(8.5).font('Helvetica-Bold').fillColor(C.primary).text('CERTIFICATIONS & STANDARDS', M, 420);
  const certs = ['ISO 9001:2015', 'OHSAS 18001', 'ISO 14001', 'IEEE Standards', 'ASHRAE Guidelines', 'IEC Compliance'];
  certs.forEach((cert, i) => {
    const cx = M + (i % 3) * (CW / 3);
    const cy = 445 + Math.floor(i / 3) * 28;
    doc.fontSize(8.5).font('Helvetica').fillColor(C.primary).text('✓', cx, cy);
    doc.fillColor(C.text).text(cert, cx + 14, cy);
  });

  pageFooter();

  // ═══════════════════════════════════════════════════════════════════════════
  // PAGE 6: CONTACT (from database settings)
  // ═══════════════════════════════════════════════════════════════════════════
  doc.addPage();
  console.log('📄 Page 6: Contact...');
  pageBg(0.055);

  // Glow effects
  [[100, 0.07], [155, 0.035], [200, 0.018]].forEach(([r, op]) => {
    doc.circle(W - 70, 200, r).fillOpacity(op).fill(C.primary);
  });
  [[70, 0.06], [110, 0.03]].forEach(([r, op]) => {
    doc.circle(70, H - 180, r).fillOpacity(op).fill(C.primary);
  });
  doc.fillOpacity(1);

  pageHeader(6);

  doc.fontSize(8).font('Helvetica-Bold').fillColor(C.primary).text('GET IN TOUCH', M, 108);
  doc.fontSize(26).fillColor(C.text).text('Contact Us', M, 124);
  doc.fontSize(9.5).font('Helvetica').fillColor(C.muted)
    .text("We'd love to hear about your next project. Reach out via any of the channels below.", M, 164, { width: CW });

  // Contact card with database values
  doc.roundedRect(M, 200, CW, 280, 12).fill(C.darkCard);
  doc.roundedRect(M, 200, CW, 280, 12)
    .strokeColor(C.primary).lineWidth(1).stroke();

  const cItems = [
    { l: 'OFFICE ADDRESS', v: settings.address || 'Khartoum, Sudan' },
    { l: 'PHONE', v: settings.phone || '+249 912 340 960' },
    { l: 'EMAIL', v: settings.email || 'info@environ-sd.com' },
    { l: 'WHATSAPP', v: settings.whatsapp || '+249 912 340 960' },
    { l: 'WORKING HOURS', v: settings.working_hours || 'Sun - Thu: 8AM - 5PM' },
  ];

  let cy = 224;
  cItems.forEach(c => {
    doc.fontSize(7.5).font('Helvetica-Bold').fillColor(C.primary).text(c.l, M + 28, cy);
    doc.fontSize(10.5).font('Helvetica').fillColor(C.text)
      .text(c.v, M + 28, cy + 15, { width: CW - 56 });
    cy += 48;
  });

  // CTA banner
  doc.roundedRect(M, 505, CW, 64, 10).fill(C.primary);
  doc.fontSize(16).font('Helvetica-Bold').fillColor('#ffffff')
    .text("Let's Build Something Great Together", M, 517, { width: CW, align: 'center' });
  doc.fontSize(9).font('Helvetica').fillColor('#ffffffcc')
    .text('Contact us today for a free consultation', M, 541, { width: CW, align: 'center' });

  // Final footer with large centered logo
  doc.rect(0, H - 72, W, 72).fill(C.darkCard);
  doc.rect(0, H - 72, W, 2).fill(C.primary);
  logo((W - 160) / 2, H - 58, 160);

  // ═══════════════════════════════════════════════════════════════════════════
  // FINALIZE
  // ═══════════════════════════════════════════════════════════════════════════
  doc.end();

  stream.on('finish', () => {
    const fileStats = fs.statSync(outPath);
    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('✓ PDF generated successfully!');
    console.log(`  Output: ${outPath}`);
    console.log(`  Size: ${(fileStats.size / 1024).toFixed(1)} KB`);
    console.log(`  Pages: 6`);
    console.log(`  Data source: pdf-data.json (database export)`);
    console.log('═══════════════════════════════════════════════════════════════');
    process.exit(0);
  });

  stream.on('error', err => {
    console.error('\n✗ Stream error:', err.message);
    process.exit(1);
  });

} catch (error) {
  console.error('\n✗ Fatal error:', error.message);
  console.error(error.stack);
  process.exit(1);
}
