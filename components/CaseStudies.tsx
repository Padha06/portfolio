'use client'

import { motion } from 'framer-motion'
import { ArrowRightIcon as ArrowRight, ExternalLinkIcon as ExternalLink, TrendingUpIcon as TrendingUp, ClockIcon as Clock, UsersIcon as Users } from './Icons'

const caseStudies = [
  {
    id: 1,
    title: 'E-Commerce Platform for Retail Startup',
    clientType: 'Startup',
    domain: 'Web + Integration',
    challenge: 'A retail startup needed a complete e-commerce solution with real-time inventory synchronization across multiple sales channels.',
    solution: 'Built a Next.js frontend with Node.js backend, integrated with Business Central for inventory management via REST APIs.',
    results: [
      { icon: TrendingUp, value: '40%', label: 'Faster Load Time' },
      { icon: Users, value: '10K+', label: 'Monthly Users' },
      { icon: Clock, value: '3 months', label: 'Time to Market' },
    ],
    techStack: ['Next.js', 'Node.js', 'BC AL', 'REST APIs'],
    color: 'from-blue-500 to-cyan-400',
  },
  {
    id: 2,
    title: 'Warehouse Management System',
    clientType: 'Mid-Market SMB',
    domain: 'Mobile + ERP',
    challenge: 'A logistics company needed a mobile-first WMS with offline capability and real-time sync to Business Central.',
    solution: 'Developed Kotlin-based Android app with offline-first architecture, barcode scanning, and bi-directional BC integration.',
    results: [
      { icon: TrendingUp, value: '60%', label: 'Efficiency Gain' },
      { icon: Users, value: '50+', label: 'Daily Users' },
      { icon: Clock, value: '99.9%', label: 'Uptime' },
    ],
    techStack: ['Kotlin', 'Android SDK', 'BC AL', 'OData'],
    color: 'from-purple-500 to-pink-400',
  },
  {
    id: 3,
    title: 'Treasury Module Customization',
    clientType: 'Enterprise',
    domain: 'ERP',
    challenge: 'An enterprise client needed custom treasury management features within Business Central that were not available in standard modules.',
    solution: 'Designed and implemented custom AL extensions for treasury operations, including automated reconciliation and reporting.',
    results: [
      { icon: TrendingUp, value: '80%', label: 'Time Saved' },
      { icon: Users, value: '25+', label: 'Daily Users' },
      { icon: Clock, value: '2 weeks', label: 'Implementation' },
    ],
    techStack: ['BC AL', 'Report Builder', 'Power Automate'],
    color: 'from-emerald-500 to-teal-400',
  },
  {
    id: 4,
    title: 'Dataverse/Power Apps Integration',
    clientType: 'Mid-Market SMB',
    domain: 'Integration',
    challenge: 'A company needed to sync data between multiple systems including Business Central, Dataverse, and custom applications.',
    solution: 'Architected a multi-system integration layer using REST APIs, webhooks, and Power Automate for real-time data synchronization.',
    results: [
      { icon: TrendingUp, value: '100%', label: 'Data Accuracy' },
      { icon: Users, value: '5', label: 'Systems Connected' },
      { icon: Clock, value: 'Real-time', label: 'Sync Speed' },
    ],
    techStack: ['REST APIs', 'Dataverse', 'Power Apps', 'Webhooks'],
    color: 'from-amber-500 to-orange-400',
  },
  {
    id: 5,
    title: 'Bulk Data Import Solution',
    clientType: 'Mid-Market SMB',
    domain: 'Integration',
    challenge: 'A client needed to import large volumes of historical data into Business Central while maintaining data integrity.',
    solution: 'Built a Python-based data pipeline with validation, transformation, and batch processing capabilities for BC import.',
    results: [
      { icon: TrendingUp, value: '1M+', label: 'Records Processed' },
      { icon: Users, value: '99.8%', label: 'Accuracy Rate' },
      { icon: Clock, value: '70%', label: 'Time Saved' },
    ],
    techStack: ['Python', 'BC AL', 'SQL Server', 'REST APIs'],
    color: 'from-rose-500 to-red-400',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function CaseStudies() {
  return (
    <section id="case-studies" className="section-padding bg-primary-900">
      <div className="container-custom">
        {/* Section Header */}
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

        {/* Case Studies Grid */}
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
              className="glass-card p-6 lg:p-8 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 text-xs font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
                      {study.clientType}
                    </span>
                    <span className="px-3 py-1 text-xs font-medium text-primary-300 bg-primary-700 rounded-full">
                      {study.domain}
                    </span>
                  </div>
                  <h3 className="font-poppins text-xl font-semibold text-white group-hover:text-accent transition-colors">
                    {study.title}
                  </h3>
                </div>
                <button
                  className="p-2 text-primary-400 hover:text-accent transition-colors"
                  aria-label={`View ${study.title} live`}
                >
                  <ExternalLink size={20} />
                </button>
              </div>

              {/* Challenge */}
              <div className="mb-4">
                <h4 className="font-poppins text-sm font-semibold text-primary-400 uppercase tracking-wider mb-2">
                  Challenge
                </h4>
                <p className="font-inter text-sm text-primary-300 leading-relaxed">
                  {study.challenge}
                </p>
              </div>

              {/* Solution */}
              <div className="mb-6">
                <h4 className="font-poppins text-sm font-semibold text-primary-400 uppercase tracking-wider mb-2">
                  Solution
                </h4>
                <p className="font-inter text-sm text-primary-300 leading-relaxed">
                  {study.solution}
                </p>
              </div>

              {/* Results */}
              <div className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-xl bg-primary-800/50">
                {study.results.map((result, idx) => (
                  <div key={idx} className="text-center">
                    <result.icon className="w-5 h-5 text-accent mx-auto mb-1" />
                    <div className="font-poppins text-lg font-bold text-white">
                      {result.value}
                    </div>
                    <div className="font-inter text-xs text-primary-400">
                      {result.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {study.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium text-primary-300 bg-primary-700 rounded-full border border-primary-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* View More */}
              <div className="flex items-center gap-2 mt-6 pt-6 border-t border-primary-700 text-accent font-medium group-hover:gap-3 transition-all duration-300">
                <span className="font-inter text-sm">View Full Case Study</span>
                <ArrowRight size={16} />
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
