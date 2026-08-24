'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="hero-section">
      {/* Left Panel */}
      <div className="hero-left">
        <div className="hero-left-bg">
          <Image
            src="/hero-left-bg.jpg"
            alt=""
            fill
            className="hero-left-bg-image"
            priority
          />
          <div className="hero-left-glass" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hero-tags"
        >
          <span className="hero-tag">FULL-STACK</span>
          <span className="hero-tag-dot">&middot;</span>
          <span className="hero-tag">ERP</span>
          <span className="hero-tag-dot">&middot;</span>
          <span className="hero-tag">MOBILE</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="hero-headline"
        >
          You have the idea.<br />
          I build the system<br />
          behind it.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="hero-body"
        >
          Websites. Apps. ERP. Integrations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="hero-buttons"
        >
          <a href="#contact" className="hero-btn-primary">
            START A PROJECT <span className="hero-arrow">&rarr;</span>
          </a>
          <a href="#case-studies" className="hero-btn-secondary">
            View My Work <span className="hero-arrow-down">&darr;</span>
          </a>
        </motion.div>
      </div>

      {/* Right Panel */}
      <div className="hero-right">
        <div className="hero-right-bg" style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image
            src="/hero-bg.jpg"
            alt="Background"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="hero-bg-image"
            priority
          />
          <div className="hero-glass-overlay" />
        </div>
      </div>
    </section>
  )
}
