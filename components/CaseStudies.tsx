'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XIcon as X } from './Icons'

const categories = ['ALL', 'WEB', 'APPS', 'MOBILE', 'ERP', 'INTEGRATIONS'] as const
type Category = typeof categories[number]

const caseStudies = [
  {
    id: 1,
    number: '01',
    category: 'WEB' as Category,
    categoryLabel: 'WEB DEVELOPMENT',
    title: 'E-commerce Experience for a Growing Retail Brand',
    description: 'A high-performance storefront designed to improve the customer journey, simplify product discovery, and connect seamlessly with backend systems.',
    tech: ['Next.js', 'React', 'Node.js', 'REST API'],
    gradient: 'from-red-900/40 to-black',
  },
  {
    id: 2,
    number: '02',
    category: 'APPS' as Category,
    categoryLabel: 'WEB APPLICATION',
    title: 'Business Operations Platform',
    description: 'A custom web application that brings daily operations, workflows, reporting, and team collaboration into one centralized platform.',
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    gradient: 'from-red-800/30 to-black',
  },
  {
    id: 3,
    number: '03',
    category: 'MOBILE' as Category,
    categoryLabel: 'MOBILE DEVELOPMENT',
    title: 'Mobile Workforce Application',
    description: 'A mobile-first application built for teams working in the field, with task management, real-time updates, and offline capabilities.',
    tech: ['React Native', 'Android', 'REST API'],
    gradient: 'from-red-700/25 to-black',
  },
  {
    id: 4,
    number: '04',
    category: 'ERP' as Category,
    categoryLabel: 'ERP & BUSINESS SYSTEMS',
    title: 'Business Central Customization',
    description: 'Custom ERP functionality built around complex finance, inventory, warehouse, and business workflows.',
    tech: ['Dynamics 365 BC', 'AL', 'Power Automate'],
    gradient: 'from-red-600/20 to-black',
  },
  {
    id: 5,
    number: '05',
    category: 'INTEGRATIONS' as Category,
    categoryLabel: 'INTEGRATION',
    title: 'Connected Business Ecosystem',
    description: 'Connecting ERP, Power Apps, Dataverse, and custom applications into a unified data flow.',
    tech: ['Business Central', 'Dataverse', 'Power Apps', 'APIs'],
    gradient: 'from-red-900/35 to-black',
  },
  {
    id: 6,
    number: '06',
    category: 'APPS' as Category,
    categoryLabel: 'CUSTOM SOFTWARE',
    title: 'Data & Process Automation Platform',
    description: 'A tailored solution that replaces repetitive manual processes with automated workflows, validation, and centralized data management.',
    tech: ['Python', 'SQL', 'APIs', 'Automation'],
    gradient: 'from-red-800/25 to-black',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function CaseStudies() {
  const [active, setActive] = useState<Category>('ALL')
  const [selected, setSelected] = useState<typeof caseStudies[0] | null>(null)

  const filtered = active === 'ALL' ? caseStudies : caseStudies.filter(s => s.category === active)

  return (
    <>
      <section id="case-studies" className="section-padding" style={{ background: '#0a0a0a' }}>
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="mb-16"
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

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="cs-filters"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`cs-filter-btn ${active === cat ? 'cs-filter-active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="cs-grid"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((study) => (
                <motion.article
                  key={study.id}
                  variants={cardVariants}
                  layout
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="cs-card"
                  onClick={() => setSelected(study)}
                >
                  <div className={`cs-card-image bg-gradient-to-br ${study.gradient}`}>
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
            </AnimatePresence>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="cs-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="cs-modal-header">
                <div>
                  <span className="cs-card-category">{selected.categoryLabel}</span>
                  <h3 className="cs-modal-title">{selected.title}</h3>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="cs-modal-close"
                  aria-label="Close"
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
