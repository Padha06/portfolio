'use client'

import { useEffect, useRef, useState } from 'react'
import { Reveal, LineReveal, Eyebrow, ArrowUpRight } from './Reveal'
import { systems, type SystemStudy } from '@/lib/content'

/** Plays a muted demo loop only while it's on screen. */
function Media({ study }: { study: SystemStudy }) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || !study.video) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [study.video])

  return (
    <div ref={ref} className="bento-media">
      {study.video && inView ? (
        <video src={study.video} poster={study.image} autoPlay muted loop playsInline />
      ) : (
        <img src={study.image} alt={`${study.title} interface`} loading="lazy" />
      )}
    </div>
  )
}

function StudyCard({ study, className }: { study: SystemStudy; className: string }) {
  return (
    <Reveal className={`bento-card ${className}`}>
      <Media study={study} />
      <div className="bento-body">
        <span className="label">{study.kicker}</span>
        <h3 className="bento-title">{study.title}</h3>
        <p>{study.solution}</p>
        <div className="bento-foot">
          <div className="tags">
            {study.tech.slice(0, 3).map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
          {study.url && (
            <a href={study.url} target="_blank" rel="noopener noreferrer" className="link-arrow">
              Product site <ArrowUpRight />
            </a>
          )}
        </div>
      </div>
    </Reveal>
  )
}

export default function Systems() {
  const [scango, dashboard, esign] = systems
  const highlights = [
    { value: '18', label: 'warehouse modules in ScanGo' },
    { value: '40%', label: 'faster data access in BC' },
    { value: '< 5s', label: 'signature to attached PDF' },
    { value: '0', label: 'manual uploads' },
  ]

  return (
    <section id="systems" className="section section-tint">
      <div className="container">
        <div className="section-head">
          <Eyebrow index="02">Systems &amp; enterprise</Eyebrow>
          <LineReveal className="section-title" lines={[<>The software</>, <><em>behind</em> the business.</>]} />
          <Reveal delay={0.1}>
            <p className="section-lede">
              Warehouse apps, ERP extensions and integrations for teams running on Microsoft Dynamics
              365 Business Central.
            </p>
          </Reveal>
        </div>

        <div className="bento">
          <StudyCard study={scango} className="bento-a" />
          <StudyCard study={dashboard} className="bento-b" />
          <StudyCard study={esign} className="bento-c" />
          <Reveal className="bento-card bento-d bento-stats">
            <span className="label">By the numbers</span>
            <div className="bento-stat-grid">
              {highlights.map((h) => (
                <div key={h.label}>
                  <strong>{h.value}</strong>
                  <span>{h.label}</span>
                </div>
              ))}
            </div>
            <p className="bento-note">
              Need Business Central to fit the way your team actually works? Extensions, reports,
              custom UI and integrations — built natively, no heavy add-ons.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
