import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { TRANSITIONS, VARIANTS } from '../lib/motion'
import { scrollTo } from '../lib/smoothScroll'

const ROLES = ['product thinker', 'frontend builder', 'interaction designer']
const ROLE_INTERVAL = 2500

const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  // Role switcher timer
  useEffect(() => {
    if (shouldReduceMotion) return
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length)
    }, ROLE_INTERVAL)
    return () => clearInterval(timer)
  }, [shouldReduceMotion])

  // Stagger animation helpers
  const getItemAnimation = (index: number) => ({
    initial: shouldReduceMotion ? {} : 'hidden',
    animate: 'visible',
    variants: VARIANTS.fadeUp,
    transition: shouldReduceMotion
      ? { duration: 0 }
      : {
          ...TRANSITIONS.slow,
          delay: 0.3 + index * 0.12,
        },
  })

  // Float animation for the stat card
  const floatAnim = shouldReduceMotion
    ? {}
    : {
        y: [0, -8, 0],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        },
      }

  // Scroll indicator bounce
  const bounceAnim = shouldReduceMotion
    ? {}
    : {
        y: [0, 6, 0],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        },
      }

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'var(--color-bg-primary)',
      }}
    >
      {/* Atmospheric background gradient orb */}
      <div className="hero-gradient-orb" aria-hidden="true" />

      {/* Main content — left-biased layout */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '48px',
        }}
      >
        {/* Left content column */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '28px',
            flex: '0 0 auto',
            maxWidth: '520px',
          }}
        >
          {/* 1. Availability badge */}
          <motion.div {...getItemAnimation(0)}>
            <div
              id="availability-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '100px',
                border: '1px solid var(--color-border-default)',
                backgroundColor: 'var(--color-bg-secondary)',
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
              }}
            >
              {/* Pulsing green dot */}
              <motion.span
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        scale: [1, 1.4, 1],
                        transition: {
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        },
                      }
                }
                style={{
                  display: 'block',
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: '#4ade80',
                  flexShrink: 0,
                }}
              />
              Available for opportunities
            </div>
          </motion.div>

          {/* 2. Headline */}
          <motion.div {...getItemAnimation(1)}>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(40px, 7vw, 72px)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: 'var(--color-text-primary)',
                margin: 0,
              }}
            >
              I build things
              <br />
              people{' '}
              <span className="gradient-text">feel.</span>
            </h1>
          </motion.div>

          {/* 3. Role switcher */}
          <motion.div
            {...getItemAnimation(2)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-body)',
              fontSize: '18px',
              color: 'var(--color-text-secondary)',
              height: '28px',
              overflow: 'hidden',
            }}
          >
            <span>I'm a</span>
            <div style={{ position: 'relative', height: '28px', overflow: 'hidden' }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? {} : { opacity: 0, y: -20 }}
                  transition={
                    shouldReduceMotion ? { duration: 0 } : { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
                  }
                  style={{
                    display: 'block',
                    color: 'var(--color-accent-purple)',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* 4. Short bio */}
          <motion.p
            {...getItemAnimation(3)}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              color: 'var(--color-text-secondary)',
              maxWidth: '420px',
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            I design and build digital experiences that are thoughtful, fast, and worth remembering.
          </motion.p>

          {/* 5. CTA buttons */}
          <motion.div
            {...getItemAnimation(4)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <motion.button
              id="cta-work"
              onClick={() => scrollTo('#work')}
              whileHover={shouldReduceMotion ? {} : { backgroundColor: '#9688f9' }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              transition={TRANSITIONS.fast}
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                fontWeight: 500,
                color: '#ffffff',
                backgroundColor: 'var(--color-accent-purple)',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              See my work →
            </motion.button>

            <motion.button
              id="cta-thinking"
              onClick={() => scrollTo('#thinking')}
              whileHover={
                shouldReduceMotion
                  ? {}
                  : { borderColor: 'rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.04)' }
              }
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              transition={TRANSITIONS.fast}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                fontWeight: 500,
                color: 'var(--color-text-primary)',
                backgroundColor: 'transparent',
                padding: '12px 24px',
                borderRadius: '8px',
                border: '1px solid var(--color-border-default)',
                cursor: 'pointer',
              }}
            >
              How I think →
            </motion.button>
          </motion.div>

          {/* 6. Scroll hint */}
          <motion.div
            {...getItemAnimation(5)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <motion.div animate={bounceAnim}>
              {/* Chevron down icon */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M3 6L8 11L13 6"
                  stroke="var(--color-text-hint)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: 'var(--color-text-hint)',
                letterSpacing: '0.04em',
              }}
            >
              scroll to explore
            </span>
          </motion.div>
        </div>

        {/* Right side — floating stat card (desktop only) */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={
            shouldReduceMotion ? { duration: 0 } : { ...TRANSITIONS.slow, delay: 1.0 }
          }
          className="hero-stat-card"
          style={{
            flexShrink: 0,
          }}
        >
          <motion.div
            animate={floatAnim}
            style={{
              backgroundColor: 'var(--color-bg-card)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: '16px',
              padding: '24px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {[
              { value: '3', label: 'products shipped' },
              { value: '2 yrs', label: 'building' },
              { value: '∞', label: 'curiosity' },
            ].map((stat, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '22px',
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    lineHeight: 1.2,
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Hide stat card on mobile */}
      <style>{`
        @media (max-width: 767px) {
          .hero-stat-card { display: none !important; }
        }
        @media (min-width: 768px) {
          .hero-stat-card { display: block; }
        }
      `}</style>
    </section>
  )
}

export default Hero
