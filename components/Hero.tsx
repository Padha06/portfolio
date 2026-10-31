'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { LineReveal, ease } from './Reveal'

const HeroMark3D = dynamic(() => import('./HeroMark3D'), { ssr: false })

const clients = ['Vaidya', 'Nexora', 'Nanoroutes', 'Lucent', 'MALYX', 'ZERO7', 'Qamar Global', 'Shaurya']

export default function Hero() {
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
  })

  return (
    <section id="top" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <motion.span className="pill" {...fade(0.05)}>
            <span className="status-dot" />
            Booking projects for 2027
          </motion.span>

          <LineReveal
            as="h1"
            className="hero-title"
            animate
            delay={0.1}
            lines={[<>Websites and systems</>, <><em>built</em> around your</>, <>business.</>]}
          />

          <motion.p className="hero-lede" {...fade(0.45)}>
            I&apos;m Shubam Padha. Through Vaskoi I design and build premium websites, apps and the
            Business Central workflows behind them — one partner from idea to launch.
          </motion.p>

          <motion.div className="hero-ctas" {...fade(0.55)}>
            <a href="#contact" className="btn btn-dark">
              Start a project <span className="btn-arrow">→</span>
            </a>
            <a href="#work" className="btn btn-outline">
              View work
            </a>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease }}
        >
          <HeroMark3D />
        </motion.div>
      </div>

      <motion.div className="container hero-foot" {...fade(0.75)}>
        <div className="hero-stats">
          <div>
            <strong>20+</strong>
            <span>products shipped</span>
          </div>
          <div>
            <strong>3+</strong>
            <span>years building</span>
          </div>
          <div>
            <strong>8</strong>
            <span>industries</span>
          </div>
        </div>
        <div className="hero-clients">
          <span className="label">Recent clients</span>
          <div className="hero-clients-track">
            <div className="hero-clients-row">
              {[...clients, ...clients].map((c, i) => (
                <span key={i} aria-hidden={i >= clients.length || undefined}>{c}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
