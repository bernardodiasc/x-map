import useSWR from 'swr'
import qs from 'qs'

import { normalizeEventsApiData } from '@lib/events'
import { ENDPOINTS } from '@lib/constants'

function useProfiles () {
  const queryProfile = qs.stringify({
    populate: {
      locations: {
        populate: {
          profile: {
            fields: ['id']
          },
          attendees: {
            populate: {
              profile: {
                fields: ['id']
              }
            }
          }
        }
      }
    }
  })
  const { data, error, mutate } = useSWR(`${ENDPOINTS.EVENTS}?${queryProfile}`)

  const events = normalizeEventsApiData(data)

  return {
    events,
    error,
    mutate,
  }
}

export default useProfiles
