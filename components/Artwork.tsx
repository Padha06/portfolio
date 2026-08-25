'use client'

import { motion } from 'framer-motion'
import CaseStudyCard from './CaseStudyCard'
import ScanGoCard from './ScanGoCard'

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
    title: 'E-Signature Workflow — Business Central Integration',
    clientType: 'Enterprise' as const,
    domain: 'Integration' as const,
    challenge:
      'Vendors needed to sign documents on-site using Wacom signature pads, but Business Central had no native way to capture, embed, and attach signatures to purchase documents in real time.',
    solution:
      'Built a seamless e-signature pipeline — one click generates a PDF from Business Central, the vendor signs on a Wacom pad, and the signed PDF plus a signature image are automatically attached to the document and saved in the media section.',
    staticImage: '/videos/esign-poster.jpg',
    techStack: ['Dynamics 365 BC', 'Wacom SDK', 'PDF Generation', 'AL'],
    results: [
      { value: '100%', label: 'Paperless signing' },
      { value: '0', label: 'Manual uploads' },
      { value: '< 5s', label: 'Capture to attach' },
    ],
  },
  {
    title: 'AfterLight — Creative Portfolio Website',
    clientType: 'SMB' as const,
    domain: 'Web' as const,
    challenge:
      'A food and product styling studio needed a visual-first website that showcased their portfolio with the same level of craft they bring to their styling work — elegant, immersive, and easy to update.',
    solution:
      'Designed and built a premium portfolio experience with filterable gallery, video reel integration, smooth scroll animations, and a dark aesthetic that lets the food photography take centre stage.',
    staticImage: '/videos/afterlight-poster.png',
    techStack: ['WordPress', 'PHP', 'JavaScript', 'GSAP'],
    liveUrl: 'https://afterlight.in',
    results: [
      { value: '3x', label: 'Portfolio engagement' },
      { value: '100%', label: 'Client satisfaction' },
      { value: '0', label: 'Plugin bloat' },
    ],
  },
  {
    title: 'DAP Canada — Construction & Renovation Website',
    clientType: 'SMB' as const,
    domain: 'Web' as const,
    challenge:
      'DAP Canada needed a modern, conversion-focused website to showcase their construction and renovation services, completed projects, and brand credibility — while making it easy for potential clients to request a quote.',
    solution:
      'Built a clean, responsive website with service pages, project showcase, quote/enquiry integration, and SEO optimization — designed to turn visitors into leads.',
    staticImage: '/videos/dapcanada-poster.png',
    techStack: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    results: [
      { value: '100%', label: 'Mobile responsive' },
      { value: '< 2s', label: 'Load time' },
      { value: 'A+', label: 'SEO score' },
    ],
  },
  {
    title: 'One Stop Computer Shop — Local Service Platform',
    clientType: 'SMB' as const,
    domain: 'Web' as const,
    challenge:
      'A neighbourhood service shop in Jammu needed a website that clearly communicates their four core services — government forms, travel tickets, printing, and IGNOU support — while making it effortless for walk-in and remote customers to reach them.',
    solution:
      'Designed a conversion-first website with service cards, real case studies with outcomes, WhatsApp integration, budget printing rates, and a "how it works" flow that turns visitors into customers.',
    staticImage: '/videos/onestop-poster.png',
    techStack: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    results: [
      { value: '4', label: 'Services unified' },
      { value: '7', label: 'Days open' },
      { value: '0', label: 'Missed leads' },
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
          <motion.div variants={cardVariants}>
            <ScanGoCard />
          </motion.div>
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
