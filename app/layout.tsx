import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Shubam Padha | Full-Stack Developer | Portfolio',
  description: 'Building digital products that scale. Web, mobile, and ERP solutions for startups & enterprises.',
  keywords: ['full-stack developer', 'web development', 'mobile apps', 'Business Central', 'ERP customization', 'API integrations'],
  openGraph: {
    title: 'Shubam Padha | Full-Stack Developer | Portfolio',
    description: 'Building digital products that scale. Web, mobile, and ERP solutions for startups & enterprises.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Shubam Padha Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shubam Padha | Full-Stack Developer | Portfolio',
    description: 'Building digital products that scale. Web, mobile, and ERP solutions for startups & enterprises.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
