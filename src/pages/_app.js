import axios from 'axios'
import { SWRConfig } from 'swr'
import Head from 'next/head'

import { AuthProvider } from '@contexts/Auth'
import { AppProvider } from '@contexts/App'
import { MapProvider } from '@contexts/Map'

import AppLayout from '@components/AppLayout'

import '../styles/globals.css'

function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) => axios.get(resource, init).then(res => res.data),
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
      }}
    >
      <AuthProvider>
        <AppProvider>
          <MapProvider>
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
              />
              <title>X-World-Map | X-Team</title>
            </Head>
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </MapProvider>
        </AppProvider>
      </AuthProvider>
    </SWRConfig>
  )
}

export default App
