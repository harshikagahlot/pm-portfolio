import React, { useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { TRANSITIONS, VARIANTS } from '../lib/motion'
import type { Project } from '../data/projects'

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

// ── Section label used throughout the overlay ────────────────
const SectionLabel: React.FC<{ text: string; accent: string }> = ({ text, accent }) => (
  <p
    style={{
      fontFamily: 'var(--font-body)',
      fontSize: '12px',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: accent,
      marginBottom: '12px',
      marginTop: 0,
    }}
  >
    {text}
  </p>
)

// ── Animated content section wrapper ────────────────────────
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

// ── Main overlay component ────────────────────────────────────

interface CaseStudyOverlayProps {
  project: Project | null
  onClose: () => void
}

const CaseStudyOverlay: React.FC<CaseStudyOverlayProps> = ({ project, onClose }) => {
  const shouldReduceMotion = useReducedMotion()

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [project])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (project) {
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key={project.id}
          initial={shouldReduceMotion ? {} : { y: '100%', opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          exit={shouldReduceMotion ? {} : { y: '100%', opacity: 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }
          }
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} case study`}
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
            aria-label="Close case study"
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
              maxWidth: '720px',
              margin: '0 auto',
              padding: '0 24px',
            }}
          >
            {/* Section 1 — Project header */}
            <ContentSection delay={0.35} shouldReduceMotion={shouldReduceMotion}>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'var(--color-text-hint)',
                  marginBottom: '12px',
                  marginTop: 0,
                }}
              >
                {project.number}
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(32px, 6vw, 52px)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  color: 'var(--color-text-primary)',
                  margin: 0,
                }}
              >
                {project.name}
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '18px',
                  color: 'var(--color-text-secondary)',
                  marginTop: '8px',
                  marginBottom: 0,
                }}
              >
                {project.tagline}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: 'var(--color-text-hint)',
                  marginTop: '16px',
                  marginBottom: 0,
                }}
              >
                {project.caseStudy.role} &nbsp;·&nbsp; {project.caseStudy.duration}
              </p>

              {/* Optional Links */}
              {(project.githubLink || project.liveLink) && (
                <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                  {project.liveLink && (
                    <motion.a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={shouldReduceMotion ? {} : { scale: 1.02, backgroundColor: project.accent, color: '#ffffff' }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#0d0d14',
                        backgroundColor: '#f0eff8',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        transition: 'background-color 0.2s ease, color 0.2s ease',
                      }}
                    >
                      Live Project ↗
                    </motion.a>
                  )}
                  {project.githubLink && (
                    <motion.a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={shouldReduceMotion ? {} : { scale: 1.02, borderColor: project.accent, color: project.accent }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#f0eff8',
                        border: '1px solid var(--color-border-default)',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        transition: 'border-color 0.2s ease, color 0.2s ease',
                      }}
                    >
                      GitHub ↗
                    </motion.a>
                  )}
                </div>
              )}

              {/* Divider */}
              <div
                style={{
                  height: '1px',
                  backgroundColor: 'var(--color-border-subtle)',
                  marginTop: '32px',
                  marginBottom: '48px',
                }}
              />

            </ContentSection>

            {/* Section 2 — What I Built */}
            <ContentSection delay={0.45} shouldReduceMotion={shouldReduceMotion}>
              <div style={{ marginBottom: '56px' }}>
                <SectionLabel text="What I Built" accent={project.accent} />
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '17px',
                    color: 'var(--color-text-primary)',
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  {project.caseStudy.whatIBuilt}
                </p>
              </div>
            </ContentSection>

            {/* Section 3 — Why */}
            <ContentSection delay={0.55} shouldReduceMotion={shouldReduceMotion}>
              <div style={{ marginBottom: '56px' }}>
                <SectionLabel text="Why" accent={project.accent} />
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '16px',
                    color: 'var(--color-text-primary)',
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  {project.caseStudy.why}
                </p>
              </div>
            </ContentSection>

            {/* Section 4 — What Surprised Me */}
            <ContentSection delay={0.65} shouldReduceMotion={shouldReduceMotion}>
              <div style={{ marginBottom: '56px' }}>
                <SectionLabel text="What Surprised Me" accent={project.accent} />
                {project.caseStudy.whatSurprisedMe.map((surprise, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '15px',
                      color: 'var(--color-text-primary)',
                      lineHeight: 1.7,
                      margin: 0,
                      marginBottom: i < project.caseStudy.whatSurprisedMe.length - 1 ? '16px' : 0,
                    }}
                  >
                    💡 &nbsp; {surprise}
                  </p>
                ))}
              </div>
            </ContentSection>

            {/* Section 5 — One Thing I'd Change */}
            <ContentSection delay={0.75} shouldReduceMotion={shouldReduceMotion}>
              <div style={{ marginBottom: '56px' }}>
                <SectionLabel text="One Thing I'd Change" accent={project.accent} />
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {project.caseStudy.oneThingIWouldChange}
                </p>
              </div>
            </ContentSection>

            {/* Section 6 — What Users Said */}
            <ContentSection delay={0.85} shouldReduceMotion={shouldReduceMotion}>
              <div>
                <SectionLabel text="What Users Said" accent={project.accent} />
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {project.caseStudy.whatUsersSaid.map((quote, i) => (
                    <li
                      key={i}
                      style={{
                        display: 'flex',
                        gap: '16px',
                        alignItems: 'flex-start',
                        marginBottom: i < project.caseStudy.whatUsersSaid.length - 1 ? '12px' : 0,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '12px',
                          color: project.accent,
                          flexShrink: 0,
                          marginTop: '3px',
                          minWidth: '20px',
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '15px',
                          color: 'var(--color-text-secondary)',
                          lineHeight: 1.65,
                          fontStyle: 'italic',
                          margin: 0,
                        }}
                      >
                        {quote}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </ContentSection>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CaseStudyOverlay
