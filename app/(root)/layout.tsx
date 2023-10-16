import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Toaster } from '@/components/ui/toaster'
import { NextAuthProvider } from '../providers'

const layout = ({ children } 
: { children: React.ReactNode }) => {
  return (
    <>
      <NextAuthProvider>
        <Navbar />
          {children}
          <Toaster />
        <Footer />
      </NextAuthProvider>
    </>
  )
}

export default layout