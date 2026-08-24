'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { GitHubIcon as GitHub, LinkedInIcon as Linkedin, MailIcon as Mail, ArrowUpIcon as ArrowUp } from './Icons'

const navLinks = [
  { href: '#case-studies', label: 'Portfolio' },
  { href: '#skills', label: 'Skills' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
]

const socialLinks = [
  { href: 'https://github.com/Padha06', label: 'GitHub', icon: GitHub },
  { href: 'https://linkedin.com/in/shubampadha', label: 'LinkedIn', icon: Linkedin },
  { href: 'mailto:shubam@example.com', label: 'Email', icon: Mail },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
      <div className="container-custom" style={{ padding: '3rem 1.5rem' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <a href="#" className="inline-block mb-5">
              <Image
                src="/vaskoi_logo.png"
                alt="Vaskoi"
                width={120}
                height={32}
                style={{ height: '32px', width: 'auto' }}
              />
            </a>
            <p className="font-dm text-sm leading-relaxed" style={{ color: '#737373', maxWidth: '280px' }}>
              Full-Stack Developer specializing in web, mobile, and ERP
              solutions for growing businesses.
            </p>
          </div>

          <div>
            <h3 className="font-dm text-xs font-semibold uppercase tracking-wider mb-5" style={{ color: '#525252' }}>
              Quick Links
            </h3>
            <nav aria-label="Footer navigation">
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="font-dm text-sm transition-colors" style={{ color: '#737373' }}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="font-dm text-xs font-semibold uppercase tracking-wider mb-5" style={{ color: '#525252' }}>
              Connect
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center transition-colors"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    color: '#737373',
                  }}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4" style={{ paddingTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <p className="font-dm text-xs" style={{ color: '#404040' }}>
            © 2024-2026 Shubam Padha. Built with lots of coffee.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center justify-center transition-colors"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              color: '#737373',
            }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  )
}
