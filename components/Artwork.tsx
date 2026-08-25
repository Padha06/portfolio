'use client'

import { motion } from 'framer-motion'
import CaseStudyCard from './CaseStudyCard'

const artworks = [
  {
    title: 'Business Central Dashboard — Custom UI',
    clientType: 'Enterprise' as const,
    domain: 'ERP' as const,
    challenge:
      'Standard Business Central dashboards felt cluttered and hard to navigate. The default layout made it difficult for warehouse and operations teams to find critical data at a glance.',
    solution:
      'Rebuilt the dashboard interface using custom JavaScript and modern UI patterns — clean card layouts, contextual data grouping, and a dark-themed visual hierarchy that reduces cognitive load while keeping all essential metrics visible.',
    staticImage: '/videos/bc-poster.png',
    previewVideo: '/videos/bc-dashboard.mp4',
    techStack: ['JavaScript', 'Dynamics 365 BC', 'DOM Manipulation', 'CSS'],
    results: [
      { value: '40%', label: 'Faster data access' },
      { value: '100%', label: 'Client satisfaction' },
      { value: '0', label: 'Dependencies added' },
    ],
  },
  {
    title: 'ScanGo WMS — Mobile Warehouse App',
    clientType: 'Enterprise' as const,
    domain: 'Mobile' as const,
    challenge:
      'Warehouse teams using Business Central relied on paper-based workflows and desktop-only interfaces — slow, error-prone, and impossible to use offline in cold storage or dead zones.',
    solution:
      'Designed a modern mobile WMS interface for ScanGo — 18 modules covering inbound, outbound, inventory, and production. Offline-first architecture with license plating, one-scan workflows, and real-time sync to Business Central.',
    staticImage: '/videos/scango-poster.png',
    previewVideo: '/videos/scango-wms.mp4',
    techStack: ['Kotlin', 'Jetpack Compose', 'Room DB', 'Business Central'],
    liveUrl: 'https://scango.it.com',
    results: [
      { value: '70%', label: 'Faster scanning' },
      { value: '18', label: 'Modules shipped' },
      { value: '99.9%', label: 'Order accuracy' },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, transform: 'translateY(30px)' },
  visible: {
    opacity: 1,
    transform: 'translateY(0px)',
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
  },
}

export default function Artwork() {
  return (
    <section id="artwork" className="section-padding bg-primary-950">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, transform: 'translateY(20px)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="mb-10"
        >
          <span className="cs-section-tag">ARTWORK</span>
          <h2 className="cs-section-title">
            UI craft in action.
          </h2>
          <p className="cs-section-desc">
            Visual transformations and interface work — where design thinking
            meets real-world business systems.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="aw-grid"
        >
          {artworks.map((artwork, idx) => (
            <motion.div key={idx} variants={cardVariants}>
              <CaseStudyCard {...artwork} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
