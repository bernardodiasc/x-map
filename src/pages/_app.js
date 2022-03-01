import { SessionProvider } from 'next-auth/react'
import axios from 'axios'
import { SWRConfig } from 'swr'
import Head from 'next/head'

import { AppProvider } from '@contexts/App'

import '../styles/globals.css'

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) => axios.get(resource, init).then(res => res.data),
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
      }}
    >
      <SessionProvider session={session}>
        <AppProvider {...pageProps}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <title>X-Map | X-Team</title>
          </Head>
          <Component {...pageProps} />
        </AppProvider>
      </SessionProvider>
    </SWRConfig>
  )
}

export default App
