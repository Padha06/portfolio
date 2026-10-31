'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { Reveal, LineReveal, Eyebrow, ArrowUpRight, ease } from './Reveal'
import { featured, more, type Project } from '@/lib/content'

function StackCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project
  index: number
  total: number
  progress: MotionValue<number>
}) {
  // Cards underneath shrink slightly as later ones slide over them.
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - index) * 0.025])

  return (
    <div className="stack-slot" style={{ top: `calc(104px + ${index * 14}px)` }}>
      <motion.a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="stack-card"
        style={{ scale }}
      >
        <div className="stack-info">
          <div className="stack-meta">
            <span className="stack-index">{String(index + 1).padStart(2, '0')}</span>
            <span className="label">{project.category}</span>
          </div>
          <div>
            <h3 className="stack-title">{project.title}</h3>
            <p className="stack-summary">{project.summary}</p>
            <div className="tags">
              {project.tags.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
          <span className="link-arrow">
            Visit live site <ArrowUpRight />
          </span>
        </div>
        <div className="stack-media">
          <img src={project.image} alt={`${project.title} website`} loading="lazy" />
        </div>
      </motion.a>
    </div>
  )
}

function ProjectIndex() {
  const [hovered, setHovered] = useState<Project | null>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  const onMove = (e: React.PointerEvent) => {
    const el = previewRef.current
    if (el) el.style.transform = `translate3d(${e.clientX + 24}px, ${e.clientY - 110}px, 0)`
  }

  return (
    <div className="index" onPointerMove={onMove} onPointerLeave={() => setHovered(null)}>
      {more.map((p, i) => (
        <Reveal key={p.slug} y={14} delay={Math.min(i * 0.03, 0.2)}>
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="index-row"
            onPointerEnter={() => setHovered(p)}
          >
            <span className="index-title">{p.title}</span>
            <span className="index-summary">{p.summary}</span>
            <span className="index-cat label">{p.category}</span>
            <span className="index-arrow">
              <ArrowUpRight />
            </span>
          </a>
        </Reveal>
      ))}

      <div ref={previewRef} className="index-preview" aria-hidden="true">
        <AnimatePresence mode="popLayout">
          {hovered && (
            <motion.div
              key={hovered.slug}
              className="index-preview-card"
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease }}
            >
              {hovered.image ? (
                <img src={hovered.image} alt="" />
              ) : (
                <div className="index-preview-type">{hovered.title.toUpperCase()}</div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function Work() {
  const stackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start start', 'end end'] })

  return (
    <section id="work" className="section">
      <div className="container">
        <div className="section-head">
          <Eyebrow index="01">Selected work</Eyebrow>
          <LineReveal className="section-title" lines={[<>Brands I&apos;ve helped</>, <><em>launch &amp; grow.</em></>]} />
          <Reveal delay={0.1}>
            <p className="section-lede">
              Live sites across luxury retail, healthcare, deep tech and industry — each designed,
              built and shipped end to end.
            </p>
          </Reveal>
        </div>

        <div ref={stackRef} className="stack">
          {featured.map((p, i) => (
            <StackCard key={p.slug} project={p} index={i} total={featured.length} progress={scrollYProgress} />
          ))}
        </div>

        <div className="index-head">
          <h3>More launches</h3>
          <span className="label">{more.length} projects</span>
        </div>
        <ProjectIndex />
      </div>
    </section>
  )
}
