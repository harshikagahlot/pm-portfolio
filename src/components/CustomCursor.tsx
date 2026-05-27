import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export const CustomCursor = () => {
  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Core — snappy
  const coreX = useSpring(mouseX, { stiffness: 800, damping: 40 })
  const coreY = useSpring(mouseY, { stiffness: 800, damping: 40 })

  // Inner cloud — soft trail
  const cloudX = useSpring(mouseX, { stiffness: 120, damping: 18 })
  const cloudY = useSpring(mouseY, { stiffness: 120, damping: 18 })

  // Outer nebula — heavy trail
  const nebulaX = useSpring(mouseX, { stiffness: 55, damping: 15 })
  const nebulaY = useSpring(mouseY, { stiffness: 55, damping: 15 })

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setIsVisible(true)
    }

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (!el) return

      const clickable =
        el.tagName === 'BUTTON' ||
        el.tagName === 'A' ||
        !!el.closest('button') ||
        !!el.closest('a') ||
        window.getComputedStyle(el).cursor === 'pointer'
      setIsHovering(clickable)
    }

    const onLeave = () => setIsVisible(false)
    const onEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [mouseX, mouseY])

  if (typeof window !== 'undefined' &&
      window.matchMedia('(pointer: coarse)').matches) return null

  const baseStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    borderRadius: '50%',
    pointerEvents: 'none' as const,
    opacity: isVisible ? 1 : 0,
  }

  return (
    <>
      {/* Outer nebula — heaviest trail */}
      <motion.div
        style={{
          ...baseStyle,
          width: isHovering ? 120 : 100,
          height: isHovering ? 120 : 100,
          background: isHovering
            ? 'radial-gradient(circle, rgba(45, 212, 168, 0.1) 0%, rgba(45, 212, 168, 0.03) 50%, transparent 70%)'
            : 'radial-gradient(circle, rgba(124, 111, 247, 0.12) 0%, rgba(80, 60, 180, 0.06) 50%, transparent 70%)',
          filter: 'blur(20px)',
          x: nebulaX,
          y: nebulaY,
          zIndex: 9998,
          transition: 'width 0.4s ease, height 0.4s ease, background 0.4s ease, opacity 0.3s ease',
        }}
      />

      {/* Inner cloud — medium trail */}
      <motion.div
        style={{
          ...baseStyle,
          width: isHovering ? 70 : 55,
          height: isHovering ? 70 : 55,
          background: isHovering
            ? 'radial-gradient(circle, rgba(45, 212, 168, 0.3) 0%, rgba(45, 212, 168, 0.1) 45%, transparent 70%)'
            : 'radial-gradient(circle, rgba(124, 111, 247, 0.35) 0%, rgba(100, 80, 220, 0.15) 45%, transparent 70%)',
          filter: 'blur(12px)',
          x: cloudX,
          y: cloudY,
          zIndex: 9999,
          transition: 'width 0.4s ease, height 0.4s ease, background 0.4s ease, opacity 0.3s ease',
        }}
      />

      {/* Star core — snappiest */}
      <motion.div
        style={{
          ...baseStyle,
          width: 14,
          height: 14,
          background: isHovering
            ? 'radial-gradient(circle, rgba(180, 255, 230, 0.9) 0%, rgba(45, 212, 168, 0.6) 40%, transparent 70%)'
            : 'radial-gradient(circle, rgba(200, 190, 255, 0.9) 0%, rgba(124, 111, 247, 0.6) 40%, transparent 70%)',
          filter: 'blur(4px)',
          x: coreX,
          y: coreY,
          zIndex: 10000,
          transition: 'background 0.4s ease, opacity 0.3s ease',
        }}
      />
    </>
  )
}

export default CustomCursor
