import axios from 'axios'

import { ENDPOINTS } from '@lib/constants'

export const getCoordinates = async ({ country, city, address }) => {
  const { data: { results } } = await axios.get(
    `${ENDPOINTS.GMAPS_GEOCODE}&address=${[country, city, address].join(' - ')}`,
    {
      transformRequest: (data, headers) => {
        delete headers.common['Authorization']
        return data
      }
    }
  )
  if (results.length === 0) {
    return {
      longitude: undefined,
      latitude: undefined,
    }
  }
  const { address_components = [], geometry = {} } = results[0] || {}
  const { location } = geometry
  const geocodeCountry = address_components
    .find(address => address.types.includes('country') && address.types.includes('political'))
  const geocodeCity = address_components
    .find(address => address.types.includes('locality') && address.types.includes('political'))
  console.log(results, geocodeCountry, geocodeCity)
  // TO DO:
  // - return official values for country, city and address
  // - replace user-input with the official values
  return {
    longitude: location.lng,
    latitude: location.lat,
    country: geocodeCountry?.long_name,
    city: geocodeCity?.long_name,
  }
}
