import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { TRANSITIONS, VARIANTS } from '../lib/motion'
import { scrollTo } from '../lib/smoothScroll'
import ParallaxGlow from '../components/ParallaxGlow'
import { TEARDOWNS } from '../data/teardowns'
import type { TeardownData } from '../data/teardowns'
import TeardownOverlay from '../components/TeardownOverlay'
import duolingoLogo from '../assets/duolingo-logo.png'

// ── Logo image map ───────────────────────────────────────────
const CARD_LOGOS: Record<string, string> = {
  duolingo: duolingoLogo,
}

// ── Shared teal constant ──────────────────────────────────────
const TEAL = '#2dd4a8'

// ── Pulsing dots (teal variant) ───────────────────────────────
const PulsingDots: React.FC<{ shouldReduceMotion: boolean | null }> = ({ shouldReduceMotion }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        animate={
          shouldReduceMotion
            ? {}
            : {
                opacity: [0.2, 1, 0.2],
                transition: {
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeInOut' as const,
                },
              }
        }
        style={{
          display: 'block',
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          backgroundColor: TEAL,
        }}
      />
    ))}
  </div>
)

// ── Individual teardown card ──────────────────────────────────
interface TeardownCardProps {
  teardown: TeardownData
  onClick: () => void
  shouldReduceMotion: boolean | null
}

const TeardownCard: React.FC<TeardownCardProps> = ({ teardown, onClick, shouldReduceMotion }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={`Open ${teardown.name} teardown`}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick() }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      variants={VARIANTS.fadeUp}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              y: -6,
              boxShadow: '0 8px 32px rgba(45,212,168,0.08)',
              borderColor: 'rgba(45,212,168,0.35)',
            }
      }
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25, ease: 'easeOut' }}
      style={{
        backgroundColor: 'var(--color-bg-card)',
        border: '0.5px solid var(--color-border-subtle)',
        borderRadius: '16px',
        padding: '28px',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        outline: 'none',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 1. Logo square */}
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          backgroundColor: teardown.logoColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        {CARD_LOGOS[teardown.id] ? (
          <img
            src={CARD_LOGOS[teardown.id]}
            alt={`${teardown.name} logo`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '25px',
              fontWeight: 800,
              color: teardown.logoColor === '#ffffff' ? '#0a0a0f' : '#ffffff',
              lineHeight: 1,
            }}
          >
            {teardown.name[0]}
          </span>
        )}
      </div>

      {/* 2. Product name */}
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '25px',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          marginTop: '16px',
          marginBottom: 0,
        }}
      >
        {teardown.name}
      </p>

      {/* 3. Category */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '16px',
          color: 'var(--color-text-hint)',
          marginTop: '4px',
          marginBottom: 0,
        }}
      >
        {teardown.category}
      </p>

      {/* 4. Teaser */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '17px',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.6,
          marginTop: '12px',
          marginBottom: 0,
          flex: 1,
        }}
      >
        {teardown.teaser}
      </p>

      {/* 5. Bottom row: link + observations pill */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '20px',
        }}
      >
        <motion.span
          animate={
            shouldReduceMotion
              ? {}
              : { filter: hovered ? 'brightness(1.2)' : 'brightness(1)' }
          }
          transition={shouldReduceMotion ? { duration: 0 } : TRANSITIONS.fast}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            color: TEAL,
          }}
        >
          Read teardown →
        </motion.span>

        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: 'var(--color-text-hint)',
            backgroundColor: 'rgba(255,255,255,0.04)',
            border: '0.5px solid var(--color-border-subtle)',
            padding: '3px 10px',
            borderRadius: '999px',
          }}
        >
          {teardown.observationCount} observations
        </span>
      </div>
    </motion.div>
  )
}

// ── Main section ──────────────────────────────────────────────
const ProductTeardown: React.FC = () => {
  const [selectedTeardown, setSelectedTeardown] = useState<TeardownData | null>(null)
  const shouldReduceMotion = useReducedMotion()
  const viewportConfig = { once: true, margin: '-60px' }

  React.useEffect(() => {
    const handleCloseOverlay = () => {
      setSelectedTeardown(null)
    }
    window.addEventListener('close-project-overlay', handleCloseOverlay)
    return () => {
      window.removeEventListener('close-project-overlay', handleCloseOverlay)
    }
  }, [])

  return (
    <>
      {/* Teardown overlay — rendered outside normal flow */}
      <TeardownOverlay
        teardown={selectedTeardown}
        onClose={() => setSelectedTeardown(null)}
      />

      <section
        style={{
          paddingTop: '120px',
          paddingBottom: '120px',
          backgroundColor: 'rgba(10, 10, 15, 0.75)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Parallax glow background layer */}
        <ParallaxGlow color="rgba(45,212,168,0.05)" position="top-right" speed={0.2} />

        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0 24px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* ── Section header ─────────────────────────── */}
          <div style={{ marginBottom: '72px' }}>

            {/* Overline label — teal accent */}
            <motion.div
              initial={shouldReduceMotion ? {} : 'hidden'}
              whileInView="visible"
              viewport={viewportConfig}
              variants={VARIANTS.sectionEntry}
              transition={{ ...TRANSITIONS.slow, delay: 0 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '24px',
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '1px',
                  backgroundColor: TEAL,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-hint)',
                }}
              >
                teardown
              </span>
            </motion.div>

            {/* Two-line heading */}
            <motion.h2
              initial={shouldReduceMotion ? {} : 'hidden'}
              whileInView="visible"
              viewport={viewportConfig}
              variants={VARIANTS.sectionEntry}
              transition={{ ...TRANSITIONS.slow, delay: 0.1 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(32px, 5vw, 56px)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'var(--color-text-primary)',
                margin: 0,
              }}
            >
              Products I didn't build.
            </motion.h2>
            <motion.h2
              initial={shouldReduceMotion ? {} : 'hidden'}
              whileInView="visible"
              viewport={viewportConfig}
              variants={VARIANTS.sectionEntry}
              transition={{ ...TRANSITIONS.slow, delay: 0.2 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(32px, 5vw, 56px)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'var(--color-text-secondary)',
                margin: 0,
              }}
            >
              But wish I had.
            </motion.h2>

            {/* Sub-paragraph */}
            <motion.p
              initial={shouldReduceMotion ? {} : 'hidden'}
              whileInView="visible"
              viewport={viewportConfig}
              variants={VARIANTS.sectionEntry}
              transition={{ ...TRANSITIONS.slow, delay: 0.35 }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '20px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.7,
                maxWidth: '500px',
                marginTop: '24px',
                marginBottom: 0,
              }}
            >
              I take products apart to understand why they work. Not to copy them — to learn what decisions look like when they're made well.
            </motion.p>
          </div>

          {/* ── Cards grid ─────────────────────────────── */}
          <motion.div
            initial={shouldReduceMotion ? {} : 'hidden'}
            whileInView="visible"
            viewport={viewportConfig}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              gap: '20px',
            }}
          >
            {TEARDOWNS.map((teardown) => (
              <div key={teardown.id} style={{ maxWidth: '480px', width: '100%' }}>
                <TeardownCard
                  teardown={teardown}
                  onClick={() => setSelectedTeardown(teardown)}
                  shouldReduceMotion={shouldReduceMotion}
                />
              </div>
            ))}
          </motion.div>


          {/* ── Section footer ─────────────────────────── */}
          <motion.div
            initial={shouldReduceMotion ? {} : 'hidden'}
            whileInView="visible"
            viewport={viewportConfig}
            variants={VARIANTS.fadeUp}
            transition={{ ...TRANSITIONS.slow, delay: 0.1 }}
            style={{
              marginTop: '80px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '18px',
                color: 'var(--color-text-secondary)',
                margin: 0,
              }}
            >
              More teardowns coming.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <PulsingDots shouldReduceMotion={shouldReduceMotion} />
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '17px',
                  color: 'var(--color-text-hint)',
                  margin: 0,
                }}
              >
                LinkedIn · Duolingo · Swiggy · in progress
              </p>
            </div>
          </motion.div>

          {/* ── Bottom connector ───────────────────────── */}
          <motion.div
            initial={shouldReduceMotion ? {} : 'hidden'}
            whileInView="visible"
            viewport={viewportConfig}
            variants={VARIANTS.fadeUp}
            transition={{ ...TRANSITIONS.slow, delay: 0.3 }}
            style={{
              marginTop: '80px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '18px',
                color: 'var(--color-text-secondary)',
                textAlign: 'center',
                margin: 0,
              }}
            >
              Want to see where I've been and where I'm going?
            </p>

            <motion.button
              id="connector-timeline-cta"
              onClick={() => scrollTo('#timeline')}
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      backgroundColor: 'rgba(45,212,168,0.08)',
                      borderColor: 'rgba(45,212,168,0.5)',
                    }
              }
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              transition={TRANSITIONS.fast}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '18px',
                color: 'var(--color-text-primary)',
                backgroundColor: 'transparent',
                padding: '12px 28px',
                borderRadius: '8px',
                border: '1px solid var(--color-border-default)',
                cursor: 'pointer',
              }}
            >
              See my journey →
            </motion.button>
          </motion.div>
        </div>

      </section>
    </>
  )
}

export default ProductTeardown
