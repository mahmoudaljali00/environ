import type { Metadata, Viewport } from 'next'
import { Inter, Noto_Sans_Arabic, Cairo, Tajawal } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import '@/app/globals.css'
import { LangProvider } from '@/components/lang-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { SettingsProvider } from '@/components/settings-provider'
import { ThemeColorApplier } from '@/components/theme-color-applier'
import WhatsAppButton from '@/components/whatsapp-button'
import { getSettings } from '@/app/admin/settings/actions'
import Footer from '@/components/footer'
import { getAllServices } from '@/app/actions/services'


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-arabic',
  display: 'swap',
  weight: ['200', '300', '400', '500', '700', '800', '900'],
})

const tajawal = Tajawal({
  subsets: ['arabic'],
  variable: '--font-arabic',
  display: 'swap',
  weight: ['200', '300', '400', '500', '700', '800', '900'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://environ-ltd.com'),
  title: {
    default: 'ENVIRON – Engineering & Integrated Solutions in Sudan',
    template: '%s | ENVIRON',
  },
  icons: {
    icon: [
      { rel: "icon", url: "/favicon.ico" },
      { rel: "icon", type: "image/ico", sizes: "16x16", url: "/favicon-16x16.ico" },
      { rel: "icon", type: "image/ico", sizes: "32x32", url: "/favicon-32x32.ico" }
    ],
    "apple": [
      { rel: "apple-touch-icon", sizes: "180x180", url: "/apple-touch-icon.png" }
    ],
    "other": [
      { rel: "icon", type: "image/png", sizes: "192x192", url: "/android-chrome-192x192.png" },
      { rel: "icon", type: "image/png", sizes: "512x512", url: "/android-chrome-512x512.png" }
    ]
  },
  description:
    'ENVIRON is Sudan\'s leading provider of engineering, energy, MEP, air conditioning, water pumps, solar systems, security systems, contracting, and trading services. Trusted by industries across Khartoum and beyond.',
  keywords: [
    'ENVIRON Sudan',
    'engineering company Sudan',
    'energy solutions Khartoum',
    'MEP services Sudan',
    'solar systems Sudan',
    'air conditioning installation',
    'water pump systems',
    'security systems Sudan',
    'contracting services',
    'trading company Sudan',
    'infrastructure development',
    'sustainable energy Sudan',
    'HVAC Sudan',
    'electrical engineering',
    'mechanical engineering',
  ],
  authors: [{ name: 'ENVIRON', url: 'https://environ-ltd.com' }],
  creator: 'ENVIRON',
  publisher: 'ENVIRON',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'ENVIRON – Engineering & Integrated Solutions',
    description: 'Engineering the Future of Sustainable Environments in Sudan. Premium MEP, energy, and contracting services.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_SD',
    siteName: 'ENVIRON',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ENVIRON - Integrated Engineering Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ENVIRON – Engineering & Integrated Solutions',
    description: 'Sudan\'s premier provider of engineering, energy, and MEP services.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'ar-SD': '/ar',
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#009d8e',
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const settingsResult = await getSettings()
  const settings = settingsResult.success ? settingsResult.data ?? null : null
  const servicesResult = await getAllServices()
  const services = servicesResult.success && servicesResult.data ? servicesResult.data : []

  // Pre-hydration script — runs before React, prevents flash of wrong theme
  const themeScript = `
    (function() {
      try {
        var valid = ['dark-green', 'dark-gold', 'light-green', 'light-gold'];
        var stored = localStorage.getItem('environ-theme');
        var theme = (stored && valid.indexOf(stored) !== -1) ? stored : 'dark-green';
        var html = document.documentElement;
        valid.forEach(function(t) { html.classList.remove(t); });
        html.classList.remove('dark');
        html.classList.add(theme);
        if (theme.indexOf('dark') === 0) html.classList.add('dark');
      } catch (e) {
        document.documentElement.classList.add('dark', 'dark-green');
      }
    })();
  `

  return (
    <html
      lang="en"
      dir="ltr"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${cairo.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="relative font-sans antialiased bg-background text-foreground">
        <ThemeProvider>
          <SettingsProvider settings={settings}>
            <ThemeColorApplier />
            <LangProvider>
              {children}
              {
                services.length > 0 && <Footer services={services} />
              }
              <WhatsAppButton />
            </LangProvider>
          </SettingsProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
