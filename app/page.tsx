import Header from '@/components/Header'
import Hero from '@/components/Hero'
import CaseStudies from '@/components/CaseStudies'
import Services from '@/components/Services'
import Process from '@/components/Process'
import Stats from '@/components/Stats'
import Skills from '@/components/Skills'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <CaseStudies />
        <Services />
        <Process />
        <Stats />
        <Skills />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
