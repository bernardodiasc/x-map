export const getLatestProfileLocation = locations => locations
  .reduce((acc, cur) => (acc.since > cur.since ? acc : cur))

export const sortBySinceDate = (a, b) => new Date(b.since) - new Date(a.since)

export const normalizeLocationApiData = location => ({
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
})

export const normalizeLocationsApiData = apiData => apiData?.data
  ? apiData.data.map(normalizeLocationApiData).sort(sortBySinceDate)
  : undefined

