import React, { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { TRANSITIONS, VARIANTS } from '../lib/motion'
import { scrollTo } from '../lib/smoothScroll'

interface Tool {
  id: string
  name: string
  context: string
  howIUseIt: string
  brandColor: string
  monogram: string
}

interface ToolCategory {
  title: string
  emoji: string
  description?: string
  tools: Tool[]
  isLearning?: boolean
}

const TOOLKIT_DATA: ToolCategory[] = [
  {
    title: 'Things I Use Regularly',
    emoji: '⚡',
    tools: [
      { id: 'html', name: 'HTML', context: 'Building websites and interfaces.', howIUseIt: 'I write semantic HTML to ensure accessibility and structure.', brandColor: '#E34F26', monogram: '</>' },
      { id: 'css', name: 'CSS', context: 'Styling, layouts, responsive design.', howIUseIt: 'I love Vanilla CSS, custom properties, and fine-tuning spacing.', brandColor: '#1572B6', monogram: '{ }' },
      { id: 'js', name: 'JavaScript', context: 'Interactivity and frontend logic.', howIUseIt: 'Used for dynamic states, DOM manipulation, and smooth interactions.', brandColor: '#F7DF1E', monogram: 'JS' },
      { id: 'github', name: 'GitHub', context: 'Version control & collaboration.', howIUseIt: 'Branching, merging, and reviewing code in repositories.', brandColor: '#ffffff', monogram: 'GH' },
      { id: 'vercel', name: 'Vercel', context: 'Deployment & hosting.', howIUseIt: 'Push-to-deploy for all my frontend personal projects.', brandColor: '#ffffff', monogram: '▲' },
      { id: 'excel', name: 'Microsoft Excel', context: 'Data organization.', howIUseIt: 'Basic tracking, analysis, and structuring unorganized data.', brandColor: '#217346', monogram: 'XL' },
    ]
  },
  {
    title: 'Product & Design Tools',
    emoji: '🎨',
    tools: [
      { id: 'figma', name: 'Figma', context: 'Wireframing & interfaces.', howIUseIt: 'I map out product flows before writing a single line of code.', brandColor: '#F24E1E', monogram: 'Fg' },
      { id: 'canva', name: 'Canva', context: 'Visuals & presentations.', howIUseIt: 'Quick graphics, resumes, and content creation workflows.', brandColor: '#00C4CC', monogram: 'Cv' },
      { id: 'notion', name: 'Notion', context: 'Documentation & planning.', howIUseIt: 'My second brain. I organize timelines and tear down products here.', brandColor: '#ffffff', monogram: 'N' },
      { id: 'jira', name: 'Jira', context: 'Task tracking.', howIUseIt: 'Understanding agile workflows and product issue tracking.', brandColor: '#0052CC', monogram: 'Jr' },
    ]
  },
  {
    title: 'AI-Assisted Workflow',
    emoji: '🤖',
    tools: [
      { id: 'chatgpt', name: 'ChatGPT', context: 'Research & coding assistance.', howIUseIt: 'Bouncing ideas around, debugging weird edge cases, and learning.', brandColor: '#10A37F', monogram: 'GPT' },
      { id: 'claude', name: 'Claude', context: 'Product thinking & writing.', howIUseIt: 'Structuring complex documents and deep product analysis.', brandColor: '#D97757', monogram: 'Cl' },
      { id: 'gemini', name: 'Gemini', context: 'Idea exploration.', howIUseIt: 'Cross-referencing research and exploring technical concepts.', brandColor: '#4285F4', monogram: 'Gm' },
      { id: 'copilot', name: 'GitHub Copilot', context: 'Code suggestions.', howIUseIt: 'Speeding up boilerplate generation and autocomplete workflows.', brandColor: '#ffffff', monogram: 'Cp' },
    ]
  },
  {
    title: 'Currently Learning Through Projects',
    emoji: '🌱',
    isLearning: true,
    tools: [
      { id: 'react', name: 'React', context: 'Component architecture.', howIUseIt: 'Building modular UIs and managing application state.', brandColor: '#61DAFB', monogram: 'Re' },
      { id: 'tailwind', name: 'Tailwind CSS', context: 'Utility-first styling.', howIUseIt: 'Speeding up prototyping without leaving the TSX file.', brandColor: '#06B6D4', monogram: 'Tw' },
      { id: 'node', name: 'Node.js', context: 'Backend environments.', howIUseIt: 'Running scripts, APIs, and real-time backend logic.', brandColor: '#339933', monogram: 'Nd' },
      { id: 'socket', name: 'Socket.IO', context: 'Real-time syncing.', howIUseIt: 'Powering live multiplayer states and lobby synchronization.', brandColor: '#ffffff', monogram: 'Sk' },
      { id: 'pm', name: 'Product Management', context: 'Strategic thinking.', howIUseIt: 'Prioritizing features, defining scope, and user empathy.', brandColor: 'var(--color-accent-purple)', monogram: 'PM' },
      { id: 'research', name: 'User Research', context: 'Understanding pain points.', howIUseIt: 'Talking to users to find out why they actually churn.', brandColor: 'var(--color-accent-coral)', monogram: 'UR' },
      { id: 'teardowns', name: 'Product Teardowns', context: 'Analyzing mechanics.', howIUseIt: 'Deconstructing apps to learn behavioral design.', brandColor: 'var(--color-accent-teal)', monogram: 'PT' },
      { id: 'ixd', name: 'Interaction Design', context: 'Micro-interactions.', howIUseIt: 'Crafting the small details that make software feel alive.', brandColor: 'var(--color-text-primary)', monogram: 'Ix' },
    ]
  }
]

const ToolCard: React.FC<{ tool: Tool; isLearning?: boolean }> = ({ tool, isLearning }) => {
  const [isHovered, setIsHovered] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
      animate={isHovered && !shouldReduceMotion ? { y: -4, scale: 1.02 } : { y: 0, scale: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      style={{
        backgroundColor: isLearning ? 'rgba(22, 22, 31, 0.4)' : 'var(--color-bg-card)',
        border: `1px solid ${isHovered ? tool.brandColor : 'var(--color-border-subtle)'}`,
        borderRadius: '12px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease',
        opacity: isLearning && !isHovered ? 0.8 : 1,
      }}
    >
      {isLearning && (
        <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
          <span style={{
            fontSize: '10px',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-mono)',
            backgroundColor: 'rgba(255,255,255,0.05)',
            padding: '4px 8px',
            borderRadius: '100px',
            color: 'var(--color-text-hint)'
          }}>Exploring</span>
        </div>
      )}

      {/* Header: Monogram + Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--color-border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: '15px',
            fontWeight: 700,
            color: tool.brandColor,
          }}
        >
          {tool.monogram}
        </div>
        <div>
          <h4 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
            {tool.name}
          </h4>
        </div>
      </div>

      {/* Content Swap on Hover */}
      <div style={{ position: 'relative', minHeight: '60px' }}>
        <AnimatePresence mode="wait">
          {!isHovered ? (
            <motion.p
              key="context"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{
                margin: 0,
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.5,
              }}
            >
              {tool.context}
            </motion.p>
          ) : (
            <motion.div
              key="howIUseIt"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: tool.brandColor, textTransform: 'uppercase' }}>How I use it</span>
              <p
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: 'var(--color-text-primary)',
                  lineHeight: 1.5,
                }}
              >
                {tool.howIUseIt}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

const Toolkit: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      style={{
        paddingTop: '120px',
        paddingBottom: '120px',
        backgroundColor: '#050508', // Slightly darker to feel immersive
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        
        {/* Section Header */}
        <motion.div
          variants={VARIANTS.staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '80px' }}
        >
          {/* Overline */}
          <motion.div variants={VARIANTS.fadeUp} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '24px', height: '1px', backgroundColor: 'var(--color-accent-teal)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-text-hint)' }}>
              workstation
            </span>
          </motion.div>

          <motion.h2
            variants={VARIANTS.fadeUp}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 56px)', lineHeight: 1.15, margin: 0 }}
          >
            <span style={{ display: 'block', color: 'var(--color-text-primary)', fontWeight: 800 }}>🧰 Toolkit</span>
          </motion.h2>

          <motion.p
            variants={VARIANTS.fadeUp}
            style={{ fontFamily: 'var(--font-body)', fontSize: '20px', color: 'var(--color-text-secondary)', lineHeight: 1.6, maxWidth: '500px', margin: 0 }}
          >
            The tools, workflows, and systems I currently use while building projects, exploring products, and documenting what I learn.
          </motion.p>
        </motion.div>

        {/* Categories */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
          {TOOLKIT_DATA.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.05 } }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <span style={{ fontSize: '24px' }}>{category.emoji}</span>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  {category.title}
                </h3>
              </div>
              
              <div
                className="toolkit-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '20px'
                }}
              >
                {category.tools.map((tool) => (
                  <motion.div key={tool.id} variants={VARIANTS.fadeUp}>
                    <ToolCard tool={tool} isLearning={category.isLearning} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Microcopy & Next Section Connector */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={VARIANTS.fadeUp}
          style={{
            marginTop: '100px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '32px'
          }}
        >
          <div style={{ padding: '24px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--color-border-subtle)', maxWidth: '600px' }}>
            <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              "I believe projects teach better than checklists. Most of what I know comes from building, breaking, fixing, and rebuilding things."
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '18px', color: 'var(--color-text-secondary)' }}>
              See what I've built with these tools.
            </p>
            <motion.button
              onClick={() => scrollTo('#work')}
              whileHover={shouldReduceMotion ? {} : { backgroundColor: 'rgba(124,111,247,0.08)', borderColor: 'rgba(124,111,247,0.5)' }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              transition={TRANSITIONS.fast}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '18px',
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
          </div>
        </motion.div>
        
      </div>
      
      <style>{`
        @media (max-width: 767px) {
          .toolkit-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

export default Toolkit
