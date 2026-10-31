'use client'

import { Reveal, LineReveal, Eyebrow } from './Reveal'
import { services, process } from '@/lib/content'

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container services-grid">
        <div className="services-intro">
          <Eyebrow index="03">Services</Eyebrow>
          <LineReveal className="section-title" lines={[<>What I</>, <><em>build</em> for you.</>]} />
          <Reveal delay={0.1}>
            <p className="section-lede">
              Design and engineering under one roof — so what looks good also works, scales and is
              easy to change later.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="process">
            {process.map((step, i) => (
              <div key={step.title} className="process-step">
                <span className="process-num">{i + 1}</span>
                <div>
                  <strong>{step.title}</strong>
                  <span>{step.meta}</span>
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="services-list">
          {services.map((s, i) => (
            <Reveal key={s.title} className="service" delay={i * 0.05} y={20}>
              <span className="service-num">0{i + 1}</span>
              <div>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-body">{s.body}</p>
                <div className="tags">
                  {s.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
