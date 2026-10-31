const items = [
  'Vaidya',
  'Nexora',
  'Nanoroutes',
  'Lucent',
  'MALYX',
  'ZERO7',
  'ScanGo',
  'Qamar Global',
  'Shaurya',
  'Arnviya',
  'Sequora',
  'Kalia Steel',
]

export default function Marquee() {
  const row = (hidden: boolean) => (
    <div className="marquee-row" aria-hidden={hidden || undefined}>
      {items.map((name) => (
        <span key={name} className="marquee-item">
          {name}
          <span className="marquee-star">✦</span>
        </span>
      ))}
    </div>
  )

  return (
    <section className="marquee" aria-label="Selected clients and products">
      <div className="container marquee-label mono">Trusted by founders &amp; teams at</div>
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </section>
  )
}
