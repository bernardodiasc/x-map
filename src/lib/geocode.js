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
  const { location } = results[0]?.geometry
  return {
    longitude: location.lng,
    latitude: location.lat,
  }
}
