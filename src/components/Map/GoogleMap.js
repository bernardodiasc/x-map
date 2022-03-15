import { useEffect, useState, useMemo } from 'react'
import { Map } from 'google-maps-react'
import { MarkerClusterer } from "@googlemaps/markerclusterer"

import useMapContext from '@contexts/Map'

const mapStyles = {
  width: '100%',
  height: 'calc(100vh - 80px)',
}

let googleMap

export default function MapContainer({ google, featureCollection }) {
  const {
    state: { selectedFeature },
    actions: { setSelectedFeature }
  } = useMapContext()
  const [map, setMap] = useState()

  const loadGeoData = (mapProps, map) => {
    googleMap = map

    const markerClusterer = new MarkerClusterer(map, null, { imagePath: 'https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m' })
    markerClusterer.setMap(map)
    console.log(featureCollection)

    google.maps.event.addListener(map.data, 'addfeature', function (event) {
      if (event.feature.getGeometry().getType() === 'Point') {
        const marker = new google.maps.Marker({
          position: event.feature.getGeometry().get(),
          map: map
        })

        google.maps.event.addListener(marker, 'click', function (marker, event) {
          return function() {
            const id = event.feature.getProperty('id')
            setSelectedFeature(id)
          }
        }(marker, event))

        markerClusterer.addMarker(marker)
      }
    })

    map.data.addGeoJson(featureCollection)
    map.data.setMap(null)
    map.setCenter({ lat: 0, lng: 0 })
    map.setZoom(2)
  }

  return (
    <Map
      google={google}
      style={mapStyles}
      onReady={loadGeoData}
    />
  )
}
