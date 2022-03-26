import { normalizeLocationsApiData, getLatestLocation } from '@lib/locations'

export const normalizeProfileApiData = profile => {
  const locations = normalizeLocationsApiData(profile.attributes.locations)
  const avatar = profile.attributes.avatar.data ? {
    id: profile.attributes.avatar.data?.id,
    url: profile.attributes.avatar.data?.attributes?.url,
    width: profile.attributes.avatar.data?.attributes?.width,
    height: profile.attributes.avatar.data?.attributes?.height,
    alt: `${profile.attributes.name}'s avatar`
  } : null
  const normalizedProfile = {
    id: profile.id,
    name: profile.attributes.name,
    email: profile.attributes.email,
    about: profile.attributes.about,
    website: profile.attributes.website,
    github: profile.attributes.github,
    stackoverflow: profile.attributes.stackoverflow,
    linkedin: profile.attributes.linkedin,
    twitter: profile.attributes.twitter,
    instagram: profile.attributes.instagram,
    locations,
    avatar,
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
