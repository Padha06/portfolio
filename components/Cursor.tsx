'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Soft follower cursor for fine pointers. Elements with `data-cursor="Label"`
 * expand it into a labelled disc (e.g. "View" over project cards).
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState<string | null>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return
    setEnabled(true)

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const target = { ...pos }
    let raf = 0
    let visible = false

    const move = (e: PointerEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      if (!visible && ref.current) {
        visible = true
        pos.x = target.x
        pos.y = target.y
        ref.current.style.opacity = '1'
      }
      const el = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor]')
      setLabel(el ? el.dataset.cursor || '' : null)
    }
    const leave = () => {
      visible = false
      if (ref.current) ref.current.style.opacity = '0'
    }
    const loop = () => {
      pos.x += (target.x - pos.x) * 0.2
      pos.y += (target.y - pos.y) * 0.2
      if (ref.current) ref.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null

  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <div className={`cursor-dot ${label !== null ? 'is-active' : ''}`}>
        <span>{label}</span>
      </div>
    </div>
  )
}
