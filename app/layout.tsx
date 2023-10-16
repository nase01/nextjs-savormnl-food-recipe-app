import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SavorMNL - Filipino Food Recipes',
  description: 'SavorMNL is your ultimate destination for authentic Filipino food recipes. Immerse yourself in the rich and diverse flavors of the Philippines with our handpicked collection of traditional and contemporary dishes. From classic adobo to delectable halo-halo, explore the vibrant world of Filipino cuisine and embark on a culinary journey with SavorMNL.',
  other: {
    'theme-color': '#0d1117',
    'color-scheme': 'light only',
    'og:url': 'savormnl.vercel.app',
    'og:type': 'website'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 font-kalam">{children}</body>
    </html>
  )
}
