import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Personal Journal',
  description: 'A private space for your thoughts, memories, and reflections.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}