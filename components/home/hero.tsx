'use client'

import { motion, useScroll, useTransform, useMotionValue, useSpring, animate } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useLang } from '@/components/lang-provider'
import { FloatingParticles } from '@/components/parallax-background'

interface StatItem {
  id: string
  key: string
  value: string
  labelEn: string
  labelAr: string
  sortOrder: number
  published: boolean
}

interface HeroProps {
  stats: StatItem[]
}

export default function Hero({ stats }: HeroProps) {
  const { lang, t } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const patternY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  // 3D logo mouse tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { stiffness: 150, damping: 20 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig)

  function handleMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Dark bg */}
      {/* <div className="absolute inset-0 bg-background" /> */}

      {/* Hero image with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY }}
      >
        <Image
          src="/hero-bg.jpg"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-background/70" />
      </motion.div>

      {/* Animated pattern parallax overlay */}
      {/* <motion.div
        className="absolute inset-0 pattern-bg opacity-[0.06]"
        style={{ y: patternY }}
      /> */}

      {/* Floating particles */}
      <FloatingParticles count={30} />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/8 blur-[100px] pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20"
      >
        {/* Badge with entrance animation */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-6"
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-primary"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {t.hero.badge}
        </motion.div>

        {/* 3D Logo with mouse tracking */}
        <motion.div
          initial={{ scale: 0.5, rotateY: -45, rotateX: 20, opacity: 0 }}
          animate={{ scale: 1, rotateY: 0, rotateX: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="mb-2 cursor-default"
          style={{ perspective: 1200 }}
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            className="relative"
          >
            <h1 className="sr-only">ENVIRON - Integrated Engineering Solutions</h1>
            <Image
              src="/logo.svg"
              alt="ENVIRON"
              width={400}
              height={120}
              className="h-18 sm:h-20 lg:h-24 xl:h-30 w-auto dark:brightness-[2] dark:saturate-150"
              style={{
                filter: 'drop-shadow(0 0 40px rgba(0, 157, 142, 0.5)) drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))',
                transform: 'translateZ(50px)',
              }}
              priority
            />
            {/* Reflection effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
              style={{ transform: 'translateZ(60px)' }}
            />
          </motion.div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl sm:text-2xl lg:text-3xl font-medium text-foreground/90 max-w-3xl leading-relaxed text-balance mb-4"
        >
          {t.hero.tagline}
        </motion.p>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-10"
        >
          {t.hero.sub}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-4"
        >
          <Link href="/services">
            <motion.span
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 157, 142, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {t.hero.cta_primary}
              <motion.span
                className="inline-block"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </motion.span>
          </Link>
          <Link href="/projects">
            <motion.span
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/40 text-foreground font-semibold text-sm glass"
              whileHover={{ scale: 1.05, borderColor: 'var(--primary)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {t.hero.cta_secondary}
            </motion.span>
          </Link>
        </motion.div>

        {/* Stats from database */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.9 },
            },
          }}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6"
        >
          {stats.map(({ id, value, labelEn, labelAr }) => (
            <motion.div
              key={id}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.9 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 20px rgba(0, 157, 142, 0.2)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="glass-card p-4 rounded-2xl text-center cursor-default"
            >
              <CountUpValue value={value} className="text-3xl font-bold text-primary mb-1" />
              <div className="text-xs text-muted-foreground">{lang === 'ar' ? labelAr : labelEn}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="p-2 rounded-full glass cursor-pointer"
          onClick={() => window.scroll({ top: 1000, behavior: 'smooth' })}
        >
          <ChevronDown className="w-5 h-5 text-primary/70" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// Animated counter component
function CountUpValue({ value, className }: { value: string; className?: string }) {
  const [displayValue, setDisplayValue] = useState('0')
  const numericPart = parseInt(value.replace(/\D/g, ''))
  const suffix = value.replace(/\d/g, '')

  useEffect(() => {
    const controls = animate(0, numericPart, {
      duration: 2,
      delay: 1,
      ease: [0.25, 0.4, 0.25, 1],
      onUpdate: (latest) => setDisplayValue(Math.round(latest).toString()),
    })
    return () => controls.stop()
  }, [numericPart])

  return <div className={className}>{displayValue}{suffix}</div>
}
