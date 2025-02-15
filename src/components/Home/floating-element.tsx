import { motion } from 'framer-motion'

interface FloatingElementProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export function FloatingElement({ className, size = 'md', color = '#22c55e' }: FloatingElementProps) {
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64'
  }

  return (
    <motion.div
      className={`absolute ${sizeClasses[size]} ${className}`}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path
          fill={color}
          fillOpacity="0.15"
          d="M44.9,-76.8C59.7,-69.8,74,-59.9,83.4,-46.3C92.8,-32.7,97.4,-16.3,97.8,0.2C98.2,16.7,94.4,33.4,85.6,47.3C76.8,61.2,63,72.3,47.8,79.7C32.6,87.1,16.3,90.8,0.1,90.6C-16,90.5,-32.1,86.5,-46.3,78.5C-60.5,70.5,-72.8,58.5,-81.3,44.1C-89.8,29.7,-94.4,14.9,-94.1,0.2C-93.8,-14.5,-88.6,-28.9,-80.2,-41.4C-71.8,-53.9,-60.2,-64.4,-46.8,-72C-33.3,-79.6,-16.7,-84.3,-0.3,-83.8C16,-83.3,32.1,-77.6,44.9,-76.8Z"
          transform="translate(100 100)"
        />
      </svg>
    </motion.div>
  )
}

