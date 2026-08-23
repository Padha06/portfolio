import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Shubam Padha | Full-Stack Developer | BC Customization & Integrations',
  description: 'Building web, mobile, and ERP solutions for startups & enterprises. Dynamics 365 BC expert.',
  keywords: ['Business Central development', 'ERP customization', 'web development', 'mobile apps', 'API integrations', 'Power Apps'],
  openGraph: {
    title: 'Shubam Padha | Full-Stack Developer | BC Customization & Integrations',
    description: 'Building web, mobile, and ERP solutions for startups & enterprises. Dynamics 365 BC expert.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Shubam Padha Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shubam Padha | Full-Stack Developer | BC Customization & Integrations',
    description: 'Building web, mobile, and ERP solutions for startups & enterprises. Dynamics 365 BC expert.',
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
