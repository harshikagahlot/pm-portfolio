import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useSmoothScroll } from './lib/smoothScroll'
import PageWrapper from './components/layout/PageWrapper'
import Navbar from './components/layout/Navbar'
import GuideCharacter from './components/GuideCharacter'
import Hero from './sections/Hero'
import HowIThink from './sections/HowIThink'

const App: React.FC = () => {
  // Initialize Lenis smooth scroll + GSAP ticker wiring (once, at root level)
  useSmoothScroll()

  return (
    <BrowserRouter>
      <PageWrapper>
        {/* Globally persistent components */}
        <Navbar />
        <GuideCharacter />

        {/* Page sections */}
        <main>
          <Hero />

          {/* id="thinking" — scroll target for "How I think →" CTA */}
          <div id="thinking">
            <HowIThink />
          </div>

          {/* id="work" — placeholder scroll target for "See my work →" CTA */}
          {/* Will be replaced by the Work/Case Studies section in Part 3 */}
          <div
            id="work"
            style={{ minHeight: '100px', backgroundColor: 'var(--color-bg-primary)' }}
          />
        </main>
      </PageWrapper>
    </BrowserRouter>
  )
}

export default App
