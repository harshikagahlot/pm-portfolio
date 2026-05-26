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
import Timeline from './sections/Timeline'
import SectionVignette from './components/SectionVignette'

const App: React.FC = () => {
  // Initialize Lenis smooth scroll + GSAP ticker wiring (once, at root level)
  useSmoothScroll()

  return (
    <BrowserRouter>
      <PageWrapper>
        {/* Globally persistent components */}
        <Navbar />
        <GuideCharacter />
        <SectionVignette />

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

          {/* id="timeline" — scroll target from ProductTeardown bottom connector */}
          <div id="timeline">
            <Timeline />
          </div>

          {/* id="blog" — placeholder for Part 6 (Blog / Writing section) */}
          <div
            id="blog"
            style={{ minHeight: '100px', backgroundColor: 'var(--color-bg-primary)' }}
          />
        </main>
      </PageWrapper>
    </BrowserRouter>
  )
}

export default App
