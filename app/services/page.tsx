import { redirect } from 'next/navigation'

// Services now live on the home page; keep old links working.
export default function ServicesRedirect() {
  redirect('/#services')
}
