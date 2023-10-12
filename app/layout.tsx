import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import ListHeader from '@/components/car_crud/LiestHeader'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shepherd Car Rental',
  description: 'Discover the best car rental sevices of the world',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="relative">
        <Navbar />
        
        {/* It will be used if there is a need to add car records */}
        {/* <div className='pt-32 px-6 mx-12'>
            <ListHeader />
        </div> */}

        {children}
        <Footer />
      </body>
    </html>
  )
}
