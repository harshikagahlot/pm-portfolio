import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export interface ParticleFieldProps {
  isMobile: boolean
}

export const ParticleField: React.FC<ParticleFieldProps> = ({ isMobile }) => {
  const meshRef = useRef<THREE.Points>(null)

  // Generate particle positions once
  const { positions, colors } = useMemo(() => {
    const count = isMobile ? 800 : 2000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    // Color palette: purple, teal, white
    const palette = [
      new THREE.Color('#7c6ff7'), // accent.purple
      new THREE.Color('#2dd4a8'), // accent.teal
      new THREE.Color('#f0eff8'), // near-white
      new THREE.Color('#4a4870'), // muted purple
    ]

    for (let i = 0; i < count; i++) {
      // Spread particles across a wide deep volume
      // X: -15 to 15 (wide)
      // Y: -10 to 10 (tall)
      // Z: -30 to 8 (deep — extends far behind and slightly ahead of camera start)
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = Math.random() * -38 + 8

      // Assign random color from palette
      const color = palette[Math.floor(Math.random() * palette.length)]
      // Make most particles white/dim, occasional colored ones
      const isColored = Math.random() > 0.7
      colors[i * 3] = isColored ? color.r : 0.6
      colors[i * 3 + 1] = isColored ? color.g : 0.6
      colors[i * 3 + 2] = isColored ? color.b : 0.6
    }

    return { positions, colors }
  }, [isMobile])

  // Very slow rotation — makes the field feel alive without being distracting
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.01
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.005) * 0.05
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.06 : 0.05}
        sizeAttenuation={true}
        depthWrite={false}
        vertexColors={true}
        transparent={true}
        opacity={0.8}
      />
    </points>
  )
}
