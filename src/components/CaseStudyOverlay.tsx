import React, { useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { TRANSITIONS, VARIANTS } from '../lib/motion'
import type { Project } from '../data/projects'
import { lenis } from '../lib/smoothScroll'

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

  // Lock body scroll and handle history state for back button navigation
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden'
      lenis?.stop() // Stop Lenis smooth scroll on body
      
      // Push state for back button handling
      window.history.pushState({ overlay: `project-${project.id}` }, '')

      const handlePopState = () => {
        onClose()
      }

      window.addEventListener('popstate', handlePopState)
      return () => {
        window.removeEventListener('popstate', handlePopState)
        lenis?.start() // Resume Lenis on overlay close
        // If closed manually (e.g. X button), pop the history state
        if (window.history.state && window.history.state.overlay === `project-${project.id}`) {
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
  }, [project, onClose])

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
          data-lenis-prevent
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

            {project.id === 'accredian-orbit' ? (
              <>
                <style>{`
                  @media (max-width: 600px) {
                    .pm-grid-2 {
                      grid-template-columns: 1fr !important;
                    }
                  }
                `}</style>

                {/* ── PM Exploration Overview ── */}
                <ContentSection delay={0.45} shouldReduceMotion={shouldReduceMotion}>
                  <div style={{ marginBottom: '56px' }}>
                    <SectionLabel text="Learning Product Thinking Through Structured Exploration" accent={project.accent} />
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '17px',
                        color: 'var(--color-text-primary)',
                        lineHeight: 1.75,
                        margin: 0,
                      }}
                    >
                      Online learning platforms are highly fragmented; students constantly switch between separate discussion boards, learning portals, and tracking sheets. As a PM systems exercise, I explored designing a unified workspace called <strong>Accredian Orbit</strong> to bridge these gaps, focusing on reducing learning friction and building social accountability.
                    </p>
                  </div>
                </ContentSection>

                {/* ── Problem & Solution Flow ── */}
                <ContentSection delay={0.5} shouldReduceMotion={shouldReduceMotion}>
                  <div style={{ marginBottom: '56px' }}>
                    <SectionLabel text="Problem → Solution Flow" accent={project.accent} />
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '20px',
                        marginTop: '16px',
                      }}
                      className="pm-grid-2"
                    >
                      <div
                        style={{
                          backgroundColor: 'rgba(244,124,90,0.02)',
                          border: '0.5px solid rgba(244,124,90,0.15)',
                          borderRadius: '12px',
                          padding: '20px',
                        }}
                      >
                        <p style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, color: 'var(--color-accent-coral)', margin: '0 0 12px' }}>
                          User Pain Points
                        </p>
                        <ul style={{ paddingLeft: '18px', margin: 0, fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
                          <li style={{ marginBottom: '8px' }}><strong>Fragmentation:</strong> Tab overload checking assignments, grades, and community threads.</li>
                          <li style={{ marginBottom: '8px' }}><strong>Isolation:</strong> High drop-out rates due to self-paced fatigue and lack of peer pressure.</li>
                          <li><strong>Friction:</strong> Complex onboarding paths that defer actual learning.</li>
                        </ul>
                      </div>
                      <div
                        style={{
                          backgroundColor: 'rgba(45,212,168,0.02)',
                          border: '0.5px solid rgba(45,212,168,0.15)',
                          borderRadius: '12px',
                          padding: '20px',
                        }}
                      >
                        <p style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, color: 'var(--color-accent-teal)', margin: '0 0 12px' }}>
                          Ecosystem Solution
                        </p>
                        <ul style={{ paddingLeft: '18px', margin: 0, fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
                          <li style={{ marginBottom: '8px' }}><strong>Unified Feed:</strong> One dashboard consolidating class schedules, submissions, and feedback.</li>
                          <li style={{ marginBottom: '8px' }}><strong>Accountability Lobbies:</strong> Quiet coworking circles syncing progress in real time.</li>
                          <li><strong>3-Step Onboarding:</strong> Goal capture to customized workspace setup in under 90 seconds.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </ContentSection>

                {/* ── Student Segmentation ── */}
                <ContentSection delay={0.55} shouldReduceMotion={shouldReduceMotion}>
                  <div style={{ marginBottom: '56px' }}>
                    <SectionLabel text="Student Segmentation" accent={project.accent} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '16px' }} className="pm-grid-2">
                      <div style={{ backgroundColor: 'var(--color-bg-card)', border: '0.5px solid var(--color-border-subtle)', borderRadius: '12px', padding: '20px' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-text-hint)', textTransform: 'uppercase' }}>Segment A</span>
                        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, margin: '4px 0 8px', color: 'var(--color-text-primary)' }}>The Guided Switcher</h4>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>
                          Upskilling for a career change. Needs step-by-step roadmap clarity, explicit milestones, progress visualizations, and structural accountability hooks.
                        </p>
                      </div>
                      <div style={{ backgroundColor: 'var(--color-bg-card)', border: '0.5px solid var(--color-border-subtle)', borderRadius: '12px', padding: '20px' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-text-hint)', textTransform: 'uppercase' }}>Segment B</span>
                        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, margin: '4px 0 8px', color: 'var(--color-text-primary)' }}>The Swift Upskiller</h4>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>
                          Actively working, short on time. Needs frictionless dashboards, high-flexibility shortcuts, keyboard navigations, and third-party calendar syncs.
                        </p>
                      </div>
                    </div>
                  </div>
                </ContentSection>

                {/* ── Key Decisions & Tradeoffs ── */}
                <ContentSection delay={0.6} shouldReduceMotion={shouldReduceMotion}>
                  <div style={{ marginBottom: '56px' }}>
                    <SectionLabel text="Key Decisions & Tradeoffs" accent={project.accent} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
                      <div style={{ borderLeft: `2px solid ${project.accent}`, paddingLeft: '16px' }}>
                        <p style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 6px' }}>
                          Central Notification Center vs. Gamified Forum
                        </p>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>
                          <strong>Decision:</strong> Centralized notifications first. <em>Tradeoff:</em> Delayed gamified leaderboards to prioritize relieving daily schedule anxiety for busy students.
                        </p>
                      </div>
                      <div style={{ borderLeft: `2px solid ${project.accent}`, paddingLeft: '16px' }}>
                        <p style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 6px' }}>
                          Coworking study lobbies vs. Open message boards
                        </p>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>
                          <strong>Decision:</strong> Accountability cowriting hubs. <em>Tradeoff:</em> Deferring open chat boards to emphasize quiet, structured peer-study intervals, minimizing social distractions.
                        </p>
                      </div>
                    </div>
                  </div>
                </ContentSection>

                {/* ── Wireframe Preview (Dashboard CSS Mockup) ── */}
                <ContentSection delay={0.65} shouldReduceMotion={shouldReduceMotion}>
                  <div style={{ marginBottom: '56px' }}>
                    <SectionLabel text="Interactive CSS Wireframe Preview" accent={project.accent} />
                    <div
                      style={{
                        width: '100%',
                        borderRadius: '12px',
                        backgroundColor: '#12121e',
                        border: '0.5px solid var(--color-border-subtle)',
                        padding: '16px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: 'var(--color-text-secondary)',
                        overflowX: 'auto',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
                      }}
                    >
                      <div style={{ minWidth: '580px' }}>
                        {/* Title bar */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '10px', marginBottom: '12px' }}>
                          <span style={{ color: 'var(--color-text-primary)', fontWeight: 'bold' }}>ORBIT_DASHBOARD // Wireframe v0.1</span>
                          <span style={{ color: project.accent }}>[Active Session]</span>
                        </div>
                        {/* Inside grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr 140px', gap: '12px' }}>
                          {/* Sidebar */}
                          <div style={{ borderRight: '1px solid rgba(255,255,255,0.06)', paddingRight: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ color: 'var(--color-text-hint)' }}>[NAVIGATION]</div>
                            <div style={{ color: project.accent }}>+ Dashboard</div>
                            <div>+ Study Lobbies</div>
                            <div>+ Assignments</div>
                            <div>+ Connections</div>
                          </div>
                          {/* Main Panel */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '0.5px dashed rgba(255,255,255,0.15)', borderRadius: '6px', padding: '10px' }}>
                              <div style={{ color: 'var(--color-text-primary)', fontWeight: 'bold', marginBottom: '4px' }}>COHORT PROGRESS</div>
                              <div>[====================] 85% Course Completed</div>
                            </div>
                            <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '0.5px dashed rgba(255,255,255,0.15)', borderRadius: '6px', padding: '10px' }}>
                              <div style={{ color: 'var(--color-text-primary)', fontWeight: 'bold', marginBottom: '4px' }}>CENTRALIZED ASSIGNMENT LIST</div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                                <span>- User Journey Mapping</span>
                                <span style={{ color: 'var(--color-accent-coral)' }}>[Due Tomorrow]</span>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>- Dashboard Wireframes</span>
                                <span style={{ color: project.accent }}>[In Progress]</span>
                              </div>
                            </div>
                          </div>
                          {/* Right Panel */}
                          <div style={{ paddingLeft: '8px', display: 'flex', flexDirection: 'column', gap: '8px', borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
                            <div style={{ color: 'var(--color-text-hint)' }}>[LOBBY ACTIVE]</div>
                            <div style={{ backgroundColor: 'rgba(45,212,168,0.08)', borderRadius: '4px', padding: '4px 6px', color: 'var(--color-accent-teal)' }}>
                              Lobby #3: Cowork
                              <br />
                              (4 online)
                            </div>
                            <div style={{ fontSize: '10px' }}>
                              - Harshika G.<br />
                              - Rohan S.<br />
                              - Priya M.<br />
                              - Dev K.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ContentSection>

                {/* ── PM Extra CTAs ── */}
                <ContentSection delay={0.7} shouldReduceMotion={shouldReduceMotion}>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '12px', flexWrap: 'wrap' }}>
                    <motion.a
                      href="https://drive.google.com/file/d/1DxkSeoQFBCydJ-pck48nSOvaIOh40Iev/view?usp=drivesdk"
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
                        padding: '12px 24px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        transition: 'background-color 0.2s ease, color 0.2s ease',
                      }}
                    >
                      View Full Case Study ↗
                    </motion.a>
                    <motion.a
                      href="https://drive.google.com/file/d/1DxkSeoQFBCydJ-pck48nSOvaIOh40Iev/view?usp=drivesdk"
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
                        padding: '12px 24px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        transition: 'border-color 0.2s ease, color 0.2s ease',
                      }}
                    >
                      View Wireframes ↗
                    </motion.a>
                  </div>
                </ContentSection>

                {/* Bottom Spacer to prevent cutoff at downside */}
                <div style={{ height: '100px', width: '100%' }} />
              </>
            ) : (
              <>
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
              </>
            )}

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CaseStudyOverlay
