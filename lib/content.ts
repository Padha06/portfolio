export const contact = {
  email: 'contact@vaskoi.in',
  phone: '+91 96821 19375',
  phoneHref: 'tel:+919682119375',
  github: 'https://github.com/Padha06',
}

export type Project = {
  slug: string
  title: string
  category: string
  summary: string
  url: string
  image?: string
  tags: string[]
}

/** Large, alternating rows at the top of the Work section. */
export const featured: Project[] = [
  {
    slug: 'vaidya',
    title: 'Vaidya',
    category: 'Healthcare · Commerce',
    summary:
      'An Ayurvedic wellness platform with doctor consultations, a Prakriti assessment quiz, treatments and an online shop — calm, editorial and built to convert.',
    url: 'https://vaidya-wellness.vercel.app',
    image: '/work/vaidya-wellness.jpg',
    tags: ['Next.js', 'Commerce', 'Booking'],
  },
  {
    slug: 'nexora',
    title: 'Nexora Jewellers',
    category: 'Luxury · E-commerce',
    summary:
      'Fine diamond and gold jewellery storefront with a bespoke ring designer, curated collections and a concierge experience.',
    url: 'https://nexora-jewels.vercel.app',
    image: '/work/nexora-jewels.jpg',
    tags: ['Next.js', 'Product configurator', 'Motion'],
  },
  {
    slug: 'nanoroutes',
    title: 'Nanoroutes',
    category: 'Deep tech · Brand site',
    summary:
      'A bold launch site for a neurotechnology startup mapping pain signals with nanotech and AI — kinetic typography over a live particle network.',
    url: 'https://nanoroutes.vercel.app',
    image: '/work/nanoroutes.jpg',
    tags: ['Canvas', 'Typography', 'Storytelling'],
  },
  {
    slug: 'lucent',
    title: 'Lucent',
    category: 'Retail · Optics & Horology',
    summary:
      'A London eyewear and watch brand with colourway switching, home-trial booking and a restrained, gallery-like product presentation.',
    url: 'https://lucent-optical.vercel.app',
    image: '/work/lucent-optical.jpg',
    tags: ['Next.js', 'Commerce', 'Design system'],
  },
  {
    slug: 'malyx',
    title: 'MALYX Lifesciences',
    category: 'Pharma · Corporate',
    summary:
      'Corporate presence for a pharmaceutical marketing and distribution company — therapeutic focus areas, product portfolio and partner enquiries.',
    url: 'https://malyx-lifesciences.vercel.app',
    image: '/work/malyx-lifesciences.jpg',
    tags: ['Next.js', 'Corporate', 'SEO'],
  },
  {
    slug: 'zero7',
    title: 'ZERO7',
    category: 'Fashion · E-commerce',
    summary:
      'A streetwear label’s online store built around limited drops — tees, shirts, denim and layers with an archive-inspired visual language.',
    url: 'https://zero7-clothing.vercel.app',
    image: '/work/zero7-clothing.jpg',
    tags: ['Commerce', 'Drops', 'Brand'],
  },
]

/** Compact grid of further launched work. */
export const more: Project[] = [
  {
    slug: 'aurelian',
    title: 'Aurélian',
    category: '3D · Haute horlogerie',
    summary: 'Real-time WebGL watch experience for a luxury timepiece concept.',
    url: 'https://aurelian-watch.vercel.app',
    tags: ['Three.js', 'WebGL'],
  },
  {
    slug: 'arnviya',
    title: 'Arnviya',
    category: 'Corporate gifting',
    summary: 'Handcrafted resin gifting studio from Vadodara.',
    url: 'https://arnviya-web.vercel.app',
    image: '/work/arnviya-web.jpg',
    tags: ['Brand', 'Catalogue'],
  },
  {
    slug: 'shaurya',
    title: 'Shaurya Windows',
    category: 'Manufacturing',
    summary: 'Premium uPVC and aluminium windows and doors.',
    url: 'https://shaurya-windows.vercel.app',
    image: '/work/shaurya-windows.jpg',
    tags: ['Lead gen', 'SEO'],
  },
  {
    slug: 'qamar',
    title: 'Qamar Global Exports',
    category: 'Marine · B2B export',
    summary: 'Marine diesel engines, generators, spares and automation.',
    url: 'https://qamar-global-export-next.vercel.app',
    image: '/work/qamar-global-export-next.jpg',
    tags: ['Next.js', 'B2B catalogue'],
  },
  {
    slug: 'kalia',
    title: 'Kalia Steel',
    category: 'Industrial · Redesign',
    summary: 'Redesign of an established steel supplier’s website.',
    url: 'https://kalia-steel-redesign.vercel.app',
    image: '/work/kalia-steel-redesign.jpg',
    tags: ['Redesign', 'Corporate'],
  },
  {
    slug: 'sequora',
    title: 'Sequora',
    category: 'Health SaaS',
    summary: 'Transition-of-care platform that prevents hospital readmissions.',
    url: 'https://sequora.vercel.app',
    image: '/work/sequora.jpg',
    tags: ['SaaS', 'Dashboards'],
  },
  {
    slug: 'bms',
    title: 'BMS Tent House',
    category: 'Rentals · Local',
    summary: 'Tents, canopies and event furniture for rent in Bangalore.',
    url: 'https://bms-tent-house.vercel.app',
    image: '/work/bms-tent-house.jpg',
    tags: ['Local SEO', 'Enquiries'],
  },
  {
    slug: 'pawan',
    title: 'Pawan Trading Co.',
    category: 'Wholesale · Redesign',
    summary: 'Plumbing wholesaler in Taloja MIDC, Navi Mumbai.',
    url: 'https://pawan-trading-redesign.vercel.app',
    image: '/work/pawan-trading-redesign.jpg',
    tags: ['Redesign', 'Catalogue'],
  },
  {
    slug: 'bkc',
    title: 'BKC Water Tanks',
    category: 'Manufacturing',
    summary: '8-layer water storage tanks — product and dealer site.',
    url: 'https://bkc-water-tanks.vercel.app',
    image: '/work/bkc-water-tanks.jpg',
    tags: ['Product', 'Lead gen'],
  },
  {
    slug: 'afterlight',
    title: 'AfterLight',
    category: 'Creative studio',
    summary: 'Portfolio for a food and product styling studio.',
    url: 'https://afterlight.in',
    image: '/videos/afterlight-poster.png',
    tags: ['WordPress', 'GSAP'],
  },
]

export type SystemStudy = {
  slug: string
  title: string
  kicker: string
  challenge: string
  solution: string
  image: string
  video?: string
  tech: string[]
  results: { value: string; label: string }[]
  url?: string
}

/** Enterprise / ERP work — shown with full challenge & solution detail. */
export const systems: SystemStudy[] = [
  {
    slug: 'scango',
    title: 'ScanGo WMS',
    kicker: 'Mobile · Business Central',
    challenge:
      'Warehouse teams on Dynamics 365 Business Central were stuck with slow, desktop-bound processes and no reliable way to work where the stock actually is.',
    solution:
      'An offline-first Android warehouse execution system — 18 modules, one-scan workflows and real-time sync back to Business Central once connectivity returns.',
    image: '/videos/scango-poster.jpg',
    video: '/videos/scango-wms.mp4',
    tech: ['Kotlin', 'Jetpack Compose', 'Room DB', 'BC API'],
    results: [
      { value: '18', label: 'Warehouse modules' },
      { value: '1-scan', label: 'Core workflows' },
      { value: 'Offline', label: 'First by design' },
    ],
    url: 'https://scango.it.com',
  },
  {
    slug: 'bc-dashboard',
    title: 'Business Central Dashboard',
    kicker: 'ERP · Custom UI',
    challenge:
      'Standard Business Central dashboards felt cluttered. Warehouse and operations teams struggled to find critical numbers at a glance.',
    solution:
      'A rebuilt dashboard layer with clean card layouts, contextual grouping and a dark visual hierarchy that keeps every essential metric visible without the noise.',
    image: '/videos/bc-poster.png',
    video: '/videos/bc-dashboard.mp4',
    tech: ['JavaScript', 'Dynamics 365 BC', 'Control add-ins', 'CSS'],
    results: [
      { value: '40%', label: 'Faster data access' },
      { value: '0', label: 'Dependencies added' },
      { value: 'Native', label: 'Inside BC' },
    ],
  },
  {
    slug: 'esign',
    title: 'E-Signature Workflow',
    kicker: 'Integration · Business Central',
    challenge:
      'Vendors needed to sign on-site with Wacom pads, but Business Central had no native way to capture a signature and attach it to purchase documents.',
    solution:
      'One click generates the PDF from Business Central, the vendor signs on the pad, and the signed PDF plus signature image are attached to the record automatically.',
    image: '/videos/esign-poster.jpg',
    tech: ['AL', 'Dynamics 365 BC', 'Wacom SDK', 'PDF generation'],
    results: [
      { value: '100%', label: 'Paperless signing' },
      { value: '0', label: 'Manual uploads' },
      { value: '< 5s', label: 'Capture to attach' },
    ],
  },
]

export const services = [
  {
    title: 'Websites & brand experiences',
    body: 'Fast, considered marketing sites and storefronts — designed to feel premium and built to rank, load and convert.',
    tags: ['Next.js', 'React', 'Headless commerce', 'SEO'],
  },
  {
    title: 'Web applications',
    body: 'Dashboards, portals and internal platforms that turn messy processes into calm, dependable software.',
    tags: ['TypeScript', 'Node.js', '.NET', 'PostgreSQL'],
  },
  {
    title: 'Mobile apps',
    body: 'Native Android and cross-platform apps for field teams and customers — offline-ready where it matters.',
    tags: ['Kotlin', 'Compose', 'React Native'],
  },
  {
    title: 'ERP & Business Central',
    body: 'Extensions, workflows, reports and custom UI that bend Dynamics 365 Business Central to how you actually work.',
    tags: ['AL', 'Power Apps', 'Dataverse'],
  },
  {
    title: 'Integrations & automation',
    body: 'Connecting ERP, apps, payment and third-party services so data moves on its own — reliably.',
    tags: ['REST', 'Webhooks', 'Azure', 'Power Automate'],
  },
]

export const process = [
  {
    title: 'Discover',
    body: 'We map the problem, the people and the constraints. You get a clear scope, timeline and fixed milestones before any code is written.',
    meta: '1–2 weeks',
  },
  {
    title: 'Design & build',
    body: 'Short cycles with working previews every week. You see real progress on a live URL — never a slide deck.',
    meta: '3–10 weeks',
  },
  {
    title: 'Launch & care',
    body: 'Performance tuning, analytics, handover docs and ongoing support so the product keeps getting better after launch.',
    meta: 'Ongoing',
  },
]

export const stack = [
  { group: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion', 'Three.js'] },
  { group: 'Backend', items: ['Node.js', 'Python', 'C# / .NET', 'PostgreSQL', 'SQL Server'] },
  { group: 'Mobile', items: ['Kotlin', 'Jetpack Compose', 'Android SDK', 'React Native'] },
  { group: 'Enterprise', items: ['Dynamics 365 BC', 'AL', 'Power Apps', 'Dataverse', 'Power Automate', 'Azure'] },
]
