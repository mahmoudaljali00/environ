import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with ENVIRON for engineering services, MEP solutions, and project inquiries. Located in Khartoum, Sudan.',
  keywords: ['contact ENVIRON', 'engineering inquiry Sudan', 'MEP services contact', 'Khartoum engineering company'],
  openGraph: {
    title: 'Contact Us | ENVIRON',
    description: 'Reach out for engineering services and project consultations.',
    images: ['/og-contact.jpg'],
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
