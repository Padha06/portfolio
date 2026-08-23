'use client'

import { motion } from 'framer-motion'
import { ArrowRightIcon as ArrowRight, RocketIcon as Rocket, CodeIcon as Code, SmartphoneIcon as Smartphone, DatabaseIcon as Database, GitBranchIcon as GitBranch } from './Icons'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-hero">
        {/* Mesh Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
        
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent/30 rounded-full"
              initial={{
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 text-accent/10"
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <Code size={80} />
          </motion.div>
          <motion.div
            className="absolute top-1/3 right-1/4 text-accent/10"
            animate={{ y: [0, -15, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          >
            <Smartphone size={60} />
          </motion.div>
          <motion.div
            className="absolute bottom-1/4 left-1/3 text-accent/10"
            animate={{ y: [0, -25, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 7, repeat: Infinity, delay: 2 }}
          >
            <Database size={70} />
          </motion.div>
          <motion.div
            className="absolute bottom-1/3 right-1/3 text-accent/10"
            animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
          >
            <GitBranch size={50} />
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Social Proof Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass-bg border border-glass-border backdrop-blur-sm mb-8"
          >
            <Rocket className="text-accent" size={16} />
            <span className="font-inter text-sm text-primary-200">
              50+ Successful Projects | 8+ Years BC Experience
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-poppins text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6"
          >
            Full-Stack Solutions for{' '}
            <span className="gradient-text">Growing Businesses</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-inter text-lg md:text-xl text-primary-300 mb-10 max-w-2xl mx-auto"
          >
            Web • Mobile • ERP Customization • Integrations
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#case-studies" className="btn-primary">
              View My Work
              <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn-secondary">
              Start a Project
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-primary-400 flex justify-center pt-2"
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 bg-accent rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
