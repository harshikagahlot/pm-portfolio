import React, { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { TRANSITIONS, VARIANTS } from '../lib/motion'

type MouthState = 'idle' | 'curious'

interface GuideCharacterProps {
  mouthState?: MouthState
}

const GuideCharacter: React.FC<GuideCharacterProps> = ({ mouthState: propMouthState }) => {
  const [isHovered, setIsHovered] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const mouthState: MouthState = isHovered ? 'curious' : (propMouthState ?? 'idle')

  // Float animation config
  const floatAnimation = shouldReduceMotion
    ? {}
    : {
        y: [0, -6, 0],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        },
      }

  // Pupil oscillation
  const pupilAnimation = shouldReduceMotion
    ? {}
    : {
        x: [-2, 2, -2],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        },
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
      {/* Tooltip speech bubble */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            id="guide-tooltip"
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
              fontSize: '12px',
              color: 'var(--color-text-secondary)',
              whiteSpace: 'nowrap',
              transformOrigin: 'bottom right',
            }}
          >
            Hi! I'm your guide.
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
        )}
      </AnimatePresence>

      {/* Character body */}
      <motion.div
        animate={isHovered ? { scale: 1.08 } : { scale: 1 }}
        transition={shouldReduceMotion ? { duration: 0 } : TRANSITIONS.base}
      >
        <motion.div animate={floatAnimation}>
          {/* Mobile scale wrapper */}
          <div
            style={{
              // Will be scaled on mobile via CSS
            }}
            className="guide-character-inner"
          >
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
                animate={pupilAnimation}
              />
              {/* Right pupil — animated */}
              <motion.circle
                cx="31"
                cy="30"
                r="3"
                fill="#0a0a0f"
                animate={pupilAnimation}
              />

              {/* Mouth */}
              <AnimatePresence mode="wait">
                {mouthState === 'idle' ? (
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
                    transition={shouldReduceMotion ? { duration: 0 } : TRANSITIONS.fast}
                  />
                ) : (
                  <motion.circle
                    key="open"
                    cx="24"
                    cy="44"
                    r="4"
                    fill="white"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={shouldReduceMotion ? { duration: 0 } : TRANSITIONS.fast}
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
