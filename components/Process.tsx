'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Discovery',
    subtitle: 'Understand & Plan',
    description: 'Deep-dive into your business needs, technical requirements, and project goals. We define scope, milestones, and the path forward together.',
    duration: '1-2 weeks',
    tags: ['RESEARCH', 'PLANNING'],
  },
  {
    number: '02',
    title: 'Build & Integrate',
    subtitle: 'Develop & Connect',
    description: 'Agile development with regular sprints, code reviews, and integration testing. Your solution takes shape with transparent progress updates.',
    duration: '4-12 weeks',
    tags: ['AGILE', 'SPRINTS'],
  },
  {
    number: '03',
    title: 'Deploy & Support',
    subtitle: 'Launch & Optimize',
    description: 'Comprehensive QA, performance optimization, seamless deployment, and ongoing support to ensure long-term success.',
    duration: 'Ongoing',
    tags: ['QA', 'OPTIMIZE'],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const stepVariants = {
  hidden: { opacity: 0, transform: "translateY(40px)" },
  visible: {
    opacity: 1,
    transform: "translateY(0px)",
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
  },
}

export default function Process() {
  return (
    <section id="process" className="section-padding bg-primary-950">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, transform: "translateY(20px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0px)" }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="srv-card-system-label">PROCESS</span>
          </div>
          <h2 className="cs-section-title">From Idea to <span className="text-accent">Launch</span></h2>
          <p className="cs-section-desc">
            A proven three-step methodology that ensures quality delivery
            and transparent communication at every stage.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-4 max-w-5xl mx-auto"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={stepVariants}
              className="srv-card group"
            >
              <div className="srv-card-content">
                {/* Header row */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="srv-card-system-label">STEP / {step.number}</span>
                    </div>
                    <h3 className="srv-card-title">{step.title}</h3>
                    <p className="font-dm text-sm text-accent">{step.subtitle}</p>
                  </div>
                  <div className="font-outfit text-6xl font-bold text-accent/10 group-hover:text-accent/20 transition-colors">
                    {step.number}
                  </div>
                </div>

                {/* Description */}
                <p className="srv-card-desc">{step.description}</p>

                {/* Footer row */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-primary-800">
                  <div className="flex flex-wrap gap-2">
                    {step.tags.map((tag) => (
                      <span key={tag} className="srv-tech-pill">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-dm text-xs text-primary-500">Duration:</span>
                    <span className="font-dm text-xs font-medium text-accent">{step.duration}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
