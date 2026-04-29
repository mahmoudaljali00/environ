-- Insert all products from products-data.ts into the database

-- Solar Panel
INSERT INTO products (id, name, "nameAr", slug, brand, category, "shortDesc", "shortDescAr", description, "descriptionAr", image, "specificationsEn", "specificationsAr", "featuresEn", "featuresAr", price, "serviceId", published)
VALUES (
  'solar-panel-mono-400w',
  '400W Monocrystalline Solar Panel',
  'لوح طاقة شمسية أحادي البلورة 400 واط',
  'solar-panel-mono-400w',
  'Longi Solar',
  'energy',
  'High-efficiency monocrystalline panel for residential and commercial solar systems.',
  'لوح أحادي البلورة عالي الكفاءة للأنظمة الشمسية السكنية والتجارية.',
  'The LR4-60HIH-400M delivers 400W peak output with 21.3% efficiency using PERC cell technology. Its half-cut design reduces resistive losses and improves performance under partial shading.',
  'يوفر هذا اللوح طاقة قصوى تبلغ 400 واط بكفاءة 21.3% باستخدام تقنية خلايا PERC. يُعد التصميم نصف المقطوع مثالياً لتقليل خسائر المقاومة وتحسين الأداء في ظل الظل الجزئي.',
  '/products/solar-panel.jpg',
  ARRAY['Peak Power: 400 Wp', 'Efficiency: 21.3%', 'Dimensions: 1755 × 1038 × 35 mm', 'Weight: 19.8 kg', 'Warranty: 25 years linear', 'Certifications: IEC 61215, IEC 61730'],
  ARRAY['الطاقة القصوى: 400 واط', 'الكفاءة: 21.3%', 'الأبعاد: 1755 × 1038 × 35 مم', 'الوزن: 19.8 كجم', 'الضمان: 25 سنة خطي', 'الشهادات: IEC 61215, IEC 61730'],
  ARRAY['PERC monocrystalline technology', 'Half-cut cell design for shade tolerance', 'Anti-PID technology', 'IP67 junction box', 'Compatible with string & central inverters'],
  ARRAY['تقنية أحادية البلورة PERC', 'تصميم نصف مقطوع لتحمل الظل', 'تقنية مقاومة التدهور الكامن PID', 'صندوق تقاطع IP67', 'متوافق مع عاكسات السلسلة والمركزية'],
  NULL,
  'solar-energy',
  true
);

-- Solar Inverter
INSERT INTO products (id, name, "nameAr", slug, brand, category, "shortDesc", "shortDescAr", description, "descriptionAr", image, "specificationsEn", "specificationsAr", "featuresEn", "featuresAr", price, "serviceId", published)
VALUES (
  'solar-inverter-5kw',
  '5kW Hybrid Solar Inverter',
  'عاكس طاقة شمسية هجين 5 كيلوواط',
  'solar-inverter-5kw',
  'Growatt',
  'energy',
  'On/off-grid hybrid inverter with built-in MPPT charge controller for battery backup.',
  'عاكس هجين للشبكة وخارجها مع وحدة تحكم MPPT مدمجة لتخزين البطاريات.',
  'The Growatt SPH5000 is a 5kW hybrid inverter supporting both grid-tied and off-grid operation. It integrates a dual MPPT charge controller, enabling simultaneous PV charging and grid input.',
  'يدعم هذا العاكس الهجين الطاقةَ البالغة 5 كيلوواط في وضعَي الشبكة وخارجها، ويضم وحدة تحكم MPPT مزدوجة لشحن متزامن من الألواح الشمسية والشبكة.',
  '/products/solar-inverter.jpg',
  ARRAY['Rated Power: 5 kW', 'Max PV Input: 6500 W', 'Battery Voltage: 48 V', 'Efficiency: 97.6%', 'Display: LCD + App', 'Warranty: 5 years'],
  ARRAY['القدرة المقننة: 5 كيلوواط', 'أقصى دخل شمسي: 6500 واط', 'جهد البطارية: 48 فولت', 'الكفاءة: 97.6%', 'الشاشة: LCD + تطبيق', 'الضمان: 5 سنوات'],
  ARRAY['Dual MPPT charge controller', 'Seamless grid/off-grid switching', 'Remote monitoring via app', 'Wide PV input range', 'Export power limit control'],
  ARRAY['وحدة تحكم MPPT مزدوجة', 'تحويل سلس بين وضعَي الشبكة وخارجها', 'مراقبة عن بعد عبر التطبيق', 'نطاق دخل شمسي واسع', 'التحكم في حد تصدير الطاقة'],
  NULL,
  'solar-energy',
  true
);

-- Diesel Generator
INSERT INTO products (id, name, "nameAr", slug, brand, category, "shortDesc", "shortDescAr", description, "descriptionAr", image, "specificationsEn", "specificationsAr", "featuresEn", "featuresAr", price, "serviceId", published)
VALUES (
  'diesel-generator-25kva',
  '25 kVA Diesel Generator',
  'مولد كهربائي ديزل 25 كيلوفولت أمبير',
  'diesel-generator-25kva',
  'Cummins',
  'energy',
  'Reliable standby and prime power diesel generator for commercial and industrial use.',
  'مولد ديزل موثوق للطاقة الاحتياطية والرئيسية للاستخدام التجاري والصناعي.',
  'The Cummins C25D5 provides 25 kVA of reliable standby power with a 4-cylinder diesel engine. It features automatic voltage regulation, low noise operation at 68 dB(A), and an 8-hour fuel tank.',
  'يوفر مولد كومينز C25D5 طاقة احتياطية موثوقة تبلغ 25 كيلوفولت أمبير بمحرك ديزل رباعي الأسطوانات، مع تنظيم أوتوماتيكي للجهد ومستوى ضوضاء منخفض 68 ديسيبل.',
  '/products/generator.jpg',
  ARRAY['Standby Power: 25 kVA / 20 kW', 'Prime Power: 22.8 kVA / 18.2 kW', 'Frequency: 50 Hz', 'Voltage: 380/220 V', 'Noise Level: 68 dB(A) @ 7m', 'Fuel Tank: 105 L (8 hrs)'],
  ARRAY['الطاقة الاحتياطية: 25 كيلوفولت أمبير / 20 كيلوواط', 'الطاقة الرئيسية: 22.8 كيلوفولت أمبير / 18.2 كيلوواط', 'التردد: 50 هرتز', 'الجهد: 380/220 فولت', 'مستوى الضوضاء: 68 ديسيبل @ 7 متر', 'خزان الوقود: 105 لتر (8 ساعات)'],
  ARRAY['Automatic Voltage Regulator (AVR)', 'Auto-mains failure (AMF) panel ready', 'Digital control panel', 'Canopy weather protection', 'Service-friendly design'],
  ARRAY['منظم الجهد الأوتوماتيكي AVR', 'جاهز لوحدة الفشل الأوتوماتيكي للشبكة AMF', 'لوحة تحكم رقمية', 'غطاء حماية من الطقس', 'تصميم سهل الصيانة'],
  NULL,
  'generators',
  true
);

-- Continue for remaining products (Split AC, VRF, Pumps, CCTV, Access Control, Distribution Board, Shelter Kit)...
