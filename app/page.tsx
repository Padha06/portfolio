import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Work from '@/components/Work'
import Systems from '@/components/Systems'
import Services from '@/components/Services'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Work />
        <Systems />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
