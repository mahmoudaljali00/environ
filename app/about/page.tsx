'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Target, Eye, Award, Users, Zap, Shield, Download } from 'lucide-react'
import Navbar from '@/components/navbar'
import SectionReveal, { StaggerContainer, StaggerItem } from '@/components/section-reveal'
import { useLang } from '@/components/lang-provider'
import { FloatingParticles } from '@/components/parallax-background'
import IndustriesCTA from '@/components/home/industries-cta'


// Note: For SEO, create app/about/layout.tsx with metadata export

const timeline = [
  { year: '2008', en: 'Company founded in Khartoum, Sudan with a focus on MEP services.', ar: 'تأسست الشركة في الخرطوم، السودان مع التركيز على خدمات MEP.' },
  { year: '2011', en: 'Expanded into energy solutions — solar and generator systems.', ar: 'التوسع في حلول الطاقة — أنظمة الطاقة الشمسية والمولدات.' },
  { year: '2015', en: 'Awarded first major government infrastructure contract.', ar: 'الحصول على أول عقد حكومي كبير للبنية التحتية.' },
  { year: '2018', en: 'Launched trading division for humanitarian supply chain services.', ar: 'إطلاق قسم التجارة لخدمات سلسلة إمداد المساعدات الإنسانية.' },
  { year: '2021', en: 'Reached 100+ delivered projects across East Africa.', ar: 'تجاوز 100 مشروع منجز في شرق أفريقيا.' },
  { year: '2024', en: 'Completed largest solar installation to date — 5MW Khartoum North.', ar: 'إتمام أكبر منشأة طاقة شمسية حتى الآن — 5 ميجاواط في شمال الخرطوم.' },
]

const whyUsKeys = [
  { icon: Award, en_title: '15+ Years Experience', ar_title: 'أكثر من 15 عامًا من الخبرة', en_desc: 'Over a decade of engineering excellence across diverse sectors.', ar_desc: 'أكثر من عقد من التميز الهندسي عبر قطاعات متنوعة.' },
  { icon: Users, en_title: 'Expert Team', ar_title: 'فريق متخصص', en_desc: 'Certified engineers and project managers with international standards training.', ar_desc: 'مهندسون معتمدون ومديرو مشاريع مدربون وفق المعايير الدولية.' },
  { icon: Zap, en_title: 'Cutting-Edge Technology', ar_title: 'تقنية متقدمة', en_desc: 'We deploy the latest tools and engineering methodologies.', ar_desc: 'نستخدم أحدث الأدوات والمنهجيات الهندسية.' },
  { icon: Shield, en_title: 'Quality Guaranteed', ar_title: 'جودة مضمونة', en_desc: 'ISO-aligned processes ensuring every project meets global standards.', ar_desc: 'عمليات متوافقة مع ISO تضمن استيفاء كل مشروع للمعايير العالمية.' },
]

export default function AboutPage() {
  const { t, lang, isRTL } = useLang()

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Page Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pattern-bg opacity-[0.05]" />
        <FloatingParticles count={25} />
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/8 blur-[100px] pointer-events-none"
          animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.12, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">
                {t.nav.about}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-balance">
                {t.about.title}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {t.about.subtitle}
              </p>
            </div>
          </SectionReveal>

          {/* Overview grid */}
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
            <SectionReveal>
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden glass-card">
                <Image
                  src="/about-hero.jpg"
                  alt="ENVIRON team"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-background/20" />
                {/* Floating stat card */}
                <div className={`absolute bottom-6 glass rounded-2xl px-5 py-4 ${isRTL ? 'right-6' : 'left-6'}`}>
                  <p className="text-2xl font-bold text-primary">200+</p>
                  <p className="text-xs text-muted-foreground">{t.stats.projects}</p>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <div className={`flex flex-col gap-6 ${isRTL ? 'text-right' : ''}`}>
                <p className="text-lg text-muted-foreground leading-relaxed">{t.about.overview}</p>

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="glass-card rounded-2xl p-5">
                    <div className={`flex items-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Target className="w-5 h-5 text-primary" />
                      <span className="text-sm font-semibold">{t.about.mission_label}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t.about.mission}</p>
                  </div>
                  <div className="glass-card rounded-2xl p-5">
                    <div className={`flex items-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Eye className="w-5 h-5 text-accent" />
                      <span className="text-sm font-semibold">{t.about.vision_label}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t.about.vision}</p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Timeline */}
          <SectionReveal className="mb-24">
            <h2 className="text-3xl font-bold text-center mb-12">{t.about.our_journey}</h2>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-border/60 hidden md:block" />

              <div className="flex flex-col gap-8">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className={`flex items-center gap-6 md:gap-0 ${
                      i % 2 === 0
                        ? 'md:flex-row md:pr-[calc(50%+1.5rem)]'
                        : 'md:flex-row-reverse md:pl-[calc(50%+1.5rem)]'
                    }`}
                  >
                    {/* Dot */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-2 border-background" />

                    <div className={`glass-card rounded-2xl p-5 flex-1 md:max-w-md ${isRTL ? 'text-right' : ''}`}>
                      <span className="text-primary font-bold text-sm mb-1 block">{item.year}</span>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {lang === 'ar' ? item.ar : item.en}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionReveal>

                    {/* Why choose us */}
          <SectionReveal>
            <h2 className="text-3xl font-bold text-center mb-12">{t.about.why_title}</h2>
            <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {whyUsKeys.map((item) => (
                <StaggerItem key={item.en_title}>
                  <motion.div
                    whileHover={{ 
                      y: -8,
                      boxShadow: '0 25px 50px rgba(0,0,0,0.3), 0 0 30px rgba(0, 157, 142, 0.15)'
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="glass-card rounded-2xl p-6 text-center flex flex-col items-center gap-4 h-full"
                  >
                    <motion.div 
                      className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <item.icon className="w-6 h-6 text-primary" />
                    </motion.div>
                    <h3 className="font-semibold text-sm">{lang === 'ar' ? item.ar_title : item.en_title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{lang === 'ar' ? item.ar_desc : item.en_desc}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </SectionReveal>


          {/* Industries CTA */}
          <IndustriesCTA />

          {/* Company Profile Download */}
          <SectionReveal className="mt-24">
            <div className="glass-card rounded-3xl p-8 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                {isRTL ? 'تحميل ملف الشركة' : 'Download Company Profile'}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-6">
                {isRTL 
                  ? 'احصل على نسخة كاملة من ملف الشركة مع تفاصيل خدماتنا ومشاريعنا وفريقنا.' 
                  : 'Get a comprehensive overview of our services, projects, team expertise, and company capabilities.'}
              </p>
              <a
                href="/api/pdf"
                download="ENVIRON-Company-Profile.pdf"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:scale-105"
              >
                <Download className="w-5 h-5" />
                {isRTL ? 'تحميل PDF' : 'Download PDF'}
              </a>
            </div>
          </SectionReveal>


        </div>
      </section>
    </main>
  )
}
