import React, { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ParticleField } from './ParticleField'
import { LightBeams } from './LightBeams'
import { CameraRig } from './CameraRig'
import * as THREE from 'three'

export const WorldCanvas: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile viewports dynamically
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Force automatic renderer disposal on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      // Fiber handles node removal, but we trigger garbage collection pointers where safe
      THREE.Cache.clear()
    }
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        gl={{ alpha: true, antialias: true }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 60, near: 0.1, far: 100 }}
        style={{ background: 'transparent' }}
      >
        <CameraRig isMobile={isMobile} />
        <ParticleField isMobile={isMobile} />
        {!isMobile && <LightBeams />}
      </Canvas>
    </div>
  )
}
