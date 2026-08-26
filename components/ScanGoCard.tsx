'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ScanGoCard() {
  const [isHovered, setIsHovered] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  // Lazy load video source when in view or hovered
  useEffect(() => {
    if (!videoLoaded && (isInView || isHovered)) {
      setVideoLoaded(true)
    }
  }, [isInView, isHovered, videoLoaded])

  // Intersection observer for mobile autoplay
  useEffect(() => {
    if (!videoRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          videoRef.current?.play().catch(() => {})
        } else {
          videoRef.current?.pause()
        }
      },
      { threshold: [0.6] }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  // Hover play/pause
  useEffect(() => {
    if (!videoRef.current || !videoLoaded) return
    if (isHovered) {
      videoRef.current.play().catch(() => {})
    } else {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [isHovered, videoLoaded])

  return (
    <motion.article
      ref={cardRef}
      className="sc-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, transform: 'translateY(30px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Video Container */}
      <div className="sc-video-wrap">
        {/* Poster Image */}
        <AnimatePresence>
          {!isHovered && (
            <motion.img
              src="/videos/scango-poster.jpg"
              alt="ScanGo WMS preview"
              className="sc-poster"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            />
          )}
        </AnimatePresence>

        {/* Video */}
        {videoLoaded && (
          <AnimatePresence>
            {isHovered && (
              <motion.video
                ref={videoRef}
                src="/videos/scango-wms.mp4"
                className="sc-video"
                muted
                loop
                playsInline
                preload="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              />
            )}
          </AnimatePresence>
        )}

        {/* Gradient Overlay */}
        <div className="sc-video-overlay" />
        {/* Tags */}
        <div className="sc-tags">
          <span className="sc-tag sc-tag--domain">Mobile WMS</span>
          <span className="sc-tag sc-tag--status">Live</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="sc-content">
        <div className="sc-content-top">
          <span className="sc-label">WEBSITE / 02</span>
          <h3 className="sc-title">ScanGo WMS</h3>
          <p className="sc-desc">
            Offline-first mobile warehouse execution system for Microsoft
            Dynamics 365 Business Central — 18 modules, one-scan workflows,
            real-time sync.
          </p>
        </div>
        <div className="sc-bottom">
          <div className="sc-tech">
            {['Kotlin', 'Compose', 'Room DB', 'BC API'].map((t) => (
              <span key={t} className="sc-tech-pill">{t}</span>
            ))}
          </div>
          <a
            href="https://scango.it.com"
            target="_blank"
            rel="noopener noreferrer"
            className="sc-link"
          >
            View Case Study
            <span className="sc-arrow">&rarr;</span>
          </a>
        </div>
      </div>
    </motion.article>
  )
}
