'use client'

import { useRef } from 'react'
import { motion, useInView, type HTMLMotionProps } from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1] as const

type Props = HTMLMotionProps<'div'> & { delay?: number; y?: number }

/** Fade-and-rise on first scroll into view. */
export function Reveal({ delay = 0, y = 28, children, ...rest }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.9, delay, ease }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Section heading where each line slides up from behind a mask. */
export function LineReveal({
  lines,
  className = '',
  as: Tag = 'h2',
  animate,
  delay = 0,
}: {
  lines: React.ReactNode[]
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
  /** Pass a boolean to drive it manually instead of on scroll (e.g. the hero). */
  animate?: boolean
  delay?: number
}) {
  // Observe the heading itself — the masked lines are clipped by their wrapper
  // and would never register as intersecting on their own.
  const ref = useRef<HTMLHeadingElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const show = animate ?? inView
  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          <motion.span
            className="line-inner"
            initial={{ y: '110%' }}
            animate={{ y: show ? '0%' : '110%' }}
            transition={{ duration: 1.1, delay: delay + i * 0.09, ease }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/** Small numbered pill label used at the top of each section. */
export function Eyebrow({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <Reveal className="eyebrow" y={12}>
      <span className="eyebrow-index">{index}</span>
      <span>{children}</span>
    </Reveal>
  )
}

export function ArrowUpRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
    </svg>
  )
}
