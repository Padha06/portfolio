'use client'

import { useEffect, useState } from 'react'

const EVENT = 'vk:ready'

/** Called by the preloader once the intro has cleared the screen. */
export function markReady() {
  document.documentElement.classList.add('is-ready')
  window.dispatchEvent(new Event(EVENT))
}

/** True once the intro is finished — use it to hold hero animations. */
export function useReady() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if (document.documentElement.classList.contains('is-ready')) {
      setReady(true)
      return
    }
    const on = () => setReady(true)
    window.addEventListener(EVENT, on)
    return () => window.removeEventListener(EVENT, on)
  }, [])
  return ready
}
