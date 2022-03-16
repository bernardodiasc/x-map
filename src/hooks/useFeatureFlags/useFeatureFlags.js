import useSWR from 'swr'

import { normalizeEventsApiData } from '@lib/events'
import { ENDPOINTS } from '@lib/constants'

function useFeatureFlags () {
  const { data, error } = useSWR(ENDPOINTS.FEATURE_FLAGS)

  const features = data?.data.reduce((acc, cur) => ({
    ...acc,
    [cur.attributes.name]: cur.attributes.enabled
  }), {})

  return {
    features,
    error,
  }
}

export default useFeatureFlags
