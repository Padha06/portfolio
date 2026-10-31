'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal, LineReveal, Eyebrow, ease } from './Reveal'
import { services } from '@/lib/content'

export default function Services() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="services" className="section">
      <div className="container">
        <div className="section-head section-head-split">
          <div>
            <Eyebrow index="03">Services</Eyebrow>
            <LineReveal className="section-title" lines={[<>What I</>, <><em>build</em> for you.</>]} />
          </div>
          <Reveal delay={0.15}>
            <p className="section-lede">
              Design and engineering under one roof — so the thing that looks good is also the thing
              that works, scales and is easy to change later.
            </p>
          </Reveal>
        </div>

        <div className="services">
          {services.map((s, i) => {
            const isOpen = open === i
            return (
              <Reveal key={s.title} delay={i * 0.05} y={20}>
                <div
                  className={`service ${isOpen ? 'is-open' : ''}`}
                  onMouseEnter={() => setOpen(i)}
                >
                  <button
                    className="service-head"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="mono service-index">0{i + 1}</span>
                    <span className="service-title">{s.title}</span>
                    <span className="service-plus" aria-hidden="true" />
                  </button>
                  <motion.div
                    className="service-body"
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.6, ease }}
                  >
                    <div className="service-body-inner">
                      <p>{s.body}</p>
                      <div className="tags">
                        {s.tags.map((t) => (
                          <span key={t} className="tag">{t}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
