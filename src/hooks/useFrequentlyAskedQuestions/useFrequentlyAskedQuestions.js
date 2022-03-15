import useSWR from 'swr'
import qs from 'qs'

import { ENDPOINTS } from '@lib/constants'

function useFrequentlyAskedQuestions () {
  const queryProfile = qs.stringify({ sort: 'order' })
  const { data, error } = useSWR(`${ENDPOINTS.FAQ}?${queryProfile}`)

  return {
    data: data?.data,
    error,
    isLoading: !data && !error,
  }
}

export default useFrequentlyAskedQuestions
