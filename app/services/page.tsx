import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ServicesPage from '@/components/ServicesPage'

export const metadata = {
  title: 'Services | Vaskoi — Full-Stack Development',
  description: 'Web development, mobile apps, ERP systems, integrations, and automation — complete software development services for businesses.',
}

export default function Services() {
  return (
    <>
      <Header />
      <main id="main-content">
        <ServicesPage />
      </main>
      <Footer />
    </>
  )
}
