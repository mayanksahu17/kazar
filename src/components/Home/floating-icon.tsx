'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Card } from '@/components/ui/card'

interface IconProps {
  src?: string
  alt?: string
  delay: number
  x: number
  y: number
  scale?: number
  isEmpty?: boolean
  zIndex?: number
}

const FloatingIcon: React.FC<IconProps> = ({ src, alt, delay, x, y, scale = 1, isEmpty = false, zIndex = 0 }) => {
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      x: [x, x + Math.random() * 10 - 5],
      y: [y, y + Math.random() * 10 - 5],
      transition: {
        duration: 2 + Math.random() * 2,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
        delay: delay,
      },
    })
  }, [controls, delay, x, y])

  return (
    <motion.div 
      animate={controls} 
      style={{ 
        position: 'absolute', 
        left: '50%', 
        top: '50%',
        transform: `translate(-50%, -50%) scale(${scale})`,
        zIndex,
      }}
    >
      <Card className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center
        ${isEmpty ? 'bg-white/40 shadow-sm' : 'bg-white shadow-md'} 
        rounded-2xl hover:shadow-lg transition-all duration-200 hover:scale-105
        backdrop-blur-[2px]`}
      >
        {!isEmpty && src && (
          <img src={src} alt={alt} className="w-4 h-4 sm:w-6 sm:h-6 object-contain" />
        )}
      </Card>
    </motion.div>
  )
}

export function FloatingIcons() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Background empty boxes (more of them, lower z-index)
  const emptyBoxes = Array.from({ length: 7 }, (_, i) => ({
    alt:`Empty box ${i}`,
    delay: Math.random(),
    x: (Math.random() - 0.5) * 300,
    y: (Math.random() - 0.5) * 200,
    scale: 0.8 + Math.random() * 0.4,
    isEmpty: true,
    zIndex: 0
  }))

  // Actual icons (fewer, higher z-index)
  const icons = [
    { src: '/float/amazon.png', alt: 'Amazon', delay: 0.2, x: -120, y: -40, scale: 1.1, zIndex: 2 },
    { src: '/float/google.png', alt: 'Google', delay: 0.5, x: 20, y: -90, scale: 1, zIndex: 2 },
    { src: '/float/spotify.png', alt: 'Spotify', delay: 0.8, x: -20, y: 30, scale: 0.9, zIndex: 2 },
    { src: '/float/netflix.png', alt: 'Netflix', delay: 0.3, x: 80, y: -20, scale: 1, zIndex: 2 },
    { src: '/float/meta.png', alt: 'Meta', delay: 0.6, x: -60, y: 60, scale: 0.95, zIndex: 2 },
    { src: '/float/apple.png', alt: 'Apple', delay: 0.9, x: 140, y: 40, scale: 1.05, zIndex: 2 },
    { src: '/float/microsoft.png', alt: 'Microsoft', delay: 0.4, x: -150, y: 20, scale: 1, zIndex: 2 },
    { src: '/float/ibm.png', alt: 'IBM', delay: 0.7, x: 100, y: 80, scale: 0.9, zIndex: 2 },
    { src: '/float/oracle.png', alt: 'Oracle', delay: 1, x: -90, y: -80, scale: 0.95, zIndex: 2 },
    { src: '/float/intel.png', alt: 'Intel', delay: 0.2, x: 50, y: 40, scale: 1, zIndex: 2 },
    { src: '/float/adobe.png', alt: 'Adobe', delay: 0.5, x: -40, y: -20, scale: 1.1, zIndex: 2 },
    { src: '/float/twitter.png', alt: 'Twitter', delay: 0.8, x: 160, y: -60, scale: 0.9, zIndex: 2 },
    { src: '/float/linkedin.png', alt: 'LinkedIn', delay: 0.3, x: 0, y: 70, scale: 1, zIndex: 2 },
    { src: '/float/salesforce.png', alt: 'Salesforce', delay: 0.6, x: -180, y: -10, scale: 0.95, zIndex: 2 },
  ]

  // Combine empty boxes and icons, but render empty boxes first
  const elements = [...emptyBoxes, ...icons]

  return (
    <div className="relative h-64 sm:h-72 w-full max-w-xl sm:max-w-3xl mx-auto">
      <div className="absolute inset-0 top-[-80px]">
        {elements.map((element, index) => (
          <FloatingIcon
            key={element.alt || `empty-${index}`}
            {...element}
          />
        ))}
      </div>
    </div>
  )
}

