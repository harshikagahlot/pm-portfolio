import React from 'react'

interface IconProps {
  size?: number
  color?: string
}

const FlowIcon: React.FC<IconProps> = ({ size = 18, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Stem going down from top */}
    <path
      d="M12 3V10"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Branch left */}
    <path
      d="M12 10L7 17"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Branch right */}
    <path
      d="M12 10L17 17"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Left endpoint */}
    <circle cx="7" cy="19" r="1.5" fill={color} />
    {/* Right endpoint */}
    <circle cx="17" cy="19" r="1.5" fill={color} />
    {/* Top node */}
    <circle cx="12" cy="3" r="1.5" fill={color} />
  </svg>
)

export default FlowIcon
