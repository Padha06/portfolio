'use client'

import { Reveal, LineReveal, Eyebrow } from './Reveal'
import { stack } from '@/lib/content'

export default function Stack() {
  return (
    <section id="stack" className="section">
      <div className="container">
        <div className="section-head section-head-split">
          <div>
            <Eyebrow index="05">Toolkit</Eyebrow>
            <LineReveal className="section-title" lines={[<>Modern stack,</>, <><em>enterprise</em> depth.</>]} />
          </div>
          <Reveal delay={0.15}>
            <p className="section-lede">
              The right tool for the job — from React on the front to AL inside Business Central.
            </p>
          </Reveal>
        </div>

        <div className="stack">
          {stack.map((g, i) => (
            <Reveal key={g.group} className="stack-group" delay={i * 0.08}>
              <span className="mono label">{g.group}</span>
              <ul>
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
