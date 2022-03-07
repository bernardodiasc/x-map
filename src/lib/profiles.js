import { normalizeLocationsApiData, getLatestProfileLocation } from '@lib/locations'

export const normalizeProfileApiData = profile => {
  const locations = normalizeLocationsApiData(profile.attributes.locations)
  return ({
    id: profile.id,
    name: profile.attributes.name,
    email: profile.attributes.email,
    locations,
  })
}

export const normalizeProfilesApiData = apiData => apiData?.data
  ? apiData.data.map(normalizeProfileApiData)
  : undefined

export const profilesWithCoordinatesFromLatestLocation = profiles => profiles?.reduce((acc, cur) => {
  if (cur?.locations?.length === 0) {
    return acc
  }
  const latestLocation = getLatestProfileLocation(cur.locations)
  return [
    ...acc,
    {
      ...cur,
      location: latestLocation,
      coordinates: latestLocation.coordinates,
    }
  ]
}, [])
