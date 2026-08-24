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

const extraTech = [
  'React Native', 'GraphQL', 'MongoDB', 'Docker', 'CI/CD',
  'Agile/Scrum', 'Unit Testing', 'OAuth', 'WebSocket', 'Redis',
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const categoryVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Skills() {
  return (
    <section id="skills" className="srv-section px-6 py-24">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="srv-header"
        >
          <span className="srv-eyebrow">TECH STACK</span>
          <h2 className="srv-title">Skills & <span className="text-accent">Technologies</span></h2>
          <p className="srv-desc">
            A modern tech stack spanning frontend, backend, mobile,
            and enterprise systems.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {techCategories.slice(0, 3).map((category) => (
            <motion.div
              key={category.name}
              variants={categoryVariants}
              className="bg-white/[0.02] border border-white/5 rounded-md p-5 transition-all duration-400"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="srv-card-system-label">MODULE / {category.name.toUpperCase()}</span>
                <span className="srv-card-status">ACTIVE</span>
              </div>

              <h3 className="font-outfit text-[0.95rem] font-semibold text-white mb-3">
                {category.name}
              </h3>

              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/[0.03] border border-white/5"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-dm text-xs font-medium text-primary-300">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8"
        >
          <div className="flex flex-wrap justify-center gap-2">
            {extraTech.map((tech) => (
              <span
                key={tech}
                className="srv-tech-pill text-[0.7rem] px-3 py-1"
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
