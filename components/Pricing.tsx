'use client'

import { motion } from 'framer-motion'
import { CheckIcon as Check, ArrowRightIcon as ArrowRight, RocketIcon as Rocket, BuildingIcon as Building2, BriefcaseIcon as Briefcase } from './Icons'

const plans = [
  {
    name: 'Starter',
    icon: Rocket,
    description: 'Perfect for startups and small businesses',
    price: '$2-5K+',
    priceNote: 'Starting from',
    features: [
      'Web application development',
      'Mobile app (single platform)',
      'Basic API integrations',
      'Responsive design',
      '3 months support',
      'Source code ownership',
    ],
    cta: 'Get Started',
    color: 'from-blue-500 to-cyan-400',
    popular: false,
  },
  {
    name: 'Growth',
    icon: Building2,
    description: 'For businesses needing custom ERP solutions',
    price: '$5-15K+',
    priceNote: 'Starting from',
    features: [
      'Full BC customization',
      'Complex integrations',
      'Multi-system architecture',
      'Custom extensions & modules',
      'Power Apps development',
      '6 months support',
      'Priority response time',
      'Technical documentation',
    ],
    cta: 'Start Project',
    color: 'from-accent to-cyan-300',
    popular: true,
  },
  {
    name: 'Enterprise',
    icon: Briefcase,
    description: 'Multi-module solutions with dedicated support',
    price: 'Custom',
    priceNote: 'Tailored quote',
    features: [
      'Multi-module BC solutions',
      'Enterprise integrations',
      'Custom reporting & analytics',
      'Performance optimization',
      'Dedicated development hours',
      '12 months support',
      'SLA guarantee',
      'Architecture consulting',
      'Team training',
    ],
    cta: 'Contact Sales',
    color: 'from-purple-500 to-pink-400',
    popular: false,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function Pricing() {
  return (
    <section id="pricing" className="section-padding bg-primary-900">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-dm text-sm text-accent uppercase tracking-wider">
            Pricing
          </span>
          <h2 className="font-outfit text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            Growth <span className="gradient-text">Packages</span>
          </h2>
          <p className="font-dm text-lg text-primary-300 max-w-2xl mx-auto">
            Flexible pricing options designed to scale with your business.
            All packages include source code ownership.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              className={`glass-card p-8 relative ${
                plan.popular ? 'border-accent/50 shadow-glow' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-accent rounded-full">
                  <span className="font-dm text-xs font-semibold text-black uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-6`}
              >
                <plan.icon size={28} className="text-white" />
              </div>

              {/* Plan Name */}
              <h3 className="font-outfit text-2xl font-bold text-white mb-2">
                {plan.name}
              </h3>

              {/* Description */}
              <p className="font-dm text-primary-400 mb-6">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-6">
                <span className="font-dm text-sm text-primary-400 block">
                  {plan.priceNote}
                </span>
                <span className="font-outfit text-4xl font-bold text-white">
                  {plan.price}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      size={18}
                      className="text-success mt-0.5 shrink-0"
                     
                    />
                    <span className="font-dm text-sm text-primary-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact"
                className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-outfit font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-accent text-black hover:shadow-glow-lg hover:-translate-y-1'
                    : 'border border-primary-600 text-white hover:border-accent hover:text-accent'
                }`}
              >
                {plan.cta}
                <ArrowRight size={18} />
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Custom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="font-dm text-primary-400 mb-4">
            Need a custom solution? Let&apos;s discuss your specific requirements.
          </p>
          <a
            href="#contact"
            className="btn-secondary inline-flex items-center gap-2"
          >
            Request Custom Quote
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
