import axios from 'axios'
import qs from 'qs'
import ct from 'countries-and-timezones'

import { ENDPOINTS } from '@lib/constants'

const gmapsGet = (endpoint, queryString) => axios.get(
  `${endpoint}?${queryString}`,
  {
    transformRequest: (data, headers) => {
      delete headers.common['Authorization']
      return data
    }
  }
)

export const getGeocode = async ({ country, city, address }) => {
  try {
    const queryString = qs.stringify({
      key: process.env.NEXT_PUBLIC_GMAPS_API_KEY,
      address: [country, city, address].join(' - '),
    })
    const { data: { results } } = await gmapsGet(ENDPOINTS.GMAPS_GEOCODE, queryString)
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
  } catch (error) {
    console.error(error)
    return {}
  }
}

export const getTimezone = async ({ latitude, longitude }) => {
  try {
    const queryString = qs.stringify({
      key: process.env.NEXT_PUBLIC_GMAPS_API_KEY,
      location: `${latitude},${longitude}`,
      timestamp: Date.now() / 1000,
    })
    const { data: { timeZoneId } } = await gmapsGet(ENDPOINTS.GMAPS_TIMEZONE, queryString)
    const { utcOffsetStr } = ct.getTimezone(timeZoneId)
    return `UTC ${utcOffsetStr}`
  } catch (error) {
    console.error(error)
    return ''
  }
}
