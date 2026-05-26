import React from 'react'

interface IconProps {
  size?: number
  color?: string
}

const UserIcon: React.FC<IconProps> = ({ size = 18, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="12" cy="8" r="4" stroke={color} strokeWidth="1.5" />
    <path
      d="M4 20C4 17 7.58 14 12 14C16.42 14 20 17 20 20"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

export default UserIcon
