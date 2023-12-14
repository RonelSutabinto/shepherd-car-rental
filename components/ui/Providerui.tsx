
'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
// import { ClerkProvider } from '@clerk/nextjs'
import Navbar from '../Navbar'
import Footer from '../Footer'

export function Providers({ 
    children 
  }: { 
  children: React.ReactNode 
  }) {
  return (
    <>
    
      <CacheProvider>     
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </CacheProvider>
     
    </>
    
  )
}