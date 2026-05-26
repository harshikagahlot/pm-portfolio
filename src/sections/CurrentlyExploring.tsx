import React from 'react'
import { motion } from 'framer-motion'
import { VARIANTS } from '../lib/motion'

interface ExploringItem {
  id: number
  title: string
  note: string
}

const EXPLORING_ITEMS: ExploringItem[] = [
  {
    id: 1,
    title: 'AI-assisted product workflows',
    note: 'How LLMs change the way PMs and designers make decisions — not just developers.',
  },
  {
    id: 2,
    title: 'Recommendation system design',
    note: 'The UX of surfaces that decide what you see next. Spotify, YouTube, TikTok — why they feel different.',
  },
  {
    id: 3,
    title: 'Interaction design at 120fps',
    note: 'What becomes possible when you stop thinking in 60fps constraints. Spring physics, gesture continuity.',
  },
  {
    id: 4,
    title: 'Onboarding as product strategy',
    note: "The first 3 minutes of a product determine everything. Most companies treat it as a tutorial. It's actually a promise.",
  },
  {
    id: 5,
    title: 'Design systems that scale',
    note: 'Not the components — the decisions behind them. Token architecture, component APIs, team conventions.',
  },
  {
    id: 6,
    title: 'The psychology of empty states',
    note: 'Empty states are the most honest moment in a product. They reveal exactly what the team was thinking when no one was watching.',
  },
]

const CurrentlyExploring: React.FC = () => {
  return (
    <section
      id="currently-exploring"
      style={{
        paddingTop: '120px',
        paddingBottom: '120px',
        backgroundColor: 'rgba(10, 10, 15, 0.75)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        
        {/* Section Header */}
        <motion.div
          variants={VARIANTS.staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          style={{ display: 'flex', flexDirection: 'column', marginBottom: '48px' }}
        >
          {/* Heading */}
          <motion.h2
            variants={VARIANTS.fadeUp}
            style={{
              fontFamily: 'var(--font-display)',
              lineHeight: 1.15,
              margin: 0,
            }}
            className="explore-heading"
          >
            <span style={{ display: 'block', color: 'var(--color-text-primary)', fontWeight: 800 }}>
              Right now, I'm
            </span>
            <span style={{ display: 'block', color: 'var(--color-accent-purple)', fontWeight: 800 }}>
              curious about.
            </span>
          </motion.h2>

          {/* Timestamp */}
          <motion.div
            variants={VARIANTS.fadeUp}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--color-text-hint)',
              marginTop: '12px',
            }}
          >
            Last updated · May 2024
          </motion.div>
        </motion.div>

        {/* Exploration Items List */}
        <motion.div
          variants={VARIANTS.staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {EXPLORING_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              variants={VARIANTS.fadeUp}
              style={{
                display: 'flex',
                gap: '16px',
                paddingTop: '16px',
                paddingBottom: '16px',
                borderBottom: idx === EXPLORING_ITEMS.length - 1 ? 'none' : '1px solid var(--color-border-subtle)',
              }}
            >
              {/* Bullet indicator */}
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '14px',
                  color: 'var(--color-accent-purple)',
                  flexShrink: 0,
                  marginTop: '4px',
                }}
              >
                →
              </span>

              {/* Text content block */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-text-primary)',
                    fontWeight: 500,
                  }}
                  className="explore-item-title"
                >
                  {item.title}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.4,
                  }}
                >
                  {item.note}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Styled Responsive Classes */}
      <style>{`
        .explore-heading {
          font-size: 42px;
        }
        .explore-item-title {
          font-size: 18px;
        }
        @media (max-width: 767px) {
          .explore-heading {
            font-size: 28px;
          }
          .explore-item-title {
            font-size: 16px;
          }
        }
      `}</style>
    </section>
  )
}

export default CurrentlyExploring
