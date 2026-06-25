import React, { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { TRANSITIONS, VARIANTS } from '../lib/motion'
import { scrollTo } from '../lib/smoothScroll'
import ParallaxGlow from '../components/ParallaxGlow'
import UserIcon from '../components/icons/UserIcon'
import LayersIcon from '../components/icons/LayersIcon'
import BoltIcon from '../components/icons/BoltIcon'

// ── Types ────────────────────────────────────────────────────
interface ThoughtCard {
  id: string
  Icon: React.FC<{ size?: number; color?: string }>
  title: string
  description: string
  reveal: string
}

// ── Card data ────────────────────────────────────────────────
const THOUGHT_CARDS: ThoughtCard[] = [
  {
    id: 'friction',
    Icon: LayersIcon,
    title: 'Friction is the default',
    description:
      "If users have to stop and think, the product has already lost momentum.",
    reveal:
      'Building SusWord taught me how small interaction delays affect the entire experience. While analysing Airbnb, I noticed something similar from a different angle — the platform spends enormous effort reducing uncertainty, yet one of its biggest trust signals, listing photos, remains largely controlled by hosts. That reminded me that every unnoticed friction eventually becomes a user problem.',
  },
  {
    id: 'iteration',
    Icon: BoltIcon,
    title: 'Iteration over perfection',
    description:
      'The first version should answer questions — not try to answer everything.',
    reveal:
      'Before building HabitMetric, I documented the feature flow in a PRD. Once real feedback arrived, that document changed multiple times. The biggest lesson wasn\'t that the original plan was wrong — it was that writing things down made it much easier to understand what actually needed to change.',
  },
  {
    id: 'behavior',
    Icon: UserIcon,
    title: 'Behavior beats intentions',
    description:
      "What users do is more valuable than what they say they'll do.",
    reveal:
      'Whether I\'m studying Spotify, Blinkit, Airbnb or my own projects, I keep coming back to the same observation: user behaviour reveals product truth. Reviews, clicks, drop-offs and repeat actions consistently teach more than assumptions or survey answers.',
  },
]


// ── Single thought card ───────────────────────────────────────
interface ThoughtCardProps {
  card: ThoughtCard
  shouldReduceMotion: boolean | null
}

const ThoughtCardItem: React.FC<ThoughtCardProps> = ({ card, shouldReduceMotion }) => {
  const [hovered, setHovered] = useState(false)
  const { Icon } = card

  return (
    <motion.div
      layout
      variants={VARIANTS.fadeUp}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              y: -4,
              borderColor: 'rgba(124,111,247,0.4)',
            }
      }
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { ...TRANSITIONS.base, layout: { duration: 0.3 } }
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'var(--color-bg-card)',
        border: '0.5px solid var(--color-border-subtle)',
        borderRadius: '14px',
        padding: '28px 24px',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'default',
        overflow: 'hidden',
      }}
    >
      {/* Icon chip */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                backgroundColor: hovered
                  ? 'rgba(124,111,247,0.2)'
                  : 'rgba(124,111,247,0.12)',
              }
        }
        transition={shouldReduceMotion ? { duration: 0 } : TRANSITIONS.fast}
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-accent-purple)',
          flexShrink: 0,
        }}
      >
        <Icon size={18} color="var(--color-accent-purple)" />
      </motion.div>

      {/* Title */}
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '21px',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          marginTop: '16px',
          marginBottom: 0,
          lineHeight: 1.3,
        }}
      >
        {card.title}
      </p>

      {/* Description */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '17px',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.65,
          marginTop: '8px',
          marginBottom: 0,
        }}
      >
        {card.description}
      </p>

      {/* Reveal line */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            {/* Divider */}
            <div
              style={{
                height: '1px',
                backgroundColor: 'var(--color-border-subtle)',
                marginTop: '16px',
                marginBottom: '12px',
              }}
            />
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                fontStyle: 'italic',
                color: 'var(--color-text-hint)',
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              {card.reveal}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Main section ─────────────────────────────────────────────
const HowIThink: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()

  // Scroll entry animation config
  const viewportConfig = { once: true, margin: '-80px' }
  const headingTransition = shouldReduceMotion ? { duration: 0 } : TRANSITIONS.slow

  return (
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
      <ParallaxGlow color="rgba(124,111,247,0.05)" position="bottom-right" speed={0.2} />

      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* ── Part A: Heading block ─────────────────────────── */}
        <div style={{ marginBottom: '72px' }}>

          {/* Overline label */}
          <motion.div
            initial={shouldReduceMotion ? {} : 'hidden'}
            whileInView="visible"
            viewport={viewportConfig}
            variants={VARIANTS.sectionEntry}
            transition={{ ...headingTransition, delay: 0 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '24px',
            }}
          >
            {/* Decorative rule */}
            <div
              style={{
                width: '24px',
                height: '1px',
                backgroundColor: 'var(--color-accent-purple)',
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
              how i think
            </span>
          </motion.div>

          {/* Two-line heading */}
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              initial={shouldReduceMotion ? {} : 'hidden'}
              whileInView="visible"
              viewport={viewportConfig}
              variants={VARIANTS.sectionEntry}
              transition={{ ...headingTransition, delay: 0.1 }}
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
              Curiosity first.
            </motion.h2>
            <motion.h2
              initial={shouldReduceMotion ? {} : 'hidden'}
              whileInView="visible"
              viewport={viewportConfig}
              variants={VARIANTS.sectionEntry}
              transition={{ ...headingTransition, delay: 0.2 }}
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
              Everything else follows.
            </motion.h2>
          </div>

          {/* Intro paragraph */}
          <motion.p
            initial={shouldReduceMotion ? {} : 'hidden'}
            whileInView="visible"
            viewport={viewportConfig}
            variants={VARIANTS.sectionEntry}
            transition={{ ...headingTransition, delay: 0.35 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '20px',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.7,
              maxWidth: '520px',
              marginTop: '24px',
              marginBottom: 0,
            }}
          >
            I don't believe great products appear from great ideas alone. I believe they come from paying attention — watching how people actually use products, noticing where they hesitate, what they ignore, and what quietly pushes them away. Every project, teardown, and experiment teaches me something I try to carry into the next one.
          </motion.p>

        </div>

        {/* ── Part B: Thought cards grid ───────────────────── */}
        <motion.div
          initial={shouldReduceMotion ? {} : 'hidden'}
          whileInView="visible"
          viewport={viewportConfig}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.07 },
            },
          }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
          }}
          className="thought-grid"
        >
          {THOUGHT_CARDS.map((card) => (
            <ThoughtCardItem
              key={card.id}
              card={card}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </motion.div>

        {/* ── Part C: Bottom connector ─────────────────────── */}
        <motion.div
          initial={shouldReduceMotion ? {} : 'hidden'}
          whileInView="visible"
          viewport={viewportConfig}
          variants={VARIANTS.fadeUp}
          transition={{ ...headingTransition, delay: 0.3 }}
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
            Want to see what I build with?
          </p>

          <motion.button
            id="connector-work-cta"
            onClick={() => scrollTo('#toolkit')}
            whileHover={
              shouldReduceMotion
                ? {}
                : {
                    backgroundColor: 'rgba(124,111,247,0.08)',
                    borderColor: 'rgba(124,111,247,0.5)',
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
            See my toolkit →
          </motion.button>
        </motion.div>
      </div>

      {/* Responsive grid adjustments */}
      <style>{`
        @media (max-width: 767px) {
          .thought-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .thought-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  )
}

export default HowIThink
