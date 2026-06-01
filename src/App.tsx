import React, { useEffect } from 'react'
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
import Toolkit from './sections/Toolkit'
import Blog from './sections/Blog'
import CurrentlyExploring from './sections/CurrentlyExploring'
import Footer from './components/layout/Footer'
import { CustomCursor } from './components/CustomCursor'


const App: React.FC = () => {
  // Initialize Lenis smooth scroll + GSAP ticker wiring (once, at root level)
  useSmoothScroll()
  const { shouldRender3D } = useDeviceCapability()

  // Smooth scroll to top on page load/mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <BrowserRouter>
      <CustomCursor />
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

          {/* id="toolkit" — scroll target from HowIThink */}
          <div id="toolkit" style={{ backgroundColor: 'transparent' }}>
            <Toolkit />
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

          {/* id="blog" — scroll target for Part 6 (Blog / Writing section) */}
          <div id="blog" style={{ backgroundColor: 'transparent' }}>
            <Blog />
          </div>

          {/* Currently Exploring section */}
          <CurrentlyExploring />
        </main>

        {/* Footer component */}
        <Footer />
      </PageWrapper>
    </BrowserRouter>
  )
}

export default App
