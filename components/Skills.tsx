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
    <section id="skills" className="srv-section">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="srv-header"
        >
          <span className="srv-eyebrow">TECH STACK</span>
          <h2 className="srv-title">Skills & Technologies</h2>
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
          className="srv-grid"
        >
          {techCategories.map((category, index) => (
            <motion.div
              key={category.name}
              variants={categoryVariants}
              className="srv-card srv-card--small"
            >
              <div className="srv-card-content">
                <div className="srv-card-number">{String(index + 1).padStart(2, '0')}</div>

                <div className="srv-card-system">
                  <span className="srv-card-system-label">MODULE / {category.name.toUpperCase()}</span>
                  <span className="srv-card-status">ACTIVE</span>
                </div>

                <div className="srv-card-category">{category.name}</div>

                <div className="flex flex-wrap gap-3 mt-4">
                  {category.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group/item"
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                      }}
                    >
                      <div
                        className="w-3 h-3 rounded-full group-hover/item:scale-125 transition-transform"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-inter text-sm font-medium" style={{ color: '#a3a3a3' }}>
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {extraTech.map((tech) => (
              <span
                key={tech}
                className="srv-tech-pill"
                style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}
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
