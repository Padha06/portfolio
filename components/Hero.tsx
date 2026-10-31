'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { LineReveal, ease } from './Reveal'
import { useReady } from '@/lib/ready'

function useIndiaTime() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata',
    })
    const update = () => setTime(fmt.format(new Date()))
    update()
    const id = setInterval(update, 15000)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function Hero() {
  const ready = useReady()
  const time = useIndiaTime()
  const sectionRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Light that drifts toward the pointer.
  useEffect(() => {
    const el = glowRef.current
    const section = sectionRef.current
    if (!el || !section || !window.matchMedia('(pointer: fine)').matches) return
    let raf = 0
    const pos = { x: 0.7, y: 0.35 }
    const target = { ...pos }
    const move = (e: PointerEvent) => {
      const r = section.getBoundingClientRect()
      target.x = (e.clientX - r.left) / r.width
      target.y = (e.clientY - r.top) / r.height
    }
    const loop = () => {
      pos.x += (target.x - pos.x) * 0.04
      pos.y += (target.y - pos.y) * 0.04
      el.style.setProperty('--gx', `${pos.x * 100}%`)
      el.style.setProperty('--gy', `${pos.y * 100}%`)
      raf = requestAnimationFrame(loop)
    }
    section.addEventListener('pointermove', move)
    raf = requestAnimationFrame(loop)
    return () => {
      section.removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1, delay, ease },
  })

  return (
    <section id="top" ref={sectionRef} className="hero">
      <div ref={glowRef} className="hero-glow" aria-hidden="true" />
      <div className="hero-grid-lines" aria-hidden="true">
        <span /><span /><span /><span />
      </div>

      <motion.div className="container hero-inner" style={{ y: contentY, opacity: contentOpacity }}>
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
            <>Digital products</>,
            <>
              <em>crafted</em> to perform
            </>,
            <>for ambitious brands.</>,
          ]}
        />

        <div className="hero-bottom">
          <motion.p className="hero-lede" {...fade(0.55)}>
            I design and engineer premium websites, apps and the business systems behind them — from
            a luxury storefront to a Business Central warehouse app. One partner, idea to launch.
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
          <span className="mono">India · IST {time}</span>
          <span className="mono hero-scroll">
            Scroll <span className="hero-scroll-line" />
          </span>
        </div>
      </motion.div>
    </section>
  )
}
