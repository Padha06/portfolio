'use client'

import { motion } from 'framer-motion'

const techCategories = [
  {
    name: 'Frontend',
    items: [
      { name: 'React', color: '#61DAFB' },
      { name: 'Next.js', color: '#FFFFFF' },
      { name: 'TypeScript', color: '#3178C6' },
      { name: 'Tailwind CSS', color: '#06B6D4' },
    ],
  },
  {
    name: 'Backend',
    items: [
      { name: 'Node.js', color: '#339933' },
      { name: 'Python', color: '#3776AB' },
      { name: 'C#', color: '#239120' },
      { name: '.NET', color: '#512BD4' },
    ],
  },
  {
    name: 'Mobile',
    items: [
      { name: 'Kotlin', color: '#7F52FF' },
      { name: 'Android SDK', color: '#3DDC84' },
    ],
  },
  {
    name: 'ERP & Cloud',
    items: [
      { name: 'Dynamics 365 BC', color: '#002050' },
      { name: 'Power Apps', color: '#742774' },
      { name: 'Azure', color: '#0089D6' },
      { name: 'Dataverse', color: '#002050' },
    ],
  },
  {
    name: 'Data & Tools',
    items: [
      { name: 'SQL Server', color: '#CC2927' },
      { name: 'REST APIs', color: '#00D9FF' },
      { name: 'Power Automate', color: '#0066FF' },
      { name: 'GitHub', color: '#FFFFFF' },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const categoryVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Skills() {
  return (
    <section id="skills" className="section-padding bg-primary-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-inter text-sm text-accent uppercase tracking-wider">
            Tech Stack
          </span>
          <h2 className="font-poppins text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="font-inter text-lg text-primary-300 max-w-2xl mx-auto">
            A modern tech stack spanning frontend, backend, mobile,
            and enterprise systems.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-6 max-w-5xl mx-auto"
        >
          {techCategories.map((category) => (
            <motion.div
              key={category.name}
              variants={categoryVariants}
              className="glass-card p-6"
            >
              <h3 className="font-poppins text-lg font-semibold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-accent" />
                {category.name}
              </h3>

              <div className="flex flex-wrap gap-3">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary-800/50 border border-primary-700 hover:border-accent/30 transition-all duration-300 group"
                  >
                    <div
                      className="w-3 h-3 rounded-full group-hover:scale-125 transition-transform"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-inter text-sm font-medium text-primary-200 group-hover:text-white transition-colors">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Tech Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'React Native', 'GraphQL', 'MongoDB', 'Docker', 'CI/CD',
              'Agile/Scrum', 'Unit Testing', 'OAuth', 'WebSocket', 'Redis',
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 text-sm font-medium text-primary-200 bg-primary-800 rounded-full border border-primary-600 hover:border-accent hover:text-accent transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
