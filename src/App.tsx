import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useSmoothScroll } from './lib/smoothScroll'
import PageWrapper from './components/layout/PageWrapper'
import Navbar from './components/layout/Navbar'
import GuideCharacter from './components/GuideCharacter'
import Hero from './sections/Hero'
import HowIThink from './sections/HowIThink'
import CaseStudies from './sections/CaseStudies'
import ProductTeardown from './sections/ProductTeardown'

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

          {/* id="thinking" — scroll target for Hero "How I think →" CTA */}
          <div id="thinking">
            <HowIThink />
          </div>

          {/* id="work" — scroll target for Hero "See my work →" CTA */}
          <div id="work">
            <CaseStudies />
          </div>

          {/* id="teardown" — scroll target from CaseStudies bottom connector */}
          <div id="teardown">
            <ProductTeardown />
          </div>

          {/* id="timeline" — placeholder for Part 5 (Journey/Timeline section) */}
          <div
            id="timeline"
            style={{ minHeight: '100px', backgroundColor: 'var(--color-bg-primary)' }}
          />
        </main>
      </PageWrapper>
    </BrowserRouter>
  )
}

export default App
