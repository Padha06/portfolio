'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="hero-section">
      {/* Background image with overlay */}
      <div className="hero-bg">
        <Image
          src="/hero-bg.jpg"
          alt="Full-stack developer workspace"
          fill
          sizes="100vw"
          className="hero-bg-img"
          priority
        />
        <div className="hero-bg-overlay" />
      </div>

      {/* Content */}
      <div className="hero-content">
        <div className="hero-container">
          {/* Left column - Text */}
          <div className="hero-text">
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
              You have the idea.
              <br />
              <span className="hero-headline-accent">I build the system behind it.</span>
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

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="hero-trust"
            >
              <div className="hero-trust-item">
                <span className="hero-trust-number">50+</span>
                <span className="hero-trust-label">Projects Delivered</span>
              </div>
              <div className="hero-trust-divider" />
              <div className="hero-trust-item">
                <span className="hero-trust-number">5+</span>
                <span className="hero-trust-label">Years Experience</span>
              </div>
              <div className="hero-trust-divider" />
              <div className="hero-trust-item">
                <span className="hero-trust-number">100%</span>
                <span className="hero-trust-label">Client Satisfaction</span>
              </div>
            </motion.div>
          </div>

          {/* Right column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-image"
          >
            <div className="hero-image-frame">
              <Image
                src="/hero-left-bg.jpg"
                alt="Full-stack developer workspace"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="hero-image-img"
                priority
              />
              <div className="hero-image-overlay" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
