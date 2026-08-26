'use client'

import { useEffect, useRef, useState } from 'react'
import { createTopDockController } from './topDockController'

export type AnimatedTopDockProps = {
  proximity?: number
  spring?: number
  damping?: number
  widthGrowth?: number
  heightGrowth?: number
  drop?: number
  className?: string
}

const DEFAULTS = {
  proximity: 122,
  spring: 0.19,
  damping: 0.7,
  widthGrowth: 17,
  heightGrowth: 16,
  drop: 3.5,
} as const

const NAV_ITEMS = [
  {
    id: 'work',
    label: 'WORK',
    href: '/#case-studies',
    icon: (
      <>
        <rect x="2" y="3" width="12" height="10" rx="1.5" />
        <path d="M2 6h12M5 4.5h.01M7 4.5h.01" />
      </>
    ),
  },
  {
    id: 'services',
    label: 'SERVICES',
    href: '/services',
    icon: (
      <>
        <circle cx="3" cy="8" r="1.5" />
        <circle cx="12.5" cy="3.5" r="1.5" />
        <circle cx="12.5" cy="12.5" r="1.5" />
        <path d="M4.5 7.3 11 4.2M4.5 8.7l6.5 3.1" />
      </>
    ),
  },
  {
    id: 'about',
    label: 'ABOUT',
    href: '/#skills',
    icon: (
      <>
        <path d="M4 2.25h5.4L12 4.85v8.9H4z" />
        <path d="M9.25 2.25V5h2.7M6 8h4M6 10.5h4" />
      </>
    ),
  },
  {
    id: 'contact',
    label: "LET'S TALK",
    href: '/#contact',
    icon: (
      <>
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </>
    ),
  },
]

export default function AnimatedTopDock({
  className = '',
  ...props
}: AnimatedTopDockProps) {
  const rootRef = useRef<HTMLElement>(null)
  const optionsRef = useRef({ ...DEFAULTS, ...props })
  optionsRef.current = { ...DEFAULTS, ...props }
  const [active, setActive] = useState('work')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined
    return createTopDockController(root, () => optionsRef.current)
  }, [])

  return (
    <header
      className={`site-header ${scrolled ? 'header-scrolled' : ''}`}
    >
      <nav
        ref={rootRef}
        className={`dock-nav ${className}`}
        aria-label="Main navigation"
        data-dock-state="idle"
        data-dock-max="0.00"
      >
        {/* Logo */}
        <a
          href="/"
          className="dock__item dock__logo"
          data-dock-item
          aria-label="Vaskoi - Home"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect
              width="24"
              height="24"
              rx="4.5"
              fill="#dc2626"
            />
            <text
              x="12"
              y="16"
              textAnchor="middle"
              fill="white"
              fontSize="11"
              fontWeight="700"
              fontFamily="Outfit, sans-serif"
            >
              V
            </text>
          </svg>
        </a>

        {/* Nav items */}
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={`dock__item dock__link ${active === item.id ? 'dock__link--active' : ''}`}
            data-dock-item
            aria-pressed={active === item.id}
            onClick={() => setActive(item.id)}
          >
            <span className="dock__icon" aria-hidden="true">
              <svg viewBox="0 0 16 16">{item.icon}</svg>
            </span>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </header>
  )
}
