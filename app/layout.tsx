import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import { Providers } from '@/components/ui/Providerui'
import { ClerkProvider } from '@clerk/nextjs'
import { ChakraProvider } from '@chakra-ui/react'

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
      <body>  
        <ChakraProvider>  
          <ClerkProvider frontendApi={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>  
            <Navbar/>
            {children}
            <Footer />
          </ClerkProvider>  
        </ChakraProvider>
      </body>
    </html>
    
  )
}
