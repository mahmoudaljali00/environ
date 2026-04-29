'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'
import { useLang } from '@/components/lang-provider'
import { useSettings } from '@/components/settings-provider'
import { usePathname, useRouter } from 'next/navigation'

type Service = {
  id: string
  name: string
  nameAr: string
  slug: string
}


export default function Footer( {services = []}: {services: Service[]}  ) {
  const { t, lang, isRTL } = useLang()
  const settings = useSettings()
  const year = new Date().getFullYear()

  // Use database settings with i18n fallbacks
  const address = isRTL 
    ? (settings?.address_ar || t.contact.address)
    : (settings?.address || t.contact.address)
  const phone = settings?.phone || t.contact.phone
  const email = settings?.email || t.contact.email
  const tagline = isRTL
    ? (settings?.tagline_ar || t.footer.tagline)
    : (settings?.tagline || t.footer.tagline)
  const logo = settings?.logo || '/logo.svg'
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');
  
  const router = useRouter();
  if (isAdminPage) {
    return null;
  }

  return (
    <footer className="relative border-t border-border/50 bg-card/60 backdrop-blur-sm">
      {/* Pattern stripe */}
      <div className="absolute top-0 inset-x-0 h-1 bg-primary opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 ${isRTL ? 'text-right' : ''}`}>
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src={logo}
              alt="ENVIRON Logo"
              width={140}
              height={48}
              className="h-10 w-auto dark:brightness-[2] dark:saturate-150 mb-4"
            />
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              {tagline}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-4">
              {t.footer.quick_links}
            </h3>
            <ul className="space-y-2">
              {[
                { label: t.nav.about, href: '/about' },
                { label: t.nav.services, href: '/services' },
                { label: t.nav.projects, href: '/projects' },
                { label: t.nav.products, href: '/products' },
                { label: t.nav.blog, href: '/blog' },
                { label: t.nav.contact, href: '/contact' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services + Products */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-4">
              {t.nav.services}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-sm text-primary/80 font-medium hover:text-primary transition-colors">
                  {t.nav.products}
                </Link>
              </li>
              {services.slice(0, 4).map((s:any) => (
                <li key={s.id}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {lang === 'ar' ? s.nameAr : s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-4">
              {t.nav.contact}
            </h3>
            <ul className="space-y-3">
              <li className={`flex items-start gap-2 text-sm text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                {address}
              </li>
              <li className={`flex items-start gap-2 text-sm text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <a href={`tel:${phone}`} dir="ltr" className="hover:text-primary transition-colors">{phone}</a>
              </li>
              <li className={`flex items-start gap-2 text-sm text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <a href={`mailto:${email}`} dir="ltr" className="hover:text-primary transition-colors">{email}</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Company Profile Download */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 p-6 rounded-xl bg-primary/5 border border-primary/20">
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-semibold text-foreground mb-1">
              {isRTL ? 'تحميل ملف الشركة' : 'Download Company Profile'}
            </h3>
            <p className="text-xs text-muted-foreground">
              {isRTL ? 'تعرف على المزيد عن خدماتنا ومشاريعنا' : 'Learn more about our services and projects'}
            </p>
          </div>
          <a
            href="/api/pdf"
            download="ENVIRON-Company-Profile.pdf"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {isRTL ? 'تحميل PDF' : 'Download PDF'}
          </a>
        </div>

        {/* Bottom bar */}
        <div className={`mt-12 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
          <div className="flex items-center gap-2">
            <Image
              src={logo}
              alt="ENVIRON Logo"
              width={80}
              height={28}
              className="h-5 w-auto dark:brightness-[2] dark:saturate-150"
            />
            <span className="text-xs text-muted-foreground">
              &copy; {year}. {t.footer.rights}
            </span>
            <a href="https://actmoud.com/" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Develop by ACTMOUD
            </a>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-muted-foreground">{address}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
