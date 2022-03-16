import useSWR from 'swr'
import qs from 'qs'

import { normalizeEventsApiData } from '@lib/events'
import { ENDPOINTS } from '@lib/constants'

function useProfiles () {
  const queryProfile = qs.stringify({
    populate: {
      locations: {
        populate: {
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
  const { data, error } = useSWR(`${ENDPOINTS.EVENTS}?${queryProfile}`)

  const events = normalizeEventsApiData(data)

  return {
    events,
    error,
  }
}

export default useProfiles
