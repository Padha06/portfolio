'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LogoMark from './Logo'
import { ease } from './Reveal'
import { contact } from '@/lib/content'

const links = [
  { id: 'work', label: 'Work' },
  { id: 'systems', label: 'Systems' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
]

export default function Header() {
  const [active, setActive] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    // Highlight whichever section crosses the middle of the viewport.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    for (const l of links) {
      const el = document.getElementById(l.id)
      if (el) io.observe(el)
    }
    const top = document.getElementById('top')
    if (top) io.observe(top)

    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('is-locked', open)
  }, [open])

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="header-bar">
          <a href="/#top" className="brand" aria-label="Vaskoi — home" onClick={() => setOpen(false)}>
            <LogoMark className="brand-mark" />
            <span className="brand-word">Vaskoi</span>
          </a>

          <nav className="nav" aria-label="Main navigation">
            {links.map((l) => (
              <a key={l.id} href={`/#${l.id}`} className={`nav-link ${active === l.id ? 'is-active' : ''}`}>
                {active === l.id && (
                  <motion.span layoutId="nav-active" className="nav-active" transition={{ duration: 0.5, ease }} />
                )}
                <span>{l.label}</span>
              </a>
            ))}
          </nav>

          <a href="/#contact" className="btn btn-dark btn-sm header-cta">
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
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease }}
          >
            <nav aria-label="Mobile navigation">
              {links.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={`/#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="mobile-link"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 + i * 0.05, ease }}
                >
                  {l.label}
                  <span aria-hidden="true">→</span>
                </motion.a>
              ))}
            </nav>
            <div className="mobile-menu-foot">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={contact.phoneHref}>{contact.phone}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
