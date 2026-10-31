'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Reveal, LineReveal, Eyebrow, ArrowUpRight, ease } from './Reveal'
import { featured, more, type Project } from '@/lib/content'

function FeaturedRow({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const flip = index % 2 === 1

  return (
    <motion.a
      ref={ref}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`feature ${flip ? 'feature-flip' : ''}`}
      data-cursor="Visit"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.1, ease }}
    >
      <div className="feature-media">
        <div className="browser">
          <div className="browser-bar">
            <span /><span /><span />
            <div className="browser-url mono">{project.url.replace('https://', '')}</div>
          </div>
          <div className="browser-view">
            <motion.img
              src={project.image}
              alt={`${project.title} website`}
              loading="lazy"
              style={{ y: imgY }}
            />
          </div>
        </div>
      </div>

      <div className="feature-info">
        <div className="feature-top">
          <span className="mono feature-index">{String(index + 1).padStart(2, '0')}</span>
          <span className="mono feature-cat">{project.category}</span>
        </div>
        <h3 className="feature-title">{project.title}</h3>
        <p className="feature-summary">{project.summary}</p>
        <div className="tags">
          {project.tags.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
        <span className="link-arrow">
          Visit live site <ArrowUpRight />
        </span>
      </div>
    </motion.a>
  )
}

function Tile({ project, i }: { project: Project; i: number }) {
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="tile"
      data-cursor="Visit"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease }}
    >
      <div className="tile-media">
        {project.image ? (
          <img src={project.image} alt={`${project.title} website`} loading="lazy" />
        ) : (
          <div className="tile-type">
            <span className="mono">Haute Horlogerie</span>
            <span className="tile-type-word">{project.title.toUpperCase()}</span>
          </div>
        )}
      </div>
      <div className="tile-info">
        <div>
          <h4 className="tile-title">{project.title}</h4>
          <p className="tile-summary">{project.summary}</p>
        </div>
        <span className="tile-cat mono">{project.category}</span>
      </div>
    </motion.a>
  )
}

export default function Work() {
  return (
    <section id="work" className="section">
      <div className="container">
        <div className="section-head">
          <Eyebrow index="01">Selected work</Eyebrow>
          <LineReveal
            className="section-title"
            lines={[<>Brands I&apos;ve helped</>, <><em>launch &amp; grow.</em></>]}
          />
          <Reveal delay={0.15}>
            <p className="section-lede">
              A selection of live sites and products — luxury retail, healthcare, deep tech and
              industry. Every one designed, built and shipped end to end.
            </p>
          </Reveal>
        </div>

        <div className="features">
          {featured.map((p, i) => (
            <FeaturedRow key={p.slug} project={p} index={i} />
          ))}
        </div>

        <div className="more-head">
          <Reveal>
            <h3 className="more-title">More launches</h3>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="mono more-count">{String(more.length).padStart(2, '0')} projects</span>
          </Reveal>
        </div>
        <div className="tiles">
          {more.map((p, i) => (
            <Tile key={p.slug} project={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
