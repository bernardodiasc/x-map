import { useState, useEffect, useCallback } from 'react'

import AuthContext from './AuthContext'

import useProfiles from '@hooks/useProfiles'

import { getAuthToken, setAuthToken, initAuthHeader, checkAuth } from '@lib/auth'

const AuthProvider = ({ children }) => {
  const {
    profile,
    setProfile,
    loadProfile,
    isLoadingProfile,
    isLoadedProfile,
  } = useProfiles()
  const [token, setToken] = useState(getAuthToken())
  const [user, setUser] = useState(null)

  const logIn = useCallback(async userData => {
    setAuthToken(userData.jwt)
    setToken(userData.jwt)
    setUser({
      id: userData.user.id,
      email: userData.user.email,
    })
    loadProfile(userData.user.email)
  }, [loadProfile])

  const logOut = useCallback(() => {
    setAuthToken(null)
    setToken(null)
    setUser(null)
    setProfile(null)
  }, [setProfile])

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
        logIn({
          jwt: savedToken,
          user: {
            id: response.data.id,
            email: response.data.email,
          }
        })
      } catch (error) {
        console.error(error)
        logOut()
      }
    }

    checkForExistingAuth()
  }, [loadProfile, logIn, logOut])

  return (
    <AuthContext.Provider
      value={{
        state: {
          token,
          user,
          profile,
          isLoadingProfile,
          isLoadedProfile,
        },
        actions: {
          logIn,
          logOut,
          setProfile,
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
