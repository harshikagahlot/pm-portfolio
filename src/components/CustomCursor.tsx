import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export const CustomCursor = () => {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Dot follows instantly
  const dotX = useSpring(cursorX, { stiffness: 1000, damping: 50 })
  const dotY = useSpring(cursorY, { stiffness: 1000, damping: 50 })

  // Glow follows with soft lag — the "cloud" effect
  const glowX = useSpring(cursorX, { stiffness: 150, damping: 20 })
  const glowY = useSpring(cursorY, { stiffness: 150, damping: 20 })

  // Outer ring follows with even more lag
  const ringX = useSpring(cursorX, { stiffness: 80, damping: 20 })
  const ringY = useSpring(cursorY, { stiffness: 80, damping: 20 })

  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    // Detect hovering over clickable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return

      const isClickable = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.style.cursor === 'pointer' ||
        window.getComputedStyle(target).cursor === 'pointer'
      setIsHovering(!!isClickable)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isVisible, cursorX, cursorY])

  // Hide on mobile — custom cursor makes no sense on touch
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  // Calculate sizes and opacity
  const dotSize = isHovering ? 6 : 8
  const glowSize = isHovering ? 60 : 40
  const ringSize = isHovering ? 70 : 60
  const cursorOpacity = isVisible ? 1 : 0

  return (
    <>
      {/* Outer ring */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: ringSize,
          height: ringSize,
          borderRadius: '50%',
          border: isHovering 
            ? '1px solid rgba(45, 212, 168, 0.3)' 
            : '1px solid rgba(124, 111, 247, 0.15)',
          pointerEvents: 'none',
          zIndex: 99999,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: cursorOpacity,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />

      {/* Glow cloud */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: glowSize,
          height: glowSize,
          borderRadius: '50%',
          background: isHovering
            ? 'radial-gradient(circle, rgba(45, 212, 168, 0.35) 0%, rgba(45, 212, 168, 0.12) 50%, transparent 70%)'
            : 'radial-gradient(circle, rgba(124, 111, 247, 0.25) 0%, rgba(124, 111, 247, 0.08) 50%, transparent 70%)',
          filter: 'blur(8px)',
          pointerEvents: 'none',
          zIndex: 99998,
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: glowSize,
          height: glowSize,
          opacity: cursorOpacity,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />

      {/* Precise dot */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: dotSize,
          height: dotSize,
          borderRadius: '50%',
          backgroundColor: isHovering ? '#2dd4a8' : '#7c6ff7',
          pointerEvents: 'none',
          zIndex: 100000,
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: dotSize,
          height: dotSize,
          opacity: cursorOpacity,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
    </>
  )
}
