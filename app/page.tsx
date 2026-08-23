import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import CaseStudies from '@/components/CaseStudies'
import Skills from '@/components/Skills'
import Process from '@/components/Process'
import Testimonials from '@/components/Testimonials'
import LiveProjects from '@/components/LiveProjects'
import TechStack from '@/components/TechStack'
import Pricing from '@/components/Pricing'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Services />
        <CaseStudies />
        <Skills />
        <Process />
        <Testimonials />
        <LiveProjects />
        <TechStack />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
