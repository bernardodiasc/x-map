import useSWR from 'swr'

import { ENDPOINTS } from '@lib/constants'

function useFrequentlyAskedQuestions () {
  const { data, error } = useSWR(ENDPOINTS.FAQ)

  return {
    data: data?.data,
    error,
    isLoading: !data && !error,
  }
}

export default useFrequentlyAskedQuestions
