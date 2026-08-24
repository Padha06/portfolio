'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <section className="hero-section">
      {/* Left Panel */}
      <div className="hero-left">
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
          Websites. Apps. ERP.<br />
          Integrations.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="hero-body-sub"
        >
          I build scalable digital products and business systems from frontend
          to backend...
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="hero-buttons"
        >
          <a href="#contact" className="hero-btn-primary">
            START A PROJECT <span className="hero-arrow">&rarr;</span>
          </a>
          <a href="#case-studies" className="hero-btn-secondary">
            View My Work <span className="hero-arrow-down">&darr;</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="hero-available"
        >
          <span className="hero-dot" />
          AVAILABLE FOR FREELANCE PROJECTS
        </motion.div>
      </div>

      {/* Right Panel */}
      <div className="hero-right">
        <div className="hero-right-bg">
          <Image
            src="/hero-bg.jpg"
            alt=""
            fill
            className="hero-bg-image"
            priority
          />
          <div className="hero-glass-overlay" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="hero-status-card"
        >
          <div className="hero-status-header">SYSTEM ONLINE</div>
          <div className="hero-status-row">
            <span className="hero-status-label">WEB APP</span>
            <span className="hero-status-badge live">LIVE</span>
          </div>
          <div className="hero-status-row">
            <span className="hero-status-label">ERP</span>
            <span className="hero-status-badge synced">SYNCED</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="hero-project-card"
        >
          <div className="hero-project-label">PROJECT</div>
          <div className="hero-project-name">Vaskoi</div>
        </motion.div>
      </div>
    </section>
  )
}
