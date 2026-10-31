'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal, LineReveal, Eyebrow, ArrowUpRight, ease } from './Reveal'
import { systems } from '@/lib/content'

export default function Systems() {
  const [active, setActive] = useState(0)
  const [inView, setInView] = useState(false)
  const mediaRef = useRef<HTMLDivElement>(null)
  const study = systems[active]

  // Only stream the demo videos while the panel is on screen.
  useEffect(() => {
    const el = mediaRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section id="systems" className="section section-surface">
      <div className="container">
        <div className="section-head">
          <Eyebrow index="02">Systems &amp; enterprise</Eyebrow>
          <LineReveal
            className="section-title"
            lines={[<>The software</>, <><em>behind</em> the business.</>]}
          />
          <Reveal delay={0.15}>
            <p className="section-lede">
              Beyond the storefront: warehouse apps, ERP extensions and integrations for teams running
              on Microsoft Dynamics 365 Business Central.
            </p>
          </Reveal>
        </div>

        <div className="systems">
          <div className="systems-tabs" role="tablist" aria-label="Enterprise case studies">
            {systems.map((s, i) => (
              <button
                key={s.slug}
                role="tab"
                aria-selected={i === active}
                className={`systems-tab ${i === active ? 'is-active' : ''}`}
                onClick={() => setActive(i)}
              >
                <span className="mono systems-tab-index">0{i + 1}</span>
                <span className="systems-tab-body">
                  <span className="systems-tab-title">{s.title}</span>
                  <span className="mono systems-tab-kicker">{s.kicker}</span>
                </span>
                <span className="systems-tab-bar" />
              </button>
            ))}
          </div>

          <Reveal className="systems-panel" y={40}>
            <div ref={mediaRef} className="systems-media">
              <AnimatePresence mode="wait">
                <motion.div
                  key={study.slug}
                  className="systems-media-inner"
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease }}
                >
                  {study.video && inView ? (
                    <video src={study.video} poster={study.image} autoPlay muted loop playsInline />
                  ) : (
                    <img src={study.image} alt={`${study.title} interface`} loading="lazy" />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={study.slug}
                className="systems-detail"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease }}
              >
                <div className="systems-cols">
                  <div>
                    <span className="mono label">Challenge</span>
                    <p>{study.challenge}</p>
                  </div>
                  <div>
                    <span className="mono label">Solution</span>
                    <p>{study.solution}</p>
                  </div>
                </div>
                <div className="systems-results">
                  {study.results.map((r) => (
                    <div key={r.label} className="result">
                      <span className="result-value">{r.value}</span>
                      <span className="result-label">{r.label}</span>
                    </div>
                  ))}
                </div>
                <div className="systems-foot">
                  <div className="tags">
                    {study.tech.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                  {study.url && (
                    <a href={study.url} target="_blank" rel="noopener noreferrer" className="link-arrow">
                      Product site <ArrowUpRight />
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
