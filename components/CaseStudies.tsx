'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { XIcon as X } from './Icons'

const caseStudies = [
  {
    id: 1,
    number: '01',
    categoryLabel: 'WEB DEVELOPMENT',
    title: 'E-commerce Experience for a Growing Retail Brand',
    description: 'A high-performance storefront designed to improve the customer journey, simplify product discovery, and connect seamlessly with backend systems.',
    tech: ['Next.js', 'React', 'Node.js', 'REST API'],
    image: '/cs-web.jpg',
  },
  {
    id: 2,
    number: '02',
    categoryLabel: 'WEB APPLICATION',
    title: 'Business Operations Platform',
    description: 'A custom web application that brings daily operations, workflows, reporting, and team collaboration into one centralized platform.',
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    image: '/cs-app.jpg',
  },
  {
    id: 3,
    number: '03',
    categoryLabel: 'MOBILE DEVELOPMENT',
    title: 'Mobile Workforce Application',
    description: 'A mobile-first application built for teams working in the field, with task management, real-time updates, and offline capabilities.',
    tech: ['React Native', 'Android', 'REST API'],
    image: '/cs-mobile.jpg',
  },
  {
    id: 4,
    number: '04',
    categoryLabel: 'ERP & BUSINESS SYSTEMS',
    title: 'Business Central Customization',
    description: 'Custom ERP functionality built around complex finance, inventory, warehouse, and business workflows.',
    tech: ['Dynamics 365 BC', 'AL', 'Power Automate'],
    image: '/cs-erp.jpg',
  },
  {
    id: 5,
    number: '05',
    categoryLabel: 'INTEGRATION',
    title: 'Connected Business Ecosystem',
    description: 'Connecting ERP, Power Apps, Dataverse, and custom applications into a unified data flow.',
    tech: ['Business Central', 'Dataverse', 'Power Apps', 'APIs'],
    image: '/cs-integration.jpg',
  },
  {
    id: 6,
    number: '06',
    categoryLabel: 'CUSTOM SOFTWARE',
    title: 'Data & Process Automation Platform',
    description: 'A tailored solution that replaces repetitive manual processes with automated workflows, validation, and centralized data management.',
    tech: ['Python', 'SQL', 'APIs', 'Automation'],
    image: '/cs-custom.jpg',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, transform: "translateY(30px)" },
  visible: {
    opacity: 1,
    transform: "translateY(0px)",
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
  },
}

export default function CaseStudies() {
  const [selected, setSelected] = useState<typeof caseStudies[0] | null>(null)

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, study: typeof caseStudies[0]) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setSelected(study)
      }
    },
    []
  )

  return (
    <>
      <section id="case-studies" className="section-padding bg-primary-950">
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, transform: "translateY(20px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0px)" }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="mb-10"
          >
            <span className="cs-section-tag">CASE STUDIES</span>
            <h2 className="cs-section-title">
              From websites to enterprise systems.
            </h2>
            <p className="cs-section-desc">
              A selection of digital products, applications, business platforms,
              and integrations we&apos;ve designed and built — solving real problems
              across different industries.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="cs-grid"
          >
            {caseStudies.slice(0, 3).map((study) => (
              <motion.article
                key={study.id}
                variants={cardVariants}
                className="cs-card"
                role="button"
                tabIndex={0}
                aria-label={`View case study: ${study.title}`}
                onClick={() => setSelected(study)}
                onKeyDown={(e) => handleKeyDown(e, study)}
              >
                <div className="cs-card-image">
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="cs-card-img"
                  />
                  <div className="cs-card-overlay" />
                  <div className="cs-card-number">{study.number}</div>
                </div>
                <div className="cs-card-body">
                  <div className="cs-card-category">{study.categoryLabel}</div>
                  <h3 className="cs-card-title">{study.title}</h3>
                  <p className="cs-card-desc">{study.description}</p>
                  <div className="cs-card-tech">
                    {study.tech.map((t) => (
                      <span key={t} className="cs-tech-tag">{t}</span>
                    ))}
                    <span className="cs-card-arrow">&rarr;</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* View All Link */}
          <motion.div
            initial={{ opacity: 0, transform: "translateY(20px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="mt-12 text-center"
          >
            <a href="/case-studies" className="cs-view-all">
              View All Projects <span className="cs-view-all-arrow">&rarr;</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, transform: "scale(0.95) translateY(20px)" }}
              animate={{ opacity: 1, transform: "scale(1) translateY(0px)" }}
              exit={{ opacity: 0, transform: "scale(0.97) translateY(10px)" }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="cs-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="cs-modal-header">
                <div>
                  <span className="cs-card-category">{selected.categoryLabel}</span>
                  <h3 id="modal-title" className="cs-modal-title">{selected.title}</h3>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="cs-modal-close"
                  aria-label="Close dialog"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="cs-modal-desc">{selected.description}</p>

              <div className="cs-modal-tech">
                <span className="cs-modal-tech-label">Tech Stack</span>
                <div className="cs-modal-tech-tags">
                  {selected.tech.map((t) => (
                    <span key={t} className="cs-tech-tag">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
