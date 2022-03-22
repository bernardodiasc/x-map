import { normalizeLocationsApiData, getFutureLocations, getLocationByCoordinates, sortBySinceDate } from '@lib/locations'

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

export const getEventsWithCoordinatesFromFutureLocations = events =>
  events?.reduce((acc, cur) => {
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

export const getEventsByProfileId = (events, profileId) =>
  events.reduce((acc, cur) => {
    const locations = cur.locations.filter(location => location.profile === profileId).sort(sortBySinceDate)
    return locations.length > 0 ? [...acc, { ...cur, locations }] : acc
  }, [])
