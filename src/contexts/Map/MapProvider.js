import { useEffect, useState } from 'react'

import MapContext from './MapContext'

import useAppContext from '@contexts/App'

import { dataToGeoFeatureCollection } from '@lib/geo'
import { profilesWithCoordinatesFromLatestLocation } from '@lib/profiles'
import { COLLECTIONS } from '@lib/constants'

const MapProvider = ({ children }) => {
  const { state: { collections } } = useAppContext()
  const [selectedCollection, setSelectedCollection] = useState(COLLECTIONS.PROFILES)
  const [selectedFeature, setSelectedFeature] = useState()

  const collectionsGeoData = {
    [COLLECTIONS.PROFILES]: profilesWithCoordinatesFromLatestLocation(collections.profiles),
    [COLLECTIONS.EVENTS]: [],
  }

  const featureCollection = dataToGeoFeatureCollection(collectionsGeoData[selectedCollection])

  return (
    <MapContext.Provider
      value={{
        state: {
          featureCollection,
          selectedCollection,
          selectedFeature,
        },
        actions: {
          setSelectedCollection,
          setSelectedFeature,
        },
      }}
    >
      {children}
    </MapContext.Provider>
  )
}

export default MapProvider
