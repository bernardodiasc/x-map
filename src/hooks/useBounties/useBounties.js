import useSWR from 'swr'
import qs from 'qs'

import { normalizeBountiesApiData } from '@lib/bounties'
import { ENDPOINTS } from '@lib/constants'

function useProfiles () {
  const queryProfile = qs.stringify({
    populate: { pictures: '*' },
  })
  const { data, error, mutate } = useSWR(`${ENDPOINTS.BOUNTIES}?${queryProfile}`)

  const bounties = normalizeBountiesApiData(data)

  return {
    bounties,
    error,
    mutate,
  }
}

export default useProfiles
