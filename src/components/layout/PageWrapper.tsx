import React from 'react'

interface PageWrapperProps {
  children: React.ReactNode
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-primary)',
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {children}
    </div>
  )
}

export default PageWrapper
