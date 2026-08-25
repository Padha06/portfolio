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
    transition: { staggerChildren: 0.05 },
  },
}

const categoryVariants = {
  hidden: { opacity: 0, transform: "translateY(20px)" },
  visible: {
    opacity: 1,
    transform: "translateY(0px)",
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
  },
}

export default function Skills() {
  return (
    <section id="skills" className="srv-section">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, transform: "translateY(20px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0px)" }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
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
          className="flex flex-wrap justify-center gap-4"
        >
          {techCategories.map((category) => (
            <motion.div
              key={category.name}
              variants={categoryVariants}
              className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.6875rem)] bg-white/[0.02] border border-white/5 rounded-md p-5 transition-all duration-400"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="srv-card-system-label">{category.name}</span>
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
      </div>
    </section>
  )
}
