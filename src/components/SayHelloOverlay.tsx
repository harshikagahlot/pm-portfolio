import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Types ─────────────────────────────────────────────────────
type Stage =
  | 'avatar-enter'
  | 'intro'
  | 'start'
  | 'question'
  | 'confetti'
  | 'final'

interface Question {
  question: string
  answer: string[]
}

// ── Question data ─────────────────────────────────────────────
const QUESTIONS: Question[] = [
  {
    question: 'Coffee or sleep?',
    answer: [
      'I keep telling myself,',
      '"Just one more cup."',
      'My sleep schedule has officially stopped believing me. ☕😂',
    ],
  },
  {
    question: 'What kind of people do you enjoy working with?',
    answer: [
      'Kind people.',
      'Curious people.',
      'And people who laugh at the weirdest things.',
      'Life (and work) is simply more fun that way.',
    ],
  },
  {
    question: 'What motivates you more — money, titles, or impact?',
    answer: [
      'Learning comes first.',
      'Creating something meaningful comes next.',
      'Everything else usually finds its place.',
    ],
  },
  {
    question: "What's one thing people usually don't know about you?",
    answer: [
      "I'm a little bit of everything.",
      'I can be mature when the moment calls for it.',
      'Completely goofy five minutes later.',
      'Quiet in one room.',
      'The loudest laugh in another.',
      "I don't really fit into one personality...",
      'and honestly, I like it that way.',
    ],
  },
  {
    question: "What's your life philosophy in one sentence?",
    answer: [
      'If you genuinely want something in life...',
      'your future self already has it.',
      'Your job today is simply to keep walking towards that version of yourself.',
    ],
  },
]

// ── Typewriter hook ───────────────────────────────────────────
function useTypewriter(text: string, speed = 28, active = true) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!active) { setDisplayed(''); setDone(false); return }
    setDisplayed('')
    setDone(false)
    let i = 0
    const id = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) { clearInterval(id); setDone(true) }
    }, speed)
    return () => clearInterval(id)
  }, [text, speed, active])

  return { displayed, done }
}

// ── Confetti particle ─────────────────────────────────────────
interface Particle { id: number; x: number; color: string; delay: number; duration: number; size: number }

function useConfetti(active: boolean) {
  const [particles, setParticles] = useState<Particle[]>([])
  useEffect(() => {
    if (!active) { setParticles([]); return }
    const colors = ['#7c6ff7', '#2dd4a8', '#f472b6', '#fbbf24', '#60a5fa', '#a78bfa']
    const items: Particle[] = Array.from({ length: 48 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[i % colors.length],
      delay: Math.random() * 0.6,
      duration: 1.8 + Math.random() * 1.2,
      size: 6 + Math.random() * 6,
    }))
    setParticles(items)
  }, [active])
  return particles
}

// ── Animated Avatar SVG ───────────────────────────────────────
const Avatar: React.FC<{ waving?: boolean }> = ({ waving }) => (
  <motion.div
    style={{ position: 'relative', width: 96, height: 96 }}
    animate={waving ? {} : { y: [0, -5, 0] }}
    transition={waving ? {} : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
  >
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Glow background */}
      <circle cx="48" cy="48" r="46" fill="url(#avatarGrad)" />
      {/* Face */}
      <circle cx="48" cy="44" r="24" fill="#1e1b2e" />
      {/* Hair */}
      <ellipse cx="48" cy="23" rx="22" ry="10" fill="#2a1f5e" />
      <ellipse cx="28" cy="30" rx="8" ry="12" fill="#2a1f5e" />
      <ellipse cx="68" cy="30" rx="8" ry="12" fill="#2a1f5e" />
      {/* Eyes */}
      <ellipse cx="40" cy="44" rx="4" ry="4.5" fill="white" />
      <ellipse cx="56" cy="44" rx="4" ry="4.5" fill="white" />
      <circle cx="41" cy="45" r="2.2" fill="#3b2dbf" />
      <circle cx="57" cy="45" r="2.2" fill="#3b2dbf" />
      <circle cx="42" cy="44" r="0.9" fill="white" />
      <circle cx="58" cy="44" r="0.9" fill="white" />
      {/* Smile */}
      <path d="M40 54 Q48 61 56 54" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Blush */}
      <ellipse cx="35" cy="52" rx="5" ry="3" fill="#f9a8d4" opacity="0.45" />
      <ellipse cx="61" cy="52" rx="5" ry="3" fill="#f9a8d4" opacity="0.45" />
      {/* Body */}
      <ellipse cx="48" cy="80" rx="20" ry="14" fill="#2a1f5e" />
      {/* Waving arm */}
      <motion.g
        animate={waving
          ? { rotate: [0, -25, 0, -20, 0], originX: '68px', originY: '65px' }
          : { rotate: [0, -8, 0], originX: '68px', originY: '65px' }}
        transition={waving
          ? { duration: 0.9, times: [0, 0.25, 0.5, 0.75, 1], ease: 'easeInOut' }
          : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '68px 65px' }}
      >
        <ellipse cx="72" cy="64" rx="5" ry="10" fill="#1e1b2e" transform="rotate(30 72 64)" />
        {/* Hand */}
        <circle cx="76" cy="57" r="5" fill="#2a1f5e" />
        <ellipse cx="74" cy="53" rx="2" ry="3" fill="#2a1f5e" />
        <ellipse cx="78" cy="52" rx="2" ry="3" fill="#2a1f5e" />
        <ellipse cx="79" cy="56" rx="2" ry="3" fill="#2a1f5e" />
      </motion.g>
      <defs>
        <radialGradient id="avatarGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b2dbf" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#7c6ff7" stopOpacity="0.12" />
        </radialGradient>
      </defs>
    </svg>
  </motion.div>
)

// ── Intro text lines ──────────────────────────────────────────
const INTRO_FULL = `Psst... you actually clicked it! 👀\n\nMost people stop after the projects.\n\nBut you made it all the way down here...\n\nSo, as a tiny reward, you just unlocked Bonus Content™ ✨\n\nNo more professional summaries.\nNo more polished bullet points.\n\nJust a few random questions about me.`

// ── Main Component ─────────────────────────────────────────────
interface Props { onClose: () => void }

const SayHelloOverlay: React.FC<Props> = ({ onClose }) => {
  const [stage, setStage] = useState<Stage>('avatar-enter')
  const [qIndex, setQIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [qVisible, setQVisible] = useState(true)

  const introActive = stage === 'intro'
  const { displayed: introText, done: introDone } = useTypewriter(INTRO_FULL, 22, introActive)
  const confettiParticles = useConfetti(stage === 'confetti')
  const overlayRef = useRef<HTMLDivElement>(null)

  // Avatar enters → after 600ms show intro
  useEffect(() => {
    if (stage === 'avatar-enter') {
      const t = setTimeout(() => setStage('intro'), 650)
      return () => clearTimeout(t)
    }
  }, [stage])

  // After confetti → show final after 1.8s
  useEffect(() => {
    if (stage === 'confetti') {
      const t = setTimeout(() => setStage('final'), 1800)
      return () => clearTimeout(t)
    }
  }, [stage])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    if ((e.key === 'Enter' || e.key === ' ') && stage === 'start') handleStart()
    if ((e.key === 'Enter' || e.key === ' ') && stage === 'question' && showAnswer) handleNext()
  }, [stage, showAnswer, onClose]) // eslint-disable-line

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Focus trap
  useEffect(() => {
    overlayRef.current?.focus()
  }, [])

  function handleStart() {
    setStage('question')
    setQIndex(0)
    setShowAnswer(false)
    setQVisible(true)
  }

  function handleShowAnswer() {
    setShowAnswer(true)
  }

  function handleNext() {
    if (qIndex >= QUESTIONS.length - 1) {
      // Last question done → confetti
      setQVisible(false)
      setTimeout(() => setStage('confetti'), 400)
    } else {
      setQVisible(false)
      setTimeout(() => {
        setQIndex(i => i + 1)
        setShowAnswer(false)
        setQVisible(true)
      }, 380)
    }
  }

  function handleRestart() {
    setStage('avatar-enter')
    setQIndex(0)
    setShowAnswer(false)
    setQVisible(true)
  }

  // ── Styles ───────────────────────────────────────────────────
  const PURPLE = '#7c6ff7'
  const TEAL = '#2dd4a8'
  const btnBase: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontSize: '17px',
    fontWeight: 600,
    padding: '12px 28px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.15s ease, opacity 0.15s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
  }

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          backgroundColor: 'rgba(8, 7, 18, 0.82)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          zIndex: 9000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}
        aria-label="Close Easter Egg"
      >
        {/* Modal card */}
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.9, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={e => e.stopPropagation()}
          ref={overlayRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label="Say Hello Easter Egg"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '520px',
            backgroundColor: 'var(--color-bg-card)',
            border: '1px solid rgba(124,111,247,0.2)',
            borderRadius: '20px',
            padding: 'clamp(28px, 5vw, 48px)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,111,247,0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '0',
            outline: 'none',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: 'absolute', top: '16px', right: '16px',
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--color-text-hint)', fontSize: '22px', lineHeight: 1,
              padding: '4px 8px', borderRadius: '6px',
              transition: 'color 0.15s',
            }}
            onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-primary)' }}
            onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-hint)' }}
          >
            ×
          </button>

          {/* Confetti layer */}
          {stage === 'confetti' && (
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', borderRadius: '20px', zIndex: 1 }}>
              {confettiParticles.map(p => (
                <motion.div
                  key={p.id}
                  initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
                  animate={{ y: '110vh', opacity: [1, 1, 0], rotate: 360 * 3 }}
                  transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
                  style={{
                    position: 'absolute',
                    top: 0, left: 0,
                    width: p.size, height: p.size,
                    borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                    backgroundColor: p.color,
                    opacity: 0.85,
                  }}
                />
              ))}
            </div>
          )}

          {/* Avatar — always visible */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: '20px', position: 'relative', zIndex: 2 }}
          >
            <Avatar waving={stage === 'avatar-enter' || stage === 'intro'} />
          </motion.div>

          {/* ── AVATAR ENTERING (just avatar + pulse) ── */}
          {stage === 'avatar-enter' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--color-text-hint)', letterSpacing: '0.1em' }}
            >
              ...
            </motion.div>
          )}

          {/* ── INTRO — typewriter ── */}
          {(stage === 'intro' || stage === 'start') && (
            <motion.div
              key="intro-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ width: '100%', position: 'relative', zIndex: 2 }}
            >
              {/* Wave emoji */}
              <div style={{ fontSize: '28px', marginBottom: '14px' }}>👋</div>

              {/* Typewriter text */}
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(15px, 2.5vw, 17px)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.75,
                  whiteSpace: 'pre-wrap',
                  textAlign: 'left',
                  marginBottom: '24px',
                  minHeight: '180px',
                }}
              >
                {stage === 'intro' ? introText : INTRO_FULL}
              </div>

              {/* Click to begin hint */}
              <AnimatePresence>
                {(introDone || stage === 'start') && (
                  <motion.div
                    key="hint"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-text-hint)', marginBottom: '16px', fontStyle: 'italic' }}>
                      (Click below to begin.)
                    </p>
                    <button
                      onClick={handleStart}
                      style={{
                        ...btnBase,
                        backgroundColor: PURPLE,
                        color: '#ffffff',
                        fontSize: '18px',
                        padding: '13px 36px',
                      }}
                      onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.88' }}
                      onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
                    >
                      Start →
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ── QUESTIONS ── */}
          {stage === 'question' && (
            <AnimatePresence mode="wait">
              {qVisible && (
                <motion.div
                  key={`q-${qIndex}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  style={{ width: '100%', position: 'relative', zIndex: 2 }}
                >
                  {/* Progress indicator */}
                  <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginBottom: '20px' }}>
                    {QUESTIONS.map((_, i) => (
                      <div
                        key={i}
                        style={{
                          width: i === qIndex ? '20px' : '6px',
                          height: '6px',
                          borderRadius: '3px',
                          backgroundColor: i <= qIndex ? PURPLE : 'rgba(255,255,255,0.12)',
                          transition: 'all 0.3s ease',
                        }}
                      />
                    ))}
                  </div>

                  {/* Question label */}
                  <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: TEAL,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '10px',
                  }}>
                    Question {qIndex + 1} of {QUESTIONS.length}
                  </p>

                  {/* Question */}
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(18px, 3.5vw, 22px)',
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    lineHeight: 1.3,
                    marginBottom: '20px',
                  }}>
                    {QUESTIONS[qIndex].question}
                  </h3>

                  {/* Answer — appears on click */}
                  <AnimatePresence>
                    {showAnswer && (
                      <motion.div
                        key="answer"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                        style={{
                          backgroundColor: 'rgba(124,111,247,0.07)',
                          border: '0.5px solid rgba(124,111,247,0.2)',
                          borderRadius: '12px',
                          padding: '18px 20px',
                          marginBottom: '20px',
                          textAlign: 'left',
                        }}
                      >
                        {QUESTIONS[qIndex].answer.map((line, i) => (
                          <motion.p
                            key={i}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.25, delay: i * 0.1 }}
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'clamp(15px, 2.5vw, 17px)',
                              color: 'var(--color-text-primary)',
                              lineHeight: 1.7,
                              margin: i === 0 ? 0 : '4px 0 0',
                            }}
                          >
                            {line}
                          </motion.p>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Action button */}
                  {!showAnswer ? (
                    <motion.button
                      key="reveal-btn"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onClick={handleShowAnswer}
                      style={{
                        ...btnBase,
                        backgroundColor: PURPLE,
                        color: '#ffffff',
                        padding: '11px 28px',
                      }}
                      onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.87' }}
                      onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
                    >
                      What did she say? →
                    </motion.button>
                  ) : (
                    <motion.div
                      key="next-wrap"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <button
                        onClick={handleNext}
                        style={{
                          ...btnBase,
                          backgroundColor: 'transparent',
                          color: TEAL,
                          border: `1px solid rgba(45,212,168,0.35)`,
                          fontSize: '15px',
                          padding: '9px 22px',
                        }}
                        onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(45,212,168,0.07)' }}
                        onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent' }}
                      >
                        {qIndex < QUESTIONS.length - 1 ? '→ Ready for another?' : '→ That\'s all the questions!'}
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* ── CONFETTI stage placeholder ── */}
          {stage === 'confetti' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ fontSize: '48px', position: 'relative', zIndex: 2 }}
            >
              🎉
            </motion.div>
          )}

          {/* ── FINAL CARD ── */}
          {stage === 'final' && (
            <motion.div
              key="final"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{ width: '100%', position: 'relative', zIndex: 2 }}
            >
              <div style={{ fontSize: '28px', marginBottom: '16px' }}>👋</div>

              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(15px, 2.5vw, 17px)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.8,
                  textAlign: 'left',
                  marginBottom: '28px',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {`Okay...\n\nThat's all the bonus content I had.\n\nIf you smiled even once...\nMission accomplished. 😄\n\nAnd if, somewhere between the projects and these silly answers, you thought...`}
                <br /><br />
                <em style={{ color: 'var(--color-text-primary)', fontStyle: 'italic' }}>
                  "She'd probably be fun to work with."
                </em>
                <br /><br />
                {`Then this tiny button has officially done its job.\n\nUntil we meet again,`}
                <br />
                <strong style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>
                  – Harshika 👋
                </strong>
              </div>

              {/* Final buttons */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <a
                  href="mailto:harshikagahlot01@gmail.com"
                  style={{
                    ...btnBase,
                    backgroundColor: PURPLE,
                    color: '#ffffff',
                    textDecoration: 'none',
                  }}
                  onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.87' }}
                  onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1' }}
                >
                  📧 Let's Talk
                </a>
                <button
                  onClick={handleRestart}
                  style={{
                    ...btnBase,
                    backgroundColor: 'transparent',
                    color: 'var(--color-text-secondary)',
                    border: '1px solid var(--color-border-default)',
                  }}
                  onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(124,111,247,0.4)' }}
                  onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border-default)' }}
                >
                  ↻ Explore Again
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SayHelloOverlay
