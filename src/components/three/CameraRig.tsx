import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { MathUtils } from 'three'

export interface CameraRigProps {
  isMobile: boolean
}

export const CameraRig: React.FC<CameraRigProps> = ({ isMobile }) => {
  const { camera } = useThree()
  const targetZ = useRef(5)
  const targetY = useRef(0)
  const targetX = useRef(0)

  useFrame(() => {
    // Read scroll progress (0 to 1)
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
    const innerHeight = window.innerHeight
    const maxScroll = Math.max(scrollHeight - innerHeight, 1) // prevent division by zero
    const scrollProgress = window.scrollY / maxScroll

    // Camera moves forward (negative Z) as user scrolls
    // From z=5 (start) to z=-20 (end of journey) — 25 units of depth
    targetZ.current = 5 - scrollProgress * 25

    if (isMobile) {
      // Disable camera horizontal/vertical drift on mobile to save performance
      targetY.current = 0
      targetX.current = 0
    } else {
      // Subtle vertical drift — camera rises slightly then falls
      targetY.current = Math.sin(scrollProgress * Math.PI) * 1.5

      // Very subtle horizontal drift — camera sways gently
      targetX.current = Math.sin(scrollProgress * Math.PI * 2) * 0.4
    }

    // Smooth lerp toward target — this is the cinematic momentum
    camera.position.z = MathUtils.lerp(camera.position.z, targetZ.current, 0.04)
    camera.position.y = MathUtils.lerp(camera.position.y, targetY.current, 0.04)
    camera.position.x = MathUtils.lerp(camera.position.x, targetX.current, 0.04)

    // Camera always looks slightly ahead — reinforces forward movement
    camera.lookAt(camera.position.x * 0.5, camera.position.y * 0.5, camera.position.z - 10)
  })

  return null
}
