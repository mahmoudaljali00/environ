'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, MapPin, Calendar, Clock, User, CheckCircle } from 'lucide-react'
import Navbar from '@/components/navbar'
import { useLang } from '@/components/lang-provider'

type Project = {
  id: string
  title: string
  titleAr: string
  category: string
  description: string
  descriptionAr: string
  location: string
  locationAr: string
  client: string
  clientAr: string
  year: number
  duration: string
  durationAr: string
  image: string
  images: string[]
  challenge: string
  challengeAr: string
  solution: string
  solutionAr: string
  results: string[]
  resultsAr: string[]
}

export default function ProjectDetailClient({ project }: { project: Project }) {
  const { t, lang, isRTL } = useLang()
  const [selectedImage, setSelectedImage] = useState(0)

  const images = [project.image, ...project.images]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-12">
        <div className="absolute inset-0 pattern-bg opacity-[0.05]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className={`inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            {t.common?.back || 'Back to Projects'}
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                <Image
                  src={images[selectedImage]}
                  alt={lang === 'ar' ? project.titleAr : project.title}
                  fill
                  className="object-cover"
                />
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative h-20 rounded-lg overflow-hidden ${selectedImage === idx ? 'ring-2 ring-primary' : ''}`}
                    >
                      <Image src={img} alt={`View ${idx + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Project Info */}
            <div className={isRTL ? 'text-right' : ''}>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                {project.category}
              </span>
              <h1 className="text-4xl font-bold mt-4 mb-4">
                {lang === 'ar' ? project.titleAr : project.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {lang === 'ar' ? project.descriptionAr : project.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">{t.projects?.location || 'Location'}</p>
                    <p className="font-medium">{lang === 'ar' ? project.locationAr : project.location}</p>
                  </div>
                </div>
                <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                  <Calendar className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">{t.projects?.year || 'Year'}</p>
                    <p className="font-medium">{project.year}</p>
                  </div>
                </div>
                <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                  <User className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">{t.projects?.client || 'Client'}</p>
                    <p className="font-medium">{lang === 'ar' ? project.clientAr : project.client}</p>
                  </div>
                </div>
                <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                  <Clock className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">{t.projects?.duration || 'Duration'}</p>
                    <p className="font-medium">{lang === 'ar' ? project.durationAr : project.duration}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className={`glass-card p-8 rounded-2xl ${isRTL ? 'text-right' : ''}`}>
              <h2 className="text-2xl font-bold mb-4">{t.projects?.challenge || 'Challenge'}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {lang === 'ar' ? project.challengeAr : project.challenge}
              </p>
            </div>
            <div className={`glass-card p-8 rounded-2xl ${isRTL ? 'text-right' : ''}`}>
              <h2 className="text-2xl font-bold mb-4">{t.projects?.solution || 'Solution'}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {lang === 'ar' ? project.solutionAr : project.solution}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      {project.results && project.results.length > 0 && (
        <section className="py-12 pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className={`text-3xl font-bold mb-8 ${isRTL ? 'text-right' : ''}`}>
              {t.projects?.results || 'Results'}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(lang === 'ar' ? project.resultsAr : project.results).map((result: string, idx: number) => (
                <div
                  key={idx}
                  className={`glass-card p-6 rounded-xl flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                >
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">{result}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
