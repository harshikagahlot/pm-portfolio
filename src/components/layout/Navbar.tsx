import React, { useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from 'framer-motion'
import { TRANSITIONS } from '../../lib/motion'

const NAV_LINKS = ['Work', 'Thinking', 'Teardown', 'Timeline', 'Blog']

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const { scrollY } = useScroll()

  // Background opacity: transparent at 0px → full at 80px
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1])
  const blurAmount = useTransform(scrollY, [0, 80], [0, 12])

  return (
    <>
      <motion.nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '24px',
          paddingRight: '24px',
        }}
      >
        {/* Animated background layer */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'var(--color-bg-secondary)',
            opacity: shouldReduceMotion ? 0 : bgOpacity,
            backdropFilter: shouldReduceMotion ? 'none' : `blur(${blurAmount}px)`,
            borderBottom: '1px solid var(--color-border-subtle)',
          }}
        />

        {/* Logo */}
        <div style={{ position: 'relative', flex: 1 }}>
          <a
            href="/"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '18px',
              color: 'var(--color-text-primary)',
              textDecoration: 'none',
              letterSpacing: '-0.02em',
            }}
          >
            Harshika
          </a>
        </div>

        {/* Desktop nav links */}
        <nav
          aria-label="Main navigation"
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
          className="hidden-mobile"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                textDecoration: 'none',
                transition: `color ${TRANSITIONS.fast.duration}s ease`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-text-primary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-secondary)'
              }}
            >
              {link}
            </a>
          ))}

          {/* Say hello pill */}
          <motion.a
            href="mailto:hello@aditya.dev"
            whileHover={shouldReduceMotion ? {} : { backgroundColor: 'rgba(124,111,247,0.1)' }}
            transition={TRANSITIONS.fast}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--color-text-primary)',
              textDecoration: 'none',
              padding: '6px 16px',
              borderRadius: '100px',
              border: '1px solid var(--color-border-default)',
              transition: `background-color ${TRANSITIONS.fast.duration}s ease`,
              cursor: 'pointer',
            }}
          >
            Say hello →
          </motion.a>
        </nav>

        {/* Mobile hamburger */}
        <button
          id="mobile-menu-toggle"
          aria-label="Toggle mobile menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            position: 'relative',
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            color: 'var(--color-text-primary)',
            flexDirection: 'column',
            gap: '5px',
          }}
          className="show-mobile"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={TRANSITIONS.fast}
            style={{
              display: 'block',
              width: '22px',
              height: '2px',
              backgroundColor: 'currentColor',
              borderRadius: '2px',
              transformOrigin: 'center',
            }}
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={TRANSITIONS.fast}
            style={{
              display: 'block',
              width: '22px',
              height: '2px',
              backgroundColor: 'currentColor',
              borderRadius: '2px',
            }}
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={TRANSITIONS.fast}
            style={{
              display: 'block',
              width: '22px',
              height: '2px',
              backgroundColor: 'currentColor',
              borderRadius: '2px',
              transformOrigin: 'center',
            }}
          />
        </button>
      </motion.nav>

      {/* Mobile slide-down drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={shouldReduceMotion ? { duration: 0 } : TRANSITIONS.base}
            style={{
              position: 'fixed',
              top: '56px',
              left: 0,
              right: 0,
              zIndex: 99,
              backgroundColor: 'var(--color-bg-secondary)',
              borderBottom: '1px solid var(--color-border-subtle)',
              padding: '16px 24px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  color: 'var(--color-text-secondary)',
                  textDecoration: 'none',
                  padding: '8px 0',
                  borderBottom: '1px solid var(--color-border-subtle)',
                }}
              >
                {link}
              </a>
            ))}
            <a
              href="mailto:hello@aditya.dev"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'var(--color-text-primary)',
                textDecoration: 'none',
                padding: '10px 16px',
                borderRadius: '100px',
                border: '1px solid var(--color-border-default)',
                textAlign: 'center',
                marginTop: '8px',
              }}
            >
              Say hello →
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive utility styles */}
      <style>{`
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 768px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  )
}

export default Navbar
