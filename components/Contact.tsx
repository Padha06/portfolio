'use client'

import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { Reveal, LineReveal, Eyebrow, ArrowUpRight } from './Reveal'
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from '@/lib/emailConfig'
import { contact } from '@/lib/content'

const projectTypes = ['Website', 'Web app', 'Mobile app', 'Business Central', 'Integration', 'Other']

const empty = { name: '', email: '', phone: '', projectType: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const set = (key: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [key]: e.target.value })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          service: form.projectType,
          message: form.message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      )
      setStatus('success')
      setForm(empty)
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="contact-panel">
          <div className="contact-glow" aria-hidden="true" />
          <Eyebrow index="04">Contact</Eyebrow>
          <LineReveal className="contact-title" lines={[<>Have something</>, <><em>worth building?</em></>]} />

          <div className="contact-grid">
            <Reveal className="contact-aside" delay={0.1}>
              <p className="contact-lede">
                Tell me a little about the project. I reply to every enquiry personally, usually
                within a day.
              </p>
              <div className="contact-lines">
                <a href={`mailto:${contact.email}`} className="contact-line">
                  <span className="label">Email</span>
                  <span className="contact-line-value">
                    {contact.email} <ArrowUpRight />
                  </span>
                </a>
                <a href={contact.phoneHref} className="contact-line">
                  <span className="label">Phone / WhatsApp</span>
                  <span className="contact-line-value">
                    {contact.phone} <ArrowUpRight />
                  </span>
                </a>
                <a href={contact.github} target="_blank" rel="noopener noreferrer" className="contact-line">
                  <span className="label">GitHub</span>
                  <span className="contact-line-value">
                    @Padha06 <ArrowUpRight />
                  </span>
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <form className="form" onSubmit={submit}>
                <div className="form-row">
                  <label className="field">
                    <span className="label">Your name</span>
                    <input required value={form.name} onChange={set('name')} placeholder="Jane Doe" autoComplete="name" />
                  </label>
                  <label className="field">
                    <span className="label">Email</span>
                    <input required type="email" value={form.email} onChange={set('email')} placeholder="jane@company.com" autoComplete="email" />
                  </label>
                </div>
                <label className="field">
                  <span className="label">Phone (optional)</span>
                  <input type="tel" value={form.phone} onChange={set('phone')} placeholder="+91 98765 43210" autoComplete="tel" />
                </label>

                <fieldset className="field">
                  <legend className="label">What do you need?</legend>
                  <div className="chips">
                    {projectTypes.map((t) => (
                      <label key={t} className={`chip ${form.projectType === t ? 'is-on' : ''}`}>
                        <input
                          type="radio"
                          name="projectType"
                          value={t}
                          required
                          checked={form.projectType === t}
                          onChange={() => setForm({ ...form, projectType: t })}
                        />
                        {t}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <label className="field">
                  <span className="label">Project details</span>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={set('message')}
                    placeholder="Goals, timeline, links to anything you love…"
                  />
                </label>

                <div className="form-foot">
                  <button type="submit" className="btn btn-light btn-lg" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : 'Send enquiry'}
                    <span className="btn-arrow">→</span>
                  </button>
                  <p className="form-status" role="status">
                    {status === 'success' && 'Thank you — your message is in. I’ll be in touch shortly.'}
                    {status === 'error' && (
                      <>
                        Something went wrong. Please email{' '}
                        <a href={`mailto:${contact.email}`}>{contact.email}</a> directly.
                      </>
                    )}
                  </p>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
