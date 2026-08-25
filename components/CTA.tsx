'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { SendIcon as Send, ArrowRightIcon as ArrowRight, CalendarIcon as Calendar, MailIcon as Mail, PhoneIcon as Phone } from './Icons'

const projectTypes = [
  'Web Development',
  'Mobile App',
  'Business Central',
  'Integration',
  'Other',
]

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || ''
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || ''
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''

export default function CTA() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setStatus('error')
      return
    }

    setStatus('sending')

    const templateParams = {
      from_name: formData.name,
      reply_to: formData.email,
      project_type: formData.projectType,
      message: formData.message,
    }

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        { publicKey: EMAILJS_PUBLIC_KEY }
      )
      setStatus('success')
      setFormData({ name: '', email: '', projectType: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    } catch (error) {
      console.error('EmailJS error:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <section id="contact" className="srv-section">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, transform: "translateY(20px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0px)" }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
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
            initial={{ opacity: 0, transform: "translateX(-30px)" }}
            whileInView={{ opacity: 1, transform: "translateX(0px)" }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <form onSubmit={handleSubmit} className="srv-card srv-card--large">
              <div className="srv-card-content">
                <div className="srv-card-system">
                  <span className="srv-card-system-label">FORM / SUBMIT</span>
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

                  <div className="text-center py-2">
                    <p className="font-dm text-xs text-primary-500">
                      Typical response time:{' '}
                      <span className="font-medium text-accent">Within 24 hours</span>
                    </p>
                  </div>

                  {status === 'success' && (
                    <div className="text-center py-2">
                      <p className="font-dm text-sm text-success">
                        Thank you! Your message has been sent. We&apos;ll get back to you shortly.
                      </p>
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="text-center py-2">
                      <p className="font-dm text-sm text-accent">
                        Sorry, something went wrong. Please email us directly at shubham@scango.it.com
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="srv-cta-btn w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Send size={16} />
                    {status === 'sending' ? 'Sending...' : 'Start Your Project'}
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, transform: "translateX(30px)" }}
            whileInView={{ opacity: 1, transform: "translateX(0px)" }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-4">
              <div className="srv-card srv-card--small">
                <div className="srv-card-content">
                  <div className="srv-card-system">
                    <span className="srv-card-system-label">CONTACT / INFO</span>
                  </div>
                  <div className="space-y-4 mt-4">
                    <a href="mailto:shubham@scango.it.com" className="flex items-center gap-3 text-primary-300 hover:text-white transition-colors">
                      <Mail size={18} />
                      <span className="font-dm text-sm">shubham@scango.it.com</span>
                    </a>
                    <a href="mailto:samarth@scango.it.com" className="flex items-center gap-3 text-primary-300 hover:text-white transition-colors">
                      <Mail size={18} />
                      <span className="font-dm text-sm">samarth@scango.it.com</span>
                    </a>
                    <a href="tel:+916005791807" className="flex items-center gap-3 text-primary-300 hover:text-white transition-colors">
                      <Phone size={18} />
                      <span className="font-dm text-sm">+91 6005791807</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="srv-card srv-card--small">
                <div className="srv-card-content">
                  <div className="srv-card-system">
                    <span className="srv-card-system-label">BOOKING / CALL</span>
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
