import { type AppType } from 'next/app'
import { ClerkProvider } from '@clerk/nextjs'

import { api } from '~/utils/api'

import '~/styles/globals.css'
import { Toaster } from 'react-hot-toast'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class">
      <ClerkProvider {...pageProps}>
        <Head>
          <title>Chirp</title>
          <meta name="description" content="💭" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Toaster position="bottom-center" />
        <Component {...pageProps} />
      </ClerkProvider>
    </ThemeProvider>
  )
}

export default api.withTRPC(MyApp)
