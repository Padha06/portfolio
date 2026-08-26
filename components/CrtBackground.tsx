'use client'

import { useRef, useEffect } from 'react'

interface CrtBackgroundProps {
  speed?: number
  opacity?: number
}

const TERMINAL_ROWS = 19
const FONT_SIZE = 14
const CHAR_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'

export default function CrtBackground({ speed = 1, opacity = 1 }: CrtBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let columns: number[] = []
    let brightness: number[] = []

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (!rect) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.scale(dpr, dpr)

      const cols = Math.floor(w / (FONT_SIZE * 0.6))
      columns = Array.from({ length: cols }, () => Math.random() * h)
      brightness = Array.from({ length: cols }, () => Math.random())
    }

    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      // Fade trail
      ctx.fillStyle = `rgba(10, 10, 10, 0.08)`
      ctx.fillRect(0, 0, w, h)

      ctx.font = `${FONT_SIZE}px monospace`

      for (let i = 0; i < columns.length; i++) {
        const char = CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)]
        const x = i * FONT_SIZE * 0.6
        const y = columns[i]

        // Brightness flicker
        brightness[i] += (Math.random() - 0.5) * 0.1
        brightness[i] = Math.max(0.3, Math.min(1, brightness[i]))

        const b = brightness[i]

        // Head character (brightest)
        ctx.fillStyle = `rgba(220, 38, 38, ${b})`
        ctx.fillText(char, x, y)

        // Trail characters (dimmer)
        for (let t = 1; t < 4; t++) {
          const trailY = y - t * FONT_SIZE
          if (trailY < 0) continue
          const trailChar = CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)]
          const trailAlpha = b * (1 - t * 0.25)
          ctx.fillStyle = `rgba(220, 38, 38, ${trailAlpha * 0.4})`
          ctx.fillText(trailChar, x, trailY)
        }

        // Move column down
        columns[i] += (FONT_SIZE * 0.6 + Math.random() * FONT_SIZE * 0.4) * speed

        // Reset when off screen
        if (columns[i] > h + 50) {
          columns[i] = -Math.random() * 200
          brightness[i] = 0.5 + Math.random() * 0.5
        }
      }

      // CRT scanlines
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)'
      for (let y = 0; y < h; y += 2) {
        ctx.fillRect(0, y, w, 1)
      }

      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [speed])

  return (
    <div className="crt-wrap" style={{ opacity }}>
      <canvas ref={canvasRef} className="crt-canvas" />
      {/* CRT curvature vignette overlay */}
      <div className="crt-vignette" />
      {/* CRT glow */}
      <div className="crt-glow" />
    </div>
  )
}
