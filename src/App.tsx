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
import { WorldCanvas } from './components/three/WorldCanvas'
import { useDeviceCapability } from './hooks/useDeviceCapability'

const App: React.FC = () => {
  // Initialize Lenis smooth scroll + GSAP ticker wiring (once, at root level)
  useSmoothScroll()
  const { shouldRender3D } = useDeviceCapability()

  return (
    <BrowserRouter>
      {/* Layer 1: Fixed, z-index 0, full screen 3D world */}
      {shouldRender3D && <WorldCanvas />}

      <PageWrapper>
        {/* Globally persistent overlay vignette */}
        <SectionVignette />

        {/* Globally persistent UI components */}
        <Navbar />
        <GuideCharacter />

        {/* Layer 2: All sections here — transparent backgrounds at z-index 1 */}
        <main style={{ position: 'relative', zIndex: 1, backgroundColor: 'transparent' }}>
          <Hero />

          {/* id="thinking" — scroll target for Hero "How I think →" CTA */}
          <div id="thinking" style={{ backgroundColor: 'transparent' }}>
            <HowIThink />
          </div>

          {/* id="work" — scroll target for Hero "See my work →" CTA */}
          <div id="work" style={{ backgroundColor: 'transparent' }}>
            <CaseStudies />
          </div>

          {/* id="teardown" — scroll target from CaseStudies bottom connector */}
          <div id="teardown" style={{ backgroundColor: 'transparent' }}>
            <ProductTeardown />
          </div>

          {/* id="timeline" — scroll target from ProductTeardown bottom connector */}
          <div id="timeline" style={{ backgroundColor: 'transparent' }}>
            <Timeline />
          </div>

          {/* id="blog" — placeholder for Part 6 (Blog / Writing section) */}
          <div
            id="blog"
            style={{ minHeight: '100px', backgroundColor: 'transparent' }}
          />
        </main>
      </PageWrapper>
    </BrowserRouter>
  )
}

export default App
