'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRightIcon as ArrowRight, ExternalLinkIcon as ExternalLink, XIcon as X, TrendingUpIcon as TrendingUp, ClockIcon as Clock, UsersIcon as Users } from './Icons'

const caseStudies = [
  {
    id: 1,
    title: 'E-Commerce Platform for Retail Startup',
    clientType: 'Startup',
    domain: 'Web + Integration',
    coverColor: 'from-blue-500 to-cyan-400',
    challenge: 'A retail startup needed a complete e-commerce solution with real-time inventory synchronization across multiple sales channels.',
    solution: 'Built a Next.js frontend with Node.js backend, integrated with Business Central for inventory management via REST APIs.',
    results: [
      { icon: TrendingUp, value: '40%', label: 'Faster Load Time' },
      { icon: Users, value: '10K+', label: 'Monthly Users' },
      { icon: Clock, value: '3 months', label: 'Time to Market' },
    ],
    techStack: ['Next.js', 'Node.js', 'BC AL', 'REST APIs'],
  },
  {
    id: 2,
    title: 'Warehouse Management System',
    clientType: 'Mid-Market SMB',
    domain: 'Mobile + ERP',
    coverColor: 'from-purple-500 to-pink-400',
    challenge: 'A logistics company needed a mobile-first WMS with offline capability and real-time sync to Business Central.',
    solution: 'Developed Kotlin-based Android app with offline-first architecture, barcode scanning, and bi-directional BC integration.',
    results: [
      { icon: TrendingUp, value: '60%', label: 'Efficiency Gain' },
      { icon: Users, value: '50+', label: 'Daily Users' },
      { icon: Clock, value: '99.9%', label: 'Uptime' },
    ],
    techStack: ['Kotlin', 'Android SDK', 'BC AL', 'OData'],
  },
  {
    id: 3,
    title: 'Treasury Module Customization',
    clientType: 'Enterprise',
    domain: 'ERP',
    coverColor: 'from-emerald-500 to-teal-400',
    challenge: 'An enterprise client needed custom treasury management features within Business Central that were not available in standard modules.',
    solution: 'Designed and implemented custom AL extensions for treasury operations, including automated reconciliation and reporting.',
    results: [
      { icon: TrendingUp, value: '80%', label: 'Time Saved' },
      { icon: Users, value: '25+', label: 'Daily Users' },
      { icon: Clock, value: '2 weeks', label: 'Implementation' },
    ],
    techStack: ['BC AL', 'Report Builder', 'Power Automate'],
  },
  {
    id: 4,
    title: 'Dataverse/Power Apps Integration',
    clientType: 'Mid-Market SMB',
    domain: 'Integration',
    coverColor: 'from-amber-500 to-orange-400',
    challenge: 'A company needed to sync data between multiple systems including Business Central, Dataverse, and custom applications.',
    solution: 'Architected a multi-system integration layer using REST APIs, webhooks, and Power Automate for real-time data synchronization.',
    results: [
      { icon: TrendingUp, value: '100%', label: 'Data Accuracy' },
      { icon: Users, value: '5', label: 'Systems Connected' },
      { icon: Clock, value: 'Real-time', label: 'Sync Speed' },
    ],
    techStack: ['REST APIs', 'Dataverse', 'Power Apps', 'Webhooks'],
  },
  {
    id: 5,
    title: 'Bulk Data Import Solution',
    clientType: 'Mid-Market SMB',
    domain: 'Integration',
    coverColor: 'from-rose-500 to-red-400',
    challenge: 'A client needed to import large volumes of historical data into Business Central while maintaining data integrity.',
    solution: 'Built a Python-based data pipeline with validation, transformation, and batch processing capabilities for BC import.',
    results: [
      { icon: TrendingUp, value: '1M+', label: 'Records Processed' },
      { icon: Users, value: '99.8%', label: 'Accuracy Rate' },
      { icon: Clock, value: '70%', label: 'Time Saved' },
    ],
    techStack: ['Python', 'BC AL', 'SQL Server', 'REST APIs'],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
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
  const [selected, setSelected] = useState<typeof caseStudies[0] | null>(null)

  return (
    <>
      <section id="case-studies" className="section-padding bg-primary-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="font-inter text-sm text-accent uppercase tracking-wider">
              Portfolio
            </span>
            <h2 className="font-poppins text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
              Case <span className="gradient-text">Studies</span>
            </h2>
            <p className="font-inter text-lg text-primary-300 max-w-2xl mx-auto">
              Anonymized project examples showcasing problem-solving
              approaches and measurable results.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
          >
            {caseStudies.map((study) => (
              <motion.article
                key={study.id}
                variants={cardVariants}
                className="glass-card overflow-hidden group cursor-pointer"
                onClick={() => setSelected(study)}
              >
                {/* Cover Image Placeholder */}
                <div className={`h-48 bg-gradient-to-br ${study.coverColor} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-poppins text-6xl font-bold text-white/10">
                      {String(study.id).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 text-xs font-medium text-black bg-white rounded-full">
                      {study.clientType}
                    </span>
                    <span className="px-3 py-1 text-xs font-medium text-white bg-black/30 rounded-full backdrop-blur-sm">
                      {study.domain}
                    </span>
                  </div>
                </div>

                <div className="p-6 lg:p-8">
                  <h3 className="font-poppins text-xl font-semibold text-white group-hover:text-accent transition-colors mb-3">
                    {study.title}
                  </h3>

                  <p className="font-inter text-sm text-primary-300 leading-relaxed mb-4 line-clamp-2">
                    {study.challenge}
                  </p>

                  {/* Metric Chips */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    {study.results.map((result, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-800/50 border border-primary-700">
                        <result.icon className="w-3.5 h-3.5 text-accent" />
                        <span className="font-poppins text-sm font-bold text-white">{result.value}</span>
                        <span className="font-inter text-xs text-primary-400">{result.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all duration-300">
                    <span className="font-inter text-sm">Case Study</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </motion.article>
            ))}
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="glass-card max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex gap-2 mb-3">
                    <span className="px-3 py-1 text-xs font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
                      {selected.clientType}
                    </span>
                    <span className="px-3 py-1 text-xs font-medium text-primary-300 bg-primary-700 rounded-full">
                      {selected.domain}
                    </span>
                  </div>
                  <h3 className="font-poppins text-2xl font-bold text-white">
                    {selected.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="p-2 text-primary-400 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-poppins text-sm font-semibold text-accent uppercase tracking-wider mb-2">
                    Challenge
                  </h4>
                  <p className="font-inter text-primary-300 leading-relaxed">
                    {selected.challenge}
                  </p>
                </div>

                <div>
                  <h4 className="font-poppins text-sm font-semibold text-accent uppercase tracking-wider mb-2">
                    Solution
                  </h4>
                  <p className="font-inter text-primary-300 leading-relaxed">
                    {selected.solution}
                  </p>
                </div>

                <div>
                  <h4 className="font-poppins text-sm font-semibold text-accent uppercase tracking-wider mb-3">
                    Results
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    {selected.results.map((result, idx) => (
                      <div key={idx} className="text-center p-4 rounded-xl bg-primary-800/50">
                        <result.icon className="w-5 h-5 text-accent mx-auto mb-2" />
                        <div className="font-poppins text-xl font-bold text-white">
                          {result.value}
                        </div>
                        <div className="font-inter text-xs text-primary-400">
                          {result.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-poppins text-sm font-semibold text-accent uppercase tracking-wider mb-2">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium text-primary-300 bg-primary-700 rounded-full border border-primary-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
