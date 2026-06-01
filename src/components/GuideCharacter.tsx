import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { TRANSITIONS, VARIANTS } from '../lib/motion'

type MouthState = 'idle' | 'curious' | 'pointing' | 'happy' | 'open'

interface SectionState {
  mouth: MouthState
  tooltip: string
}

const getSectionState = (progress: number): SectionState => {
  if (progress < 0.15) {
    return { mouth: 'idle', tooltip: "Hi! I'm your guide." }
  } else if (progress >= 0.15 && progress < 0.30) {
    return { mouth: 'curious', tooltip: 'These are my principles.' }
  } else if (progress >= 0.30 && progress < 0.45) {
    return { mouth: 'pointing', tooltip: 'Real products I shipped.' }
  } else if (progress >= 0.45 && progress < 0.60) {
    return { mouth: 'curious', tooltip: 'Products I study obsessively.' }
  } else if (progress >= 0.60 && progress < 0.75) {
    return { mouth: 'happy', tooltip: 'The journey so far.' }
  } else if (progress >= 0.75 && progress < 0.90) {
    return { mouth: 'idle', tooltip: 'Still curious. Always.' }
  } else {
    return { mouth: 'open', tooltip: "Let's work together?" }
  }
}

export const GuideCharacter: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  // Track page scroll progress dynamically
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      const innerHeight = window.innerHeight
      const maxScroll = Math.max(scrollHeight - innerHeight, 1)
      const progress = window.scrollY / maxScroll
      setScrollProgress(progress)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Resolve current state
  const currentState = getSectionState(scrollProgress)
  
  // Hover state overrides
  const resolvedMouthState: MouthState = isHovered ? 'curious' : currentState.mouth

  // Float animation config
  const floatAnimation = shouldReduceMotion
    ? {}
    : {
        y: [0, -6, 0],
        transition: {
          duration: 3,
          repeat: Infinity,
          repeatType: 'reverse' as const,
          ease: 'easeInOut' as const,
        },
      }

  // Eye pupil offset based on pointing state or normal floating drift
  const getPupilAnimation = () => {
    if (shouldReduceMotion) return {}
    if (resolvedMouthState === 'pointing') {
      // Look/point left towards the Case Studies content!
      return {
        x: -3,
        y: 0,
        transition: { duration: 0.3, ease: 'easeOut' as const },
      }
    }
    // Idle gentle shifting gaze
    return {
      x: [-2, 2, -2],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    }
  }

  return (
    <motion.div
      id="guide-character"
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              delay: 1.5,
              type: 'spring',
              stiffness: 80,
              damping: 15,
            }
      }
      style={{
        position: 'fixed',
        right: '24px',
        bottom: '24px',
        zIndex: 200,
        cursor: 'pointer',
        userSelect: 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip speech bubble (always visible to narrate, with state cross-fades) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentState.tooltip}
          variants={VARIANTS.scaleIn}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={shouldReduceMotion ? { duration: 0 } : TRANSITIONS.fast}
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 10px)',
            right: 0,
            backgroundColor: 'var(--color-bg-card)',
            border: '1px solid var(--color-border-default)',
            borderRadius: '8px',
            padding: '8px 12px',
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            color: 'var(--color-text-secondary)',
            whiteSpace: 'nowrap',
            transformOrigin: 'bottom right',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          {currentState.tooltip}
          {/* Speech bubble pointer */}
          <span
            style={{
              position: 'absolute',
              bottom: '-5px',
              right: '20px',
              width: '10px',
              height: '10px',
              backgroundColor: 'var(--color-bg-card)',
              border: '1px solid var(--color-border-default)',
              borderTop: 'none',
              borderLeft: 'none',
              transform: 'rotate(45deg)',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Character body */}
      <motion.div
        animate={isHovered ? { scale: 1.08 } : { scale: 1 }}
        transition={shouldReduceMotion ? { duration: 0 } : TRANSITIONS.base}
      >
        <motion.div animate={floatAnimation}>
          <div className="guide-character-inner">
            <svg
              width="48"
              height="56"
              viewBox="0 0 48 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Guide character"
              role="img"
            >
              {/* Body — rounded blob */}
              <rect
                x="4"
                y="12"
                width="40"
                height="40"
                rx="20"
                fill="rgba(124,111,247,0.9)"
              />

              {/* Antenna left */}
              <circle cx="16" cy="6" r="4" fill="rgba(124,111,247,0.7)" />
              <line
                x1="16"
                y1="10"
                x2="16"
                y2="18"
                stroke="rgba(124,111,247,0.8)"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Antenna right */}
              <circle cx="32" cy="6" r="4" fill="rgba(124,111,247,0.7)" />
              <line
                x1="32"
                y1="10"
                x2="32"
                y2="18"
                stroke="rgba(124,111,247,0.8)"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Left eye white */}
              <circle cx="17" cy="30" r="6" fill="white" />
              {/* Right eye white */}
              <circle cx="31" cy="30" r="6" fill="white" />

              {/* Left pupil — animated */}
              <motion.circle
                cx="17"
                cy="30"
                r="3"
                fill="#0a0a0f"
                animate={getPupilAnimation()}
              />
              {/* Right pupil — animated */}
              <motion.circle
                cx="31"
                cy="30"
                r="3"
                fill="#0a0a0f"
                animate={getPupilAnimation()}
              />

              {/* Mouth with 0.3s cross-fade state configurations */}
              <AnimatePresence mode="wait">
                {resolvedMouthState === 'idle' && (
                  <motion.path
                    key="smile"
                    d="M18 42 Q24 47 30 42"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                {(resolvedMouthState === 'curious' || resolvedMouthState === 'pointing') && (
                  <motion.circle
                    key="curious-circle"
                    cx="24"
                    cy="44"
                    r="4"
                    fill="white"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                {resolvedMouthState === 'happy' && (
                  <motion.path
                    key="happy-smile"
                    d="M17 40 Q24 49 31 40 Z"
                    fill="white"
                    initial={{ opacity: 0, y: 2 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 2 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                {resolvedMouthState === 'open' && (
                  <motion.circle
                    key="open-gasp"
                    cx="24"
                    cy="43"
                    r="6"
                    fill="white"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>
            </svg>
          </div>
        </motion.div>
      </motion.div>

      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 767px) {
          #guide-character {
            right: 12px !important;
            bottom: 12px !important;
          }
          .guide-character-inner {
            transform: scale(0.75);
            transform-origin: bottom right;
          }
        }
      `}</style>
    </motion.div>
  )
}

export default GuideCharacter
