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
    <section id="contact" className="section-padding bg-primary-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-40" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="srv-card-system-label">CONTACT</span>
            <span className="srv-card-status">ACTIVE</span>
          </div>
          <h2 className="cs-section-title">Let&apos;s Build <span className="gradient-text">Together</span></h2>
          <p className="cs-section-desc">
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
            <form onSubmit={handleSubmit} className="srv-card">
              <div className="srv-card-content">
                <div className="flex items-center gap-3 mb-6">
                  <span className="srv-card-system-label">FORM / SUBMIT</span>
                  <span className="srv-card-status">ACTIVE</span>
                </div>

                <div className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block font-inter text-xs font-medium text-primary-400 mb-2 uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-primary-800/50 border border-primary-700 rounded-lg font-inter text-white placeholder-primary-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors text-sm"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-inter text-xs font-medium text-primary-400 mb-2 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-primary-800/50 border border-primary-700 rounded-lg font-inter text-white placeholder-primary-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors text-sm"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="projectType" className="block font-inter text-xs font-medium text-primary-400 mb-2 uppercase tracking-wider">
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-primary-800/50 border border-primary-700 rounded-lg font-inter text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors appearance-none cursor-pointer text-sm"
                    >
                      <option value="" className="bg-primary-800">Select project type</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type} className="bg-primary-800">{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-inter text-xs font-medium text-primary-400 mb-2 uppercase tracking-wider">
                      Project Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-primary-800/50 border border-primary-700 rounded-lg font-inter text-white placeholder-primary-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none text-sm"
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
              <div className="srv-card">
                <div className="srv-card-content">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="srv-card-system-label">CONTACT / INFO</span>
                    <span className="srv-card-status">ACTIVE</span>
                  </div>
                  <div className="space-y-4">
                    <a href="mailto:shubam@example.com" className="flex items-center gap-3 text-primary-300 hover:text-accent transition-colors">
                      <Mail size={18} />
                      <span className="font-inter text-sm">shubam@example.com</span>
                    </a>
                    <a href="tel:+1234567890" className="flex items-center gap-3 text-primary-300 hover:text-accent transition-colors">
                      <Phone size={18} />
                      <span className="font-inter text-sm">+1 (234) 567-890</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="srv-card group">
                <div className="srv-card-content">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="srv-card-system-label">BOOKING / CALL</span>
                    <span className="srv-card-status">ACTIVE</span>
                  </div>
                  <h3 className="font-poppins text-lg font-semibold text-white mb-1">
                    Free Consultation
                  </h3>
                  <p className="font-inter text-xs text-primary-500 mb-3">
                    30-minute discovery call
                  </p>
                  <p className="font-inter text-primary-400 mb-4 text-sm leading-relaxed">
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

              <div className="text-center p-4 rounded-lg bg-primary-800/30 border border-primary-700">
                <p className="font-inter text-xs text-primary-500">
                  Typical response time:{' '}
                  <span className="text-accent font-medium">Within 24 hours</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
