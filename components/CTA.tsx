'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SendIcon as Send, ArrowRightIcon as ArrowRight, CalendarIcon as Calendar, MailIcon as Mail, PhoneIcon as Phone } from './Icons'

const projectTypes = [
  'Web Development',
  'Mobile App',
  'Business Central',
  'Integration',
  'Other',
]

export default function CTA() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <section id="contact" className="srv-section">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="srv-header"
        >
          <span className="srv-eyebrow">CONTACT</span>
          <h2 className="srv-title">Let&apos;s Build <span className="text-accent">Together</span></h2>
          <p className="srv-desc">
            Have a project in mind? Let&apos;s discuss your goals and build
            something remarkable together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="srv-card srv-card--large">
              <div className="srv-card-content">
                <div className="srv-card-system">
                  <span className="srv-card-system-label">FORM / SUBMIT</span>
                  <span className="srv-card-status">ACTIVE</span>
                </div>

                <div className="space-y-5 mt-6">
                  <div>
                    <label htmlFor="name" className="block font-dm text-xs font-medium mb-2 uppercase tracking-wider text-primary-400">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg font-dm text-white text-sm bg-white/[0.03] border border-white/5 focus:border-accent focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-dm text-xs font-medium mb-2 uppercase tracking-wider text-primary-400">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg font-dm text-white text-sm bg-white/[0.03] border border-white/5 focus:border-accent focus:outline-none transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="projectType" className="block font-dm text-xs font-medium mb-2 uppercase tracking-wider text-primary-400">
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg font-dm text-white transition-colors appearance-none cursor-pointer text-sm bg-white/[0.03] border border-white/5 focus:border-accent focus:outline-none"
                    >
                      <option value="" className="bg-primary-800">Select project type</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type} className="bg-primary-800">{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-dm text-xs font-medium mb-2 uppercase tracking-wider text-primary-400">
                      Project Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg font-dm text-white transition-colors resize-none text-sm bg-white/[0.03] border border-white/5 focus:border-accent focus:outline-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <button type="submit" className="srv-cta-btn w-full justify-center">
                    <Send size={16} />
                    Start Your Project
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-4">
              <div className="srv-card srv-card--small">
                <div className="srv-card-content">
                  <div className="srv-card-system">
                    <span className="srv-card-system-label">CONTACT / INFO</span>
                    <span className="srv-card-status">ACTIVE</span>
                  </div>
                  <div className="space-y-4 mt-4">
                    <a href="mailto:shubam@example.com" className="flex items-center gap-3 text-primary-300 hover:text-white transition-colors">
                      <Mail size={18} />
                      <span className="font-dm text-sm">shubam@example.com</span>
                    </a>
                    <a href="tel:+1234567890" className="flex items-center gap-3 text-primary-300 hover:text-white transition-colors">
                      <Phone size={18} />
                      <span className="font-dm text-sm">+1 (234) 567-890</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="srv-card srv-card--small">
                <div className="srv-card-content">
                  <div className="srv-card-system">
                    <span className="srv-card-system-label">BOOKING / CALL</span>
                    <span className="srv-card-status">ACTIVE</span>
                  </div>
                  <h3 className="font-outfit text-lg font-semibold text-white mb-1 mt-4">
                    Free Consultation
                  </h3>
                  <p className="font-dm text-xs mb-3 text-primary-500">
                    30-minute discovery call
                  </p>
                  <p className="font-dm mb-4 text-sm leading-relaxed text-primary-400">
                    Let&apos;s discuss your project goals, technical requirements,
                    and how I can help bring your vision to life.
                  </p>
                  <a
                    href="https://calendly.com/shubampadha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="srv-cta-btn w-full justify-center"
                  >
                    <Calendar size={16} />
                    Book a Call
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>

              <div className="text-center p-4 rounded-lg bg-white/[0.02] border border-white/5">
                <p className="font-dm text-xs text-primary-500">
                  Typical response time:{' '}
                  <span className="font-medium text-accent">Within 24 hours</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
