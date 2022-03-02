export const getLatestProfileLocation = profile => profile.attributes.locations.data
  .reduce((a, b) => (a.attributes.since > b.attributes.since ? a : b))

export const translateApiDataToProfiles = data => data
  ? data.data.map(profile => {
    const latestLocation = getLatestProfileLocation(profile)
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
