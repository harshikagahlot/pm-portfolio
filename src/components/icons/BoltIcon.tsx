import React from 'react'

interface IconProps {
  size?: number
  color?: string
}

const BoltIcon: React.FC<IconProps> = ({ size = 18, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M13 2L4 14H12L11 22L20 10H12L13 2Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default BoltIcon
