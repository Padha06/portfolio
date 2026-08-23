'use client'

import { motion } from 'framer-motion'

const skillCategories = [
  {
    title: 'Languages',
    skills: [
      { name: 'JavaScript', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'AL (Business Central)', level: 92 },
      { name: 'C#', level: 80 },
      { name: 'Kotlin', level: 88 },
    ],
  },
  {
    title: 'Web & Mobile',
    skills: [
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 92 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Kotlin/Android', level: 88 },
      { name: 'REST APIs', level: 95 },
    ],
  },
  {
    title: 'ERP & Business',
    skills: [
      { name: 'Dynamics 365 BC', level: 92 },
      { name: 'AL Development', level: 90 },
      { name: 'Power Apps', level: 85 },
      { name: 'Dataverse', level: 82 },
      { name: 'OData', level: 88 },
    ],
  },
  {
    title: 'Tools & Platforms',
    skills: [
      { name: 'GitHub', level: 95 },
      { name: 'Azure', level: 85 },
      { name: 'VS Code', level: 95 },
      { name: 'Power Automate', level: 80 },
      { name: 'SQL Server', level: 88 },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const categoryVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function Skills() {
  return (
    <section id="skills" className="section-padding bg-primary-950">
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
            Expertise
          </span>
          <h2 className="font-poppins text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="font-inter text-lg text-primary-300 max-w-2xl mx-auto">
            A comprehensive toolkit spanning frontend, backend, mobile,
            and enterprise ERP systems.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={categoryVariants}
              className="glass-card p-6 lg:p-8"
            >
              <h3 className="font-poppins text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-accent" />
                {category.title}
              </h3>

              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-inter text-sm text-primary-200">
                        {skill.name}
                      </span>
                      <span className="font-inter text-xs text-primary-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-primary-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                        className="h-full bg-gradient-accent rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skill Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12"
        >
          <h3 className="font-poppins text-lg font-semibold text-white mb-6 text-center">
            Additional Technologies
          </h3>
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
