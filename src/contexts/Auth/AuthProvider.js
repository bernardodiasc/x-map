import { useState } from 'react'
import axios from 'axios'
import qs from 'qs'

import AuthContext from './AuthContext'

import { getAuthToken, setAuthToken } from '@lib/auth'

const PROFILE_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/api/profiles`

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getAuthToken())
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)

  const logIn = async data => {
    setAuthToken(data.jwt)
    setToken(data.jwt)
    setUser(data.user)

    const query = qs.stringify({
      filters: {
        where: {
          user: data.user.id
        }
      }
    })

    try {
      const response = await axios.get(`${PROFILE_ENDPOINT}?${query}`)
      const { data, status, headers } = response
      console.log(data)
    } catch (error) {
      console.error(error)
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
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
