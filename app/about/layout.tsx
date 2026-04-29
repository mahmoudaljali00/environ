import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about ENVIRON - Sudan\'s leading engineering company with 15+ years of experience in MEP, energy solutions, and infrastructure development.',
  keywords: ['about ENVIRON', 'engineering company Sudan', 'MEP company', 'energy solutions company', 'Khartoum engineering'],
  openGraph: {
    title: 'About Us | ENVIRON',
    description: 'Discover our journey, mission, and commitment to engineering excellence in Sudan.',
    images: ['/og-about.jpg'],
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
