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
    <section id="skills" className="srv-section" style={{ padding: '6rem 1.5rem' }}>
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
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          {techCategories.map((category, index) => (
            <motion.div
              key={category.name}
              variants={categoryVariants}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '6px',
                padding: '1.25rem',
                transition: 'all 0.4s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <span className="srv-card-system-label">MODULE / {category.name.toUpperCase()}</span>
                <span className="srv-card-status">ACTIVE</span>
              </div>

              <h3 className="font-outfit" style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ffffff', marginBottom: '0.75rem' }}>
                {category.name}
              </h3>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.4rem 0.75rem',
                      borderRadius: '4px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    <div
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: item.color,
                      }}
                    />
                    <span className="font-dm" style={{ fontSize: '0.75rem', fontWeight: 500, color: '#a3a3a3' }}>
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
          style={{ marginTop: '2rem' }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem' }}>
            {extraTech.map((tech) => (
              <span
                key={tech}
                className="srv-tech-pill"
                style={{ fontSize: '0.7rem', padding: '0.35rem 0.75rem' }}
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
