import React, { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { TRANSITIONS, VARIANTS } from '../lib/motion'
import { scrollTo } from '../lib/smoothScroll'
import EyeIcon from '../components/icons/EyeIcon'
import UserIcon from '../components/icons/UserIcon'
import LayersIcon from '../components/icons/LayersIcon'
import BoltIcon from '../components/icons/BoltIcon'
import FlowIcon from '../components/icons/FlowIcon'
import HeartIcon from '../components/icons/HeartIcon'

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
    id: 'observe',
    Icon: EyeIcon,
    title: 'I observe before I design',
    description:
      'Most bad products are built by people who skipped the watching step. I spend more time in the problem than in Figma.',
    reveal:
      'I once spent a week just using Blinkit as a first-time user before touching any design.',
  },
  {
    id: 'behavior',
    Icon: UserIcon,
    title: 'Users lie. Behavior doesn\'t.',
    description:
      'What people say they want and what they actually do are often completely different. I trust the behavior.',
    reveal:
      'The biggest UX lesson: users say "I\'d use that" about features they\'d never actually touch.',
  },
  {
    id: 'simplicity',
    Icon: LayersIcon,
    title: 'Simplicity is a decision',
    description:
      'Every feature removed is a decision made with intention. Simplicity isn\'t the absence of features — it\'s clarity about which ones matter.',
    reveal:
      'SusWord launched with 4 features. 3 of them were things I removed after the first prototype.',
  },
  {
    id: 'speed',
    Icon: BoltIcon,
    title: 'Speed builds trust',
    description:
      'A 200ms interaction feels different from a 600ms one. Performance isn\'t engineering — it\'s UX. It\'s how a product feels to a human.',
    reveal:
      'I test every micro-interaction at 3x slow-motion. If it feels wrong there, users will feel it too.',
  },
  {
    id: 'edges',
    Icon: FlowIcon,
    title: 'The edges reveal the product',
    description:
      'How a product handles its error states, empty states, and edge cases tells you more about its quality than the happy path does.',
    reveal:
      'My first question when doing a product teardown: what happens when something goes wrong?',
  },
  {
    id: 'emotion',
    Icon: HeartIcon,
    title: 'Emotion is the metric',
    description:
      'Retention and engagement are measurements. What I actually care about is whether someone felt something — relieved, delighted, understood.',
    reveal: 'The best product feedback I ever received: "It just felt like it got me."',
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
          fontSize: '18px',
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
          fontSize: '14px',
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
                fontSize: '13px',
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
        backgroundColor: 'var(--color-bg-primary)',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {/* ── Part A: Heading block ─────────────────────────── */}
        <div style={{ marginBottom: '72px' }}>

          {/* Overline label */}
          <motion.div
            initial={shouldReduceMotion ? {} : 'hidden'}
            whileInView="visible"
            viewport={viewportConfig}
            variants={VARIANTS.fadeUp}
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
                fontSize: '12px',
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
              variants={VARIANTS.fadeUp}
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
              variants={VARIANTS.fadeUp}
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
            variants={VARIANTS.fadeUp}
            transition={{ ...headingTransition, delay: 0.35 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '17px',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.7,
              maxWidth: '520px',
              marginTop: '24px',
              marginBottom: 0,
            }}
          >
            I don't start with solutions. I start with people — their frustrations, habits, and the
            small moments where products either earn trust or lose it.
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
              fontSize: '15px',
              color: 'var(--color-text-secondary)',
              textAlign: 'center',
              margin: 0,
            }}
          >
            Want to see this thinking in action?
          </p>

          <motion.button
            id="connector-work-cta"
            onClick={() => scrollTo('#work')}
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
              fontSize: '15px',
              color: 'var(--color-text-primary)',
              backgroundColor: 'transparent',
              padding: '12px 28px',
              borderRadius: '8px',
              border: '1px solid var(--color-border-default)',
              cursor: 'pointer',
            }}
          >
            Explore my work →
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
