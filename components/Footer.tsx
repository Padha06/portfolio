'use client'

import LogoMark from './Logo'
import { ArrowUpRight } from './Reveal'
import { contact } from '@/lib/content'

const nav = [
  { href: '/#work', label: 'Work' },
  { href: '/#systems', label: 'Systems' },
  { href: '/#services', label: 'Services' },
  { href: '/#contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <LogoMark className="footer-mark" />
            <p>
              Vaskoi is the independent studio of Shubam Padha — designing and engineering websites,
              apps and business systems from India, for clients everywhere.
            </p>
          </div>
          <div className="footer-cols">
            <div>
              <span className="mono label">Sitemap</span>
              <ul>
                {nav.map((l) => (
                  <li key={l.href}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="mono label">Contact</span>
              <ul>
                <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
                <li><a href={contact.phoneHref}>{contact.phone}</a></li>
                <li>
                  <a href={contact.github} target="_blank" rel="noopener noreferrer">
                    GitHub <ArrowUpRight size={12} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-word" aria-hidden="true">Vaskoi</div>

        <div className="footer-bottom">
          <span className="mono">© {new Date().getFullYear()} Vaskoi · Shubam Padha</span>
          <a href="#top" className="mono back-top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}
