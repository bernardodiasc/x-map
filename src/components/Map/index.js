import { GoogleApiWrapper } from 'google-maps-react'

import Loading from '@components/generic/Loading'
import GoogleMap from './GoogleMap'

export default GoogleApiWrapper(
  (props) => ({
    apiKey: process.env.NEXT_PUBLIC_GMAPS_API_KEY,
    LoadingContainer: Loading,
    ...props,
  })
)(GoogleMap)

// import dynamic from 'next/dynamic'
// const LeafletMap = dynamic(
//   () => import('./LeafletMap'),
//   {
//     loading: () => <p>A map is loading</p>,
//     ssr: false
//   }
// )
// export default LeafletMap
