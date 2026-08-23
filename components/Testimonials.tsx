'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { StarIcon as Star, ChevronLeftIcon as ChevronLeft, ChevronRightIcon as ChevronRight, QuoteIcon as Quote } from './Icons'

const testimonials = [
  {
    id: 1,
    quote: 'Exceptional work on our e-commerce platform. The integration with our existing ERP system was seamless, and the performance improvements were immediately noticeable.',
    companyType: 'Retail Startup',
    result: '40% faster load times',
    rating: 5,
  },
  {
    id: 2,
    quote: 'The warehouse management system transformed our operations. Offline-first architecture was crucial for our warehouse environment, and the BC integration works flawlessly.',
    companyType: 'Logistics Company',
    result: '60% efficiency gain',
    rating: 5,
  },
  {
    id: 3,
    quote: 'Deep expertise in Business Central customization. The treasury module they built saved us countless hours of manual work and integrated perfectly with our existing setup.',
    companyType: 'Enterprise Client',
    result: '80% time saved',
    rating: 5,
  },
  {
    id: 4,
    quote: 'Professional, responsive, and technically excellent. The multi-system integration they architected connected all our tools and eliminated data silos.',
    companyType: 'Mid-Market SMB',
    result: '100% data accuracy',
    rating: 5,
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="section-padding bg-primary-950">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-inter text-sm text-accent uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="font-poppins text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            What Clients <span className="gradient-text">Say</span>
          </h2>
          <p className="font-inter text-lg text-primary-300 max-w-2xl mx-auto">
            Feedback from satisfied clients across various industries
            and project types.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="glass-card p-8 md:p-12 min-h-[300px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                {/* Quote Icon */}
                <Quote
                  size={48}
                  className="text-accent/20 mb-6"
                 
                />

                {/* Quote Text */}
                <blockquote className="font-inter text-lg md:text-xl text-primary-200 leading-relaxed mb-8">
                  &ldquo;{testimonials[currentIndex].quote}&rdquo;
                </blockquote>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className="text-warning fill-warning"
                     
                    />
                  ))}
                </div>

                {/* Client Info */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="font-poppins font-semibold text-white">
                      {testimonials[currentIndex].companyType}
                    </div>
                    <div className="font-inter text-sm text-primary-400">
                      Verified Client
                    </div>
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-success/10 border border-success/20">
                    <span className="font-inter text-sm font-medium text-success">
                      {testimonials[currentIndex].result}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-full border border-primary-600 text-primary-400 hover:border-accent hover:text-accent transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-6 bg-accent'
                      : 'bg-primary-600 hover:bg-primary-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={index === currentIndex ? 'true' : 'false'}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 rounded-full border border-primary-600 text-primary-400 hover:border-accent hover:text-accent transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
