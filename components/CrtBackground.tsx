'use client'

import { useRef, useEffect } from 'react'

interface CrtBackgroundProps {
  speed?: number
  typeSpeed?: number
  motion?: number
  opacity?: number
}

const BOOT_CODE = `// Business Operations Engine
const system = {
    environment: "production",
    version: "2.8.4",
    status: "online",
    modules: ["ERP", "CRM", "API", "Analytics"]
};

class BusinessWorkflow {
    constructor(config) {
        this.config = config;
        this.queue = [];
        this.active = true;
    }

    async initialize() {
        await this.connectDatabase();
        await this.loadModules();
        return this.startEngine();
    }

    async connectDatabase() {
        const connection = await Database.connect({
            host: "enterprise-db",
            secure: true,
            timeout: 5000
        });
        return connection.status === "connected";
    }

    async loadModules() {
        for (const module of this.config.modules) {
            console.log(\`Loading module: \${module}\`);
            await this.register(module);
        }
    }

    async register(module) {
        this.queue.push({
            module,
            timestamp: Date.now(),
            status: "ready"
        });
    }

    process(data) {
        if (!this.active) return null;
        return {
            id: crypto.randomUUID(),
            data,
            processedAt: new Date(),
            status: "completed"
        };
    }

    async sync() {
        const response = await API.request("/sync", {
            method: "POST",
            body: this.queue
        });
        return response.success;
    }
}

const workflow = new BusinessWorkflow(system);
workflow.initialize()
    .then(() => console.log("SYSTEM READY"))
    .catch(error => console.error(error));`

const LINES = BOOT_CODE.split('\n')

export default function CrtBackground({ speed = 1, typeSpeed = 1, motion = 1, opacity = 1 }: CrtBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let charIndex = 0
    let lineIndex = 0
    let colIndex = 0
    let scrollY = 0
    const startTime = performance.now()
    const CHAR_DELAY = 38 / typeSpeed
    const FONT = '12px ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace'
    const LINE_H = 17
    const PAD_X = 16
    const PAD_Y = 20

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
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    const drawFrame = (now: number) => {
      // Background
      ctx.fillStyle = '#0a0a0a'
      ctx.fillRect(0, 0, w, h)

      // CRT vignette
      const vig = ctx.createRadialGradient(w / 2, h / 2, w * 0.2, w / 2, h / 2, w * 0.7)
      vig.addColorStop(0, 'rgba(10,10,10,0)')
      vig.addColorStop(1, 'rgba(10,10,10,0.7)')
      ctx.fillStyle = vig
      ctx.fillRect(0, 0, w, h)

      // Scanlines
      ctx.fillStyle = 'rgba(0,0,0,0.06)'
      for (let y = 0; y < h; y += 2) {
        ctx.fillRect(0, y, w, 1)
      }

      // Rolling horizontal bar (CRT flicker)
      const barY = ((now - startTime) * 0.03 * motion) % (h + 80) - 40
      const barGrad = ctx.createLinearGradient(0, barY - 30, 0, barY + 30)
      barGrad.addColorStop(0, 'rgba(220,38,38,0)')
      barGrad.addColorStop(0.5, 'rgba(220,38,38,0.03)')
      barGrad.addColorStop(1, 'rgba(220,38,38,0)')
      ctx.fillStyle = barGrad
      ctx.fillRect(0, barY - 30, w, 60)

      // Chromatic aberration offset
      const chromaOffset = Math.sin(now * 0.002) * 0.4

      // Text content
      ctx.font = FONT
      ctx.textBaseline = 'top'

      const totalChars = LINES.reduce((sum, line) => sum + line.length, 0)
      const elapsed = now - startTime
      const charsToShow = Math.min(Math.floor(elapsed / CHAR_DELAY), totalChars)

      // Figure out which lines/cols are visible
      let remaining = charsToShow
      let visLine = 0
      let visCol = 0
      for (let i = 0; i < LINES.length; i++) {
        if (remaining <= LINES[i].length) {
          visLine = i
          visCol = remaining
          break
        }
        remaining -= LINES[i].length
        if (i === LINES.length - 1) {
          visLine = LINES.length - 1
          visCol = LINES[LINES.length - 1].length
        }
      }

      // Auto-scroll
      const maxVisibleLines = Math.floor((h - PAD_Y * 2) / LINE_H)
      const targetScroll = Math.max(0, visLine - maxVisibleLines + 3)
      scrollY += (targetScroll - scrollY) * 0.08

      // Draw visible text
      const startY = PAD_Y - scrollY * LINE_H
      for (let i = 0; i <= visLine && i < LINES.length; i++) {
        const y = startY + i * LINE_H
        if (y < -LINE_H || y > h + LINE_H) continue

        const line = LINES[i]
        const chars = i < visLine ? line : line.slice(0, visCol)
        if (!chars) continue

        // Syntax coloring
        const tokens = tokenize(chars)
        let x = PAD_X
        for (const [text, color] of tokens) {
          // Red channel offset for chromatic aberration
          ctx.fillStyle = color
          ctx.shadowColor = color === '#dc2626' ? 'rgba(220,38,38,0.6)' :
                           color === '#fbbf24' ? 'rgba(251,191,36,0.5)' :
                           color === '#6b7280' ? 'rgba(107,114,128,0.3)' :
                           'rgba(220,38,38,0.15)'
          ctx.shadowBlur = color === '#dc2626' ? 6 : 2

          // Chromatic red/blue split
          if (chromaOffset > 0.2) {
            ctx.fillStyle = 'rgba(220,38,38,0.15)'
            ctx.fillText(text, x + chromaOffset, y)
          }

          ctx.fillStyle = color
          ctx.fillText(text, x, y)
          x += ctx.measureText(text).width
        }
      }

      // Blinking cursor
      if (charsToShow < totalChars && Math.floor(now / 420) % 2 === 0) {
        const curLine = visLine
        const curCol = visCol
        const curLineText = LINES[curLine]?.slice(0, curCol) || ''
        const curX = PAD_X + ctx.measureText(curLineText).width
        const curY = startY + curLine * LINE_H
        ctx.shadowColor = 'rgba(220,38,38,0.8)'
        ctx.shadowBlur = 4
        ctx.fillStyle = '#f87171'
        ctx.fillRect(curX, curY + 1, 7, LINE_H - 3)
      }

      // Scanline flicker
      ctx.shadowBlur = 0
      const flicker = 0.97 + Math.sin(now * 0.01) * 0.03
      ctx.globalAlpha = flicker
      ctx.drawImage(canvas, 0, 0, w, h)
      ctx.globalAlpha = 1

      animRef.current = requestAnimationFrame(drawFrame)
    }

    animRef.current = requestAnimationFrame(drawFrame)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [speed, typeSpeed, motion])

  return (
    <div className="crt-wrap" style={{ opacity }}>
      <canvas ref={canvasRef} className="crt-canvas" />
      <div className="crt-vignette" />
      <div className="crt-glow" />
    </div>
  )
}

function tokenize(line: string): [string, string][] {
  const tokens: [string, string][] = []
  const keywords = ['const', 'class', 'constructor', 'async', 'await', 'return', 'for', 'of', 'if', 'new', 'import', 'from', 'export', 'default']
  const strings = /"[^"]*"|'[^']*'|`[^`]*`/g
  const comments = /\/\/.*$/
  const numbers = /\b\d+\b/g
  const methods = /\.([a-zA-Z_]\w*)\s*\(/g

  let remaining = line
  let pos = 0

  while (pos < line.length) {
    // Check for comment
    const commentMatch = remaining.slice(pos).match(/^\/\/.*/)
    if (commentMatch) {
      tokens.push([commentMatch[0], '#6b7280'])
      break
    }

    // Check for string
    const strMatch = remaining.slice(pos).match(/^"[^"]*"|^'[^']*'|^`[^`]*`/)
    if (strMatch) {
      tokens.push([strMatch[0], '#34d399'])
      pos += strMatch[0].length
      continue
    }

    // Check for keyword
    let foundKeyword = false
    for (const kw of keywords) {
      if (remaining.slice(pos).startsWith(kw) && (pos + kw.length >= line.length || /[^a-zA-Z0-9_]/.test(line[pos + kw.length]))) {
        tokens.push([kw, '#dc2626'])
        pos += kw.length
        foundKeyword = true
        break
      }
    }
    if (foundKeyword) continue

    // Check for number
    const numMatch = remaining.slice(pos).match(/^\b\d+\b/)
    if (numMatch) {
      tokens.push([numMatch[0], '#fbbf24'])
      pos += numMatch[0].length
      continue
    }

    // Check for property/method access
    const propMatch = remaining.slice(pos).match(/^\.[a-zA-Z_]\w*/)
    if (propMatch && pos > 0 && line[pos - 1] !== ' ') {
      tokens.push([propMatch[0], '#93c5fd'])
      pos += propMatch[0].length
      continue
    }

    // Default character
    let end = pos + 1
    while (end < line.length && !/["'`]/.test(line[end]) && !keywords.some(kw => line.slice(end).startsWith(kw))) {
      end++
    }
    tokens.push([line.slice(pos, end), '#e5e7eb'])
    pos = end
  }

  return tokens
}
