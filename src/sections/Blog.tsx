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
    id: 5,
    date: 'Jun 2026',
    readTime: '4 min read',
    title: "Blinkit: A Convenience Machine Disguised as a Grocery App",
    excerpt: "A product teardown exploring how Blinkit uses speed, convenience, psychology, packaging, and customer experience to become much more than a grocery delivery app.",
    href: 'https://productandperspective.blogspot.com/2026/06/blinkit-isnt-selling-groceries-its.html',
  },
  {
    id: 4,
    date: 'Jun 2026',
    readTime: '5 min read',
    title: "Duolingo Isn't Teaching Language. It's Teaching Consistency.",
    excerpt: "I explored Duolingo from a product perspective and discovered that its real strength is not language learning but habit formation. From streaks and XP to the angry red bird icon that appears after missing a lesson, every feature is designed around one goal: making users come back tomorrow.",
    href: 'https://productandperspective.blogspot.com/2026/06/duolingo-isnt-teaching-language-its.html',
  },
  {
    id: 1,
    date: 'Apr 2026',
    readTime: '6 min read',
    title: 'What Early User Feedback Taught Me About Why People Stop Using Habit Apps',
    excerpt: "Building HabitMetric and collecting early user responses revealed critical friction points. Here's why users churn and how we can design better engagement loops.",
    href: 'https://productandperspective.blogspot.com/2026/04/what-early-user-feedback-taught-me.html',
  },
  {
    id: 2,
    date: 'Apr 2026',
    readTime: '4 min read',
    title: 'Why I’m Starting My Product Management Journey as a Student',
    excerpt: "Starting early allows for building projects, dissecting popular apps, and seeing decisions behind screens. Here's how I structured my learning path.",
    href: 'https://productandperspective.blogspot.com/2026/04/why-im-starting-my-product-management.html',
  },
  {
    id: 3,
    date: 'May 2026',
    readTime: 'Visit Blog',
    title: 'Product & Perspective',
    excerpt: "Explore my blog for structured PM teardowns, interaction psychology observations, user engagement analysis, and reflections on building real products.",
    href: 'https://productandperspective.blogspot.com/',
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
            fontSize: '14px',
            color: 'var(--color-text-hint)',
          }}
        >
          {post.date}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
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
          fontSize: '23px',
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
          fontSize: '17px',
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
          {hoveredLink && post.href === '#' && (
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
                fontSize: '14px',
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
          target={post.href !== '#' ? '_blank' : undefined}
          rel={post.href !== '#' ? 'noopener noreferrer' : undefined}
          onMouseEnter={() => setHoveredLink(true)}
          onMouseLeave={() => setHoveredLink(false)}
          onClick={(e) => {
            if (post.href === '#') e.preventDefault()
          }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
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
                fontSize: '15px',
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
              fontSize: '20px',
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
