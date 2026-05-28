import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { TRANSITIONS, VARIANTS } from '../lib/motion'
import { scrollTo } from '../lib/smoothScroll'
import ParallaxGlow from '../components/ParallaxGlow'
import { PROJECTS } from '../data/projects'
import type { Project } from '../data/projects'
import CaseStudyOverlay from '../components/CaseStudyOverlay'
import suswordImg from '../assets/susword.png'
import habitmetricImg from '../assets/habitmetricdashboard.png'

// ── Pulsing dots indicator ────────────────────────────────────
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
          backgroundColor: 'var(--color-accent-coral)',
        }}
      />
    ))}
  </div>
)

// ── Individual project entry row ──────────────────────────────
interface ProjectEntryProps {
  project: Project
  onClick: () => void
  shouldReduceMotion: boolean | null
}

const ProjectEntry: React.FC<ProjectEntryProps> = ({ project, onClick, shouldReduceMotion }) => {
  const [hovered, setHovered] = useState(false)
  const isAccredian = project.id === 'accredian-orbit'

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={`Open ${project.name} case study`}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick() }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={shouldReduceMotion ? {} : { x: -6 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2, ease: 'easeOut' }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '48px',
        padding: '48px 0',
        cursor: 'pointer',
        outline: 'none',
      }}
    >
      {/* ── LEFT: text content ─────────────────────────── */}
      <motion.div
        initial={shouldReduceMotion ? {} : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={VARIANTS.fadeUp}
        transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITIONS.slow, delay: 0 }}
        style={{ flex: '1 1 auto', maxWidth: isAccredian ? '100%' : '55%' }}
        className="project-entry-left"
      >
        {/* Project number */}
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

        {/* Project name */}
        <motion.h3
          animate={
            shouldReduceMotion
              ? {}
              : { color: hovered ? project.accent : 'var(--color-text-primary)' }
          }
          transition={shouldReduceMotion ? { duration: 0 } : TRANSITIONS.fast}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(28px, 4vw, 42px)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: 0,
            color: 'var(--color-text-primary)',
          }}
        >
          {project.name}
        </motion.h3>

        {/* Tagline */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            color: 'var(--color-text-secondary)',
            marginTop: '8px',
            marginBottom: 0,
          }}
        >
          {project.tagline}
        </p>

        {/* Tag pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginTop: '16px',
          }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: 'var(--color-text-hint)',
                padding: '4px 12px',
                borderRadius: '999px',
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '0.5px solid var(--color-border-subtle)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Read link */}
        <motion.p
          animate={
            shouldReduceMotion
              ? {}
              : {
                  color: hovered ? project.accent : 'var(--color-accent-coral)',
                  textDecorationColor: hovered ? project.accent : 'transparent',
                }
          }
          transition={shouldReduceMotion ? { duration: 0 } : TRANSITIONS.fast}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            marginTop: '24px',
            marginBottom: 0,
            textDecoration: hovered ? 'underline' : 'none',
            color: 'var(--color-accent-coral)',
          }}
        >
          Read the story →
        </motion.p>
      </motion.div>

      {/* ── RIGHT: visual placeholder ──────────────────── */}
      {!isAccredian && (
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITIONS.slow, delay: 0.15 }}
          style={{ flex: '1 1 auto', minWidth: 0, maxWidth: '40%' }}
          className="project-entry-right"
        >
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : {
                    borderColor: hovered
                      ? `rgba(${project.accent === '#f47c5a' ? '244,124,90' : '124,111,247'},0.3)`
                      : 'var(--color-border-subtle)',
                  }
            }
            transition={shouldReduceMotion ? { duration: 0 } : TRANSITIONS.fast}
            style={{
              width: '100%',
              aspectRatio: '16/9',
              borderRadius: '16px',
              backgroundColor: 'var(--color-bg-card)',
              border: '0.5px solid var(--color-border-subtle)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Actual project screenshot image */}
            <img
              src={project.id === 'susword' ? suswordImg : habitmetricImg}
              alt={`${project.name} screenshot`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                inset: 0,
                opacity: hovered ? 1 : 0.85,
                transition: 'opacity 0.2s ease, transform 0.3s ease',
                transform: hovered ? 'scale(1.03)' : 'scale(1)',
              }}
            />

            {/* Hover gradient overlay */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      opacity: hovered ? 1 : 0,
                    }
              }
              transition={shouldReduceMotion ? { duration: 0 } : TRANSITIONS.fast}
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  project.accent === '#f47c5a'
                    ? 'linear-gradient(135deg, rgba(244,124,90,0) 0%, rgba(244,124,90,0.08) 100%)'
                    : 'linear-gradient(135deg, rgba(124,111,247,0) 0%, rgba(124,111,247,0.08) 100%)',
                pointerEvents: 'none',
                borderRadius: '16px',
                zIndex: 1,
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

// ── Main section ──────────────────────────────────────────────
const CaseStudies: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const shouldReduceMotion = useReducedMotion()
  const viewportConfig = { once: true, margin: '-60px' }

  React.useEffect(() => {
    const handleCloseOverlay = () => {
      setSelectedProject(null)
    }
    window.addEventListener('close-project-overlay', handleCloseOverlay)
    return () => {
      window.removeEventListener('close-project-overlay', handleCloseOverlay)
    }
  }, [])

  return (
    <>
      {/* Case study overlay — rendered outside normal flow */}
      <CaseStudyOverlay
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
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
        <ParallaxGlow color="rgba(244,124,90,0.05)" position="top-right" speed={0.15} />

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

            {/* Overline label — coral accent for this section */}
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
                  backgroundColor: 'var(--color-accent-coral)',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-hint)',
                }}
              >
                work
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
              Things I've
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
              actually shipped.
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
                fontSize: '17px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.7,
                maxWidth: '480px',
                marginTop: '24px',
                marginBottom: 0,
              }}
            >
              Two products. Real problems. Decisions I'd make again — and a few I wouldn't.
            </motion.p>
          </div>

          {/* ── Project entries ────────────────────────── */}
          <div>
            {PROJECTS.map((project, index) => (
              <div key={project.id}>
                {/* Top divider (before each entry, including first) */}
                <div
                  style={{
                    height: '1px',
                    backgroundColor: 'var(--color-border-subtle)',
                  }}
                />
                <ProjectEntry
                  project={project}
                  onClick={() => setSelectedProject(project)}
                  shouldReduceMotion={shouldReduceMotion}
                />
                {/* Bottom divider after last entry */}
                {index === PROJECTS.length - 1 && (
                  <div
                    style={{
                      height: '1px',
                      backgroundColor: 'var(--color-border-subtle)',
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* ── Section footer — coming soon ───────────── */}
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
                fontSize: '15px',
                color: 'var(--color-text-secondary)',
                margin: 0,
              }}
            >
              More projects in progress.
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <PulsingDots shouldReduceMotion={shouldReduceMotion} />
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: 'var(--color-text-hint)',
                  margin: 0,
                }}
              >
                AI internship platform · coming soon
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
                fontSize: '15px',
                color: 'var(--color-text-secondary)',
                textAlign: 'center',
                margin: 0,
              }}
            >
              Curious how I analyze products I didn't build?
            </p>

            <motion.button
              id="connector-teardown-cta"
              onClick={() => scrollTo('#teardown')}
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      backgroundColor: 'rgba(244,124,90,0.08)',
                      borderColor: 'rgba(244,124,90,0.5)',
                    }
              }
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              transition={TRANSITIONS.fast}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                color: 'var(--color-text-primary)',
                backgroundColor: 'transparent',
                padding: '12px 28px',
                borderRadius: '8px',
                border: '1px solid var(--color-border-default)',
                cursor: 'pointer',
              }}
            >
              See my teardowns →
            </motion.button>
          </motion.div>
        </div>

        {/* Responsive layout */}
        <style>{`
          @media (max-width: 767px) {
            .project-entry-right { display: none !important; }
            .project-entry-left { max-width: 100% !important; }
          }
        `}</style>
      </section>
    </>
  )
}

export default CaseStudies
