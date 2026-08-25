import Header from '@/components/Header'
import Hero from '@/components/Hero'
import CaseStudies from '@/components/CaseStudies'
import Artwork from '@/components/Artwork'
import Services from '@/components/Services'
import Process from '@/components/Process'
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
        <Artwork />
        <Services />
        <Process />
        <Skills />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
