'use client'

import { useEffect, useRef, useState } from 'react'
import LogoMark from './Logo'
import { markReady } from '@/lib/ready'

const SEEN_KEY = 'vk-intro-seen'
const MIN_DURATION = 1700

// Runs during HTML parse, before hydration, so returning visitors never see a flash.
const skipScript = `try{if(sessionStorage.getItem('${SEEN_KEY}')||matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('intro-skip','is-ready')}}catch(e){}`

export default function Preloader() {
  const [count, setCount] = useState(0)
  const [phase, setPhase] = useState<'loading' | 'leaving' | 'done'>('loading')
  const rafRef = useRef(0)

  useEffect(() => {
    const root = document.documentElement
    if (root.classList.contains('intro-skip')) {
      setPhase('done')
      markReady()
      return
    }

    root.classList.add('is-locked')
    const start = performance.now()
    let loaded = document.readyState === 'complete'
    const onLoad = () => (loaded = true)
    window.addEventListener('load', onLoad)

    const tick = (now: number) => {
      const t = Math.min((now - start) / MIN_DURATION, 1)
      // Hold at 90% until the window has finished loading.
      const target = loaded ? t : Math.min(t, 0.9)
      const eased = 1 - Math.pow(1 - target, 3)
      setCount(Math.round(eased * 100))
      if (t >= 1 && loaded) {
        setPhase('leaving')
        try {
          sessionStorage.setItem(SEEN_KEY, '1')
        } catch {}
        setTimeout(() => {
          root.classList.remove('is-locked')
          markReady()
        }, 450)
        setTimeout(() => setPhase('done'), 1200)
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('load', onLoad)
    }
  }, [])

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: skipScript }} />
      {phase !== 'done' && (
        <div className={`preloader ${phase === 'leaving' ? 'is-leaving' : ''}`} aria-hidden="true">
          <div className="preloader-center">
            <LogoMark className="preloader-mark" animate />
            <div className="preloader-word">
              <span>V</span><span>A</span><span>S</span><span>K</span><span>O</span><span>I</span>
            </div>
          </div>
          <div className="preloader-foot">
            <span className="mono">Studio of Shubam Padha</span>
            <span className="mono preloader-count">{String(count).padStart(3, '0')}</span>
          </div>
          <div className="preloader-bar" style={{ transform: `scaleX(${count / 100})` }} />
        </div>
      )}
    </>
  )
}
