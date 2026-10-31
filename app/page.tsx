import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Work from '@/components/Work'
import Systems from '@/components/Systems'
import Services from '@/components/Services'
import Process from '@/components/Process'
import Stack from '@/components/Stack'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Marquee />
        <Work />
        <Systems />
        <Services />
        <Process />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
