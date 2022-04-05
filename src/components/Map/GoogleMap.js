import { useMemo, useCallback } from 'react'
import { Map } from 'google-maps-react'
import { MarkerClusterer } from '@googlemaps/markerclusterer'

import useAppContext from '@contexts/App'
import useMapContext from '@contexts/Map'

import { getFormattedLocationTitle } from '@lib/locations'

const mapStyles = {
  width: '100%',
  height: 'calc(100vh - 80px)',
}

const getAllMarkersPositions = markers =>
  markers.reduce((acc, cur, key) => {
    const position = cur.getPosition()
    return [...acc, { key, lat: position.lat(), lng: position.lng() }]
  }, [])

const checkIfAllMarkersAreOnSamePosition = markers => {
  const allMarkersPositions = getAllMarkersPositions(markers)
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
  return isAllMarkersOnSamePosition
}

export default function MapContainer({ google, featureCollection }) {
  const { state: { features } } = useAppContext()
  const { actions: { setSelectedCoordinates } } = useMapContext()

  const bounds = useMemo(() => new google.maps.LatLngBounds(), [google])

  const onClusterClickHandler = useCallback((event, cluster, map) => {
    const isAllMarkersOnSamePosition = checkIfAllMarkersAreOnSamePosition(cluster.markers)
    if (isAllMarkersOnSamePosition) {
      const position = cluster.markers[0].position
      setSelectedCoordinates([position.lng(), position.lat()])
    } else {
      setSelectedCoordinates(null)
      map.fitBounds(cluster.bounds)
    }
  }, [setSelectedCoordinates])

  const markerClusterRender = ({ count, position, markers }, stats) => {
    const color = count > Math.max(10, stats.clusters.markers.mean) ? '#ff0000' : '#0000ff'
    const svg = window.btoa(`
      <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
        <circle cx="120" cy="120" opacity=".6" r="70" />
        <circle cx="120" cy="120" opacity=".3" r="90" />
        <circle cx="120" cy="120" opacity=".2" r="110" />
      </svg>
    `)
    const isAllMarkersOnSamePosition = checkIfAllMarkersAreOnSamePosition(markers)
    return new google.maps.Marker({
      position,
      icon: {
        url: `data:image/svg+xml;base64,${svg}`,
        scaledSize: new google.maps.Size(45, 45),
      },
      label: {
        text: String(count),
        color: 'rgba(255,255,255,0.9)',
        fontSize: '12px',
      },
      title: isAllMarkersOnSamePosition
        ? markers[0].title
        : `Cluster of ${count} markers`,
      zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
    })
  }

  const loadGeoData = (mapProps, map) => {
    let markerClusterer
    if (features?.MARKER_CLUSTERER) {
      markerClusterer = new MarkerClusterer({
        map,
        onClusterClick: onClusterClickHandler,
        renderer: {
          render: markerClusterRender
        }
      })
      markerClusterer.setMap(map)
    }

    google.maps.event.addListener(map.data, 'addfeature', function (event) {
      if (event.feature.getGeometry().getType() === 'Point') {
        const coordinates = event.feature.getProperty('coordinates')
        const location = event.feature.getProperty('location')

        const marker = new google.maps.Marker({
          position: event.feature.getGeometry().get(),
          label: { text: '1', color: 'rgba(255,255,255,0.9)', fontSize: '12px' },
          title: getFormattedLocationTitle(location),
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
