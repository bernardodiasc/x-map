import useSWR from 'swr'

import { translateApiDataToProfiles } from './utils'

const PROFILES_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/api/profiles`

function useProfiles () {
  const { data, error } = useSWR(PROFILES_ENDPOINT)

  const profiles = translateApiDataToProfiles(data)

  return {
    profiles,
    error
  }
}

export default useProfiles
