'use client'

import { motion } from 'framer-motion'
import { LightbulbIcon as Lightbulb, CodeIcon as Code, RocketIcon as Rocket, PenToolIcon as PenTool, HeadphonesIcon as Headphones } from './Icons'

const steps = [
  {
    icon: Lightbulb,
    title: 'Discovery & Planning',
    description: 'Understanding your business needs, technical requirements, and project goals through detailed consultation.',
    duration: '1-2 weeks',
  },
  {
    icon: PenTool,
    title: 'Design & Architecture',
    description: 'Creating technical specifications, system architecture, and UI/UX wireframes for optimal solutions.',
    duration: '1-2 weeks',
  },
  {
    icon: Code,
    title: 'Development & Integration',
    description: 'Agile development with regular sprints, code reviews, and integration testing throughout the process.',
    duration: '4-12 weeks',
  },
  {
    icon: Rocket,
    title: 'Testing & Deployment',
    description: 'Comprehensive QA, performance optimization, and seamless deployment to production environments.',
    duration: '1-2 weeks',
  },
  {
    icon: Headphones,
    title: 'Support & Optimization',
    description: 'Post-launch support, monitoring, and continuous improvements to ensure long-term success.',
    duration: 'Ongoing',
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

const stepVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function Process() {
  return (
    <section id="process" className="section-padding bg-primary-900">
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
            How I Work
          </span>
          <h2 className="font-poppins text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            My <span className="gradient-text">Process</span>
          </h2>
          <p className="font-inter text-lg text-primary-300 max-w-2xl mx-auto">
            A proven methodology that ensures quality delivery
            and transparent communication at every stage.
          </p>
        </motion.div>

        {/* Process Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Timeline Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent/50 to-transparent" />

          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={stepVariants}
                className={`relative flex items-start gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent border-4 border-primary-900 z-10" />

                {/* Content Card */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="glass-card p-6 group hover:border-accent/30 transition-all duration-300">
                    {/* Step Number & Icon */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <step.icon size={24} className="text-black" />
                      </div>
                      <div>
                        <span className="font-inter text-xs text-accent uppercase tracking-wider">
                          Step {index + 1}
                        </span>
                        <h3 className="font-poppins text-xl font-semibold text-white">
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="font-inter text-primary-300 mb-4 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Duration */}
                    <div className="flex items-center gap-2">
                      <span className="font-inter text-sm text-primary-400">Duration:</span>
                      <span className="font-inter text-sm font-medium text-accent">
                        {step.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
