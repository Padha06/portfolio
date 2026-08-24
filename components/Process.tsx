'use client'

import { motion } from 'framer-motion'
import { LightbulbIcon as Lightbulb, CodeIcon as Code, RocketIcon as Rocket } from './Icons'

const steps = [
  {
    number: '01',
    icon: Lightbulb,
    title: 'Discovery',
    subtitle: 'Understand & Plan',
    description: 'Deep-dive into your business needs, technical requirements, and project goals. We define scope, milestones, and the path forward together.',
    duration: '1-2 weeks',
  },
  {
    number: '02',
    icon: Code,
    title: 'Build & Integrate',
    subtitle: 'Develop & Connect',
    description: 'Agile development with regular sprints, code reviews, and integration testing. Your solution takes shape with transparent progress updates.',
    duration: '4-12 weeks',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Deploy & Support',
    subtitle: 'Launch & Optimize',
    description: 'Comprehensive QA, performance optimization, seamless deployment, and ongoing support to ensure long-term success.',
    duration: 'Ongoing',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
}

const stepVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Process() {
  return (
    <section id="process" className="section-padding bg-primary-950">
      <div className="container-custom">
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
            From Idea to <span className="gradient-text">Launch</span>
          </h2>
          <p className="font-inter text-lg text-primary-300 max-w-2xl mx-auto">
            A proven three-step methodology that ensures quality delivery
            and transparent communication at every stage.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={stepVariants}
              className="relative"
            >
              {/* Connector line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-accent/50 to-accent/10" />
              )}

              <div className="glass-card p-8 h-full group hover:border-accent/30 transition-all duration-300">
                {/* Step Number */}
                <div className="font-poppins text-6xl font-bold text-accent/10 group-hover:text-accent/20 transition-colors mb-4">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <step.icon size={28} className="text-black" />
                </div>

                {/* Title */}
                <h3 className="font-poppins text-2xl font-bold text-white mb-1">
                  {step.title}
                </h3>
                <p className="font-inter text-sm text-accent mb-4">
                  {step.subtitle}
                </p>

                {/* Description */}
                <p className="font-inter text-primary-300 leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Duration */}
                <div className="flex items-center gap-2 pt-4 border-t border-primary-700">
                  <span className="font-inter text-sm text-primary-400">Duration:</span>
                  <span className="font-inter text-sm font-medium text-accent">
                    {step.duration}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
