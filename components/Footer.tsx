'use client'

import { motion } from 'framer-motion'
import { GitHubIcon as GitHub, LinkedInIcon as Linkedin, MailIcon as Mail, HeartIcon as Heart, ArrowUpIcon as ArrowUp } from './Icons'

const navLinks = [
  { href: '#case-studies', label: 'Portfolio' },
  { href: '#skills', label: 'Skills' },
  { href: '#process', label: 'Process' },
  { href: '#stats', label: 'Results' },
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
    <footer className="bg-primary-950 border-t border-primary-800">
      <div className="container-custom px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <a href="#" className="font-poppins text-2xl font-bold text-white hover:text-accent transition-colors inline-block mb-4">
              SP<span className="text-accent">.</span>
            </a>
            <p className="font-inter text-primary-400 text-sm leading-relaxed">
              Full-Stack Developer specializing in web, mobile, and ERP
              solutions for growing businesses.
            </p>
          </div>

          <div>
            <h3 className="font-poppins text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="font-inter text-sm text-primary-400 hover:text-accent transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="font-poppins text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Connect
            </h3>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-primary-800 border border-primary-700 flex items-center justify-center text-primary-400 hover:border-accent hover:text-accent transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-inter text-sm text-primary-500 flex items-center gap-1">
            © 2024-2026 Shubam Padha. Built with{' '}
            <Heart size={14} className="text-red-500 fill-red-500" /> and lots of coffee.
          </p>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg border border-primary-700 text-primary-400 hover:border-accent hover:text-accent transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  )
}
