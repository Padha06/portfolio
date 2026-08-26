'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import AnimatedTopDock from './effects/animated-top-dock/AnimatedTopDock'
import '../components/effects/animated-top-dock/styles.css'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="header-inner">
        <a href="/" className="header-logo" aria-label="Vaskoi - Home">
          <Image
            src="/vaskoi_logo.png"
            alt="Vaskoi"
            width={140}
            height={40}
            priority
          />
        </a>
        <AnimatedTopDock />
      </div>
    </header>
  )
}
