import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Exported singleton — null until useSmoothScroll has run.
// Import this in any component to call lenis.scrollTo(...)
export let lenis: Lenis | null = null

export function useSmoothScroll(): void {
  useEffect(() => {
    // Create Lenis instance
    const instance = new Lenis({
      lerp: 0.06,           // slightly more lerp = heavier, more cinematic momentum
      smoothWheel: true,
      wheelMultiplier: 0.8, // slightly slower wheel response = more controlled feel
      touchMultiplier: 1.5, // touch feels responsive on mobile
    })

    // Wire scroll event → ScrollTrigger.update
    instance.on('scroll', ScrollTrigger.update)

    // Wire Lenis RAF loop → GSAP ticker
    gsap.ticker.add((time) => {
      instance.raf(time * 1000)
    })

    // Prevent GSAP lag-smoothing from interfering with Lenis timing
    gsap.ticker.lagSmoothing(0)

    // Expose singleton for scrollTo() helper
    lenis = instance

    return () => {
      instance.destroy()
      lenis = null
    }
  }, [])
}

/**
 * Scrolls to a CSS selector target using Lenis with an offset.
 * Falls back to native scrollIntoView if Lenis is not yet initialized.
 */
export function scrollTo(target: string, offset = -60): void {
  if (lenis) {
    lenis.scrollTo(target, { offset })
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
  }
}
