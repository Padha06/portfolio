'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { MenuIcon as Menu, XIcon as X, GitHubIcon as GitHub, LinkedInIcon as Linkedin, MailIcon as Mail } from './Icons'

const navLinks = [
  { href: '#case-studies', label: 'WORK' },
  { href: '#services', label: 'SERVICES' },
  { href: '#skills', label: 'ABOUT' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-primary-950/90 backdrop-blur-lg border-b border-glass-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-custom flex items-center justify-between px-4 py-4 md:px-6">
        <a
          href="#"
          className="flex items-center"
          aria-label="Vaskoi - Home"
        >
          <Image
            src="/vaskoi_logo.png"
            alt="Vaskoi"
            width={162}
            height={45}
            priority
          />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-inter text-xs font-medium tracking-widest text-primary-300 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="font-poppins text-xs font-semibold tracking-wider text-primary-950 bg-white px-5 py-2.5 rounded-sm hover:bg-accent transition-colors"
          >
            LET&apos;S TALK <span className="ml-1">&rarr;</span>
          </a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary-950/95 backdrop-blur-lg border-b border-glass-border"
          >
            <div className="container-custom px-4 py-6">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-inter text-sm font-medium tracking-widest text-primary-200 hover:text-white transition-colors py-2"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="font-poppins text-sm font-semibold tracking-wider text-primary-950 bg-white px-5 py-2.5 rounded-sm text-center hover:bg-accent transition-colors mt-2"
                >
                  LET&apos;S TALK &rarr;
                </a>
              </div>
              <div className="flex items-center gap-6 mt-6 pt-6 border-t border-primary-700">
                <a
                  href="https://github.com/Padha06"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-400 hover:text-accent transition-colors"
                  aria-label="GitHub Profile"
                >
                  <GitHub size={24} />
                </a>
                <a
                  href="https://linkedin.com/in/shubampadha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-400 hover:text-accent transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="mailto:shubam@example.com"
                  className="text-primary-400 hover:text-accent transition-colors"
                  aria-label="Email Contact"
                >
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
