'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import CrtBackground from './CrtBackground'

export default function Hero() {
  return (
    <section className="hero-section">
      {/* Background image with overlay */}
      <div className="hero-bg">
        <Image
          src="/hero-bg-new.jpg"
          alt="Full-stack developer workspace"
          fill
          sizes="100vw"
          className="hero-bg-img"
          priority
        />
        <div className="hero-bg-overlay" />
      </div>

      {/* Mobile CRT Background — behind text */}
      <div className="hero-crt-mobile">
        <CrtBackground speed={0.9} typeSpeed={1.5} motion={1.5} opacity={0.35} />
      </div>

      {/* Content */}
      <div className="hero-content">
        <div className="hero-container">
          {/* Left column - Text */}
          <div className="hero-text">
            <motion.div
              initial={{ opacity: 0, transform: "translateY(20px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="hero-tags"
            >
              <span className="hero-tag">FULL-STACK</span>
              <span className="hero-tag-dot">&middot;</span>
              <span className="hero-tag">ERP</span>
              <span className="hero-tag-dot">&middot;</span>
              <span className="hero-tag">MOBILE</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, transform: "translateY(30px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.5, delay: 0.18, ease: [0.23, 1, 0.32, 1] }}
              className="hero-headline"
            >
              You have the idea.
              <br />
              <span className="hero-headline-accent">I build the system behind it.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, transform: "translateY(20px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.5, delay: 0.26, ease: [0.23, 1, 0.32, 1] }}
              className="hero-body"
            >
              Websites. Apps. ERP. Integrations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, transform: "translateY(20px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.5, delay: 0.34, ease: [0.23, 1, 0.32, 1] }}
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
              transition={{ duration: 0.5, delay: 0.42 }}
              className="hero-trust"
            >
              <div className="hero-trust-item">
                <span className="hero-trust-number">20+</span>
                <span className="hero-trust-label">Projects Delivered</span>
              </div>
              <div className="hero-trust-divider" />
              <div className="hero-trust-item">
                <span className="hero-trust-number">3+</span>
                <span className="hero-trust-label">Years Experience</span>
              </div>
              <div className="hero-trust-divider" />
              <div className="hero-trust-item">
                <span className="hero-trust-number">100%</span>
                <span className="hero-trust-label">Client Satisfaction</span>
              </div>
            </motion.div>
          </div>

          {/* Right column - CRT Effect (desktop only) */}
          <motion.div
            initial={{ opacity: 0, transform: "translateX(30px)" }}
            animate={{ opacity: 1, transform: "translateX(0px)" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="hero-image"
          >
            <div className="hero-image-frame crt-frame">
              <CrtBackground speed={1.5} typeSpeed={2.4} motion={1.8} opacity={0.95} />
              <div className="hero-image-overlay" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
