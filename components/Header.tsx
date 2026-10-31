'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LogoMark from './Logo'
import { ease } from './Reveal'
import { contact } from '@/lib/content'

const links = [
  { href: '/#work', label: 'Work' },
  { href: '/#systems', label: 'Systems' },
  { href: '/#services', label: 'Services' },
  { href: '/#process', label: 'Process' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      // Tuck the bar away while reading down, bring it back on any upward scroll.
      setHidden(y > 400 && y > last)
      last = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('is-locked', open)
  }, [open])

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${hidden && !open ? 'is-hidden' : ''}`}>
        <div className="container header-inner">
          <a href="/#top" className="brand" aria-label="Vaskoi — home" onClick={() => setOpen(false)}>
            <LogoMark className="brand-mark" />
            <span className="brand-word">Vaskoi</span>
          </a>

          <nav className="nav" aria-label="Main navigation">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="nav-link">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <span className="status-pill">
              <span className="status-dot" />
              Booking projects
            </span>
            <a href="/#contact" className="btn btn-light btn-sm">
              Let&apos;s talk
            </a>
            <button
              className={`menu-toggle ${open ? 'is-open' : ''}`}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease }}
          >
            <nav className="container mobile-menu-nav" aria-label="Mobile navigation">
              {[...links, { href: '/#contact', label: 'Contact' }].map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="mobile-link"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.05, ease }}
                >
                  <span className="mono">0{i + 1}</span>
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <div className="container mobile-menu-foot">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={contact.phoneHref}>{contact.phone}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
