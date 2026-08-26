'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
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
    sectionId: 'case-studies',
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
    sectionId: null,
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
    sectionId: 'skills',
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
    sectionId: 'contact',
    icon: (
      <>
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </>
    ),
  },
]

const SECTION_TONavItem: Record<string, string> = {
  'case-studies': 'work',
  skills: 'about',
  contact: 'contact',
}

export default function AnimatedTopDock({
  className = '',
  ...props
}: AnimatedTopDockProps) {
  const rootRef = useRef<HTMLElement>(null)
  const optionsRef = useRef({ ...DEFAULTS, ...props })
  optionsRef.current = { ...DEFAULTS, ...props }
  const [active, setActive] = useState('work')

  const handleNavClick = useCallback((id: string) => {
    setActive(id)
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined
    return createTopDockController(root, () => optionsRef.current)
  }, [])

  useEffect(() => {
    const sectionIds = NAV_ITEMS
      .map((item) => item.sectionId)
      .filter(Boolean) as string[]

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    if (elements.length === 0) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const navId = SECTION_TONavItem[entry.target.id]
            if (navId) setActive(navId)
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )

    for (const el of elements) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      ref={rootRef}
      className={`dock-nav ${className}`}
      aria-label="Main navigation"
      data-dock-state="idle"
      data-dock-max="0.00"
    >
      {NAV_ITEMS.map((item) => (
        <a
          key={item.id}
          href={item.href}
          className={`dock__item dock__link ${active === item.id ? 'dock__link--active' : ''}`}
          data-dock-item
          aria-pressed={active === item.id}
          onClick={() => handleNavClick(item.id)}
        >
          <span className="dock__icon" aria-hidden="true">
            <svg viewBox="0 0 16 16">{item.icon}</svg>
          </span>
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  )
}
