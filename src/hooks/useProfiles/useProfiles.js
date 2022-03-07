import { useCallback, useState } from 'react'
import axios from 'axios'
import useSWR from 'swr'
import qs from 'qs'

import {
  normalizeProfilesApiData,
  normalizeProfileApiData,
} from '@lib/profiles'

const PROFILES_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/api/profiles`

function useProfiles () {
  const { data, error } = useSWR(PROFILES_ENDPOINT)

  const [profile, setProfile] = useState(null)
  const [isLoadingProfile, setIsLoadingProfile] = useState(false)
  const [isLoadedProfile, setIsLoadedProfile] = useState(false)

  const profiles = normalizeProfilesApiData(data)

  const loadProfile = useCallback(async (email) => {
    setIsLoadingProfile(true)
    const queryProfile = qs.stringify({ filters: { email } })
    const { data: profileData } = await axios.get(`${PROFILES_ENDPOINT}?${queryProfile}`)
    if (profileData?.data && profileData?.data[0]) {
      const profile = normalizeProfileApiData(profileData.data[0])
      setProfile(profile)
      setIsLoadedProfile(true)
    }
    setIsLoadingProfile(false)
  }, [])

  return {
    profile,
    setProfile,
    loadProfile,
    isLoadingProfile,
    isLoadedProfile,
    profiles,
    error
  }
}

export default useProfiles
