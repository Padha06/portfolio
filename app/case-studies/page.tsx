'use client'

import CaseStudyCard from '@/components/CaseStudyCard'
import { motion } from 'framer-motion'

/**
 * Case Studies Demo Page
 * 
 * To use real images/videos:
 * 1. Place images in public/images/case-studies/
 * 2. Place videos in public/videos/case-studies/
 * 3. Update the staticImage and previewVideo paths below
 * 
 * For placeholder images, you can use:
 * - https://placehold.co/800x450/0F172A/00D9FF?text=Project+Name
 * - Or use picsum.photos for random images
 */

const demoCaseStudies: Array<{
  title: string
  clientType: 'Startup' | 'SMB' | 'Enterprise'
  domain: 'Web' | 'Mobile' | 'ERP' | 'Integration'
  challenge: string
  solution: string
  staticImage: string
  previewVideo?: string
  techStack: string[]
  results: Array<{ value: string; label: string }>
  liveUrl?: string
}> = [
  {
    title: 'E-Commerce MVP for Retail Startup',
    clientType: 'Startup' as const,
    domain: 'Web' as const,
    challenge: 'A retail startup needed a complete e-commerce solution with real-time inventory synchronization across multiple sales channels within 3 months.',
    solution: 'Built a Next.js frontend with Node.js backend, integrated with Business Central for inventory management via REST APIs. Implemented webhook-based sync for real-time updates.',
    staticImage: 'https://placehold.co/800x450/0F172A/00D9FF?text=E-Commerce+Platform',
    // previewVideo: '/videos/case-studies/ecommerce-preview.webm', // Uncomment when you have video
    techStack: ['Next.js', 'Node.js', 'TypeScript', 'BC AL', 'REST APIs', 'PostgreSQL'],
    results: [
      { value: '40%', label: 'Faster Load Time' },
      { value: '10K+', label: 'Monthly Users' },
      { value: '3mo', label: 'Time to Market' },
    ],
    liveUrl: 'https://example-ecommerce.com',
  },
  {
    title: 'Warehouse Management System',
    clientType: 'SMB' as const,
    domain: 'Mobile' as const,
    challenge: 'A logistics company needed a mobile-first WMS with offline capability and real-time sync to Business Central for warehouse operations.',
    solution: 'Developed Kotlin-based Android app with offline-first architecture, barcode scanning, and bi-directional BC integration using OData services.',
    staticImage: 'https://placehold.co/800x450/0F172A/00D9FF?text=Warehouse+Management',
    // previewVideo: '/videos/case-studies/wms-preview.webm', // Uncomment when you have video
    techStack: ['Kotlin', 'Android SDK', 'BC AL', 'OData', 'Room DB', 'Material Design'],
    results: [
      { value: '60%', label: 'Efficiency Gain' },
      { value: '50+', label: 'Daily Users' },
      { value: '99.9%', label: 'Uptime' },
    ],
    // No liveUrl - internal tool
  },
  {
    title: 'Treasury Module Customization',
    clientType: 'Enterprise' as const,
    domain: 'ERP' as const,
    challenge: 'An enterprise client needed custom treasury management features within Business Central that were not available in standard modules.',
    solution: 'Designed and implemented custom AL extensions for treasury operations, including automated reconciliation, multi-currency support, and custom reporting.',
    staticImage: 'https://placehold.co/800x450/0F172A/00D9FF?text=Treasury+Module',
    // previewVideo: '/videos/case-studies/treasury-preview.webm', // Uncomment when you have video
    techStack: ['BC AL', 'Report Builder', 'Power Automate', 'Azure Functions', 'SQL Server'],
    results: [
      { value: '80%', label: 'Time Saved' },
      { value: '25+', label: 'Daily Users' },
      { value: '2wk', label: 'Implementation' },
    ],
    liveUrl: 'https://example-treasury.com',
  },
]

export default function CaseStudiesPage() {
  return (
    <section className="min-h-screen bg-primary-950 py-24 px-4">
      <div className="container-custom max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-dm text-sm text-accent uppercase tracking-wider">
            Portfolio
          </span>
          <h1 className="font-outfit text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Case <span className="text-accent">Studies</span>
          </h1>
          <p className="font-dm text-lg text-primary-300 max-w-2xl mx-auto">
            Anonymized project examples showcasing problem-solving
            approaches and measurable results.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {demoCaseStudies.map((study, index) => (
            <CaseStudyCard
              key={index}
              title={study.title}
              clientType={study.clientType}
              domain={study.domain}
              challenge={study.challenge}
              solution={study.solution}
              staticImage={study.staticImage}
              previewVideo={study.previewVideo}
              techStack={study.techStack}
              results={study.results}
              liveUrl={study.liveUrl}
            />
          ))}
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 p-6 glass-card"
        >
          <h2 className="font-outfit text-lg font-semibold text-white mb-4">
            Usage Instructions
          </h2>
          <div className="font-dm text-sm text-primary-400 space-y-2">
            <p>• <strong className="text-primary-200">Desktop:</strong> Hover over cards to see video crossfade effect</p>
            <p>• <strong className="text-primary-200">Mobile:</strong> Cards autoplay video when 60% in viewport</p>
            <p>• <strong className="text-primary-200">Click:</strong> Opens modal with full case study details</p>
            <p>• <strong className="text-primary-200">Reduced Motion:</strong> Video never autoplays, static image only</p>
          </div>
          
          <div className="mt-4 pt-4 border-t border-primary-700">
            <h3 className="font-outfit text-sm font-semibold text-accent mb-2">
              Video Compression Guide
            </h3>
            <code className="block p-3 bg-primary-800 rounded-lg text-xs text-primary-300 font-mono overflow-x-auto">
              ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -an -t 8 output.webm
            </code>
            <p className="font-dm text-xs text-primary-500 mt-2">
              Target: Under 2MB per clip • Resolution: 640x360 or 800x450 • Duration: 5-10 seconds
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
