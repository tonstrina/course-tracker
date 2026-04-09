import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DLDC Course Tracker',
  description: 'Course workflow manager for Donegal Local Development Company',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen">{children}</body>
    </html>
  )
}
