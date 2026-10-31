'use client'

import { Reveal, LineReveal, Eyebrow } from './Reveal'
import { process } from '@/lib/content'

export default function Process() {
  return (
    <section id="process" className="section section-surface">
      <div className="container">
        <div className="section-head">
          <Eyebrow index="04">Process</Eyebrow>
          <LineReveal className="section-title" lines={[<>Clear steps,</>, <><em>no surprises.</em></>]} />
        </div>

        <div className="steps">
          {process.map((step, i) => (
            <Reveal key={step.title} className="step" delay={i * 0.1}>
              <div className="step-top">
                <span className="step-num">0{i + 1}</span>
                <span className="mono step-meta">{step.meta}</span>
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-body">{step.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
