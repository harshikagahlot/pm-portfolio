import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from 'framer-motion'
import { TRANSITIONS } from '../../lib/motion'
import { scrollTo } from '../../lib/smoothScroll'

const NAV_LINKS = ['Work', 'Thinking', 'Teardown', 'Timeline', 'Blog']

// Maps display label to HTML target ID
const LINK_TARGETS: Record<string, string> = {
  Work: '#work',
  Thinking: '#thinking',
  Teardown: '#teardown',
  Timeline: '#timeline',
  Blog: '#blog',
}

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollY } = useScroll()

  // Background opacity: transparent at 0px → full at 80px
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1])
  const blurAmount = useTransform(scrollY, [0, 80], [0, 12])

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['thinking', 'work', 'teardown', 'timeline', 'blog']
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -40% 0px', // triggers when the section is centered in the viewport
      threshold: 0,
    }

    const observerCallbacks = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallbacks, observerOptions)
    
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    // Fallback: If at the very top, clear active section
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection(null)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id)
        if (el) observer.unobserve(el)
      })
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, label: string) => {
    e.preventDefault()
    const target = LINK_TARGETS[label]
    if (target) {
      scrollTo(target, -60)
    }
    setMobileOpen(false)
  }

  const handleSayHelloClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollTo('footer', 0)
    setMobileOpen(false)
  }

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
            onClick={(e) => {
              e.preventDefault()
              scrollTo('#hero', -60)
              setMobileOpen(false)
            }}
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
          {NAV_LINKS.map((link) => {
            const targetId = LINK_TARGETS[link].substring(1) // remove '#'
            const isActive = activeSection === targetId

            return (
              <a
                key={link}
                href={LINK_TARGETS[link]}
                onClick={(e) => handleLinkClick(e, link)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                  textDecoration: 'none',
                  position: 'relative',
                  paddingBottom: '4px',
                  transition: `color ${TRANSITIONS.fast.duration}s ease`,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'var(--color-text-primary)'
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'var(--color-text-secondary)'
                }}
              >
                {link}
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-dot"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={shouldReduceMotion ? { duration: 0 } : TRANSITIONS.fast}
                    style={{
                      position: 'absolute',
                      bottom: '-4px',
                      left: 'calc(50% - 2px)',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-accent-purple)',
                    }}
                  />
                )}
              </a>
            )
          })}

          {/* Say hello pill */}
          <motion.a
            href="#footer"
            onClick={handleSayHelloClick}
            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            transition={TRANSITIONS.fast}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--color-text-primary)',
              textDecoration: 'none',
              padding: '6px 16px',
              borderRadius: '100px',
              border: '1px solid var(--color-border-default)',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              transition: 'border-color 0.2s ease, background-color 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent-purple)'
              e.currentTarget.style.backgroundColor = 'rgba(124,111,247,0.06)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border-default)'
              e.currentTarget.style.backgroundColor = 'transparent'
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
            {NAV_LINKS.map((link) => {
              const targetId = LINK_TARGETS[link].substring(1)
              const isActive = activeSection === targetId

              return (
                <a
                  key={link}
                  href={LINK_TARGETS[link]}
                  onClick={(e) => handleLinkClick(e, link)}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '16px',
                    color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                    textDecoration: 'none',
                    padding: '8px 0',
                    borderBottom: '1px solid var(--color-border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{link}</span>
                  {isActive && (
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-accent-purple)',
                      }}
                    />
                  )}
                </a>
              )
            })}
            <a
              href="#footer"
              onClick={handleSayHelloClick}
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
