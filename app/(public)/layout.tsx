import React from 'react'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='dark:bg-[#1f1f1f]'>
      {children}
    </div>
  )
}
