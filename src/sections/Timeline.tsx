import React, { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { TRANSITIONS, VARIANTS } from '../lib/motion'
import { scrollTo } from '../lib/smoothScroll'
import ParallaxGlow from '../components/ParallaxGlow'

// ── Constants ─────────────────────────────────────────────────
const PURPLE = '#7c6ff7'
const CIRCLE_D = 44
const LAST_CIRCLE_D = 52
const STEM_H = 40
const NODE_W = 240
const NODE_W_MOBILE = 180
const CARD_W = 200
const CARD_W_MOBILE = 160
const TRACK_H = 360 // px — height of the scrollable track

// ── Milestone data ────────────────────────────────────────────
interface Milestone {
  id: number
  emoji: string
  date: string
  title: string
  description: string
  position: 'above' | 'below'
}

const MILESTONES: Milestone[] = [
  {
    id: 1, emoji: '🌱', date: '2022 · Early',
    title: 'Wrote my first line of code',
    description: "HTML on a YouTube tutorial. Thought I'd broken the internet when I opened the browser.",
    position: 'above',
  },
  {
    id: 2, emoji: '⚡', date: '2022 · Mid',
    title: 'First JavaScript project',
    description: 'A calculator app that only worked sometimes. I was extremely proud of it.',
    position: 'below',
  },
  {
    id: 3, emoji: '🚀', date: '2022 · Late',
    title: 'First deployment',
    description: 'Put something on the internet for real. Sent the link to everyone I knew.',
    position: 'above',
  },
  {
    id: 4, emoji: '🎮', date: '2023 · Early',
    title: 'Built SusWord',
    description: 'First real product. Multiplayer, real users, real feedback. Nothing went as planned.',
    position: 'below',
  },
  {
    id: 5, emoji: '📊', date: '2023 · Mid',
    title: 'Built HabitMetric',
    description: 'Started thinking about users, not just code. This is when product thinking clicked.',
    position: 'above',
  },
  {
    id: 6, emoji: '🔍', date: '2023 · Late',
    title: 'Discovered product teardowns',
    description: "Started dissecting apps I used daily. Couldn't stop seeing the decisions behind every screen.",
    position: 'below',
  },
  {
    id: 7, emoji: '🤖', date: '2024',
    title: 'Went deep on AI',
    description: 'Explored AI-assisted workflows, prompt engineering, recommendation systems. Still exploring.',
    position: 'above',
  },
  {
    id: 8, emoji: '📍', date: 'Now',
    title: 'Here.',
    description: 'Building things that matter. Looking for the right team to build them with.',
    position: 'below',
  },
]

// ── Single milestone node ─────────────────────────────────────
interface NodeProps {
  milestone: Milestone
  isLast: boolean
  shouldReduceMotion: boolean | null
  isMobile: boolean
}

const MilestoneNode: React.FC<NodeProps> = ({ milestone, isLast, shouldReduceMotion, isMobile }) => {
  const isAbove = milestone.position === 'above'
  const circleD = isLast ? LAST_CIRCLE_D : CIRCLE_D
  const circleR = circleD / 2
  const nodeW = isMobile ? NODE_W_MOBILE : NODE_W
  const cardW = isMobile ? CARD_W_MOBILE : CARD_W

  // Vertical positions relative to the vertical center of the track
  const stemTopStyle = isAbove
    ? { top: `calc(50% - ${circleR}px - ${STEM_H}px)` }
    : { top: `calc(50% + ${circleR}px)` }

  const cardPositionStyle = isAbove
    ? { bottom: `calc(50% + ${circleR}px + ${STEM_H}px)` }
    : { top: `calc(50% + ${circleR}px + ${STEM_H}px)` }

  return (
    <div style={{ position: 'relative', width: `${nodeW}px`, flexShrink: 0, height: '100%' }}>

      {/* ── Circle ───────────────────────────────────── */}
      <motion.div
        initial={shouldReduceMotion ? undefined : { scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { type: 'spring', stiffness: 200, damping: 20 }
        }
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: `${circleD}px`,
          height: `${circleD}px`,
          borderRadius: '50%',
          background: isLast
            ? `radial-gradient(circle, rgba(124,111,247,0.2) 0%, transparent 70%)`
            : 'var(--color-bg-card)',
          border: `1.5px solid ${isLast ? PURPLE : 'rgba(124,111,247,0.4)'}`,
          boxShadow: isLast ? `0 0 0 4px rgba(124,111,247,0.12)` : undefined,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
        }}
      >
        <span style={{ fontSize: isLast ? '22px' : '18px', lineHeight: 1 }}>
          {milestone.emoji}
        </span>
      </motion.div>

      {/* ── Pulse ring (CSS animation — last node only) ── */}
      {isLast && (
        <div
          className="timeline-pulse"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: `${circleD}px`,
            height: `${circleD}px`,
            borderRadius: '50%',
            border: `1.5px solid rgba(124,111,247,0.5)`,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}

      {/* ── Stem ─────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1px',
          height: `${STEM_H}px`,
          backgroundColor: 'rgba(124,111,247,0.3)',
          zIndex: 1,
          ...stemTopStyle,
        }}
      />

      {/* ── Content card ─────────────────────────────── */}
      <motion.div
        initial={shouldReduceMotion ? undefined : { opacity: 0, y: isAbove ? -16 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITIONS.base, delay: 0.05 }}
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          width: `${cardW}px`,
          backgroundColor: 'var(--color-bg-card)',
          border: isLast
            ? `0.5px solid rgba(124,111,247,0.3)`
            : `0.5px solid var(--color-border-subtle)`,
          borderRadius: '12px',
          padding: '16px 20px',
          zIndex: 2,
          ...cardPositionStyle,
        }}
      >
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-text-hint)', margin: '0 0 6px' }}>
          {milestone.date}
        </p>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: '15px',
          fontWeight: 700,
          color: isLast ? PURPLE : 'var(--color-text-primary)',
          lineHeight: 1.3,
          margin: 0,
        }}>
          {milestone.title}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.5,
          marginTop: '6px',
          marginBottom: 0,
        }}>
          {milestone.description}
        </p>
      </motion.div>
    </div>
  )
}

// ── Main section ──────────────────────────────────────────────
const Timeline: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [scrollStart, setScrollStart] = useState(0)
  const [hintVisible, setHintVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const viewportConfig = { once: true, margin: '-60px' }

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Fade out drag hint after 3s
  useEffect(() => {
    const t = setTimeout(() => setHintVisible(false), 3000)
    return () => clearTimeout(t)
  }, [])

  // Wheel → horizontal scroll (desktop only)
  useEffect(() => {
    const el = trackRef.current
    if (!el || isMobile) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      el.scrollLeft += e.deltaY
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [isMobile])

  // Drag to scroll
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!trackRef.current) return
    setIsDragging(true)
    setDragStartX(e.pageX)
    setScrollStart(trackRef.current.scrollLeft)
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return
    e.preventDefault()
    const dx = e.pageX - dragStartX
    trackRef.current.scrollLeft = scrollStart - dx
  }, [isDragging, dragStartX, scrollStart])

  const onMouseUp = useCallback(() => setIsDragging(false), [])

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
      <ParallaxGlow color="rgba(124,111,247,0.06)" position="bottom-left" speed={0.25} />

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
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-text-hint)',
            }}>
              journey
            </span>
          </motion.div>

          {/* Heading row: text + drag hint */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
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
                How I got
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
                to here.
              </motion.h2>
            </div>

            {/* Drag hint — desktop only, fades after 3s */}
            <motion.p
              animate={{ opacity: hintVisible ? 1 : 0 }}
              transition={{ duration: 0.6 }}
              className="timeline-drag-hint"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: 'var(--color-text-hint)',
                letterSpacing: '0.06em',
                margin: '0 0 8px',
                flexShrink: 0,
              }}
            >
              {isMobile ? 'swipe to explore →' : '← drag to explore →'}
            </motion.p>
          </div>

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
              maxWidth: '460px',
              marginTop: '24px',
              marginBottom: 0,
            }}
          >
            Every version of me was necessary. Here's the order they showed up.
          </motion.p>
        </div>
      </div>

      {/* ── Horizontal scroll track ─────────────────── */}
      <div
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{
          width: '100%',
          overflowX: 'auto',
          overflowY: 'visible',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          position: 'relative',
        }}
        className="timeline-track"
      >
        {/* Inner flex row */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: `0 80px`,
            minWidth: 'max-content',
            height: `${TRACK_H}px`,
            position: 'relative',
          }}
        >
          {/* ── Path line ────────────────────────────── */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '50%',
              left: '80px',
              right: '80px',
              height: '2px',
              transform: 'translateY(-50%)',
              background: `linear-gradient(
                90deg,
                rgba(124,111,247,0.2) 0%,
                rgba(124,111,247,0.8) 40%,
                rgba(124,111,247,0.8) 60%,
                rgba(124,111,247,0.2) 100%
              )`,
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* ── Milestone nodes ───────────────────────── */}
          {MILESTONES.map((m) => (
            <MilestoneNode
              key={m.id}
              milestone={m}
              isLast={m.id === 8}
              shouldReduceMotion={shouldReduceMotion}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>

      {/* ── Bottom connector ───────────────────────────── */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={shouldReduceMotion ? {} : 'hidden'}
          whileInView="visible"
          viewport={viewportConfig}
          variants={VARIANTS.fadeUp}
          transition={{ ...TRANSITIONS.slow, delay: 0.2 }}
          style={{
            marginTop: '80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            color: 'var(--color-text-secondary)',
            textAlign: 'center',
            margin: 0,
          }}>
            Want to read what I've been thinking about?
          </p>

          <motion.button
            id="connector-blog-cta"
            onClick={() => scrollTo('#blog')}
            whileHover={shouldReduceMotion ? {} : {
              backgroundColor: 'rgba(124,111,247,0.08)',
              borderColor: 'rgba(124,111,247,0.5)',
            }}
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
            Read my blog →
          </motion.button>
        </motion.div>
      </div>

      {/* ── Global styles for this section ─────────────── */}
      <style>{`
        /* Hide scrollbar */
        .timeline-track {
          scrollbar-width: none;
        }
        .timeline-track::-webkit-scrollbar {
          display: none;
        }

        /* Pulse ring animation */
        @keyframes timelinePulse {
          0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }
        .timeline-pulse {
          animation: timelinePulse 2s ease-out infinite;
        }

        /* Hide drag hint on mobile */
        @media (max-width: 767px) {
          .timeline-drag-hint { display: none; }
        }
      `}</style>
    </section>
  )
}

export default Timeline
