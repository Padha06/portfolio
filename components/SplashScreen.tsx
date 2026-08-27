'use client'

import { useState, useEffect, useRef } from 'react'

export default function SplashScreen() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleEnd = () => {
      setFading(true)
      setTimeout(() => setVisible(false), 600)
    }

    video.addEventListener('ended', handleEnd)
    video.play().catch(() => {})

    return () => video.removeEventListener('ended', handleEnd)
  }, [])

  if (!visible) return null

  return (
    <div className={`splash-overlay ${fading ? 'splash-exit' : ''}`}>
      <video
        ref={videoRef}
        src="/splash-animation.mp4"
        className="splash-gif"
        playsInline
        muted
      />
    </div>
  )
}
