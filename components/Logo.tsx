type Props = { className?: string; animate?: boolean }

/** Vector version of the Vaskoi "V" mark, tuned for dark backgrounds. */
export default function LogoMark({ className = '', animate = false }: Props) {
  return (
    <svg
      viewBox="380 220 1140 910"
      className={`${className} ${animate ? 'mark-animate' : ''}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="vk-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#80643b" />
          <stop offset="1" stopColor="#a7a4c4" />
        </linearGradient>
        <linearGradient id="vk-b" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#24233f" />
          <stop offset="1" stopColor="#3d3a94" />
        </linearGradient>
        <linearGradient id="vk-c" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#7b7b80" />
          <stop offset="1" stopColor="#e2e2e6" />
        </linearGradient>
        <linearGradient id="vk-d" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8f8cd6" />
          <stop offset="1" stopColor="#d4d2ee" />
        </linearGradient>
        <linearGradient id="vk-e" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fafbfc" />
          <stop offset="1" stopColor="#9aa3b4" />
        </linearGradient>
      </defs>
      <polygon className="mark-facet" style={{ ['--i' as string]: 0 }} points="388,234 943,718 749,900 943,1125" fill="url(#vk-b)" />
      <polygon className="mark-facet" style={{ ['--i' as string]: 1 }} points="388,234 689,295 943,718" fill="url(#vk-a)" />
      <polygon className="mark-facet" style={{ ['--i' as string]: 2 }} points="943,507 1512,225 943,718" fill="url(#vk-c)" />
      <polygon className="mark-facet" style={{ ['--i' as string]: 3 }} points="1512,225 1148,908 943,718" fill="url(#vk-d)" />
      <polygon className="mark-facet" style={{ ['--i' as string]: 4 }} points="943,718 1148,908 943,1125" fill="url(#vk-e)" />
    </svg>
  )
}
