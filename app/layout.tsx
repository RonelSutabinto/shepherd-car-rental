import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'

import { Providers } from '@/components/ui/Providerui'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shepherd Car Rental',
  description: 'Discover the best car rental sevices',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        {/* <ClerkProvider frontendApi={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>  */}
      <body>  
        <ClerkProvider>  
          <Providers>  
            <Navbar/>
            {children}
          </Providers>
          <Footer />
        </ClerkProvider>
      </body>
    </html>
    
  )
}
