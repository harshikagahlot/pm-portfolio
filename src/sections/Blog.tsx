import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { VARIANTS } from '../lib/motion'

interface BlogPost {
  id: number
  date: string
  readTime: string
  title: string
  excerpt: string
  href: string
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    date: 'Jan 2024',
    readTime: '5 min read',
    title: 'Why I stopped caring about streaks',
    excerpt: "Building HabitMetric taught me that the products we design for 'ideal users' quietly exclude everyone else. Here's what I changed and why.",
    href: '#',
  },
  {
    id: 2,
    date: 'Feb 2024',
    readTime: '3 min read',
    title: 'The feature I almost shipped (and didn\'t)',
    excerpt: 'SusWord nearly launched with animated word connection lines. I cut it two days before release. This is the decision-making process behind that call.',
    href: '#',
  },
  {
    id: 3,
    date: 'Apr 2024',
    readTime: '6 min read',
    title: 'What Blinkit taught me about product promises',
    excerpt: "A product promise isn't a tagline. It's a contract. Every design decision either honours it or quietly breaks it. Blinkit gets this better than almost anyone.",
    href: '#',
  },
]

const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  const [hoveredLink, setHoveredLink] = useState(false)
  const [isCardHovered, setIsCardHovered] = useState(false)

  return (
    <motion.article
      variants={VARIANTS.fadeUp}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      animate={isCardHovered ? { y: -5 } : { y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' as const }}
      style={{
        backgroundColor: 'var(--color-bg-card)',
        border: '0.5px solid var(--color-border-subtle)',
        borderRadius: '14px',
        padding: '28px 24px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'border-color 0.2s ease',
        borderColor: isCardHovered ? 'rgba(45, 212, 168, 0.3)' : 'var(--color-border-subtle)',
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--color-text-hint)',
          }}
        >
          {post.date}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            color: 'var(--color-text-hint)',
          }}
        >
          {post.readTime}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '20px',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          lineHeight: 1.3,
          marginTop: '14px',
        }}
      >
        {post.title}
      </h3>

      {/* Excerpt */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.65,
          marginTop: '10px',
          flex: 1, // pushes bottom link down if heights differ
        }}
      >
        {post.excerpt}
      </p>

      {/* Read link with tooltip */}
      <div style={{ marginTop: '20px', position: 'relative', display: 'inline-block', width: 'fit-content' }}>
        <AnimatePresence>
          {hoveredLink && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15, ease: 'easeOut' as const }}
              style={{
                position: 'absolute',
                bottom: '100%',
                left: '0px',
                marginBottom: '6px',
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border-default)',
                borderRadius: '6px',
                padding: '4px 10px',
                color: 'var(--color-text-secondary)',
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                whiteSpace: 'nowrap',
                zIndex: 10,
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
            >
              coming soon
            </motion.div>
          )}
        </AnimatePresence>

        <a
          href={post.href}
          onMouseEnter={() => setHoveredLink(true)}
          onMouseLeave={() => setHoveredLink(false)}
          onClick={(e) => e.preventDefault()}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            fontWeight: 500,
            color: 'var(--color-accent-teal)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            borderBottom: '1px solid transparent',
            transition: 'border-color 0.2s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderBottomColor = 'var(--color-accent-teal)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderBottomColor = 'transparent'
          }}
        >
          Read →
        </a>
      </div>
    </motion.article>
  )
}

const Blog: React.FC = () => {
  return (
    <section
      id="blog"
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
          viewport={{ once: true, margin: '-60px' }}
          style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '56px' }}
        >
          {/* Overline decorative line */}
          <motion.div
            variants={VARIANTS.fadeUp}
            style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <div style={{ width: '24px', height: '1px', backgroundColor: 'var(--color-accent-teal)' }} />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--color-text-hint)',
              }}
            >
              writing
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={VARIANTS.fadeUp}
            style={{
              fontFamily: 'var(--font-display)',
              lineHeight: 1.15,
              margin: 0,
            }}
            className="blog-heading"
          >
            <span style={{ display: 'block', color: 'var(--color-text-primary)', fontWeight: 800 }}>
              Things I've been
            </span>
            <span style={{ display: 'block', color: 'var(--color-text-secondary)', fontWeight: 800 }}>
              thinking about.
            </span>
          </motion.h2>

          {/* Sub-paragraph */}
          <motion.p
            variants={VARIANTS.fadeUp}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '17px',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6,
              maxWidth: '460px',
              margin: 0,
            }}
          >
            Product decisions. Frontend lessons. Observations from building things and breaking them.
          </motion.p>
        </motion.div>

        {/* Blog Post Cards Grid */}
        <motion.div
          variants={VARIANTS.staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="blog-grid"
        >
          {BLOG_POSTS.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </motion.div>
      </div>

      {/* Styled Grid Classes */}
      <style>{`
        .blog-heading {
          font-size: 56px;
        }
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 1024px) {
          .blog-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 767px) {
          .blog-heading {
            font-size: 32px;
          }
          .blog-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}

export default Blog
