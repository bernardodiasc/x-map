export const getLatestProfileLocation = locations => locations
  .reduce((acc, cur) => (acc.since > cur.since ? acc : cur))

// to do: move this method to locations domain context
export const translateApiDataToLocations = apiData => apiData?.data
  ? apiData.data.map(location => ({
      id: location.id,
      address: location.attributes.address,
      city: location.attributes.city,
      country: location.attributes.country,
      latitude: location.attributes.latitude,
      longitude: location.attributes.longitude,
      since: location.attributes.since,
      until: location.attributes.until,
      coordinates: [
        Number(location.attributes.latitude),
        Number(location.attributes.longitude),
      ]
    }))
  : undefined

export const translateApiDataToProfiles = apiData => apiData?.data
  ? apiData.data.map(profile => {
    const locations = translateApiDataToLocations(profile.attributes.locations)
    if (locations.length === 0) {
      return {
        id: profile.id,
        name: profile.attributes.name,
      }
    }
    const latestLocation = getLatestProfileLocation(locations)
    return {
      id: profile.id,
      name: profile.attributes.name,
      location: latestLocation,
      coordinates: latestLocation.coordinates,
    }
  })
  : undefined
