import { useState, useEffect } from 'react'
import axios from 'axios'
import qs from 'qs'

import AuthContext from './AuthContext'

import { translateApiDataToLocations } from '@hooks/useProfiles/utils'

import { getAuthToken, setAuthToken, initAuthHeader, checkAuth } from '@lib/auth'

const PROFILE_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/api/profiles`

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getAuthToken())
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [isLoadingProfile, setIsLoadingProfile] = useState(false)

  const loadProfile = async (email) => {
    setIsLoadingProfile(true)
    const queryProfile = qs.stringify({ filters: { email }, populate: 'locations' })
    const { data: profileData } = await axios.get(`${PROFILE_ENDPOINT}?${queryProfile}`)
    if (profileData?.data && profileData?.data[0]) {
      setProfile({
        id: profileData.data[0].id,
        name: profileData.data[0].attributes.name,
        email: profileData.data[0].attributes.email,
        locations: translateApiDataToLocations(profileData.data[0].attributes.locations),
      })
    }
    setIsLoadingProfile(false)
  }

  const logIn = async userData => {
    setAuthToken(userData.jwt)
    setToken(userData.jwt)
    setUser({
      id: userData.user.id,
      email: userData.user.email,
    })
    loadProfile(userData.user.email)
  }

  const logOut = () => {
    setAuthToken(null)
    setToken(null)
    setUser(null)
    setProfile(null)
  }

  useEffect(() => {
    const checkForExistingAuth = async () => {
      const savedToken = getAuthToken()
      if (!savedToken) {
        return
      }

      initAuthHeader(savedToken)
      try {
        const response = await checkAuth()
        if (response.status !== 200) {
          logOut()
          return
        }
        setToken(savedToken)
        setUser({
          id: response.data.id,
          email: response.data.email,
        })
        loadProfile(response.data.email)
      } catch (error) {
        console.error(error)
        logOut()
      }
    }

    checkForExistingAuth()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        profile,
        setProfile,
        isLoadingProfile,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
