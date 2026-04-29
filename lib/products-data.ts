export type ProductCategory =
  | 'energy'
  | 'hvac'
  | 'water'
  | 'security'
  | 'mep'
  | 'trading'

export interface ProductSpec {
  label: string
  labelAr: string
  value: string
}

export interface ProductData {
  id: string
  category: ProductCategory
  /** linked service id */
  serviceId: string
  name: string
  nameAr: string
  brand: string
  model: string
  shortDesc: string
  shortDescAr: string
  fullDesc: string
  fullDescAr: string
  specs: ProductSpec[]
  features: string[]
  featuresAr: string[]
  image: string
  badge?: string
  badgeAr?: string
  featured: boolean
}

export const productsData: ProductData[] = [
  /* ─── ENERGY ──────────────────────────────────────────── */
  {
    id: 'solar-panel-mono-400w',
    category: 'energy',
    serviceId: 'energy',
    name: '400W Monocrystalline Solar Panel',
    nameAr: 'لوح طاقة شمسية أحادي البلورة 400 واط',
    brand: 'Longi Solar',
    model: 'LR4-60HIH-400M',
    shortDesc: 'High-efficiency monocrystalline panel for residential and commercial solar systems.',
    shortDescAr: 'لوح أحادي البلورة عالي الكفاءة للأنظمة الشمسية السكنية والتجارية.',
    fullDesc:
      'The LR4-60HIH-400M delivers 400W peak output with 21.3% efficiency using PERC cell technology. Its half-cut design reduces resistive losses and improves performance under partial shading. Certified to IEC 61215 and IEC 61730, suitable for Sudan\'s high-irradiance environment.',
    fullDescAr:
      'يوفر هذا اللوح طاقة قصوى تبلغ 400 واط بكفاءة 21.3% باستخدام تقنية خلايا PERC. يُعد التصميم نصف المقطوع مثالياً لتقليل خسائر المقاومة وتحسين الأداء في ظل الظل الجزئي.',
    specs: [
      { label: 'Peak Power', labelAr: 'الطاقة القصوى', value: '400 Wp' },
      { label: 'Efficiency', labelAr: 'الكفاءة', value: '21.3%' },
      { label: 'Dimensions', labelAr: 'الأبعاد', value: '1755 × 1038 × 35 mm' },
      { label: 'Weight', labelAr: 'الوزن', value: '19.8 kg' },
      { label: 'Warranty', labelAr: 'الضمان', value: '25 years linear' },
      { label: 'Certifications', labelAr: 'الشهادات', value: 'IEC 61215, IEC 61730' },
    ],
    features: [
      'PERC monocrystalline technology',
      'Half-cut cell design for shade tolerance',
      'Anti-PID technology',
      'IP67 junction box',
      'Compatible with string & central inverters',
    ],
    featuresAr: [
      'تقنية أحادية البلورة PERC',
      'تصميم نصف مقطوع لتحمل الظل',
      'تقنية مقاومة التدهور الكامن PID',
      'صندوق تقاطع IP67',
      'متوافق مع عاكسات السلسلة والمركزية',
    ],
    image: '/products/solar-panel.jpg',
    badge: 'Best Seller',
    badgeAr: 'الأكثر مبيعاً',
    featured: true,
  },
  {
    id: 'solar-inverter-5kw',
    category: 'energy',
    serviceId: 'energy',
    name: '5kW Hybrid Solar Inverter',
    nameAr: 'عاكس طاقة شمسية هجين 5 كيلوواط',
    brand: 'Growatt',
    model: 'SPH5000TL3-BH',
    shortDesc: 'On/off-grid hybrid inverter with built-in MPPT charge controller for battery backup.',
    shortDescAr: 'عاكس هجين للشبكة وخارجها مع وحدة تحكم MPPT مدمجة لتخزين البطاريات.',
    fullDesc:
      'The Growatt SPH5000 is a 5kW hybrid inverter supporting both grid-tied and off-grid operation. It integrates a dual MPPT charge controller, enabling simultaneous PV charging and grid input. Ideal for businesses and homes needing reliable backup power in Sudan.',
    fullDescAr:
      'يدعم هذا العاكس الهجين الطاقةَ البالغة 5 كيلوواط في وضعَي الشبكة وخارجها، ويضم وحدة تحكم MPPT مزدوجة لشحن متزامن من الألواح الشمسية والشبكة.',
    specs: [
      { label: 'Rated Power', labelAr: 'القدرة المقننة', value: '5 kW' },
      { label: 'Max PV Input', labelAr: 'أقصى دخل شمسي', value: '6500 W' },
      { label: 'Battery Voltage', labelAr: 'جهد البطارية', value: '48 V' },
      { label: 'Efficiency', labelAr: 'الكفاءة', value: '97.6%' },
      { label: 'Display', labelAr: 'الشاشة', value: 'LCD + App' },
      { label: 'Warranty', labelAr: 'الضمان', value: '5 years' },
    ],
    features: [
      'Dual MPPT charge controller',
      'Seamless grid/off-grid switching',
      'Remote monitoring via app',
      'Wide PV input range',
      'Export power limit control',
    ],
    featuresAr: [
      'وحدة تحكم MPPT مزدوجة',
      'تحويل سلس بين وضعَي الشبكة وخارجها',
      'مراقبة عن بعد عبر التطبيق',
      'نطاق دخل شمسي واسع',
      'التحكم في حد تصدير الطاقة',
    ],
    image: '/products/solar-inverter.jpg',
    badge: 'New',
    badgeAr: 'جديد',
    featured: true,
  },
  {
    id: 'diesel-generator-25kva',
    category: 'energy',
    serviceId: 'energy',
    name: '25 kVA Diesel Generator',
    nameAr: 'مولد كهربائي ديزل 25 كيلوفولت أمبير',
    brand: 'Cummins',
    model: 'C25D5',
    shortDesc: 'Reliable standby and prime power diesel generator for commercial and industrial use.',
    shortDescAr: 'مولد ديزل موثوق للطاقة الاحتياطية والرئيسية للاستخدام التجاري والصناعي.',
    fullDesc:
      'The Cummins C25D5 provides 25 kVA of reliable standby power with a 4-cylinder diesel engine. It features automatic voltage regulation, low noise operation at 68 dB(A), and an 8-hour fuel tank. Designed for Sudan\'s demanding climatic conditions.',
    fullDescAr:
      'يوفر مولد كومينز C25D5 طاقة احتياطية موثوقة تبلغ 25 كيلوفولت أمبير بمحرك ديزل رباعي الأسطوانات، مع تنظيم أوتوماتيكي للجهد ومستوى ضوضاء منخفض 68 ديسيبل.',
    specs: [
      { label: 'Standby Power', labelAr: 'الطاقة الاحتياطية', value: '25 kVA / 20 kW' },
      { label: 'Prime Power', labelAr: 'الطاقة الرئيسية', value: '22.8 kVA / 18.2 kW' },
      { label: 'Frequency', labelAr: 'التردد', value: '50 Hz' },
      { label: 'Voltage', labelAr: 'الجهد', value: '380/220 V' },
      { label: 'Noise Level', labelAr: 'مستوى الضوضاء', value: '68 dB(A) @ 7m' },
      { label: 'Fuel Tank', labelAr: 'خزان الوقود', value: '105 L (8 hrs)' },
    ],
    features: [
      'Automatic Voltage Regulator (AVR)',
      'Auto-mains failure (AMF) panel ready',
      'Digital control panel',
      'Canopy weather protection',
      'Service-friendly design',
    ],
    featuresAr: [
      'منظم الجهد الأوتوماتيكي AVR',
      'جاهز لوحدة الفشل الأوتوماتيكي للشبكة AMF',
      'لوحة تحكم رقمية',
      'غطاء حماية من الطقس',
      'تصميم سهل الصيانة',
    ],
    image: '/products/generator.jpg',
    featured: true,
  },

  /* ─── HVAC ─────────────────────────────────────────────── */
  {
    id: 'split-ac-2-5hp',
    category: 'hvac',
    serviceId: 'hvac',
    name: '2.5 HP Inverter Split AC',
    nameAr: 'مكيف سبليت إنفرتر 2.5 حصان',
    brand: 'Midea',
    model: 'MSM3A-24HRFN8-QE',
    shortDesc: 'Energy-saving inverter split air conditioner for medium-sized spaces up to 30m².',
    shortDescAr: 'مكيف سبليت إنفرتر موفر للطاقة للمساحات المتوسطة حتى 30 متر مربع.',
    fullDesc:
      'Midea\'s inverter split AC uses variable-speed compressor technology to maintain set temperature with up to 60% less energy than non-inverter models. Features Wi-Fi control, 4-way airflow, and a self-cleaning evaporator coil — ideal for offices and residential rooms in Sudan\'s hot climate.',
    fullDescAr:
      'يستخدم مكيف ميديا الإنفرتر تقنية ضاغط متغير السرعة للحفاظ على درجة الحرارة المضبوطة بطاقة أقل بنسبة 60% من الموديلات العادية، مع تحكم واي فاي وتدفق هواء رباعي الاتجاهات.',
    specs: [
      { label: 'Cooling Capacity', labelAr: 'سعة التبريد', value: '24,000 BTU' },
      { label: 'Energy Rating', labelAr: 'تصنيف الطاقة', value: 'A++ (SEER 6.3)' },
      { label: 'Area Coverage', labelAr: 'مساحة التغطية', value: 'Up to 30 m²' },
      { label: 'Refrigerant', labelAr: 'المبرد', value: 'R-32' },
      { label: 'Noise Level', labelAr: 'مستوى الضوضاء', value: '21 dB(A) (indoor)' },
      { label: 'Warranty', labelAr: 'الضمان', value: '3 years compressor' },
    ],
    features: [
      'Inverter compressor — up to 60% energy savings',
      'Wi-Fi & app control',
      'Self-cleaning evaporator',
      '4-way air distribution',
      'PM2.5 filter',
    ],
    featuresAr: [
      'ضاغط إنفرتر — توفير طاقة حتى 60%',
      'التحكم عبر واي فاي والتطبيق',
      'ملف تبخير ذاتي التنظيف',
      'توزيع هواء رباعي الاتجاهات',
      'فلتر جسيمات PM2.5',
    ],
    image: '/products/hvac-unit.jpg',
    badge: 'Energy Star',
    badgeAr: 'موفر للطاقة',
    featured: true,
  },
  {
    id: 'vrf-outdoor-8hp',
    category: 'hvac',
    serviceId: 'hvac',
    name: '8 HP VRF Outdoor Unit',
    nameAr: 'وحدة خارجية VRF 8 حصان',
    brand: 'Daikin',
    model: 'REYQ8T',
    shortDesc: 'Commercial VRF system outdoor unit serving up to 4 indoor units simultaneously.',
    shortDescAr: 'وحدة خارجية لنظام VRF التجاري لخدمة حتى 4 وحدات داخلية في آن واحد.',
    fullDesc:
      'Daikin REYQ8T is a heat-pump VRF unit delivering 22.4 kW cooling capacity. Its variable refrigerant flow technology allows simultaneous heating and cooling in different zones, making it ideal for hotels, hospitals, and office buildings.',
    fullDescAr:
      'توفر الوحدة الخارجية REYQ8T من دايكن سعة تبريد 22.4 كيلوواط وتتيح التبريد والتدفئة المتزامنَين في مناطق مختلفة باستخدام تقنية تدفق المبرد المتغير.',
    specs: [
      { label: 'Cooling Capacity', labelAr: 'سعة التبريد', value: '22.4 kW' },
      { label: 'Connected Units', labelAr: 'الوحدات المتصلة', value: 'Up to 4 indoor units' },
      { label: 'Refrigerant', labelAr: 'المبرد', value: 'R-410A' },
      { label: 'EER', labelAr: 'معامل الكفاءة', value: '3.6' },
      { label: 'Operating Temp.', labelAr: 'درجة حرارة التشغيل', value: '-5 to +52°C' },
      { label: 'Warranty', labelAr: 'الضمان', value: '5 years' },
    ],
    features: [
      'Simultaneous heating & cooling',
      'Inverter-driven compressor',
      'Wide operating range -5°C to +52°C',
      'BMS integration via BACnet/Modbus',
      'Low noise: 57 dB(A)',
    ],
    featuresAr: [
      'تبريد وتدفئة متزامنان',
      'ضاغط بمحرك إنفرتر',
      'نطاق تشغيل واسع -5 إلى +52 درجة مئوية',
      'تكامل BMS عبر BACnet/Modbus',
      'ضوضاء منخفضة: 57 ديسيبل',
    ],
    image: '/products/hvac-unit.jpg',
    featured: false,
  },

  /* ─── WATER ─────────────────────────────────────────────── */
  {
    id: 'submersible-pump-4inch',
    category: 'water',
    serviceId: 'water',
    name: '4" Submersible Borehole Pump',
    nameAr: 'مضخة غاطسة للآبار العميقة 4 إنش',
    brand: 'Grundfos',
    model: 'SP 5A-23',
    shortDesc: 'High-efficiency 4-inch submersible pump for deep borehole water extraction.',
    shortDescAr: 'مضخة غاطسة 4 إنش عالية الكفاءة لاستخراج المياه من الآبار العميقة.',
    fullDesc:
      'The Grundfos SP 5A-23 is engineered for deep borehole applications in harsh environments. With a stainless-steel body, sand-resistant design, and 5.5 kW motor, it delivers 5 m³/h at 230m head — ideal for rural water supply projects across Sudan.',
    fullDescAr:
      'صُممت مضخة Grundfos SP 5A-23 للتطبيقات العميقة في البيئات القاسية، بجسم من الفولاذ المقاوم للصدأ ومحرك 5.5 كيلوواط، وتوفر تدفقاً بمعدل 5 م³/ساعة عند ارتفاع 230 متر.',
    specs: [
      { label: 'Flow Rate', labelAr: 'معدل التدفق', value: '5 m³/h' },
      { label: 'Max Head', labelAr: 'أقصى ارتفاع', value: '230 m' },
      { label: 'Motor Power', labelAr: 'قدرة المحرك', value: '5.5 kW' },
      { label: 'Borehole Size', labelAr: 'قطر البئر', value: '4" (101.6 mm)' },
      { label: 'Material', labelAr: 'المادة', value: 'Stainless Steel AISI 304' },
      { label: 'Warranty', labelAr: 'الضمان', value: '2 years' },
    ],
    features: [
      'Sand-resistant downthrust bearing',
      'Stainless steel hydraulics',
      'Overload-protected motor',
      'Compatible with SCADA monitoring',
      'Easy service access',
    ],
    featuresAr: [
      'محمل مقاوم للرمل',
      'هيدروليكا من الفولاذ المقاوم للصدأ',
      'محرك بحماية من الحمل الزائد',
      'متوافق مع أنظمة SCADA',
      'سهولة الصيانة',
    ],
    image: '/products/water-pump.jpg',
    badge: 'Industrial Grade',
    badgeAr: 'درجة صناعية',
    featured: true,
  },
  {
    id: 'centrifugal-pump-11kw',
    category: 'water',
    serviceId: 'water',
    name: '11 kW Centrifugal Water Pump',
    nameAr: 'مضخة مياه طاردة مركزية 11 كيلوواط',
    brand: 'Lowara',
    model: 'e-SV 32F013T',
    shortDesc: 'Multi-stage centrifugal pump for pressurized water distribution networks.',
    shortDescAr: 'مضخة طاردة مركزية متعددة المراحل لشبكات توزيع المياه المضغوطة.',
    fullDesc:
      'Lowara e-SV 32F013T is a vertical multi-stage pump delivering 13 m³/h at 228 m head. Its stainless-steel construction ensures durability in aggressive water conditions. Suitable for building water supply, irrigation, and light industrial processes.',
    fullDescAr:
      'توفر مضخة Lowara e-SV 32F013T تدفقاً بمعدل 13 م³/ساعة عند ارتفاع 228 متر، وبنيتها من الفولاذ المقاوم للصدأ تضمن المتانة في المياه العدوانية.',
    specs: [
      { label: 'Flow Rate', labelAr: 'معدل التدفق', value: '13 m³/h' },
      { label: 'Max Head', labelAr: 'أقصى ارتفاع', value: '228 m' },
      { label: 'Motor Power', labelAr: 'قدرة المحرك', value: '11 kW' },
      { label: 'Stages', labelAr: 'عدد المراحل', value: '13' },
      { label: 'Inlet / Outlet', labelAr: 'المدخل / المخرج', value: 'DN 32 mm' },
      { label: 'Warranty', labelAr: 'الضمان', value: '2 years' },
    ],
    features: [
      'Multi-stage vertical design',
      'Stainless steel AISI 316 construction',
      'IE3 premium efficiency motor',
      'Variable speed drive compatible',
      'Minimal maintenance design',
    ],
    featuresAr: [
      'تصميم رأسي متعدد المراحل',
      'بناء من الفولاذ المقاوم للصدأ AISI 316',
      'محرك كفاءة قصوى IE3',
      'متوافق مع محرك متغير السرعة',
      'تصميم بحد أدنى من الصيانة',
    ],
    image: '/products/water-pump.jpg',
    featured: false,
  },

  /* ─── SECURITY ──────────────────────────────────────────── */
  {
    id: 'ip-cctv-4mp-dome',
    category: 'security',
    serviceId: 'security',
    name: '4MP IP Dome CCTV Camera',
    nameAr: 'كاميرا مراقبة IP قبة 4 ميغابكسل',
    brand: 'Hikvision',
    model: 'DS-2CD2143G2-I',
    shortDesc: 'AcuSense 4MP fixed dome IP camera with deep learning false alarm reduction.',
    shortDescAr: 'كاميرا IP قبة ثابتة 4 ميغابكسل بتقنية AcuSense للتعلم العميق وتقليل الإنذارات الكاذبة.',
    fullDesc:
      'The Hikvision DS-2CD2143G2-I features 4MP resolution, AcuSense deep-learning AI to distinguish humans from vehicles, 40m IR night vision, and an IP67/IK10 rating making it ideal for outdoor surveillance in all conditions.',
    fullDescAr:
      'تتميز الكاميرا DS-2CD2143G2-I بدقة 4 ميغابكسل وذكاء اصطناعي للتمييز بين الأشخاص والمركبات، ومدى للرؤية الليلية بالأشعة تحت الحمراء 40 متراً، وتصنيف IP67/IK10 للمتانة الخارجية.',
    specs: [
      { label: 'Resolution', labelAr: 'الدقة', value: '4 MP (2688×1520)' },
      { label: 'IR Range', labelAr: 'مدى الأشعة تحت الحمراء', value: '40 m' },
      { label: 'Lens', labelAr: 'العدسة', value: '2.8 mm fixed' },
      { label: 'Protection', labelAr: 'الحماية', value: 'IP67 / IK10' },
      { label: 'Video Compression', labelAr: 'ضغط الفيديو', value: 'H.265+' },
      { label: 'Power', labelAr: 'الطاقة', value: 'PoE (802.3af)' },
    ],
    features: [
      'AcuSense deep learning AI',
      'H.265+ compression',
      'PoE powered — single cable',
      'IP67 weatherproof & IK10 vandal-proof',
      'WDR 120dB for high-contrast scenes',
    ],
    featuresAr: [
      'ذكاء اصطناعي AcuSense للتعلم العميق',
      'ضغط H.265+',
      'مزودة بـPoE — كابل واحد',
      'مقاومة للطقس IP67 ومقاومة للتخريب IK10',
      'WDR 120 ديسيبل للمشاهد عالية التباين',
    ],
    image: '/products/cctv-camera.jpg',
    badge: 'AI Powered',
    badgeAr: 'مدعوم بالذكاء الاصطناعي',
    featured: true,
  },
  {
    id: 'biometric-access-control',
    category: 'security',
    serviceId: 'security',
    name: 'Biometric Fingerprint Access Controller',
    nameAr: 'وحدة تحكم بصمة الإصبع للتحكم بالدخول',
    brand: 'ZKTeco',
    model: 'SpeedFace-V5L',
    shortDesc: 'Face recognition + fingerprint + card multi-modal access control terminal.',
    shortDescAr: 'محطة تحكم بالدخول متعددة الوسائط: التعرف على الوجه + بصمة الإصبع + البطاقة.',
    fullDesc:
      'The ZKTeco SpeedFace-V5L supports face recognition at 1.5m with visible light technology, fingerprint and card reading, and processes 6,000 transactions per minute. Ideal for office buildings, schools, and government facilities in Sudan.',
    fullDescAr:
      'تدعم محطة ZKTeco SpeedFace-V5L التعرف على الوجه على بُعد 1.5 متر بتقنية الضوء المرئي، وقراءة البصمة والبطاقة، وتعالج 6,000 معاملة في الدقيقة.',
    specs: [
      { label: 'Recognition Distance', labelAr: 'مسافة التعرف', value: 'Up to 1.5 m' },
      { label: 'Face Capacity', labelAr: 'سعة الوجوه', value: '50,000' },
      { label: 'Fingerprint Capacity', labelAr: 'سعة البصمات', value: '10,000' },
      { label: 'Card Type', labelAr: 'نوع البطاقة', value: '13.56 MHz RFID' },
      { label: 'Communication', labelAr: 'التواصل', value: 'TCP/IP, Wi-Fi, USB' },
      { label: 'Power', labelAr: 'الطاقة', value: 'PoE / 12V DC' },
    ],
    features: [
      'Multi-modal: face + fingerprint + card',
      'Mask detection support',
      'Anti-spoofing live face detection',
      'Cloud-based management software',
      'Wiegand & RS485 output',
    ],
    featuresAr: [
      'متعدد الوسائط: وجه + بصمة + بطاقة',
      'دعم اكتشاف الكمامة',
      'كشف الوجه الحي المقاوم للانتحال',
      'برنامج إدارة سحابي',
      'مخرج Wiegand وRS485',
    ],
    image: '/products/access-control.jpg',
    featured: false,
  },

  /* ─── MEP ───────────────────────────────────────────────── */
  {
    id: 'distribution-board-3ph',
    category: 'mep',
    serviceId: 'mep',
    name: '3-Phase Distribution Board 63A',
    nameAr: 'لوحة توزيع ثلاثية الأطوار 63 أمبير',
    brand: 'Schneider Electric',
    model: 'Pragma 24 Way',
    shortDesc: 'IEC-compliant 3-phase distribution board with MCBs for commercial buildings.',
    shortDescAr: 'لوحة توزيع ثلاثية الأطوار متوافقة مع IEC مع قواطع MCB للمباني التجارية.',
    fullDesc:
      'Schneider Pragma series distribution boards are designed for safe, efficient power distribution in commercial and industrial buildings. Pre-assembled with MCBs and RCDs, they reduce installation time and comply with IEC 61439-3 standards.',
    fullDescAr:
      'صُممت لوحات توزيع Schneider Pragma للتوزيع الآمن والفعّال للطاقة في المباني التجارية والصناعية، مُركّبة مسبقاً بقواطع MCB وRCD.',
    specs: [
      { label: 'Phases', labelAr: 'الأطوار', value: '3-Phase (3P+N)' },
      { label: 'Main Breaker', labelAr: 'القاطع الرئيسي', value: '63A MCCB' },
      { label: 'Way Count', labelAr: 'عدد الطرق', value: '24 Ways' },
      { label: 'Enclosure', labelAr: 'الحاوية', value: 'IP43 flush mount' },
      { label: 'Standard', labelAr: 'المعيار', value: 'IEC 61439-3' },
      { label: 'Busbar', labelAr: 'القضيب', value: 'Copper 63A' },
    ],
    features: [
      'Pre-assembled with MCBs',
      'Transparent door for safety',
      'DIN rail for easy expansion',
      'IEC 61439-3 certified',
      'Flush & surface mount options',
    ],
    featuresAr: [
      'مُركّبة مسبقاً بقواطع MCB',
      'باب شفاف للسلامة',
      'سكة DIN للتوسع السهل',
      'معتمدة وفق IEC 61439-3',
      'خيارات تركيب مدمج وسطحي',
    ],
    image: '/project-2.jpg',
    featured: false,
  },

  /* ─── TRADING ───────────────────────────────────────────── */
  {
    id: 'camp-shelter-kit',
    category: 'trading',
    serviceId: 'trading',
    name: 'Emergency Shelter Kit (UNHCR Standard)',
    nameAr: 'مجموعة ملاجئ الطوارئ (معيار UNHCR)',
    brand: 'ENVIRON Trading',
    model: 'ESK-2024',
    shortDesc: 'Complete emergency shelter kit meeting UNHCR specifications for refugee operations.',
    shortDescAr: 'مجموعة ملاجئ طوارئ كاملة تلبي مواصفات UNHCR للعمليات الإنسانية.',
    fullDesc:
      'ENVIRON Trading supplies UNHCR-compliant emergency shelter kits including tarpaulins, ropes, ground sheets, and fixings. Each kit shelters a family of 6 and is packaged for rapid deployment in remote areas across Sudan and East Africa.',
    fullDescAr:
      'توفر ENVIRON للتجارة مجموعات ملاجئ طوارئ متوافقة مع UNHCR تشمل أغطية مشمع وحبالاً وألواح أرضية وتثبيتات، وكل مجموعة تؤوي عائلة من 6 أشخاص وتُعبّأ للنشر السريع.',
    specs: [
      { label: 'Tarpaulin', labelAr: 'المشمع', value: '4×5 m, 200 gsm PE' },
      { label: 'Ground Sheet', labelAr: 'الغطاء الأرضي', value: '4×5 m, 120 gsm' },
      { label: 'Rope', labelAr: 'الحبل', value: '50 m, 6 mm PP' },
      { label: 'Tent Pegs', labelAr: 'أوتاد الخيمة', value: '20 pcs galvanized steel' },
      { label: 'Capacity', labelAr: 'السعة', value: 'Family of 6' },
      { label: 'Compliance', labelAr: 'الامتثال', value: 'UNHCR / ICRC spec' },
    ],
    features: [
      'UNHCR-compliant specifications',
      'Rapid deployment packaging',
      'UV-resistant materials',
      'Available in bulk for NGO/UN orders',
      'Last-mile delivery to remote areas',
    ],
    featuresAr: [
      'مواصفات متوافقة مع UNHCR',
      'تغليف للنشر السريع',
      'مواد مقاومة للأشعة فوق البنفسجية',
      'متوفر بالجملة لطلبات المنظمات الدولية',
      'توصيل للمناطق النائية',
    ],
    image: '/project-1.jpg',
    featured: false,
  },
]

export const productCategories = ['all', 'energy', 'hvac', 'water', 'security', 'mep', 'trading'] as const
export type ProductCategoryFilter = typeof productCategories[number]
