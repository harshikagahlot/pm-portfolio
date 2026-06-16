import React, { useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { TRANSITIONS, VARIANTS } from '../lib/motion'
import type { TeardownData } from '../data/teardowns'
import { lenis } from '../lib/smoothScroll'
import duolingoLogo from '../assets/duolingo-logo.png'
import duolingoMap from '../assets/duolingo-map.jpg'
import duolingoStreak from '../assets/duolingo-streak.jpg'
import duolingoLeaderboard from '../assets/duolingo-leaderboard.jpg'
import duolingoNotification from '../assets/duolingo-notification.jpg'
import blinkitLogo from '../assets/blinkit-logo.png'
import blinkitCheckoutInstructions from '../assets/blinkit-checkout-instructions.jpg'
import blinkitCheckoutThreshold from '../assets/blinkit-checkout-threshold.jpg'
import blinkitOrderAgain from '../assets/blinkit-order-again.jpg'
import blinkitPrintStore from '../assets/blinkit-print-store.jpg'
import spotifyLogo from '../assets/spotify-logo.jpg'
import spotifyHomepage from '../assets/spotify-homepage.jpg'
import spotifySearch from '../assets/spotify-search.jpg'
import spotifyWrapped from '../assets/spotify-wrapped.jpg'
import spotifyLibrary from '../assets/spotify-library.jpg'
import earbudsLogos from '../assets/boat-noise-boult-logos.jpg'
import instagramLogo from '../assets/instagram-logo.jpg'

// ── Image map for teardown annotations ───────────────────────
const ANNOTATION_IMAGES: Record<string, Record<number, string>> = {
  duolingo: {
    1: duolingoStreak,
    3: duolingoMap,
    5: duolingoLeaderboard,
    6: duolingoNotification,
  },
  blinkit: {
    2: blinkitOrderAgain,
    4: blinkitCheckoutThreshold,
    7: blinkitPrintStore,
    8: blinkitCheckoutInstructions,
  },
  spotify: {
    2: spotifyHomepage,
    5: spotifySearch,
    7: spotifyLibrary,
    8: spotifyWrapped,
  },
  'earbuds-comparison': {
    2: earbudsLogos,
  }
}

// ── Logo image map for teardown headers ──────────────────────
const TEARDOWN_LOGOS: Record<string, string> = {
  duolingo: duolingoLogo,
  blinkit: blinkitLogo,
  spotify: spotifyLogo,
  'earbuds-comparison': earbudsLogos,
  'instagram-stories': instagramLogo,
}

// ── Shared accent ─────────────────────────────────────────────
const TEAL = '#2dd4a8'

// ── Close icon ───────────────────────────────────────────────
const CloseIcon: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12 4L4 12M4 4L12 12"
      stroke="var(--color-text-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

// ── Section label ─────────────────────────────────────────────
const SectionLabel: React.FC<{ text: string }> = ({ text }) => (
  <p
    style={{
      fontFamily: 'var(--font-body)',
      fontSize: '15px',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: TEAL,
      marginBottom: '16px',
      marginTop: 0,
    }}
  >
    {text}
  </p>
)

// ── Animated content section wrapper ─────────────────────────
const ContentSection: React.FC<{
  children: React.ReactNode
  delay: number
  shouldReduceMotion: boolean | null
}> = ({ children, delay, shouldReduceMotion }) => (
  <motion.div
    variants={VARIANTS.fadeUp}
    initial={shouldReduceMotion ? {} : 'hidden'}
    animate="visible"
    transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITIONS.base, delay }}
  >
    {children}
  </motion.div>
)

// ── Props ─────────────────────────────────────────────────────
interface TeardownOverlayProps {
  teardown: TeardownData | null
  onClose: () => void
}

// ── Main overlay ──────────────────────────────────────────────
const TeardownOverlay: React.FC<TeardownOverlayProps> = ({ teardown, onClose }) => {
  const shouldReduceMotion = useReducedMotion()

  // Lock body scroll and handle history state for back button navigation
  useEffect(() => {
    if (teardown) {
      document.body.style.overflow = 'hidden'
      lenis?.stop() // Stop Lenis smooth scroll on body
      
      // Push state for back button handling
      window.history.pushState({ overlay: `teardown-${teardown.id}` }, '')

      const handlePopState = () => {
        onClose()
      }

      window.addEventListener('popstate', handlePopState)
      return () => {
        window.removeEventListener('popstate', handlePopState)
        lenis?.start() // Resume Lenis on close
        // If closed manually (e.g. X button), pop history state
        if (window.history.state && window.history.state.overlay === `teardown-${teardown.id}`) {
          window.history.back()
        }
      }
    } else {
      document.body.style.overflow = ''
      lenis?.start()
    }
    return () => {
      document.body.style.overflow = ''
      lenis?.start()
    }
  }, [teardown, onClose])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (teardown) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [teardown, onClose])

  return (
    <AnimatePresence>
      {teardown && (
        <motion.div
          key={teardown.id}
          data-lenis-prevent
          initial={shouldReduceMotion ? {} : { y: '100%', opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          exit={shouldReduceMotion ? {} : { y: '100%', opacity: 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
          }
          role="dialog"
          aria-modal="true"
          aria-label={`${teardown.name} teardown`}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#0d0d14',
            zIndex: 50,
            overflowY: 'auto',
            paddingTop: '80px',
            paddingBottom: '120px',
          }}
        >
          {/* ── Close button ─────────────────────────────── */}
          <motion.button
            onClick={onClose}
            whileHover={shouldReduceMotion ? {} : { backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.92 }}
            transition={TRANSITIONS.fast}
            aria-label="Close teardown"
            style={{
              position: 'fixed',
              top: '24px',
              right: '24px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.06)',
              border: '0.5px solid var(--color-border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 51,
            }}
          >
            <CloseIcon />
          </motion.button>

          {/* ── Content ─────────────────────────────────── */}
          <div
            style={{
              maxWidth: '760px',
              margin: '0 auto',
              padding: '0 24px',
            }}
          >
            {/* Section 1 — Header */}
            <ContentSection delay={0.35} shouldReduceMotion={shouldReduceMotion}>
              {/* Logo square */}
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  backgroundColor: teardown.logoColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  overflow: 'hidden',
                }}
              >
                {TEARDOWN_LOGOS[teardown.id] ? (
                  <img
                    src={TEARDOWN_LOGOS[teardown.id]}
                    alt={`${teardown.name} logo`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '29px',
                      fontWeight: 800,
                      color: teardown.logoColor === '#ffffff' ? '#0a0a0f' : '#ffffff',
                      lineHeight: 1,
                    }}
                  >
                    {teardown.name[0]}
                  </span>
                )}
              </div>

              {/* Name */}
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(32px, 6vw, 52px)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  color: 'var(--color-text-primary)',
                  margin: '16px 0 0',
                }}
              >
                {teardown.name}
              </h2>

              {/* Category */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '18px',
                  color: 'var(--color-text-hint)',
                  marginTop: '6px',
                  marginBottom: 0,
                }}
              >
                {teardown.category}
              </p>

              {/* Hook */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '21px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.7,
                  marginTop: '20px',
                  marginBottom: 0,
                  maxWidth: '600px',
                }}
              >
                {teardown.fullTeardown.hook}
              </p>

              {/* Context */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '18px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.7,
                  marginTop: '12px',
                  marginBottom: 0,
                }}
              >
                {teardown.fullTeardown.context}
              </p>

              {/* Divider */}
              <div
                style={{
                  height: '1px',
                  backgroundColor: 'var(--color-border-subtle)',
                  marginTop: '36px',
                  marginBottom: '52px',
                }}
              />
            </ContentSection>

            {/* Section 2 — Annotated observations */}
            <ContentSection delay={0.45} shouldReduceMotion={shouldReduceMotion}>
              <div style={{ marginBottom: '56px' }}>
                <SectionLabel text="Observations" />

                {teardown.fullTeardown.annotations.map((ann) => (
                  <div
                    key={ann.id}
                    style={{
                      display: 'flex',
                      gap: '20px',
                      alignItems: 'flex-start',
                      marginBottom: '40px',
                    }}
                  >
                    {/* Marker circle */}
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(45,212,168,0.12)',
                        border: `0.5px solid rgba(45,212,168,0.3)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '14px',
                          color: TEAL,
                          lineHeight: 1,
                        }}
                      >
                        {ann.marker}
                      </span>
                    </div>

                    {/* Observation content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '20px',
                          fontWeight: 700,
                          color: 'var(--color-text-primary)',
                          margin: '0 0 12px',
                        }}
                      >
                        {ann.title}
                      </p>

                      {/* Observation screenshot image if available */}
                      {ANNOTATION_IMAGES[teardown.id]?.[ann.id] && (
                        <div
                          style={{
                            marginBottom: '16px',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            border: '0.5px solid rgba(255,255,255,0.08)',
                            maxHeight: '280px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(255,255,255,0.02)',
                          }}
                        >
                          <img
                            src={ANNOTATION_IMAGES[teardown.id][ann.id]}
                            alt={ann.title}
                            style={{
                              width: '100%',
                              maxHeight: '280px',
                              objectFit: 'contain',
                              display: 'block',
                            }}
                          />
                        </div>
                      )}
                      
                      {/* Observation */}
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '18px',
                          color: 'var(--color-text-primary)',
                          lineHeight: 1.7,
                          margin: '0 0 12px',
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {ann.whyItMatters ? <strong>My Observation: </strong> : null}{ann.observation}
                      </p>

                      {/* Why it matters */}
                      {ann.whyItMatters && (
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '18px',
                            color: 'var(--color-text-primary)',
                            lineHeight: 1.7,
                            margin: '0 0 16px',
                          }}
                        >
                          <strong>Why It Matters:</strong> {ann.whyItMatters}
                        </p>
                      )}

                      {/* How I'd Test This */}
                      {ann.howIdTestThis && (
                        <blockquote
                          style={{
                            margin: 0,
                            paddingLeft: '14px',
                            borderLeft: `2px solid rgba(45,212,168,0.4)`,
                            fontFamily: 'var(--font-body)',
                            fontSize: '17px',
                            fontStyle: 'italic',
                            color: 'var(--color-text-secondary)',
                            lineHeight: 1.65,
                          }}
                        >
                          <strong>How I'd Test This:</strong> {ann.howIdTestThis}
                        </blockquote>
                      )}

                    </div>
                  </div>
                ))}
              </div>
            </ContentSection>

            {/* Section 2b — Comparison Table (for multi-brand teardowns) */}
            {teardown.fullTeardown.comparisonTable && (
              <ContentSection delay={0.5} shouldReduceMotion={shouldReduceMotion}>
                <div style={{ marginBottom: '48px' }}>
                  <SectionLabel text="Brand vs Core Emotion" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px' }}>
                    {teardown.fullTeardown.comparisonTable.map((row) => (
                      <div
                        key={row.brand}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '20px',
                          backgroundColor: 'rgba(255,255,255,0.03)',
                          border: `0.5px solid ${row.accentColor}33`,
                          borderRadius: '10px',
                          padding: '16px 20px',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '15px',
                            fontWeight: 700,
                            color: row.accentColor,
                            minWidth: '80px',
                          }}
                        >
                          {row.brand}
                        </span>
                        <div style={{ width: '1px', height: '24px', backgroundColor: `${row.accentColor}40` }} />
                        <span
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '17px',
                            color: 'var(--color-text-primary)',
                          }}
                        >
                          {row.coreEmotion}
                        </span>
                      </div>
                    ))}
                  </div>

                  {teardown.fullTeardown.positioningCards && (
                    <>
                      <SectionLabel text="Brand Positioning" />
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                        {teardown.fullTeardown.positioningCards.map((card) => (
                          <div
                            key={card.brand}
                            style={{
                              backgroundColor: `${card.accentColor}0d`,
                              border: `1px solid ${card.accentColor}40`,
                              borderRadius: '12px',
                              padding: '20px 18px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '8px',
                            }}
                          >
                            <span
                              style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '13px',
                                fontWeight: 700,
                                color: card.accentColor,
                                textTransform: 'uppercase' as const,
                                letterSpacing: '0.08em',
                              }}
                            >
                              {card.brand}
                            </span>
                            <span
                              style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '18px',
                                fontWeight: 700,
                                color: 'var(--color-text-primary)',
                              }}
                            >
                              {card.label}
                            </span>
                            <span
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '15px',
                                color: 'var(--color-text-secondary)',
                                lineHeight: 1.6,
                              }}
                            >
                              {card.description}
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </ContentSection>
            )}

            <ContentSection delay={0.55} shouldReduceMotion={shouldReduceMotion}>
              <div style={{ marginBottom: '48px' }}>
                <SectionLabel text="The big idea" />
                <div
                  style={{
                    backgroundColor: 'rgba(45,212,168,0.04)',
                    border: '0.5px solid rgba(45,212,168,0.15)',
                    borderRadius: '12px',
                    padding: '24px 28px',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '19px',
                      color: 'var(--color-text-primary)',
                      lineHeight: 1.75,
                      fontStyle: 'italic',
                      margin: 0,
                    }}
                  >
                    {teardown.fullTeardown.bigIdea}
                  </p>
                </div>
              </div>
            </ContentSection>

            {/* Section 4 — What I'd change */}
            <ContentSection delay={0.65} shouldReduceMotion={shouldReduceMotion}>
              <div>
                <SectionLabel text="What I'd change" />
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '18px',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {teardown.fullTeardown.whatIWouldChange}
                </p>
              </div>
            </ContentSection>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default TeardownOverlay
