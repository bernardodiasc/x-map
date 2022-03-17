import { normalizeAttendeesApiData } from '@lib/attendees'

export const getLatestLocation = (locations = []) => locations
  .reduce((acc, cur) => (acc.since > cur.since ? acc : cur), {})

export const getFutureLocations = (locations = []) => locations
  .reduce((acc, cur) => {
    const isValid = !cur.until || new Date(cur.until) >= new Date()
    return isValid ? [...acc, cur] : acc
  }, [])

export const sortBySinceDate = (a, b) => new Date(b.since) - new Date(a.since)

export const normalizeLocationApiData = location => {
  const normalizedLocation = {
    id: location.id,
    address: location.attributes.address,
    city: location.attributes.city,
    country: location.attributes.country,
    latitude: location.attributes.latitude,
    longitude: location.attributes.longitude,
    since: location.attributes.since,
    until: location.attributes.until,
    coordinates: [
      Number(location.attributes.longitude),
      Number(location.attributes.latitude),
    ]
  }

  if (location.attributes.attendees) {
    normalizedLocation.attendees = normalizeAttendeesApiData(location.attributes.attendees)
  }

  return normalizedLocation
}

export const normalizeLocationsApiData = apiData => apiData?.data
  ? apiData.data.map(normalizeLocationApiData).sort(sortBySinceDate)
  : undefined

export const getLocationByCoordinates = (locations, selectedCoordinates) => locations
  .find(location => {
    return location.coordinates[0] === selectedCoordinates[0]
      && location.coordinates[1] === selectedCoordinates[1]
  })

export const getRecordsByCoordinates = (collection, selectedCoordinates) => collection
  .reduce((acc, cur) => {
    const location = getLocationByCoordinates(cur.locations, selectedCoordinates)
    if (!location) {
      return acc
    }
    return [
      ...acc,
      {
        ...cur,
        location,
      }
    ]
  }, [])
