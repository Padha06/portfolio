'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function SplashScreen() {
  const [visible, setVisible] = useState(true)
  const [phase, setPhase] = useState<'logo' | 'text' | 'exit'>('logo')

  useEffect(() => {
    const logoTimer = setTimeout(() => setPhase('text'), 1200)
    const textTimer = setTimeout(() => setPhase('exit'), 2800)
    const hideTimer = setTimeout(() => setVisible(false), 3400)

    return () => {
      clearTimeout(logoTimer)
      clearTimeout(textTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div className={`splash-overlay ${phase === 'exit' ? 'splash-exit' : ''}`}>
      <div className="splash-bg">
        <div className={`splash-progress ${phase === 'text' || phase === 'exit' ? 'splash-progress-full' : ''}`} />
      </div>

      <div className="splash-content">
        <div className="splash-logo-wrap">
          <div className={`splash-logo-ghost ${phase !== 'logo' ? 'splash-logo-visible' : ''}`}>
            <Image
              src="/vaskoi_logo.png"
              alt="Vaskoi"
              width={216}
              height={60}
              priority
            />
          </div>
          <div className={`splash-logo-top ${phase !== 'logo' ? 'splash-logo-visible' : ''}`}>
            <Image
              src="/vaskoi_logo.png"
              alt="Vaskoi"
              width={216}
              height={60}
              priority
            />
          </div>
        </div>

        <div className="splash-text-wrap">
          <span className={`splash-text ${phase === 'text' || phase === 'exit' ? 'splash-text-visible' : ''}`}>
            Build. Connect. Scale.
          </span>
        </div>
      </div>
    </div>
  )
}
