import { useMemo, useCallback } from 'react'
import { Map } from 'google-maps-react'
import { MarkerClusterer } from '@googlemaps/markerclusterer'

import useAppContext from '@contexts/App'
import useMapContext from '@contexts/Map'

const mapStyles = {
  width: '100%',
  height: 'calc(100vh - 80px)',
}

export default function MapContainer({ google, featureCollection }) {
  const { state: { features } } = useAppContext()
  const { actions: { setSelectedCoordinates } } = useMapContext()

  const bounds = useMemo(() => new google.maps.LatLngBounds(), [google])

  const onClusterClickHandler = useCallback((event, cluster, map) => {
    const allMarkersPositions = cluster.markers.reduce((acc, cur, key) => {
      const position = cur.getPosition()
      return [...acc, { key, lat: position.lat(), lng: position.lng() }]
    }, [])

    let isAllMarkersOnSamePosition = true
    allMarkersPositions.forEach(element => {
      const diffrentPositionMarker = allMarkersPositions
        .find(marker => marker.key !== element.key
          && marker.lat !== element.lat
          && marker.lng !== element.lng
        )
      if (diffrentPositionMarker) {
        isAllMarkersOnSamePosition = false
      }
    })

    if (isAllMarkersOnSamePosition) {
      const position = cluster.markers[0].position
      setSelectedCoordinates([position.lng(), position.lat()])
    } else {
      setSelectedCoordinates(null)
      map.fitBounds(cluster.bounds)
    }
  }, [setSelectedCoordinates])

  const loadGeoData = (mapProps, map) => {
    let markerClusterer
    if (features?.MARKER_CLUSTERER) {
      markerClusterer = new MarkerClusterer({ map, onClusterClick: onClusterClickHandler })
      markerClusterer.setMap(map)
    }

    google.maps.event.addListener(map.data, 'addfeature', function (event) {
      if (event.feature.getGeometry().getType() === 'Point') {
        const coordinates = event.feature.getProperty('coordinates')

        const marker = new google.maps.Marker({
          position: event.feature.getGeometry().get(),
          label: '1',
          map: map,
        })

        google.maps.event.addListener(marker, 'click', function () {
          return function() {
            setSelectedCoordinates(coordinates)
          }
        }())

        if (features?.MARKER_CLUSTERER) {
          markerClusterer.addMarker(marker)
        }

        if (features?.BOUNDS) {
          bounds.extend(event.feature.getGeometry().get())
          map.fitBounds(bounds)
          map.setCenter(event.feature.getGeometry().get())
        }
      }
    })

    map.data.setMap(null)
    map.data.addGeoJson(featureCollection)

    if (!features?.BOUNDS) {
      map.setCenter({ lat: 0, lng: 0 })
      map.setZoom(2)
    }
  }

  return (
    <Map
      google={google}
      style={mapStyles}
      onReady={loadGeoData}
      scaleControl
      fullscreenControl={false}
      keyboardShortcuts={false}
    />
  )
}
