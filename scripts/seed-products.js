const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const products = [
  // Solar/Energy Products
  {
    id: 'solar-panel-mono-400w',
    name: '400W Monocrystalline Solar Panel',
    nameAr: 'لوح طاقة شمسية أحادي البلورة 400 واط',
    brand: 'Longi Solar',
    category: 'energy',
    shortDesc: 'High-efficiency monocrystalline panel for residential and commercial solar systems.',
    shortDescAr: 'لوح أحادي البلورة عالي الكفاءة للأنظمة الشمسية السكنية والتجارية.',
    descriptionEn: 'The LR4-60HIH-400M delivers 400W peak output with 21.3% efficiency using PERC cell technology.',
    descriptionAr: 'يوفر هذا اللوح طاقة قصوى تبلغ 400 واط بكفاءة 21.3% باستخدام تقنية خلايا PERC.',
    featuresEn: ['PERC monocrystalline technology', 'Half-cut cell design', 'Anti-PID technology', 'IP67 junction box'],
    featuresAr: ['تقنية أحادية البلورة PERC', 'تصميم نصف مقطوع', 'تقنية مقاومة PID', 'صندوق تقاطع IP67'],
    specsEn: JSON.stringify({Power: '400W', Efficiency: '21.3%', Dimensions: '1755×1038×35mm', Weight: '19.8kg'}),
    specsAr: JSON.stringify({القدرة: '400 واط', الكفاءة: '21.3%', الأبعاد: '1755×1038×35 مم', الوزن: '19.8 كجم'}),
    image: '/products/solar-panel.jpg',
    serviceId: 'solar-energy'
  },
  {
    id: 'solar-inverter-5kw',
    name: '5kW Hybrid Solar Inverter',
    nameAr: 'عاكس طاقة شمسية هجين 5 كيلوواط',
    brand: 'Growatt',
    category: 'energy',
    shortDesc: 'On/off-grid hybrid inverter with built-in MPPT charge controller.',
    shortDescAr: 'عاكس هجين للشبكة وخارجها مع وحدة تحكم MPPT مدمجة.',
    descriptionEn: 'Growatt SPH5000 is a 5kW hybrid inverter supporting both grid-tied and off-grid operation.',
    descriptionAr: 'يدعم هذا العاكس الهجين الطاقةَ البالغة 5 كيلوواط في وضعَي الشبكة وخارجها.',
    featuresEn: ['Pure sine wave output', 'Grid + solar + battery', 'MPPT controller', 'Smart load management'],
    featuresAr: ['موجة جيبية نقية', 'شبكة + شمسي + بطارية', 'متحكم MPPT', 'إدارة ذكية للحمل'],
    specsEn: JSON.stringify({Power: '5kW', Input: '120-450VDC', Output: '230VAC', Efficiency: '97.6%'}),
    specsAr: JSON.stringify({القدرة: '5 كيلووات', الدخل: '120-450 فولت', الخرج: '230 فولت', الكفاءة: '97.6%'}),
    image: '/products/solar-inverter.jpg',
    serviceId: 'solar-energy'
  },
  // Generator
  {
    id: 'diesel-generator-150kva',
    name: 'Diesel Generator 150kVA',
    nameAr: 'مولد ديزل 150 كيلوفولت أمبير',
    brand: 'Cummins',
    category: 'energy',
    shortDesc: 'Industrial standby diesel genset',
    shortDescAr: 'مجموعة مولدات ديزل احتياطية صناعية',
    descriptionEn: 'Cummins C150D5 prime-rated diesel generator with Stamford alternator.',
    descriptionAr: 'مولد ديزل Cummins C150D5 بتصنيف رئيسي مع مولد Stamford.',
    featuresEn: ['Cummins 6BTA engine', 'Stamford alternator', 'Auto start/stop', 'Deep sea controller'],
    featuresAr: ['محرك Cummins 6BTA', 'مولد Stamford', 'تشغيل/إيقاف تلقائي', 'متحكم Deep Sea'],
    specsEn: JSON.stringify({Power: '150kVA', Engine: 'Cummins 6BTA5.9-G2', Fuel: 'Diesel', Voltage: '400V 3-phase'}),
    specsAr: JSON.stringify({القدرة: '150 كيلوفولت أمبير', المحرك: 'Cummins 6BTA5.9-G2', الوقود: 'ديزل', الجهد: '400 فولت 3 أطوار'}),
    image: '/products/generator.jpg',
    serviceId: 'generators'
  },
  // HVAC
  {
    id: 'vrf-outdoor-unit-28hp',
    name: 'VRF Outdoor Unit 28HP',
    nameAr: 'وحدة VRF خارجية 28 حصان',
    brand: 'Daikin',
    category: 'hvac',
    shortDesc: 'Variable refrigerant flow multi-split system',
    shortDescAr: 'نظام VRF متعدد الانقسامات',
    descriptionEn: 'Daikin VRV IV outdoor unit for large-scale commercial HVAC applications.',
    descriptionAr: 'وحدة Daikin VRV IV الخارجية لتطبيقات HVAC التجارية الكبيرة.',
    featuresEn: ['R-410A refrigerant', 'Inverter compressor', 'Up to 64 indoor units', 'Heat recovery'],
    featuresAr: ['غاز R-410A', 'ضاغط إنفرتر', 'حتى 64 وحدة داخلية', 'استرداد حراري'],
    specsEn: JSON.stringify({Capacity: '28HP (78.4kW)', Refrigerant: 'R-410A', Power: '400V 3-phase', Dimensions: '1750×1240×765mm'}),
    specsAr: JSON.stringify({السعة: '28 حصان', غاز_التبريد: 'R-410A', الطاقة: '400 فولت', الأبعاد: '1750×1240×765 مم'}),
    image: '/products/hvac-unit.jpg',
    serviceId: 'hvac'
  },
  // Water Pump
  {
    id: 'submersible-pump-2hp',
    name: 'Submersible Water Pump 2HP',
    nameAr: 'مضخة مياه غاطسة 2 حصان',
    brand: 'Grundfos',
    category: 'water',
    shortDesc: 'Deep well submersible pump',
    shortDescAr: 'مضخة غاطسة للآبار العميقة',
    descriptionEn: 'Grundfos SP series stainless steel submersible pump for deep wells.',
    descriptionAr: 'مضخة Grundfos SP الغاطسة من الفولاذ المقاوم للصدأ للآبار العميقة.',
    featuresEn: ['Stainless steel construction', 'High efficiency motor', 'Sand resistant', 'Low maintenance'],
    featuresAr: ['بناء من الفولاذ المقاوم للصدأ', 'محرك عالي الكفاءة', 'مقاوم للرمال', 'صيانة منخفضة'],
    specsEn: JSON.stringify({Power: '2HP (1.5kW)', Flow: '3m³/h', Head: '80m', Depth: '150m', Voltage: '230V'}),
    specsAr: JSON.stringify({القدرة: '2 حصان', التدفق: '3 م³/ساعة', الضغط: '80 م', العمق: '150 م', الجهد: '230 فولت'}),
    image: '/products/water-pump.jpg',
    serviceId: 'water-pumps'
  },
  // Security
  {
    id: 'ip-camera-4mp',
    name: 'IP Dome Camera 4MP',
    nameAr: 'كاميرا IP قبة 4 ميجابكسل',
    brand: 'Hikvision',
    category: 'security',
    shortDesc: 'Network surveillance camera with IR',
    shortDescAr: 'كاميرا مراقبة شبكية مع الأشعة تحت الحمراء',
    descriptionEn: 'Hikvision DS-2CD2143G0-I 4MP IP dome camera with 30m IR night vision.',
    descriptionAr: 'كاميرا Hikvision DS-2CD2143G0-I IP القبة 4 ميجابكسل مع رؤية ليلية 30 م.',
    featuresEn: ['4MP resolution', '30m IR night vision', 'PoE powered', 'H.265+ compression'],
    featuresAr: ['دقة 4 ميجابكسل', 'رؤية ليلية 30 م', 'تعمل بـ PoE', 'ضغط H.265+'],
    specsEn: JSON.stringify({Resolution: '4MP (2688×1520)', Lens: '2.8mm', IR: '30m', Power: 'PoE/12VDC', Video: 'H.265+'}),
    specsAr: JSON.stringify({الدقة: '4 ميجابكسل', العدسة: '2.8 مم', الأشعة: '30 م', الطاقة: 'PoE/12V', الفيديو: 'H.265+'}),
    image: '/products/cctv-camera.jpg',
    serviceId: 'security-systems'
  }
]

async function main() {
  console.log('[/] Seeding products...')
  
  for (const product of products) {
    await prisma.product.create({ data: product })
    console.log(`[/] Created product: ${product.name}`)
  }
  
  console.log('[/] Products seeded successfully!')
}

main()
  .catch((e) => {
    console.error('[/] Error seeding products:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
