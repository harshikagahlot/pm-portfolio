import { useScroll, useVelocity, useTransform, useSpring } from 'framer-motion'

export function useScrollVelocitySkew(strength: number = 0.003) {
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const skewVelocity = useSpring(scrollVelocity, { stiffness: 300, damping: 50 })
  const skew = useTransform(skewVelocity, [-3000, 3000], [-strength * 15, strength * 15])
  return skew
}
