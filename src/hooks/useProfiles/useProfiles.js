import { useCallback, useState } from 'react'
import axios from 'axios'
import useSWR from 'swr'
import qs from 'qs'

import {
  normalizeProfilesApiData,
  normalizeProfileApiData,
} from '@lib/profiles'
import { ENDPOINTS } from '@lib/constants'

const queryProfilePopulate = {
  avatar: '*',
  locations: {
    fields: '*',
    filters: {
      event: {
        id: {
          $null: true
        }
      }
    }
  }
}

function useProfiles () {
  const queryProfile = qs.stringify({ populate: queryProfilePopulate })
  const { data, error, mutate } = useSWR(`${ENDPOINTS.PROFILES}?${queryProfile}`)

  const [profile, setProfile] = useState(null)
  const [isLoadingProfile, setIsLoadingProfile] = useState(false)
  const [isLoadedProfile, setIsLoadedProfile] = useState(false)

  const profiles = normalizeProfilesApiData(data)

  const loadProfile = useCallback(async (email) => {
    setIsLoadingProfile(true)
    const queryProfile = qs.stringify({ filters: { email }, populate: queryProfilePopulate })
    const { data: profileData } = await axios.get(`${ENDPOINTS.PROFILES}?${queryProfile}`)
    // to do: catch errors
    if (profileData?.data && profileData?.data[0]) {
      const profile = normalizeProfileApiData(profileData.data[0])
      setProfile(profile)
    }
    setIsLoadedProfile(true)
    setIsLoadingProfile(false)
  }, [])

  return {
    profile,
    setProfile,
    loadProfile,
    isLoadingProfile,
    isLoadedProfile,
    profiles,
    error,
    mutate,
  }
}

export default useProfiles
