import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { VARIANTS, TRANSITIONS } from '../../lib/motion'

export const Footer: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()
  const [helloHover, setHelloHover] = useState(false)
  const [resumeHover, setResumeHover] = useState(false)

  return (
    <footer
      style={{
        width: '100%',
        backgroundColor: 'rgba(10, 10, 15, 0.95)',
        borderTop: '1px solid var(--color-border-subtle)',
        paddingTop: '80px',
        paddingBottom: '48px',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 40px' }}>
        
        {/* TOP HALF — The CTA block (centered) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={VARIANTS.staggerChildren}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* Centered Heading */}
          <motion.h2
            variants={VARIANTS.fadeUp}
            style={{
              fontFamily: 'var(--font-display)',
              margin: 0,
              lineHeight: 1.15,
            }}
            className="footer-cta-title"
          >
            <span style={{ display: 'block', color: 'var(--color-text-primary)', fontWeight: 800 }}>
              Let's build something
            </span>
            <span
              className="gradient-text"
              style={{
                display: 'block',
                fontWeight: 800,
              }}
            >
              worth remembering.
            </span>
          </motion.h2>

          {/* Sub-line */}
          <motion.p
            variants={VARIANTS.fadeUp}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '19px',
              color: 'var(--color-text-secondary)',
              marginTop: '16px',
              maxWidth: '440px',
              lineHeight: 1.6,
            }}
          >
            I'm currently open to product design, frontend, and full-stack roles.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={VARIANTS.fadeUp}
            transition={{ delay: 0.2 }}
            style={{
              display: 'flex',
              gap: '12px',
              marginTop: '32px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {/* Primary Button */}
            <motion.a
              href="mailto:harshikagahlot01@gmail.com"
              onMouseEnter={() => setHelloHover(true)}
              onMouseLeave={() => setHelloHover(false)}
              animate={helloHover ? { scale: 1.03 } : { scale: 1 }}
              transition={shouldReduceMotion ? { duration: 0 } : TRANSITIONS.fast}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '18px',
                fontWeight: 500,
                color: '#ffffff',
                backgroundColor: 'var(--color-accent-purple)',
                padding: '14px 32px',
                borderRadius: '10px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#8c80f8' // lighter purple
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-accent-purple)'
              }}
            >
              Say hello →
            </motion.a>

            {/* Secondary Button — Download Resume */}
            <motion.a
              href="/Harshika_Gahlot_Resume.pdf"
              download="Harshika_Gahlot_Resume.pdf"
              onMouseEnter={() => setResumeHover(true)}
              onMouseLeave={() => setResumeHover(false)}
              onClick={(e) => {
                e.preventDefault()
                fetch('/Harshika_Gahlot_Resume.pdf')
                  .then((res) => res.blob())
                  .then((blob) => {
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = 'Harshika_Gahlot_Resume.pdf'
                    document.body.appendChild(a)
                    a.click()
                    a.remove()
                    URL.revokeObjectURL(url)
                  })
              }}
              animate={resumeHover ? { scale: 1.03 } : { scale: 1 }}
              transition={shouldReduceMotion ? { duration: 0 } : TRANSITIONS.fast}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '18px',
                fontWeight: 500,
                color: 'var(--color-text-primary)',
                padding: '14px 32px',
                borderRadius: '10px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--color-border-default)',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'rgba(124, 111, 247, 0.5)' // accent.purple at 50%
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border-default)'
              }}
            >
              Download resume
            </motion.a>
          </motion.div>
        </motion.div>

        {/* BOTTOM HALF — Links + copyright */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20px' }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.3,
                duration: 0.6,
                ease: 'easeOut',
              },
            },
          }}
          style={{
            marginTop: '84px',
            borderTop: '1px solid var(--color-border-subtle)',
            paddingTop: '32px',
          }}
          className="footer-bottom-grid"
        >
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '19px',
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.01em',
              }}
            >
              Harshika
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                color: 'var(--color-text-secondary)',
                marginBottom: '12px'
              }}
            >
              Product thinker & frontend builder
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <a
                href="mailto:harshikagahlot01@gmail.com"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '15px',
                  color: 'var(--color-text-secondary)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-primary)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-secondary)'
                }}
              >
                harshikagahlot01@gmail.com
              </a>
              <a
                href="tel:+918279334467"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '15px',
                  color: 'var(--color-text-secondary)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-primary)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-secondary)'
                }}
              >
                +91 8279 334 467
              </a>
            </div>
          </div>

          {/* Center Social Links */}
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            {[
              { label: 'GitHub', url: 'https://github.com/harshikagahlot' },
              { label: 'Blog', url: 'https://productandperspective.blogspot.com/' },
              { label: 'Portfolio', url: 'https://harshikagahlot.github.io/harshika-portfolio/' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  color: 'var(--color-text-secondary)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-primary)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-secondary)'
                }}
              >
                {social.label}
              </a>
            ))}
          </div>


          {/* Right Copyright */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
            className="footer-right-column"
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                color: 'var(--color-text-hint)',
              }}
            >
              Built with React, Three.js & too much curiosity.
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
                color: 'var(--color-text-hint)',
              }}
            >
              © 2024 Harshika
            </span>
          </div>
        </motion.div>

      </div>

      {/* Styled Responsive Classes */}
      <style>{`
        .footer-cta-title {
          font-size: 52px;
        }
        .footer-bottom-grid {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .footer-right-column {
          text-align: right;
        }
        @media (max-width: 767px) {
          .footer-cta-title {
            font-size: 32px;
          }
          .footer-bottom-grid {
            flex-direction: column;
            gap: 32px;
            text-align: center;
          }
          .footer-right-column {
            text-align: center;
          }
        }
      `}</style>
    </footer>
  )
}
export default Footer
