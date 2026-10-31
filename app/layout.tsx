import type { Metadata, Viewport } from 'next'
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import '@/styles/globals.css'
import Preloader from '@/components/Preloader'
import SmoothScroll from '@/components/SmoothScroll'
import Cursor from '@/components/Cursor'

const sans = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

const title = 'Vaskoi — Shubam Padha · Websites, apps & business systems'
const description =
  'Independent studio by Shubam Padha. Premium websites, web and mobile apps, and Dynamics 365 Business Central systems for ambitious brands and growing businesses.'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.vaskoi.in'),
  title,
  description,
  keywords: ['web design', 'full-stack developer', 'Next.js', 'mobile apps', 'Business Central', 'ERP', 'India'],
  openGraph: { title, description, type: 'website', locale: 'en_US', siteName: 'Vaskoi', url: 'https://www.vaskoi.in' },
  twitter: { card: 'summary_large_image', title, description },
}

export const viewport: Viewport = {
  themeColor: '#0b0b0d',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        <Preloader />
        <SmoothScroll />
        <Cursor />
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  )
}
