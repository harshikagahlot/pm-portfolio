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

            {/* Section 2 — The problem */}
            <ContentSection delay={0.45} shouldReduceMotion={shouldReduceMotion}>
              <div style={{ marginBottom: '56px' }}>
                <SectionLabel text="The problem" accent={project.accent} />
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '17px',
                    color: 'var(--color-text-primary)',
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  {project.caseStudy.problem}
                </p>
              </div>
            </ContentSection>

            {/* Section 3 — How I thought about it */}
            <ContentSection delay={0.55} shouldReduceMotion={shouldReduceMotion}>
              <div style={{ marginBottom: '56px' }}>
                <SectionLabel text="How I thought about it" accent={project.accent} />
                {project.caseStudy.thinking.map((paragraph, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '16px',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.75,
                      margin: 0,
                      marginBottom: i < project.caseStudy.thinking.length - 1 ? '24px' : 0,
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </ContentSection>

            {/* Section 4 — Key decisions */}
            <ContentSection delay={0.65} shouldReduceMotion={shouldReduceMotion}>
              <div style={{ marginBottom: '56px' }}>
                <SectionLabel text="Key decisions" accent={project.accent} />
                {project.caseStudy.decisions.map((decision, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: 'var(--color-bg-card)',
                      border: '0.5px solid var(--color-border-subtle)',
                      borderRadius: '12px',
                      padding: '24px',
                      marginBottom: i < project.caseStudy.decisions.length - 1 ? '16px' : 0,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '17px',
                        fontWeight: 700,
                        color: 'var(--color-text-primary)',
                        margin: 0,
                      }}
                    >
                      {decision.title}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '15px',
                        color: 'var(--color-text-secondary)',
                        lineHeight: 1.65,
                        marginTop: '8px',
                        marginBottom: 0,
                      }}
                    >
                      {decision.body}
                    </p>
                  </div>
                ))}
              </div>
            </ContentSection>

            {/* Section 5 — Outcome */}
            <ContentSection delay={0.75} shouldReduceMotion={shouldReduceMotion}>
              <div style={{ marginBottom: '56px' }}>
                <SectionLabel text="What happened" accent={project.accent} />
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '17px',
                    color: 'var(--color-text-primary)',
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  {project.caseStudy.outcome}
                </p>
              </div>
            </ContentSection>

            {/* Section 6 — Lessons learned */}
            <ContentSection delay={0.85} shouldReduceMotion={shouldReduceMotion}>
              <div>
                <SectionLabel text="What I'd tell myself" accent={project.accent} />
                <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {project.caseStudy.lessonsLearned.map((lesson, i) => (
                    <li
                      key={i}
                      style={{
                        display: 'flex',
                        gap: '16px',
                        alignItems: 'flex-start',
                        marginBottom: i < project.caseStudy.lessonsLearned.length - 1 ? '12px' : 0,
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
                          margin: 0,
                        }}
                      >
                        {lesson}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </ContentSection>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CaseStudyOverlay
