import { useState } from 'react'
import axios from 'axios'

import AuthContext from './AuthContext'

import { getAuthToken, setAuthToken } from '@lib/auth'

const PROFILE_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/api/profiles`

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getAuthToken())
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)

  const logIn = async userData => {
    setAuthToken(userData.jwt)
    setToken(userData.jwt)
    setUser({
      id: userData.user.id,
      email: userData.user.email,
    })

    const { data: profileData } = await axios.get(`${PROFILE_ENDPOINT}/user/${userData.user.id}`)
    if (profileData?.data && profileData?.data[0]) {
      setProfile({
        id: profileData.data[0].id,
        name: profileData.data[0].attributes.name,
      })
    }
  }

  const logOut = () => {
    setAuthToken(null)
    setToken(null)
    setUser(null)
    setProfile(null)
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        profile,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
