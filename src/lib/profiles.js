import { normalizeLocationsApiData, getLatestLocation } from '@lib/locations'

export const normalizeProfileApiData = profile => {
  const locations = normalizeLocationsApiData(profile.attributes.locations)
  const normalizedProfile = {
    id: profile.id,
    name: profile.attributes.name,
    email: profile.attributes.email,
    about: profile.attributes.about,
    github: profile.attributes.github,
    stackoverflow: profile.attributes.stackoverflow,
    linkedin: profile.attributes.linkedin,
    twitter: profile.attributes.twitter,
    instagram: profile.attributes.instagram,
    locations,
  }
  return normalizedProfile
}

export const normalizeProfilesApiData = apiData => apiData?.data
  ? apiData.data.map(normalizeProfileApiData)
  : undefined

export const getProfilesWithCoordinatesFromLatestLocation = profiles => profiles?.reduce((acc, cur) => {
  if (cur?.locations?.length === 0) {
    return acc
  }
  const latestLocation = getLatestLocation(cur.locations)
  return [
    ...acc,
    {
      ...cur,
      location: latestLocation,
      coordinates: latestLocation.coordinates,
    }
  ]
}, [])

export const getSelectedProfiles = (collection, selectedCoordinates) => collection.reduce((acc, cur) => {
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
      name: cur.name,
      email: cur.email,
      about: cur.about,
      github: cur.github,
      stackoverflow: cur.stackoverflow,
      linkedin: cur.linkedin,
      twitter: cur.twitter,
      instagram: cur.instagram,
      location,
    }
  ]
}, [])
