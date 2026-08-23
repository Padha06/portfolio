'use client'

import { motion } from 'framer-motion'
import { ExternalLinkIcon as ExternalLink, GitHubIcon as GitHub, GlobeIcon as Globe, SmartphoneIcon as Smartphone } from './Icons'

const projects = [
  {
    id: 1,
    title: 'One Stop Computer Shop',
    description: 'Full website for a local business with service listings, contact integration, and responsive design.',
    type: 'Website',
    link: 'https://onestopcyber-production.up.railway.app/',
    github: null,
    techStack: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
    color: 'from-blue-500 to-cyan-400',
    icon: Globe,
  },
  {
    id: 2,
    title: 'ScanGo WMS',
    description: 'Mobile warehouse management system with barcode scanning, offline capability, and Business Central integration.',
    type: 'Mobile App',
    link: 'https://scango.it.com',
    github: null,
    techStack: ['Kotlin', 'Android SDK', 'BC AL', 'REST APIs'],
    color: 'from-purple-500 to-pink-400',
    icon: Smartphone,
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

export default function LiveProjects() {
  return (
    <section id="live-projects" className="section-padding bg-primary-900">
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
            Live Projects
          </span>
          <h2 className="font-poppins text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            Recent <span className="gradient-text">Work</span>
          </h2>
          <p className="font-inter text-lg text-primary-300 max-w-2xl mx-auto">
            Explore some of my recently launched projects
            with live demos and technical details.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <motion.article
              key={project.id}
              variants={cardVariants}
              className="glass-card overflow-hidden group"
            >
              {/* Project Header */}
              <div className={`h-48 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <project.icon
                    size={80}
                    className="text-white/20 group-hover:scale-110 transition-transform duration-500"
                   
                  />
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-medium text-black bg-white rounded-full">
                    {project.type}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="font-poppins text-xl font-semibold text-white mb-3 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>

                <p className="font-inter text-primary-300 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium text-primary-300 bg-primary-700 rounded-full border border-primary-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm py-2 px-4"
                  >
                    <Globe size={16} />
                    Live Demo
                  </a>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-sm py-2 px-4"
                    >
                      <GitHub size={16} />
                      Code
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/Padha06"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <GitHub size={18} />
            View More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
