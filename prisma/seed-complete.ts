import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting complete database seed...')

  // 1. Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  await prisma.user.upsert({
    where: { email: 'admin@environ.sd' },
    update: {},
    create: {
      email: 'admin@environ.sd',
      name: 'Admin User',
      password: hashedPassword,
      role: 'admin',
    },
  })
  console.log('✅ Admin user created')

  // 2. Seed all 8 services
  const serviceIds: Record<string, string> = {}
  const services = [
    { slug: 'engineering', name: 'Engineering Services', nameAr: 'الخدمات الهندسية', icon: 'HardHat' },
    { slug: 'energy', name: 'Energy Solutions', nameAr: 'حلول الطاقة', icon: 'Zap' },
    { slug: 'hvac', name: 'Air Conditioning Systems', nameAr: 'أنظمة تكييف الهواء', icon: 'Wind' },
    { slug: 'mep', name: 'MEP Services', nameAr: 'خدمات MEP', icon: 'Wrench' },
    { slug: 'water', name: 'Water Pump Systems', nameAr: 'أنظمة مضخات المياه', icon: 'Droplets' },
    { slug: 'security', name: 'Low Current & Security', nameAr: 'الأنظمة الأمنية', icon: 'Shield' },
    { slug: 'contracting', name: 'Contracting & Consultancy', nameAr: 'التعاقد والاستشارات', icon: 'Settings' },
    { slug: 'trading', name: 'Trading Services', nameAr: 'خدمات التجارة', icon: 'ShoppingBag' },
  ]

  for (const svc of services) {
    const service = await prisma.service.upsert({
      where: { slug: svc.slug },
      update: {},
      create: {
        ...svc,
        description: `${svc.name} for Sudan`,
        descriptionAr: `${svc.nameAr} للسودان`,
        featuresEn: ['Feature 1', 'Feature 2', 'Feature 3'],
        featuresAr: ['ميزة 1', 'ميزة 2', 'ميزة 3'],
        benefits: ['Benefit 1', 'Benefit 2'],
        benefitsAr: ['فائدة 1', 'فائدة 2'],
        image: '/project-1.jpg',
      },
    })
    serviceIds[svc.slug] = service.id
  }
  console.log(`✅ Seeded ${services.length} services`)

  // 3. Seed sample products
  const products = [
    {
      slug: 'solar-panel-400w',
      name: '400W Solar Panel',
      nameAr: 'لوح شمسي 400 واط',
      brand: 'Longi Solar',
      category: 'energy',
      serviceId: serviceIds['energy'],
      shortDesc: 'High-efficiency solar panel',
      shortDescAr: 'لوح شمسي عالي الكفاءة',
      description: 'Professional solar panel for residential and commercial use',
      descriptionAr: 'لوح شمسي احترافي للاستخدام السكني والتجاري',
      image: '/products/solar-panel.jpg',
      specificationsEn: ['400W Peak Power', '21% Efficiency', '25 Year Warranty'],
      specificationsAr: ['طاقة قصوى 400 واط', 'كفاءة 21%', 'ضمان 25 عاماً'],
      featuresEn: ['PERC technology', 'Anti-PID', 'IP67 rated'],
      featuresAr: ['تقنية PERC', 'مقاوم PID', 'تصنيف IP67'],
      price: 150.0,
    },
    {
      slug: 'diesel-generator-25kva',
      name: '25kVA Diesel Generator',
      nameAr: 'مولد ديزل 25 كيلوفولت أمبير',
      brand: 'Cummins',
      category: 'energy',
      serviceId: serviceIds['energy'],
      shortDesc: 'Reliable backup power',
      shortDescAr: 'طاقة احتياطية موثوقة',
      description: 'Industrial diesel generator for standby power',
      descriptionAr: 'مولد ديزل صناعي للطاقة الاحتياطية',
      image: '/products/generator.jpg',
      specificationsEn: ['25kVA Output', '50Hz', 'Auto Start'],
      specificationsAr: ['خرج 25 كيلوفولت أمبير', '50 هرتز', 'تشغيل تلقائي'],
      featuresEn: ['AVR', 'Digital control', 'Weather canopy'],
      featuresAr: ['منظم جهد تلقائي', 'تحكم رقمي', 'غطاء واقي'],
      price: 8500.0,
    },
    {
      slug: 'split-ac-inverter',
      name: '2.5HP Inverter Split AC',
      nameAr: 'مكيف سبليت 2.5 حصان',
      brand: 'Midea',
      category: 'hvac',
      serviceId: serviceIds['hvac'],
      shortDesc: 'Energy-efficient cooling',
      shortDescAr: 'تبريد موفر للطاقة',
      description: 'Inverter split air conditioner with Wi-Fi control',
      descriptionAr: 'مكيف سبليت إنفرتر مع تحكم واي فاي',
      image: '/products/hvac-unit.jpg',
      specificationsEn: ['24000 BTU', 'A++ Rating', 'R-32 Refrigerant'],
      specificationsAr: ['24000 وحدة حرارية', 'تصنيف A++', 'مبرد R-32'],
      featuresEn: ['Inverter compressor', 'Wi-Fi control', 'Self-cleaning'],
      featuresAr: ['ضاغط إنفرتر', 'تحكم واي فاي', 'تنظيف ذاتي'],
      price: 650.0,
    },
    {
      slug: 'submersible-pump',
      name: '4" Submersible Pump',
      nameAr: 'مضخة غاطسة 4 إنش',
      brand: 'Grundfos',
      category: 'water',
      serviceId: serviceIds['water'],
      shortDesc: 'Deep borehole pump',
      shortDescAr: 'مضخة آبار عميقة',
      description: 'Stainless steel submersible pump',
      descriptionAr: 'مضخة غاطسة من الفولاذ المقاوم للصدأ',
      image: '/products/water-pump.jpg',
      specificationsEn: ['5m³/h Flow', '230m Head', '5.5kW Motor'],
      specificationsAr: ['تدفق 5 م³/ساعة', 'ارتفاع 230 متر', 'محرك 5.5 كيلوواط'],
      featuresEn: ['Sand-resistant', 'Stainless steel', 'SCADA ready'],
      featuresAr: ['مقاوم للرمل', 'فولاذ مقاوم للصدأ', 'جاهز لـ SCADA'],
      price: 1200.0,
    },
    {
      slug: 'ip-cctv-camera',
      name: '4MP IP CCTV Camera',
      nameAr: 'كاميرا IP 4 ميجابكسل',
      brand: 'Hikvision',
      category: 'security',
      serviceId: serviceIds['security'],
      shortDesc: 'AI-powered surveillance',
      shortDescAr: 'مراقبة بالذكاء الاصطناعي',
      description: 'AcuSense IP dome camera with AI',
      descriptionAr: 'كاميرا IP قبة بالذكاء الاصطناعي',
      image: '/products/cctv-camera.jpg',
      specificationsEn: ['4MP Resolution', '40m IR', 'IP67/IK10'],
      specificationsAr: ['دقة 4 ميجابكسل', 'أشعة تحت حمراء 40 متر', 'IP67/IK10'],
      featuresEn: ['AI detection', 'PoE', 'H.265+'],
      featuresAr: ['كشف بالذكاء الاصطناعي', 'PoE', 'H.265+'],
      price: 180.0,
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    })
  }
  console.log(`✅ Seeded ${products.length} products`)

  // 4. Seed projects
  const projects = [
    {
      slug: 'solar-khartoum',
      title: 'Khartoum Solar Farm',
      titleAr: 'مزرعة الطاقة الشمسية بالخرطوم',
      category: 'energy',
      description: '5MW solar installation',
      descriptionAr: 'تركيب طاقة شمسية 5 ميجاواط',
      location: 'Khartoum North',
      locationAr: 'الخرطوم شمال',
      client: 'Ministry of Energy',
      clientAr: 'وزارة الطاقة',
      year: 2024,
      duration: '8 months',
      durationAr: '8 أشهر',
      image: '/project-1.jpg',
      images: ['/project-1.jpg', '/project-3.jpg'],
      challenge: 'Large-scale solar deployment in high-temperature environment',
      challengeAr: 'نشر واسع النطاق للطاقة الشمسية في بيئة عالية الحرارة',
      solution: 'Custom mounting and cooling systems',
      solutionAr: 'أنظمة تركيب وتبريد مخصصة',
      results: ['5MW capacity', '3000+ homes powered', '7000 tonnes CO2 saved'],
      resultsAr: ['سعة 5 ميجاواط', 'تشغيل أكثر من 3000 منزل', 'توفير 7000 طن من ثاني أكسيد الكربون'],
    },
    {
      slug: 'mep-tower',
      title: 'Central Business Tower MEP',
      titleAr: 'برج الأعمال المركزي MEP',
      category: 'mep',
      description: '22-storey commercial tower MEP',
      descriptionAr: 'MEP لبرج تجاري من 22 طابقاً',
      location: 'Khartoum',
      locationAr: 'الخرطوم',
      client: 'Private Developer',
      clientAr: 'مطور خاص',
      year: 2023,
      duration: '14 months',
      durationAr: '14 شهراً',
      image: '/project-2.jpg',
      images: ['/project-2.jpg', '/about-hero.jpg'],
      challenge: 'Complex MEP coordination for high-rise',
      challengeAr: 'تنسيق MEP معقد للمباني الشاهقة',
      solution: 'BIM-based design and coordination',
      solutionAr: 'تصميم وتنسيق قائم على BIM',
      results: ['22 floors completed', 'BMS integrated', '3 weeks ahead of schedule'],
      resultsAr: ['22 طابقاً مكتملاً', 'نظام إدارة المباني متكامل', '3 أسابيع قبل الموعد المحدد'],
    },
  ]

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    })
  }
  console.log(`✅ Seeded ${projects.length} projects`)

  // 5. Seed blog posts
  const blogPosts = [
    {
      slug: 'solar-energy-sudan-2025',
      title: 'Solar Energy Expansion in Sudan',
      titleAr: 'توسع الطاقة الشمسية في السودان',
      category: 'Energy',
      excerpt: 'How solar power is transforming energy access',
      excerptAr: 'كيف تحول الطاقة الشمسية الوصول إلى الطاقة',
      content: '<p>Sudan is experiencing rapid growth in solar energy adoption...</p>',
      contentAr: '<p>يشهد السودان نمواً سريعاً في اعتماد الطاقة الشمسية...</p>',
      image: '/blog/blog-1.jpg',
      authorName: 'Ahmed Hassan',
      authorRole: 'CEO & Energy Director',
      readingTime: 6,
      publishedAt: new Date('2025-03-15'),
    },
    {
      slug: 'hvac-efficiency-guide',
      title: 'HVAC Efficiency Best Practices',
      titleAr: 'أفضل ممارسات كفاءة التكييف',
      category: 'Engineering',
      excerpt: 'Optimizing HVAC systems for hot climates',
      excerptAr: 'تحسين أنظمة التكييف للمناخات الحارة',
      content: '<p>In Sudan\'s hot climate, HVAC efficiency is critical...</p>',
      contentAr: '<p>في مناخ السودان الحار، كفاءة التكييف أمر بالغ الأهمية...</p>',
      image: '/blog/blog-2.jpg',
      authorName: 'Sara Mohamed',
      authorRole: 'Head of Engineering',
      readingTime: 8,
      publishedAt: new Date('2025-02-28'),
    },
  ]

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    })
  }
  console.log(`✅ Seeded ${blogPosts.length} blog posts`)

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
