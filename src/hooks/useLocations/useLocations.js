import { useState, useEffect } from 'react'
import axios from 'axios'
import qs from 'qs'

import useAuthContext from '@contexts/Auth'

import { normalizeLocationsApiData } from '@lib/locations'
import { ENDPOINTS } from '@lib/constants'

function useLocations () {
  const { state: { profile } } = useAuthContext()
  const [locations, setLocations] = useState(null)

  const loadProfileLocations = async () => {
    const queryLocations = qs.stringify({
      filters: {
        profile: profile.id,
      }
    })
    const { data } = await axios.get(`${ENDPOINTS.LOCATIONS}?${queryLocations}`)
    // to do: catch errors
    const locations = normalizeLocationsApiData(data)
    setLocations(locations)
  }

  // useEffect(() => {
  //   if (profile) {
  //     loadProfileLocations()
  //   }
  // }, [profile])

  return {
    locations,
  }
}

export default useLocations
