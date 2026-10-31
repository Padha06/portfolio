'use client'

import { motion } from 'framer-motion'
import { LineReveal, ease } from './Reveal'

export default function Hero() {
  const ready = true

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1, delay, ease },
  })

  return (
    <section id="top" className="hero">
      <div className="hero-grid-lines" aria-hidden="true">
        <span /><span /><span /><span />
      </div>

      <motion.div className="container hero-inner">
        <motion.div className="hero-meta" {...fade(0.1)}>
          <span className="mono">Shubam Padha — Independent studio</span>
          <span className="mono hero-meta-right">Web · Mobile · ERP</span>
        </motion.div>

        <LineReveal
          as="h1"
          className="hero-title"
          animate={ready}
          delay={0.15}
          lines={[
            <>Websites and systems</>,
            <>
              <em>built</em> around your business
            </>,
          ]}
        />

        <div className="hero-bottom">
          <motion.p className="hero-lede" {...fade(0.55)}>
            I build clear, considered digital experiences — from customer-facing websites and apps
            to the ERP workflows that keep a business moving.
          </motion.p>

          <motion.div className="hero-ctas" {...fade(0.65)}>
            <a href="#work" className="btn btn-light">
              See selected work
              <span className="btn-arrow">↓</span>
            </a>
            <a href="#contact" className="btn btn-ghost">
              Start a project
            </a>
          </motion.div>
        </div>
      </motion.div>

      <motion.div className="container hero-foot" {...fade(0.8)}>
        <div className="hero-stat">
          <span className="hero-stat-num">20+</span>
          <span className="hero-stat-label">products shipped</span>
        </div>
        <div className="hero-stat">
          <span className="hero-stat-num">3+</span>
          <span className="hero-stat-label">years building</span>
        </div>
        <div className="hero-stat">
          <span className="hero-stat-num">8</span>
          <span className="hero-stat-label">industries served</span>
        </div>
        <div className="hero-stat hero-stat-time">
          <span className="mono">Based in India · Working worldwide</span>
          <span className="mono hero-scroll">
            Scroll <span className="hero-scroll-line" />
          </span>
        </div>
      </motion.div>
    </section>
  )
}
