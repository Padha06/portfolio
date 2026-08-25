'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { GitHubIcon as GitHub, MailIcon as Mail, ArrowUpIcon as ArrowUp } from './Icons'

const navLinks = [
  { href: '#case-studies', label: 'Portfolio' },
  { href: '#skills', label: 'Skills' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
]

const socialLinks = [
  { href: 'https://github.com/Padha06', label: 'GitHub', icon: GitHub },
  { href: 'mailto:shubham@scango.it.com', label: 'Email', icon: Mail },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-primary-950 border-t border-white/5">
      <div className="container-custom px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <a href="#" className="inline-block mb-5">
              <Image
                src="/vaskoi_logo.png"
                alt="Vaskoi"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </a>
            <p className="font-dm text-sm leading-relaxed text-primary-400 max-w-[280px]">
              Full-Stack Developer specializing in web, mobile, and ERP
              solutions for growing businesses.
            </p>
          </div>

          <div>
            <h3 className="font-dm text-xs font-semibold uppercase tracking-wider mb-5 text-primary-500">
              Quick Links
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="font-dm text-sm transition-colors text-primary-400 hover:text-white">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="font-dm text-xs font-semibold uppercase tracking-wider mb-5 text-primary-500">
              Connect
            </h3>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/5 text-primary-400 hover:text-white hover:border-accent/30 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="font-dm text-xs text-primary-600">
            © 2024-2026 Shubam Padha. Built with lots of coffee.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center justify-center w-9 h-9 rounded-lg border border-white/5 text-primary-400 hover:text-white hover:border-accent/30 transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  )
}
