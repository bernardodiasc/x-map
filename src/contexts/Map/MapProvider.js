import { useEffect, useState } from 'react'

import MapContext from './MapContext'

import useAppContext from '@contexts/App'

import { dataToGeoFeatureCollection } from '@lib/geo'
import { getProfilesWithCoordinatesFromLatestLocation } from '@lib/profiles'
import { getEventsWithCoordinatesFromFutureLocations } from '@lib/events'
import { COLLECTIONS } from '@lib/constants'

const MapProvider = ({ children }) => {
  const { state: { collections } } = useAppContext()
  const [selectedCollection, setSelectedCollection] = useState(COLLECTIONS.PROFILES)
  const [selectedCoordinates, setSelectedCoordinates] = useState()

  const collectionsGeoData = {
    [COLLECTIONS.PROFILES]: getProfilesWithCoordinatesFromLatestLocation(collections.profiles),
    [COLLECTIONS.EVENTS]: getEventsWithCoordinatesFromFutureLocations(collections.events),
  }

  const featureCollection = dataToGeoFeatureCollection(collectionsGeoData[selectedCollection])

  return (
    <MapContext.Provider
      value={{
        state: {
          featureCollection,
          selectedCollection,
          selectedCoordinates,
        },
        actions: {
          setSelectedCollection,
          setSelectedCoordinates,
        },
      }}
    >
      {children}
    </MapContext.Provider>
  )
}

export default MapProvider
