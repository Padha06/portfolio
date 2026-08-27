'use client'

import { useState, useEffect, useRef } from 'react'

export default function SplashScreen() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let cancelled = false

    async function playGifOnce() {
      const { parseGIF, decompressFrames } = await import('gifuct-js')
      const resp = await fetch('/splash-animation.gif')
      const buf = await resp.arrayBuffer()
      const parsed = parseGIF(buf)
      const frames = decompressFrames(parsed, true)

      const canvas = canvasRef.current
      if (!canvas || cancelled) return
      const ctx = canvas.getContext('2d')!
      canvas.width = parsed.lsd.width
      canvas.height = parsed.lsd.height

      let frameIndex = 0

      function drawFrame() {
        if (cancelled || frameIndex >= frames.length) {
          if (!cancelled) {
            setFading(true)
            setTimeout(() => {
              if (!cancelled) setVisible(false)
            }, 600)
          }
          return
        }

        const frame = frames[frameIndex]
        const imageData = new ImageData(
          new Uint8ClampedArray(frame.patch),
          frame.dims.width,
          frame.dims.height
        )
        ctx.putImageData(imageData, frame.dims.left, frame.dims.top)

        frameIndex++
        setTimeout(drawFrame, frame.delay)
      }

      drawFrame()
    }

    playGifOnce()

    return () => { cancelled = true }
  }, [])

  if (!visible) return null

  return (
    <div className={`splash-overlay ${fading ? 'splash-exit' : ''}`}>
      <canvas ref={canvasRef} className="splash-gif" />
    </div>
  )
}
