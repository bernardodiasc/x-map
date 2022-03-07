import MapContext from './MapContext'

import useAppContext from '@contexts/App'

import { dataToGeoFeatureCollection } from '@lib/geo'

const MapProvider = ({ children }) => {
  const { state: { collections } } = useAppContext()

  const featureCollection = collections.profiles
    ? dataToGeoFeatureCollection(collections.profiles)
    : undefined

  return (
    <MapContext.Provider
      value={{
        featureCollection
      }}
    >
      {children}
    </MapContext.Provider>
  )
}

export default MapProvider
