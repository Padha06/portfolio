'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

function AnimatedCounter({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = Date.now()
          const animate = () => {
            const elapsed = Date.now() - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

const stats = [
  {
    value: 40,
    suffix: '%',
    label: 'Faster Deployment',
    description: 'Average improvement in time-to-market for client projects',
    tag: 'METRIC / 01',
  },
  {
    value: 70,
    suffix: '%',
    label: 'Reduction in Manual Processes',
    description: 'Through automation and custom ERP solutions',
    tag: 'METRIC / 02',
  },
  {
    value: 95,
    suffix: '%',
    label: 'Client Retention',
    description: 'Clients return for additional projects and ongoing support',
    tag: 'METRIC / 03',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Stats() {
  return (
    <section id="stats" className="section-padding bg-primary-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="srv-card-system-label">TRACK RECORD</span>
            <span className="srv-card-status">ACTIVE</span>
          </div>
          <h2 className="cs-section-title">Client <span className="text-accent">Outcomes</span></h2>
          <p className="cs-section-desc">
            Measurable results that demonstrate the impact of
            tailored development solutions.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={cardVariants}
              className="srv-card group"
            >
              <div className="srv-card-content">
                <div className="flex items-center gap-3 mb-6">
                  <span className="srv-card-system-label">{stat.tag}</span>
                  <span className="srv-card-status">ACTIVE</span>
                </div>

                <div className="font-outfit text-5xl md:text-6xl font-bold text-white mb-3">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>

                <h3 className="font-outfit text-lg font-semibold text-white mb-2">
                  {stat.label}
                </h3>

                <p className="srv-card-desc" style={{ marginBottom: 0 }}>
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
