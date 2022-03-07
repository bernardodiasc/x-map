import { useCallback, useState } from 'react'
import useSWR from 'swr'
import qs from 'qs'

import { normalizeLocationsApiData } from '@lib/locations'

const LOCATIONS_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/api/locations`

function useLocations () {
  const queryLocations = qs.stringify({
    populate: {
      profile: {
        fields: ['id', 'name'],
      },
    }
  })
  const { data, error } = useSWR(`${LOCATIONS_ENDPOINT}?${queryLocations}`)

  const locations = normalizeLocationsApiData(data)

  return {
    locations,
    error,
  }
}

export default useLocations
