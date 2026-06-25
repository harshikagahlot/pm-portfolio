import React, { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion, LayoutGroup } from 'framer-motion'
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
    title: 'Build',
    emoji: '⚡',
    tools: [
      { id: 'react', name: 'React', context: 'Component architecture.', howIUseIt: 'Building modular, component-based UIs with hooks and state management.', brandColor: '#61DAFB', monogram: 'Re' },
      { id: 'ts', name: 'TypeScript', context: 'Type-safe development.', howIUseIt: 'Adding type safety to JavaScript to reduce runtime errors and improve code clarity.', brandColor: '#3178C6', monogram: 'TS' },
      { id: 'js', name: 'JavaScript', context: 'Interactivity and frontend logic.', howIUseIt: 'Writing dynamic logic, DOM manipulation and API integrations.', brandColor: '#F7DF1E', monogram: 'JS' },
      { id: 'html', name: 'HTML', context: 'Building websites and interfaces.', howIUseIt: 'Writing semantic HTML to ensure accessibility and clean structure.', brandColor: '#E34F26', monogram: '</>' },
      { id: 'css', name: 'CSS', context: 'Styling, layouts, responsive design.', howIUseIt: 'Vanilla CSS with custom properties for layout, responsive design and fine-tuned spacing.', brandColor: '#1572B6', monogram: '{ }' },
      { id: 'github', name: 'GitHub', context: 'Version control & collaboration.', howIUseIt: 'Version control, branching, pull requests and maintaining project history.', brandColor: '#ffffff', monogram: 'GH' },
      { id: 'vercel', name: 'Vercel', context: 'Deployment & hosting.', howIUseIt: 'Push-to-deploy for all personal projects with preview deployments.', brandColor: '#ffffff', monogram: '▲' },
      { id: 'firebase', name: 'Firebase', context: 'Backend as a service.', howIUseIt: 'Authentication, real-time data and hosting for full-stack projects.', brandColor: '#FFCA28', monogram: 'Fb' },
    ]
  },
  {
    title: 'Product Thinking',
    emoji: '🧠',
    tools: [
      { id: 'teardowns', name: 'Product Teardowns', context: 'Analysing products deeply.', howIUseIt: 'Deconstructing products to understand behavioral design, growth mechanics and user psychology.', brandColor: 'var(--color-accent-teal)', monogram: 'PT' },
      { id: 'research', name: 'User Research', context: 'Understanding real user needs.', howIUseIt: 'Studying user behaviour and collecting feedback to find what actually causes friction and churn.', brandColor: 'var(--color-accent-coral)', monogram: 'UR' },
      { id: 'prd', name: 'PRD Writing', context: 'Documenting product decisions.', howIUseIt: 'Writing product requirements before building to surface assumptions and align decisions early.', brandColor: '#a78bfa', monogram: 'PR' },
      { id: 'competitive', name: 'Competitive Analysis', context: 'Understanding market positioning.', howIUseIt: 'Comparing how products solve the same problem differently to understand strategic trade-offs.', brandColor: '#34d399', monogram: 'CA' },
      { id: 'journey', name: 'Journey Mapping', context: 'Mapping the full user experience.', howIUseIt: 'Identifying where trust, friction or confusion enters the user experience across the full journey.', brandColor: '#fb923c', monogram: 'JM' },
      { id: 'growth', name: 'Growth Strategy', context: 'Acquisition, retention, expansion.', howIUseIt: 'Analysing how products acquire, retain and expand users through structured frameworks.', brandColor: '#38bdf8', monogram: 'GS' },
      { id: 'docs', name: 'Product Documentation', context: 'Structured thinking on paper.', howIUseIt: 'Writing structured teardowns, PRDs and analyses to clarify my own thinking before acting.', brandColor: '#c084fc', monogram: 'PD' },
    ]
  },
  {
    title: 'Organise',
    emoji: '📋',
    tools: [
      { id: 'notion', name: 'Notion', context: 'Documentation & planning.', howIUseIt: 'My second brain. I organise teardowns, PRDs, timelines and product analyses here.', brandColor: '#ffffff', monogram: 'N' },
      { id: 'jira', name: 'Jira', context: 'Task tracking.', howIUseIt: 'Understanding agile workflows and issue tracking for product development teams.', brandColor: '#0052CC', monogram: 'Jr' },
      { id: 'excel', name: 'Microsoft Excel', context: 'Data organization.', howIUseIt: 'Data organisation, basic tracking and structuring unorganised research.', brandColor: '#217346', monogram: 'XL' },
      { id: 'canva', name: 'Canva', context: 'Visuals & presentations.', howIUseIt: 'Quick visuals, presentations and content creation workflows.', brandColor: '#00C4CC', monogram: 'Cv' },
      { id: 'figma', name: 'Figma', context: 'Wireframing & interfaces.', howIUseIt: 'Wireframing product flows and mapping interfaces before writing a line of code.', brandColor: '#F24E1E', monogram: 'Fg' },
      { id: 'structured-docs', name: 'Structured Documentation', context: 'Reusable, clear documentation.', howIUseIt: 'Writing documentation that captures decisions and reasoning, not just outcomes.', brandColor: '#e2e8f0', monogram: 'SD' },
    ]
  },
  {
    title: 'AI-Assisted Workflow',
    emoji: '🤖',
    tools: [
      { id: 'chatgpt', name: 'ChatGPT', context: 'Research & coding assistance.', howIUseIt: 'Bouncing ideas, debugging edge cases and accelerating research workflows.', brandColor: '#10A37F', monogram: 'GPT' },
      { id: 'claude', name: 'Claude', context: 'Product thinking & writing.', howIUseIt: 'Structuring complex product documents and deep product analysis.', brandColor: '#D97757', monogram: 'Cl' },
      { id: 'gemini', name: 'Gemini', context: 'Idea exploration.', howIUseIt: 'Cross-referencing research and exploring technical and product concepts.', brandColor: '#4285F4', monogram: 'Gm' },
      { id: 'copilot', name: 'GitHub Copilot', context: 'Code suggestions.', howIUseIt: 'Speeding up boilerplate generation and autocomplete workflows.', brandColor: '#ffffff', monogram: 'Cp' },
      { id: 'ai-research', name: 'AI-assisted Research', context: 'Faster synthesis.', howIUseIt: 'Using AI to synthesise large volumes of product information and research faster.', brandColor: '#818cf8', monogram: 'AR' },
      { id: 'prompt', name: 'Prompt Design', context: 'Structured AI outputs.', howIUseIt: 'Crafting prompts that produce structured, useful outputs for product work and documentation.', brandColor: '#f472b6', monogram: 'PM' },
    ]
  },
  {
    title: 'Currently Exploring',
    emoji: '🌱',
    isLearning: true,
    tools: [
      { id: 'product-ops', name: 'Product Operations', context: 'Scaling product execution.', howIUseIt: 'Understanding how product teams scale execution through systems, documentation and process design.', brandColor: 'var(--color-accent-teal)', monogram: 'PO' },
      { id: 'founders-office', name: "Founder's Office", context: 'Early-stage decision making.', howIUseIt: 'Understanding how early-stage companies make high-stakes decisions with limited information.', brandColor: '#fbbf24', monogram: 'FO' },
      { id: 'marketplace', name: 'Marketplace Products', context: 'Two-sided platform strategy.', howIUseIt: 'How two-sided platforms balance supply, demand and trust at scale.', brandColor: '#f87171', monogram: 'MP' },
      { id: 'recsys', name: 'Recommendation Systems', context: 'What surfaces what and why.', howIUseIt: 'The UX and product logic behind what platforms decide to show users next.', brandColor: '#34d399', monogram: 'RS' },
      { id: 'retention', name: 'Retention Strategy', context: 'Why users return.', howIUseIt: 'What happens in the first week that determines long-term user engagement.', brandColor: '#60a5fa', monogram: 'RT' },
      { id: 'ai-workflows', name: 'AI Product Workflows', context: 'AI changing product decisions.', howIUseIt: 'How AI changes the way product decisions are made, documented and validated.', brandColor: '#a78bfa', monogram: 'AW' },
    ]
  }
]

// ── Individual Tool Card ──
const ToolCard: React.FC<{ tool: Tool; isLearning?: boolean }> = ({ tool, isLearning }) => {
  const [isHovered, setIsHovered] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
      }}
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
        minWidth: 0,
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
            flexShrink: 0,
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

// ── Capsule Component ──
const Capsule: React.FC<{
  category: ToolCategory
  isOpen: boolean
  onClick: () => void
}> = ({ category, isOpen, onClick }) => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      layout
      transition={shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 100, damping: 20 }}
      style={{
        backgroundColor: isOpen ? 'rgba(255,255,255,0.02)' : 'rgba(10,10,15,0.6)',
        border: `1px solid ${isOpen ? 'var(--color-border-default)' : 'var(--color-border-subtle)'}`,
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: isOpen ? 'default' : 'pointer',
        width: '100%',
      }}
      onClick={() => !isOpen && onClick()}
      whileHover={!isOpen && !shouldReduceMotion ? { backgroundColor: 'rgba(255,255,255,0.04)' } : {}}
    >
      {/* Capsule Header (always visible) */}
      <motion.div
        layout
        style={{
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '28px' }}>{category.emoji}</span>
          <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 4vw, 24px)', fontWeight: 700, color: 'var(--color-text-primary)' }}>
            {category.title}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--color-text-secondary)', cursor: 'pointer' }}
          onClick={(e) => {
            if (isOpen) {
              e.stopPropagation()
              onClick() // Collapse if already open and arrow is clicked
            }
          }}
        >
          ↓
        </motion.div>
      </motion.div>

      {/* Expandable Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 100, damping: 20 }}
            style={{ overflow: 'hidden' }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
              }}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="toolkit-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '16px',
                padding: '0 24px 32px 24px',
              }}
            >
              {category.tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} isLearning={category.isLearning} />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const Toolkit: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()
  const [activeCategory, setActiveCategory] = useState<string | null>(TOOLKIT_DATA[0].title)

  return (
    <section
      style={{
        paddingTop: '120px',
        paddingBottom: '120px',
        backgroundColor: '#050508',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        
        {/* Section Header */}
        <motion.div
          variants={VARIANTS.staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '60px' }}
        >
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
            Every project follows a similar workflow. I start by understanding the problem, documenting my thinking, validating ideas through research and observation, and finally building solutions that can be tested and improved.
          </motion.p>
        </motion.div>

        {/* Interactive Capsules wrapped in LayoutGroup for smooth sibling reflow */}
        <LayoutGroup>
          <motion.div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {TOOLKIT_DATA.map((category) => (
              <Capsule
                key={category.title}
                category={category}
                isOpen={activeCategory === category.title}
                onClick={() => setActiveCategory(activeCategory === category.title ? null : category.title)}
              />
            ))}
          </motion.div>
        </LayoutGroup>

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
              "Building teaches me execution. Research teaches me context. Documentation clarifies my thinking. Reflection helps me build better the next time."
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
