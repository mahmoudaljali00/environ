import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@environ.sd' },
    update: {},
    create: {
      email: 'admin@environ.sd',
      name: 'Admin User',
      password: hashedPassword,
      role: 'admin',
    },
  })
  console.log('✅ Created admin user:', admin.email)

  // Seed Services
  const services = [
    {
      slug: 'engineering',
      name: 'Engineering Services',
      nameAr: 'الخدمات الهندسية',
      icon: 'HardHat',
      description: 'Comprehensive design, planning, and execution of complex engineering projects.',
      descriptionAr: 'تصميم شامل وتخطيط وتنفيذ لمشاريع هندسية معقدة.',
      featuresEn: [
        'Detailed engineering design and documentation',
        'Feasibility and technical assessments',
        'Project management and supervision',
        'Quality control and commissioning',
        'As-built drawings and O&M manuals',
      ],
      featuresAr: [
        'تصميم هندسي مفصل وتوثيق',
        'تقييمات الجدوى والتقنية',
        'إدارة المشاريع والإشراف',
        'مراقبة الجودة والتكليف',
        'رسومات كما تم بناؤها وأدلة التشغيل والصيانة',
      ],
      benefits: [
        'International best practices',
        'Licensed engineers',
        'End-to-end delivery',
        'Government & commercial clients',
      ],
      benefitsAr: [
        'أفضل الممارسات الدولية',
        'مهندسون مرخصون',
        'تسليم شامل',
        'عملاء حكوميون وتجاريون',
      ],
      image: '/project-2.jpg',
    },
    {
      slug: 'energy',
      name: 'Energy Solutions',
      nameAr: 'حلول الطاقة',
      icon: 'Zap',
      description: 'Solar systems, generators, and renewable energy infrastructure.',
      descriptionAr: 'أنظمة الطاقة الشمسية والمولدات والبنية التحتية للطاقة المتجددة.',
      featuresEn: [
        'Solar PV design and installation (1kW – 5MW+)',
        'Generator supply, installation, and maintenance',
        'Hybrid solar-diesel systems',
        'Energy auditing and optimization',
        'Grid-tie and off-grid solutions',
      ],
      featuresAr: [
        'تصميم وتركيب الطاقة الشمسية الكهروضوئية (1 كيلوواط - 5 ميجاواط +)',
        'توريد وتركيب وصيانة المولدات',
        'أنظمة هجينة شمسية-ديزل',
        'تدقيق الطاقة والتحسين',
        'حلول مرتبطة بالشبكة وخارج الشبكة',
      ],
      benefits: ['1kW – 5MW+ range', 'Backup power systems', 'Hybrid solutions', 'Energy optimization'],
      benefitsAr: ['نطاق 1 كيلوواط - 5 ميجاواط +', 'أنظمة الطاقة الاحتياطية', 'حلول هجينة', 'تحسين الطاقة'],
      image: '/project-1.jpg',
    },
    {
      slug: 'hvac',
      name: 'Air Conditioning Systems',
      nameAr: 'أنظمة تكييف الهواء',
      icon: 'Wind',
      description: 'Industrial and residential HVAC design, supply, and maintenance.',
      descriptionAr: 'تصميم وتوريد وصيانة أنظمة التدفئة والتهوية وتكييف الهواء الصناعية والسكنية.',
      featuresEn: [
        'Full HVAC design using international standards',
        'VRF, chilled water, and split systems',
        'Cleanroom and precision air conditioning',
        'Preventive maintenance contracts',
        'Energy-efficient upgrade programs',
      ],
      featuresAr: [
        'تصميم كامل لأنظمة التدفئة والتهوية وتكييف الهواء باستخدام المعايير الدولية',
        'أنظمة VRF والمياه المبردة والانقسام',
        'غرفة نظيفة وتكييف الهواء الدقيق',
        'عقود الصيانة الوقائية',
        'برامج ترقية كفاءة الطاقة',
      ],
      benefits: ['Authorized installer', 'VRF & chiller systems', 'Cleanroom solutions', 'Maintenance contracts'],
      benefitsAr: ['مثبت معتمد', 'أنظمة VRF والمبرد', 'حلول الغرفة النظيفة', 'عقود الصيانة'],
      image: '/project-3.jpg',
    },
    {
      slug: 'mep',
      name: 'MEP Services',
      nameAr: 'خدمات MEP',
      icon: 'Wrench',
      description: 'Mechanical, electrical, and plumbing systems for all building types.',
      descriptionAr: 'الأنظمة الميكانيكية والكهربائية والسباكة لجميع أنواع المباني.',
      featuresEn: [
        'BIM-coordinated MEP design',
        'Electrical LV and MV systems',
        'Plumbing, drainage, and firefighting',
        'Building management systems (BMS)',
        'Commissioning and testing',
      ],
      featuresAr: [
        'تصميم MEP منسق BIM',
        'الأنظمة الكهربائية LV و MV',
        'السباكة والصرف الصحي ومكافحة الحرائق',
        'أنظمة إدارة المباني (BMS)',
        'التكليف والاختبار',
      ],
      benefits: ['BIM coordination', 'LV & MV electrical', 'BMS integration', 'Full commissioning'],
      benefitsAr: ['تنسيق BIM', 'كهربائي LV و MV', 'تكامل BMS', 'التكليف الكامل'],
      image: '/project-2.jpg',
    },
    {
      slug: 'water',
      name: 'Water Pump Systems',
      nameAr: 'أنظمة مضخات المياه',
      icon: 'Droplets',
      description: 'Water supply, pumping stations, and distribution networks.',
      descriptionAr: 'إمدادات المياه ومحطات الضخ وشبكات التوزيع.',
      featuresEn: [
        'Borehole and surface pump systems',
        'Submersible and centrifugal pumps',
        'Water treatment and purification',
        'Distribution network design',
        'SCADA and remote monitoring',
      ],
      featuresAr: [
        'أنظمة الآبار ومضخات السطح',
        'مضخات غاطسة ومضخات طرد مركزي',
        'معالجة المياه وتنقيتها',
        'تصميم شبكة التوزيع',
        'SCADA والمراقبة عن بعد',
      ],
      benefits: ['Borehole to distribution', 'Treatment & purification', 'SCADA monitoring', 'Arid environment expertise'],
      benefitsAr: ['من البئر إلى التوزيع', 'العلاج والتنقية', 'مراقبة SCADA', 'خبرة البيئة القاحلة'],
      image: '/project-1.jpg',
    },
    {
      slug: 'security',
      name: 'Low Current & Security Systems',
      nameAr: 'الأنظمة منخفضة التيار والأمنية',
      icon: 'Shield',
      description: 'CCTV, access control, fire alarm, and structured cabling systems.',
      descriptionAr: 'كاميرات المراقبة وأنظمة التحكم بالدخول وإنذار الحريق وأنظمة الكابلات المنظمة.',
      featuresEn: [
        'IP CCTV and video analytics',
        'Access control and biometrics',
        'Addressable fire alarm systems',
        'Structured cabling (CAT6/fiber)',
        'Public address and intercom systems',
      ],
      featuresAr: [
        'كاميرات IP CCTV وتحليلات الفيديو',
        'التحكم بالدخول والبيومترية',
        'أنظمة إنذار الحريق القابلة للعنونة',
        'الكابلات المنظمة (CAT6 / الألياف)',
        'أنظمة العنوان العام والاتصال الداخلي',
      ],
      benefits: ['IP CCTV & analytics', 'Biometric access', 'Fire alarm', 'CAT6/fiber cabling'],
      benefitsAr: ['كاميرات IP CCTV والتحليلات', 'الوصول البيومتري', 'إنذار الحريق', 'كابلات CAT6 / الألياف'],
      image: '/project-3.jpg',
    },
    {
      slug: 'contracting',
      name: 'Contracting & Consultancy',
      nameAr: 'التعاقد والاستشارات',
      icon: 'Settings',
      description: 'Full project management, supervision, and technical consultancy.',
      descriptionAr: 'إدارة المشاريع الكاملة والإشراف والاستشارات الفنية.',
      featuresEn: [
        'Owner\'s engineer and PMC services',
        'FIDIC contract administration',
        'Technical due diligence and audits',
        'Construction supervision',
        'Value engineering and cost control',
      ],
      featuresAr: [
        'خدمات مهندس المالك و PMC',
        'إدارة عقود FIDIC',
        'العناية الواجبة الفنية والتدقيق',
        'الإشراف على البناء',
        'هندسة القيمة والتحكم في التكاليف',
      ],
      benefits: ['PMC & owner\'s engineer', 'FIDIC standards', 'Technical audits', 'Construction supervision'],
      benefitsAr: ['PMC ومهندس المالك', 'معايير FIDIC', 'التدقيق الفني', 'الإشراف على البناء'],
      image: '/about-hero.jpg',
    },
    {
      slug: 'trading',
      name: 'Trading Services',
      nameAr: 'خدمات التجارة',
      icon: 'ShoppingBag',
      description: 'Refugee camp supplies, procurement, logistics, and customized solutions.',
      descriptionAr: 'إمدادات مخيمات اللاجئين والمشتريات والخدمات اللوجستية والحلول المخصصة.',
      featuresEn: [
        'UN/NGO emergency supply procurement',
        'Shelter and camp infrastructure materials',
        'Customs clearance and logistics',
        'Last-mile delivery in remote areas',
        'Customized procurement solutions',
      ],
      featuresAr: [
        'شراء إمدادات الطوارئ للأمم المتحدة / المنظمات غير الحكومية',
        'مواد البنية التحتية للملاجئ والمخيمات',
        'التخليص الجمركي والخدمات اللوجستية',
        'التسليم في الميل الأخير في المناطق النائية',
        'حلول شراء مخصصة',
      ],
      benefits: ['UN/NGO procurement', 'Camp infrastructure', 'Customs & logistics', 'Remote delivery'],
      benefitsAr: ['شراء الأمم المتحدة / المنظمات غير الحكومية', 'البنية التحتية للمخيم', 'الجمارك والخدمات اللوجستية', 'التسليم عن بعد'],
      image: '/project-1.jpg',
    },
  ]

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    })
  }
  console.log(`✅ Seeded ${services.length} services`)

  // Continue seeding in the next message due to token limits...
  console.log('✅ Database seeded successfully')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
