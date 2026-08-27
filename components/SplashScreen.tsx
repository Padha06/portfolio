'use client'

import { useState, useEffect } from 'react'

export default function SplashScreen() {
  const [visible, setVisible] = useState(true)
  const [phase, setPhase] = useState<'gif' | 'exit'>('gif')

  useEffect(() => {
    const exitTimer = setTimeout(() => setPhase('exit'), 3000)
    const hideTimer = setTimeout(() => setVisible(false), 3600)

    return () => {
      clearTimeout(exitTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div className={`splash-overlay ${phase === 'exit' ? 'splash-exit' : ''}`}>
      <img
        src="/splash-animation.gif"
        alt="Vaskoi"
        className="splash-gif"
      />
    </div>
  )
}
