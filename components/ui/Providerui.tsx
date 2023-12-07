
'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import Navbar from '../Navbar'

export function Providers({ 
    children 
  }: { 
  children: React.ReactNode 
  }) {
  return (
    <>
      <CacheProvider>
        <ChakraProvider>
          <Navbar/>
          {children}
        </ChakraProvider>
     </CacheProvider>
    </>
    
  )
}