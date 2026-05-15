'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ParallaxBackgroundProps {
  className?: string
  intensity?: number
  children?: React.ReactNode
}

export default function ParallaxBackground({
  className,
  intensity = 0.3,
  children,
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${intensity * 100}%`])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3])

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      {/* Animated pattern layer */}
      <motion.div
        className="absolute inset-0 pattern-bg opacity-[0.04]"
        style={{ y }}
      />

      {/* Floating gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px] pointer-events-none"
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '30%']) }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[80px] pointer-events-none"
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '-20%']) }}
      />

      {/* Content with parallax opacity */}
      <motion.div style={{ opacity }} className="relative z-10">
        {children}
      </motion.div>
    </div>
  )
}

// Deterministic pseudo-random from seed (avoids hydration mismatch)
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297
  return x - Math.floor(x)
}

// Floating particles effect
export function FloatingParticles({ count = 15 }: { count?: number }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Generate deterministic particles based on index
  const particles = Array.from({ length: count }).map((_, i) => ({
    x: `${seededRandom(i * 3) * 100}%`,
    y: `${seededRandom(i * 3 + 1) * 100}%`,
    scale: seededRandom(i * 3 + 2) * 0.5 + 0.5,
    animateY: `${seededRandom(i * 7) * 20 - 10}%`,
    animateX: `${seededRandom(i * 7 + 1) * 10 - 5}%`,
    duration: seededRandom(i * 7 + 2) * 10 + 10,
    delay: seededRandom(i * 7 + 3) * 5,
  }))

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          initial={{
            x: p.x,
            y: p.y,
            scale: p.scale,
          }}
          animate={{
            y: [null, p.animateY],
            x: [null, p.animateX],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  )
}
