'use client'

import { motion } from 'framer-motion'
import { CodeIcon as Code, SmartphoneIcon as Smartphone, DatabaseIcon as Database, GitBranchIcon as GitBranch, ArrowRightIcon as ArrowRight } from './Icons'

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Modern, responsive web applications built with React, Next.js, and Tailwind CSS. SPA architectures optimized for performance.',
    technologies: ['React', 'Next.js', 'Tailwind', 'TypeScript'],
    color: 'from-blue-500 to-cyan-400',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Native Android development with Kotlin, offline-first architecture, and seamless user experiences.',
    technologies: ['Kotlin', 'Android SDK', 'Offline-First'],
    color: 'from-purple-500 to-pink-400',
  },
  {
    icon: Database,
    title: 'ERP & Business Central',
    description: 'Custom AL development, extensions, module design, and report builder for Dynamics 365 Business Central.',
    technologies: ['BC AL', 'Extensions', 'Report Builder'],
    color: 'from-emerald-500 to-teal-400',
  },
  {
    icon: GitBranch,
    title: 'Integrations',
    description: 'Seamless system connectivity between BC, Dataverse, Power Apps, and third-party REST APIs.',
    technologies: ['REST APIs', 'Power Apps', 'Dataverse'],
    color: 'from-amber-500 to-orange-400',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

export default function Services() {
  return (
    <section id="services" className="section-padding bg-primary-950">
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
            What I Do
          </span>
          <h2 className="font-poppins text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            Core <span className="gradient-text">Services</span>
          </h2>
          <p className="font-inter text-lg text-primary-300 max-w-2xl mx-auto">
            End-to-end development solutions for startups and enterprises,
            from web applications to ERP customization.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className="glass-card p-6 lg:p-8 group cursor-pointer"
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon size={28} className="text-white" />
              </div>

              {/* Title */}
              <h3 className="font-poppins text-xl font-semibold text-white mb-3">
                {service.title}
              </h3>

              {/* Description */}
              <p className="font-inter text-primary-300 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-6">
                {service.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium text-accent bg-accent/10 rounded-full border border-accent/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Learn More */}
              <div className="flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all duration-300">
                <span className="font-inter text-sm">Learn More</span>
                <ArrowRight size={16} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
