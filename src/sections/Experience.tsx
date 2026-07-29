import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { TRANSITIONS, VARIANTS } from '../lib/motion'
import ParallaxGlow from '../components/ParallaxGlow'

// ── Constants ─────────────────────────────────────────────────
const PURPLE = '#7c6ff7'

// ── Experience data ───────────────────────────────────────────
interface ExperienceEntry {
  title: string
  company: string
  location: string
  duration: string
  description: string
  responsibilities: string[]
  learnings: string[]
}

const EXPERIENCES: ExperienceEntry[] = [
  {
    title: 'Executive Assistant Intern',
    company: 'EASTEAM • Remote • US-based Startup',
    location: 'Remote',
    duration: '30 June 2026 – 11 July 2026',
    description:
      'Worked in a fast-paced early-stage startup, supporting founder-led operations and business execution. Contributed to process documentation, operational coordination, and internal communication while gaining exposure to cross-functional startup workflows.',
    responsibilities: [
      'Created and maintained Standard Operating Procedures (SOPs) and operational documentation.',
      'Assisted with founder operations and execution of day-to-day business activities.',
      'Supported business communication and coordination across internal tasks.',
      'Worked on organizing processes to improve operational efficiency.',
    ],
    learnings: [
      'Understood how structured documentation supports execution in early-stage startups.',
      'Gained exposure to founder-led decision-making and startup operations.',
      'Strengthened communication, organization, and cross-functional collaboration skills.',
      'Developed a stronger appreciation for process thinking, which complements my transition into Product Management.',
    ],
  },
]

// ── Main section ──────────────────────────────────────────────
const Experience: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()
  const viewportConfig = { once: true, margin: '-60px' as const }

  return (
    <section
      style={{
        paddingTop: '120px',
        paddingBottom: '120px',
        backgroundColor: 'rgba(10, 10, 15, 0.75)',
        position: 'relative',
        overflow: 'clip',
      }}
    >
      <ParallaxGlow color="rgba(124,111,247,0.06)" position="top-right" speed={0.25} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* ── Section header ─────────────────────────── */}
        <div style={{ marginBottom: '64px' }}>

          {/* Overline */}
          <motion.div
            initial={shouldReduceMotion ? {} : 'hidden'}
            whileInView="visible"
            viewport={viewportConfig}
            variants={VARIANTS.sectionEntry}
            transition={{ ...TRANSITIONS.slow, delay: 0 }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}
          >
            <div style={{ width: '24px', height: '1px', backgroundColor: PURPLE, flexShrink: 0 }} />
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-text-hint)',
            }}>
              experience
            </span>
          </motion.div>

          {/* Heading */}
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
            Where I've
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
            contributed.
          </motion.h2>

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
              maxWidth: '480px',
              marginTop: '24px',
              marginBottom: 0,
            }}
          >
            Professional experience that shaped my understanding of products, operations, and execution.
          </motion.p>
        </div>

        {/* ── Experience cards ───────────────────────── */}
        {EXPERIENCES.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={shouldReduceMotion ? {} : 'hidden'}
            whileInView="visible"
            viewport={viewportConfig}
            variants={VARIANTS.fadeUp}
            transition={{ ...TRANSITIONS.slow, delay: 0.15 }}
            style={{
              backgroundColor: 'var(--color-bg-card)',
              border: '0.5px solid var(--color-border-subtle)',
              borderRadius: '16px',
              padding: 'clamp(24px, 4vw, 40px)',
              marginBottom: '32px',
            }}
          >
            {/* Top row: Title + Meta */}
            <div className="exp-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(20px, 3vw, 26px)',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  margin: 0,
                  lineHeight: 1.3,
                }}>
                  {exp.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '17px',
                  color: PURPLE,
                  fontWeight: 600,
                  margin: '4px 0 0',
                  lineHeight: 1.4,
                }}>
                  {exp.company}
                </p>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '14px',
                  color: 'var(--color-text-hint)',
                  margin: 0,
                }}>
                  {exp.duration}
                </p>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  color: 'var(--color-text-hint)',
                  margin: '2px 0 0',
                }}>
                  {exp.location}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', backgroundColor: 'var(--color-border-subtle)', marginBottom: '20px' }} />

            {/* Description */}
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '17px',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.7,
              marginTop: 0,
              marginBottom: '28px',
            }}>
              {exp.description}
            </p>

            {/* Responsibilities + Learnings — side by side on desktop */}
            <div className="exp-card-columns" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              {/* Responsibilities */}
              <div>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: PURPLE,
                  margin: '0 0 14px',
                }}>
                  Key Responsibilities
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {exp.responsibilities.map((item, i) => (
                    <li key={i} style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '15px',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.65,
                      marginBottom: '10px',
                      paddingLeft: '16px',
                      position: 'relative',
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        top: '1px',
                        color: PURPLE,
                        fontSize: '10px',
                        lineHeight: '24px',
                      }}>
                        ●
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Learnings */}
              <div>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: PURPLE,
                  margin: '0 0 14px',
                }}>
                  Key Learnings
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {exp.learnings.map((item, i) => (
                    <li key={i} style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '15px',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.65,
                      marginBottom: '10px',
                      paddingLeft: '16px',
                      position: 'relative',
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        top: '1px',
                        color: PURPLE,
                        fontSize: '10px',
                        lineHeight: '24px',
                      }}>
                        ●
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Responsive styles ──────────────────────────── */}
      <style>{`
        @media (max-width: 767px) {
          .exp-card-columns {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .exp-card-header {
            flex-direction: column !important;
          }
          .exp-card-header > div:last-child {
            text-align: left !important;
          }
        }
      `}</style>
    </section>
  )
}

export default Experience
