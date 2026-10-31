'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

declare global {
  interface Window {
    lenis?: Lenis
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    window.lenis = lenis

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // Route in-page anchor links through Lenis so they glide instead of jump.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a')
      const href = link?.getAttribute('href')
      if (!href) return
      const hash = href.startsWith('#') ? href : href.startsWith('/#') ? href.slice(1) : null
      if (!hash) return
      const target = hash === '#' || hash === '#top' ? 0 : document.querySelector<HTMLElement>(hash)
      if (target === null) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: 0, duration: 1.4 })
      history.replaceState(null, '', hash === '#' ? location.pathname : hash)
    }
    document.addEventListener('click', onClick)

    // Freeze scrolling while the intro or a dialog is open.
    const observer = new MutationObserver(() => {
      const cls = document.documentElement.classList
      if (cls.contains('is-locked')) lenis.stop()
      else lenis.start()
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('click', onClick)
      observer.disconnect()
      lenis.destroy()
      delete window.lenis
    }
  }, [])

  return null
}
