'use client'

import { motion } from 'framer-motion'

const services = [
  {
    id: '01',
    tag: 'SERVICE / 01',
    category: 'WEB SYSTEM',
    title: 'Websites that do more than look good.',
    description: 'High-performance websites and digital experiences built for businesses, startups, and products — responsive, scalable, SEO-friendly, and designed to convert.',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
    size: 'large' as const,
  },
  {
    id: '02',
    tag: 'SERVICE / 02',
    category: 'WEB APPLICATION',
    title: 'Software built around your workflow.',
    description: 'Custom web applications that turn complex processes into simple, intuitive experiences — from dashboards and portals to complete business platforms.',
    tech: ['React', 'Node.js', 'Python', '.NET', 'SQL'],
    size: 'small' as const,
  },
  {
    id: '03',
    tag: 'SERVICE / 03',
    category: 'MOBILE APPLICATION',
    title: 'Your product, wherever your users are.',
    description: 'Native and cross-platform mobile applications designed for performance, reliability, and real-world use — including field operations, workforce apps, and internal tools.',
    tech: ['React Native', 'Kotlin', 'Android', 'REST APIs'],
    size: 'small' as const,
  },
  {
    id: '04',
    tag: 'SERVICE / 04',
    category: 'ERP & BUSINESS',
    title: 'Make your business systems work harder.',
    description: 'Custom ERP development, extensions, workflows, and business logic that adapt enterprise systems to your exact processes.',
    tech: ['Dynamics 365 BC', 'AL', 'Power Apps', 'Dataverse'],
    size: 'large' as const,
  },
  {
    id: '05',
    tag: 'SERVICE / 05',
    category: 'INTEGRATIONS',
    title: 'Connect the systems that power your business.',
    description: 'We connect websites, apps, ERP platforms, databases, cloud services, and third-party tools so your data moves where it needs to — automatically.',
    tech: ['REST APIs', 'GraphQL', 'Webhooks', 'Azure', 'Dataverse'],
    size: 'large' as const,
  },
  {
    id: '06',
    tag: 'SERVICE / 06',
    category: 'AUTOMATION',
    title: 'Replace repetitive work with intelligent systems.',
    description: 'From data automation to custom internal tools, we turn manual processes into reliable digital workflows that save time and reduce errors.',
    tech: ['Power Automate', 'Python', 'SQL', 'APIs', 'Automation'],
    size: 'small' as const,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Services() {
  return (
    <section id="services" className="srv-section">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="srv-header"
        >
          <span className="srv-eyebrow">SERVICES</span>
          <h2 className="srv-title">
            We build more than websites.
          </h2>
          <p className="srv-desc">
            From polished digital experiences to complex business systems, we
            design, develop, integrate, and scale software around the way your
            business actually works.
          </p>
        </motion.div>

        {/* Asymmetric Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="srv-grid"
        >
          {services.map((service) => (
            <motion.article
              key={service.id}
              variants={cardVariants}
              className={`srv-card srv-card--${service.size}`}
            >
              {/* Background number */}
              <div className="srv-card-number">{service.id}</div>

              {/* System label */}
              <div className="srv-card-system">
                <span className="srv-card-system-label">{service.tag}</span>
                <span className="srv-card-status">ACTIVE</span>
              </div>

              {/* Category */}
              <div className="srv-card-category">{service.category}</div>

              {/* Title */}
              <h3 className="srv-card-title">{service.title}</h3>

              {/* Description */}
              <p className="srv-card-desc">{service.description}</p>

              {/* Tech */}
              <div className="srv-card-tech">
                {service.tech.map((t) => (
                  <span key={t} className="srv-tech-pill">{t}</span>
                ))}
              </div>

              {/* Arrow */}
              <div className="srv-card-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="srv-cta"
        >
          <div className="srv-cta-text">
            <span className="srv-cta-label">Have a system in mind?</span>
            <span className="srv-cta-heading">Let&apos;s build it.</span>
          </div>
          <a href="#contact" className="srv-cta-btn">
            START A PROJECT <span>&rarr;</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
