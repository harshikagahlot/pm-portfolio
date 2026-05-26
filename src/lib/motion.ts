import type { Transition, Variants } from 'framer-motion'

// ── Transition Presets ───────────────────────────────────────
export const TRANSITIONS: Record<string, Transition> = {
  fast: {
    duration: 0.2,
    ease: [0.25, 0.46, 0.45, 0.94],
  },
  base: {
    duration: 0.5,
    ease: [0.25, 0.46, 0.45, 0.94],
  },
  slow: {
    duration: 0.9,
    ease: [0.25, 0.46, 0.45, 0.94],
  },
  cinematic: {
    duration: 1.4,
    ease: [0.16, 1, 0.3, 1],
  },
}

// ── Reusable Framer Motion Variants ─────────────────────────
export const VARIANTS: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  staggerContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1 },
  },
}
