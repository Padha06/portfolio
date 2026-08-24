'use client'

import { motion } from 'framer-motion'
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
      <div className="container-custom px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <a href="#" className="font-poppins text-2xl font-bold text-white inline-block mb-4">
              SP<span style={{ color: '#dc2626' }}>.</span>
            </a>
            <p className="font-inter text-sm leading-relaxed" style={{ color: '#737373' }}>
              Full-Stack Developer specializing in web, mobile, and ERP
              solutions for growing businesses.
            </p>
          </div>

          <div>
            <h3 className="font-inter text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: '#525252' }}>
              Quick Links
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="font-inter text-sm transition-colors" style={{ color: '#737373' }}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="font-inter text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: '#525252' }}>
              Connect
            </h3>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                  style={{
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

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <p className="font-inter text-xs" style={{ color: '#404040' }}>
            © 2024-2026 Shubam Padha. Built with lots of coffee.
          </p>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg transition-colors"
            style={{
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
