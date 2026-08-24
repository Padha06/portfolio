'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRightIcon as ArrowRight, RocketIcon as Rocket } from './Icons'

function AnimatedCounter({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = Date.now()
          const animate = () => {
            const elapsed = Date.now() - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-hero">
        <div className="absolute inset-0 bg-gradient-mesh opacity-60" />

        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent/30 rounded-full"
              initial={{
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 text-accent/10"
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <svg width={80} height={80} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute top-1/3 right-1/4 text-accent/10"
            animate={{ y: [0, -15, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          >
            <svg width={60} height={60} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute bottom-1/4 left-1/3 text-accent/10"
            animate={{ y: [0, -25, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 7, repeat: Infinity, delay: 2 }}
          >
            <svg width={70} height={70} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5V19A9 3 0 0 0 21 19V5" /><path d="M3 12A9 3 0 0 0 21 12" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute bottom-1/3 right-1/3 text-accent/10"
            animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
          >
            <svg width={50} height={50} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <line x1="6" x2="6" y1="3" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass-bg border border-glass-border backdrop-blur-sm mb-8"
          >
            <Rocket className="text-accent" size={16} />
            <span className="font-inter text-sm text-primary-200">
              Available for new projects
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-poppins text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6"
          >
            Building Digital Products{' '}
            <span className="gradient-text">That Scale</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-inter text-lg md:text-xl text-primary-300 mb-10 max-w-2xl mx-auto"
          >
            Full-stack developer specializing in web, mobile, and ERP solutions.
            From idea to deployment — built to perform.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <a href="#case-studies" className="btn-primary">
              View Case Studies
              <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn-secondary">
              Start Your Project
            </a>
          </motion.div>

          {/* Animated Counters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            <div className="text-center">
              <div className="font-poppins text-3xl md:text-4xl font-bold text-white">
                <AnimatedCounter target={5} suffix="+" />
              </div>
              <div className="font-inter text-sm text-primary-400 mt-1">Case Studies</div>
            </div>
            <div className="text-center">
              <div className="font-poppins text-3xl md:text-4xl font-bold text-white">
                <AnimatedCounter target={50} suffix="+" />
              </div>
              <div className="font-inter text-sm text-primary-400 mt-1">Total Projects</div>
            </div>
            <div className="text-center">
              <div className="font-poppins text-3xl md:text-4xl font-bold text-white">
                <AnimatedCounter target={8} suffix="+" />
              </div>
              <div className="font-inter text-sm text-primary-400 mt-1">Years Active</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-primary-400 flex justify-center pt-2"
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 bg-accent rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
