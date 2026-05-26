import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Single beam component
const Beam = ({
  position,
  rotation,
  color,
  length,
}: {
  position: [number, number, number]
  rotation: [number, number, number]
  color: string
  length: number
}) => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      // Beams pulse very slowly in opacity
      const mat = meshRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.03 + Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.015
    }
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <cylinderGeometry args={[0.08, 0.25, length, 8, 1, true]} />
      <meshBasicMaterial
        color={color}
        transparent={true}
        opacity={0.04}
        depthWrite={false}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

export const LightBeams = () => {
  const beams = [
    { position: [-4, 3, -5] as [number, number, number], rotation: [0, 0, 0.3] as [number, number, number], color: '#7c6ff7', length: 20 },
    { position: [5, -2, -10] as [number, number, number], rotation: [0, 0, -0.2] as [number, number, number], color: '#2dd4a8', length: 25 },
    { position: [-7, 1, -18] as [number, number, number], rotation: [0.1, 0, 0.4] as [number, number, number], color: '#7c6ff7', length: 30 },
    { position: [3, 4, -14] as [number, number, number], rotation: [0, 0.1, -0.15] as [number, number, number], color: '#2dd4a8', length: 22 },
    { position: [0, -4, -8] as [number, number, number], rotation: [0.2, 0, 0.05] as [number, number, number], color: '#f47c5a', length: 18 },
  ]

  return (
    <>
      {beams.map((beam, i) => (
        <Beam
          key={i}
          position={beam.position}
          rotation={beam.rotation}
          color={beam.color}
          length={beam.length}
        />
      ))}
    </>
  )
}
