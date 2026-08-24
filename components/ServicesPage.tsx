'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const services = [
  {
    id: '01',
    tag: 'CAPABILITY_01',
    sysLabel: 'SYS / WEB',
    category: 'WEB DEVELOPMENT',
    title: 'Websites that do more than look good.',
    description: 'High-performance websites and digital experiences built for businesses, startups, and products — responsive, scalable, SEO-friendly, and designed to convert.',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
    image: '/svc-web.jpg',
    status: 'ACTIVE',
  },
  {
    id: '02',
    tag: 'CAPABILITY_02',
    sysLabel: 'SYS / APP',
    category: 'WEB APPLICATIONS',
    title: 'Software built around your workflow.',
    description: 'Custom web applications that turn complex processes into simple, intuitive experiences — from dashboards and portals to complete business platforms.',
    tech: ['React', 'Node.js', 'Python', '.NET', 'SQL'],
    image: '/svc-app.jpg',
    status: 'ACTIVE',
  },
  {
    id: '03',
    tag: 'CAPABILITY_03',
    sysLabel: 'SYS / MOBILE',
    category: 'MOBILE APPLICATIONS',
    title: 'Your product, wherever your users are.',
    description: 'Native and cross-platform mobile applications designed for performance, reliability, and real-world use — including field operations, workforce apps, customer apps, and internal tools.',
    tech: ['React Native', 'Kotlin', 'Android', 'REST APIs'],
    image: '/svc-mobile.jpg',
    status: 'ACTIVE',
  },
  {
    id: '04',
    tag: 'CAPABILITY_04',
    sysLabel: 'SYS / ERP',
    category: 'ERP & BUSINESS SYSTEMS',
    title: 'Make your business systems work harder.',
    description: 'Custom ERP development, extensions, workflows, and business logic that adapt enterprise systems to your exact processes.',
    tech: ['Dynamics 365 Business Central', 'AL', 'Power Apps', 'Dataverse'],
    image: '/svc-erp.jpg',
    status: 'ACTIVE',
  },
  {
    id: '05',
    tag: 'CAPABILITY_05',
    sysLabel: 'SYS / API',
    category: 'INTEGRATIONS & APIs',
    title: 'Connect the systems that power your business.',
    description: 'We connect websites, apps, ERP platforms, databases, cloud services, and third-party tools so your data moves where it needs to — automatically.',
    tech: ['REST APIs', 'GraphQL', 'Webhooks', 'Azure', 'Dataverse'],
    image: '/svc-integration.jpg',
    status: 'ACTIVE',
  },
  {
    id: '06',
    tag: 'CAPABILITY_06',
    sysLabel: 'SYS / AUTO',
    category: 'AUTOMATION & CUSTOM SOLUTIONS',
    title: 'Replace repetitive work with intelligent systems.',
    description: 'From data automation to custom internal tools, we turn manual processes into reliable digital workflows that save time and reduce errors.',
    tech: ['Power Automate', 'Python', 'SQL', 'APIs', 'Automation'],
    image: '/svc-automation.jpg',
    status: 'ACTIVE',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function ServicesPage() {
  return (
    <div className="sp">
      {/* Hero */}
      <section className="sp-hero">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="sp-eyebrow">SERVICES</span>
            <h1 className="sp-hero-title">
              We build more<br />than websites.
            </h1>
            <p className="sp-hero-desc">
              From polished digital experiences to complex business systems, we
              design, develop, integrate, and scale software around the way your
              business actually works.
            </p>
          </motion.div>

          {/* System status bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="sp-status-bar"
          >
            <div className="sp-status-item">
              <span className="sp-status-label">SYSTEMS</span>
              <span className="sp-status-value">06</span>
            </div>
            <div className="sp-status-divider" />
            <div className="sp-status-item">
              <span className="sp-status-label">STATUS</span>
              <span className="sp-status-value sp-status-green">ALL ACTIVE</span>
            </div>
            <div className="sp-status-divider" />
            <div className="sp-status-item">
              <span className="sp-status-label">CAPABILITIES</span>
              <span className="sp-status-value">WEB / MOBILE / ERP / API / AUTO</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="sp-list">
        <div className="container-custom">
          {services.map((svc, i) => (
            <motion.article
              key={svc.id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="sp-service"
            >
              {/* Left: Image */}
              <div className="sp-service-image">
                <Image
                  src={svc.image}
                  alt={svc.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="sp-service-img"
                />
                <div className="sp-service-img-overlay" />
                <div className="sp-service-img-number">{svc.id}</div>
              </div>

              {/* Right: Content */}
              <div className="sp-service-content">
                <div className="sp-service-meta">
                  <span className="sp-service-tag">{svc.tag}</span>
                  <span className="sp-service-sys">{svc.sysLabel}</span>
                  <span className="sp-service-status">{svc.status}</span>
                </div>

                <div className="sp-service-category">{svc.category}</div>

                <h2 className="sp-service-title">{svc.title}</h2>

                <p className="sp-service-desc">{svc.description}</p>

                <div className="sp-service-tech">
                  {svc.tech.map((t) => (
                    <span key={t} className="sp-tech-pill">{t}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="sp-cta">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="sp-cta-inner"
          >
            <div className="sp-cta-text">
              <span className="sp-cta-label">Have a system in mind?</span>
              <h2 className="sp-cta-heading">Let&apos;s build it.</h2>
            </div>
            <Link href="/#contact" className="sp-cta-btn">
              START A PROJECT <span>&rarr;</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
