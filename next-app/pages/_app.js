import '../styles/globals.css'
import { AuthProvider } from '../lib/auth.js'
import { ChakraProvider } from '@chakra-ui/react'
import Header from '../components/Header'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Header />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
