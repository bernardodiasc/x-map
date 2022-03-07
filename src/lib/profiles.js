import { normalizeLocationsApiData } from '@lib/locations'

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

// export const translateApiDataToProfiles = apiData => apiData?.data
//   ? apiData.data.map(profile => {
//     // const locations = translateApiDataToLocations(profile.attributes.locations)
//     // if (locations.length === 0) {
//     //   return {
//     //     id: profile.id,
//     //     name: profile.attributes.name,
//     //   }
//     // }
//     // const latestLocation = getLatestProfileLocation(locations)
//     return {
//       id: profile.id,
//       name: profile.attributes.name,
//       // location: latestLocation,
//       // coordinates: latestLocation.coordinates,
//     }
//   })
//   : undefined
