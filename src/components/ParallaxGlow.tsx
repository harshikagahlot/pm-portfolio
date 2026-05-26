import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxGlowProps {
  color: string
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  speed: number
  style?: any
}

const ParallaxGlow: React.FC<ParallaxGlowProps> = ({ color, position, speed, style = {} }) => {
  const { scrollY } = useScroll()
  const ref = useRef<HTMLDivElement>(null)
  const [offsetTop, setOffsetTop] = useState(0)
  const [isCoarse, setIsCoarse] = useState(false)

  useEffect(() => {
    if (ref.current) {
      // Find the parent section element to calculate relative position
      const parentSection = ref.current.closest('section')
      if (parentSection) {
        setOffsetTop(parentSection.offsetTop)
      }
    }
    
    // Check if the device is a touch/coarse pointer device to prevent mobile jank
    setIsCoarse(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  // Parallax transform calculation based on scroll offset from the section's top
  const activeY = useTransform(
    scrollY,
    [offsetTop - 600, offsetTop + 600],
    [speed * -100, speed * 100]
  )

  // Use the transform on desktop/fine-pointers, keep static 0 on touch devices
  const y = isCoarse ? 0 : activeY

  // Position mappings
  const positionStyles: Record<string, React.CSSProperties> = {
    'top-left': { top: '-25%', left: '-15%' },
    'top-right': { top: '-25%', right: '-15%' },
    'bottom-left': { bottom: '-25%', left: '-15%' },
    'bottom-right': { bottom: '-25%', right: '-15%' },
  }

  return (
    <motion.div
      ref={ref}
      style={{
        position: 'absolute',
        width: '60%',
        height: '60%',
        minWidth: '350px',
        minHeight: '350px',
        maxWidth: '800px',
        maxHeight: '800px',
        background: `radial-gradient(circle, ${color} 0%, rgba(0,0,0,0) 70%)`,
        pointerEvents: 'none',
        zIndex: 0,
        y,
        ...positionStyles[position],
        ...style,
      }}
      aria-hidden="true"
    />
  )
}

export default ParallaxGlow
