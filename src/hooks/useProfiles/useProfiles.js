import useSWR from 'swr'
import qs from 'qs'

import { translateApiDataToProfiles } from './utils'

const PROFILES_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/api/profiles`

function useProfiles () {
  const query = qs.stringify({ populate: 'locations' })
  const { data, error } = useSWR(`${PROFILES_ENDPOINT}?${query}`)

  // this is optimized for geojson map,
  // it should be a normalized version of API data instead,
  // the map version should be located on map domain (not ready yet)
  const profiles = translateApiDataToProfiles(data)

  return {
    profiles,
    error
  }
}

export default useProfiles
