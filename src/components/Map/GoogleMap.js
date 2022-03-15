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

  useEffect(() => {
    if (!googleMap) {
      return null
    }

    if (selectedFeature) {
      const lng = selectedFeature.coordinates[0]
      const lat = selectedFeature.coordinates[1]
      googleMap.setCenter({ lat, lng })
      googleMap.setZoom(9)
    } else {
      googleMap.fitBounds(bounds)
    }

    googleMap.fitBounds(bounds)
  }, [bounds, selectedFeature])

  const bounds = useMemo(() => new google.maps.LatLngBounds(), [google])

  const loadGeoData = (mapProps, map) => {
    googleMap = map

    const markerClusterer = new MarkerClusterer(map, null, { imagePath: 'https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m' })
    markerClusterer.setMap(map)

    google.maps.event.addListener(map.data, 'addfeature', function (event) {
      if (event.feature.getGeometry().getType() === 'Point') {
        const marker = new google.maps.Marker({
          position: event.feature.getGeometry().get(),
          title: event.feature.getProperty('name'),
          map: map
        })

        google.maps.event.addListener(marker, 'click', function (marker, event) {
          return function() {
            const id = event.feature.getProperty('id')
            setSelectedFeature(id)
          }
        }(marker, event))

        markerClusterer.addMarker(marker)
        bounds.extend(event.feature.getGeometry().get())
        map.fitBounds(bounds)
        map.setCenter(event.feature.getGeometry().get())
      }
    })

    map.data.addGeoJson(featureCollection)
    map.data.setMap(null)
  }

  return (
    <Map
      google={google}
      style={mapStyles}
      onReady={loadGeoData}
    />
  )
}
