export const getLatestProfileLocation = locations => locations
  .reduce((acc, cur) => (acc.attributes.since > cur.attributes.since ? acc : cur))

export const translateApiDataToProfiles = apiData => apiData?.data
  ? apiData.data.map(profile => {
    const locations = profile.attributes.locations.data
    if (locations.length === 0) {
      return {
        id: profile.id,
        name: profile.attributes.name,
      }
    }

    const latestLocation = getLatestProfileLocation(locations)
    const coordinates = [
      Number(latestLocation.attributes.latitude),
      Number(latestLocation.attributes.longitude),
    ]

    return {
      id: profile.id,
      name: profile.attributes.name,
      location: {
        id: latestLocation.id,
        address: latestLocation.attributes.address,
        city: latestLocation.attributes.city,
        country: latestLocation.attributes.country,
        createdAt: latestLocation.attributes.createdAt,
        latitude: latestLocation.attributes.latitude,
        longitude: latestLocation.attributes.longitude,
        since: latestLocation.attributes.since,
        until: latestLocation.attributes.until,
      },
      coordinates,
    }
  })
  : undefined
