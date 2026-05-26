import React, { useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { TRANSITIONS, VARIANTS } from '../lib/motion'
import type { TeardownData } from '../data/teardowns'

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
      fontSize: '12px',
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

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = teardown ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [teardown])

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
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '26px',
                    fontWeight: 800,
                    color: teardown.logoColor === '#ffffff' ? '#0a0a0f' : '#ffffff',
                    lineHeight: 1,
                  }}
                >
                  {teardown.name[0]}
                </span>
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
                  fontSize: '15px',
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
                  fontSize: '18px',
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
                  fontSize: '15px',
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
                          fontSize: '11px',
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
                          fontSize: '17px',
                          fontWeight: 700,
                          color: 'var(--color-text-primary)',
                          margin: '0 0 8px',
                        }}
                      >
                        {ann.title}
                      </p>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '15px',
                          color: 'var(--color-text-primary)',
                          lineHeight: 1.7,
                          margin: '0 0 12px',
                        }}
                      >
                        {ann.observation}
                      </p>
                      {/* Principle blockquote */}
                      <blockquote
                        style={{
                          margin: 0,
                          paddingLeft: '14px',
                          borderLeft: `2px solid rgba(45,212,168,0.4)`,
                          fontFamily: 'var(--font-body)',
                          fontSize: '14px',
                          fontStyle: 'italic',
                          color: 'var(--color-text-secondary)',
                          lineHeight: 1.65,
                        }}
                      >
                        {ann.principle}
                      </blockquote>
                    </div>
                  </div>
                ))}
              </div>
            </ContentSection>

            {/* Section 3 — The big idea */}
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
                      fontSize: '16px',
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
                    fontSize: '15px',
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
