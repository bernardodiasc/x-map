import { normalizeLocationsApiData, getLatestLocation, getFutureLocations } from '@lib/locations'

export const normalizeEventApiData = event => {
  const locations = normalizeLocationsApiData(event.attributes.locations)
  const normalizedEvent = {
    id: event.id,
    title: event.attributes.title,
    info: event.attributes.info,
    locations,
  }
  return normalizedEvent
}

export const normalizeEventsApiData = apiData => apiData?.data
  ? apiData.data.map(normalizeEventApiData)
  : undefined

export const getEventsWithCoordinatesFromFutureLocations = events => events?.reduce((acc, cur) => {
  if (cur?.locations?.length === 0) {
    return acc
  }
  const futureLocations = getFutureLocations(cur.locations)
  return [
    ...acc,
    ...futureLocations.map(location => ({
      id: cur.id,
      title: cur.title,
      info: cur.info,
      location: location,
      coordinates: location.coordinates,
    }))
  ]
}, [])

export const getSelectedEvents = (collection, selectedCoordinates) => collection.reduce((acc, cur) => {
  const location = cur.locations.find(location => {
    return location.coordinates[0] === selectedCoordinates[0]
      && location.coordinates[1] === selectedCoordinates[1]
  })
  if (!location) {
    return acc
  }
  return [
    ...acc,
    {
      id: cur.id,
      title: cur.title,
      info: cur.info,
      location
    }
  ]
}, [])
