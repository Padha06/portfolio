'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRightIcon as ArrowRight, XIcon as X, ExternalLinkIcon as ExternalLink } from './Icons'

/**
 * CaseStudyCard - A reusable portfolio case study card with video crossfade
 * 
 * Video Compression Guidelines:
 * - Target under 2MB per clip
 * - Use WebM format for better compression (VP9 codec)
 * - Resolution: 640x360 or 800x450 max
 * - Duration: 5-10 seconds loop
 * - FPS: 24-30
 * - Tools: FFmpeg, HandBrake, or Squoosh
 * - Example FFmpeg command:
 *   ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -an -t 8 output.webm
 */

interface TechStackItem {
  name: string
}

interface ResultItem {
  value: string
  label: string
}

export interface CaseStudyCardProps {
  title: string
  clientType: 'Startup' | 'SMB' | 'Enterprise'
  domain: 'Web' | 'Mobile' | 'ERP' | 'Integration'
  challenge: string
  solution: string
  staticImage: string
  previewVideo?: string
  techStack: string[]
  results: ResultItem[]
  liveUrl?: string
}

export default function CaseStudyCard({
  title,
  clientType,
  domain,
  challenge,
  solution,
  staticImage,
  previewVideo,
  techStack,
  results,
  liveUrl,
}: CaseStudyCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useRef(false)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.current = mediaQuery.matches
    
    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches
    }
    
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Lazy-load video source when in view or hovered
  useEffect(() => {
    if (!previewVideo || videoLoaded) return
    
    if (isInView || isHovered) {
      setVideoLoaded(true)
    }
  }, [isInView, isHovered, previewVideo, videoLoaded])

  // Intersection Observer for mobile autoplay
  useEffect(() => {
    if (!previewVideo || prefersReducedMotion.current || !videoRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
        
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          // 60% in viewport
          videoRef.current?.play().catch(() => {
            // Autoplay blocked, ignore
          })
        } else {
          videoRef.current?.pause()
        }
      },
      { threshold: [0.6] }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [previewVideo, videoLoaded])

  // Handle video play/pause based on hover state (desktop)
  useEffect(() => {
    if (!videoRef.current || prefersReducedMotion.current) return

    if (isHovered && videoLoaded) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked, ignore
      })
    } else if (!isHovered) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [isHovered, videoLoaded])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setShowModal(true)
    }
  }, [])

  const clientTypeColors: Record<string, string> = {
    Startup: 'bg-accent/10 text-accent border-accent/20',
    SMB: 'bg-warning/10 text-warning border-warning/20',
    Enterprise: 'bg-success/10 text-success border-success/20',
  }

  const domainColors: Record<string, string> = {
    Web: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    Mobile: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    ERP: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Integration: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  }

  return (
    <>
      <motion.article
        ref={cardRef}
        className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowModal(true)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`View case study: ${title}`}
        whileHover={{ 
          y: -4,
          boxShadow: '0 0 30px rgba(0, 217, 255, 0.2)',
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.4 }}
      >
        {/* Image/Video Container */}
        <div className="relative aspect-video overflow-hidden">
          {/* Static Image */}
          <AnimatePresence>
            {!isHovered && (
              <motion.img
                src={staticImage}
                alt={`${title} preview`}
                className="absolute inset-0 w-full h-full object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              />
            )}
          </AnimatePresence>

          {/* Video */}
          {previewVideo && (
            <AnimatePresence>
              {(isHovered || isInView) && videoLoaded && (
                <motion.video
                  ref={videoRef}
                  src={previewVideo}
                  className="absolute inset-0 w-full h-full object-contain"
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Tags */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${clientTypeColors[clientType]}`}>
              {clientType}
            </span>
            <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${domainColors[domain]}`}>
              {domain}
            </span>
          </div>

          {/* Live Demo Badge */}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 bg-black/60 backdrop-blur-sm rounded-full text-xs font-medium text-white hover:bg-accent hover:text-black transition-colors"
              aria-label="Visit live site"
            >
              <ExternalLink size={12} />
              <span>Visit site</span>
            </a>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-outfit text-lg font-semibold text-white mb-2 group-hover:text-accent transition-colors line-clamp-1">
            {title}
          </h3>
          
          <p className="font-dm text-sm text-primary-400 mb-4 line-clamp-2">
            {challenge}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-xs font-medium text-primary-300 bg-primary-800/50 rounded-full border border-primary-700/50"
              >
                {tech}
              </span>
            ))}
            {techStack.length > 4 && (
              <span className="px-2 py-0.5 text-xs font-medium text-primary-500">
                +{techStack.length - 4}
              </span>
            )}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all duration-300">
            <span>View Case Study</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </motion.article>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-primary-900 border border-white/10 rounded-2xl"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-primary-900/95 backdrop-blur-sm border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full border ${clientTypeColors[clientType]}`}>
                    {clientType}
                  </span>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full border ${domainColors[domain]}`}>
                    {domain}
                  </span>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 text-primary-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                <h2 className="font-outfit text-2xl font-bold text-white">
                  {title}
                </h2>

                {/* Challenge */}
                <div>
                  <h3 className="font-outfit text-sm font-semibold text-accent uppercase tracking-wider mb-2">
                    Challenge
                  </h3>
                  <p className="font-dm text-primary-300 leading-relaxed">
                    {challenge}
                  </p>
                </div>

                {/* Solution */}
                <div>
                  <h3 className="font-outfit text-sm font-semibold text-accent uppercase tracking-wider mb-2">
                    Solution
                  </h3>
                  <p className="font-dm text-primary-300 leading-relaxed">
                    {solution}
                  </p>
                </div>

                {/* Tech Stack */}
                <div>
                  <h3 className="font-outfit text-sm font-semibold text-accent uppercase tracking-wider mb-3">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-sm font-medium text-primary-300 bg-primary-800 rounded-full border border-primary-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div>
                  <h3 className="font-outfit text-sm font-semibold text-accent uppercase tracking-wider mb-3">
                    Results
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {results.map((result, idx) => (
                      <div
                        key={idx}
                        className="text-center p-4 rounded-xl bg-success/10 border border-success/20"
                      >
                        <div className="font-outfit text-2xl font-bold text-success">
                          {result.value}
                        </div>
                        <div className="font-dm text-xs text-primary-400 mt-1">
                          {result.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Demo Button */}
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full justify-center"
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
