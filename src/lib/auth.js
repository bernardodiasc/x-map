import axios from 'axios'

import { getLocalStorage } from './utils'

const localStorage = getLocalStorage()

const AUTH_TOKEN = 'xWorldMap_authToken'

export function getAuthToken () {
  return localStorage[AUTH_TOKEN]
}

export function initAuthHeader (token) {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common.Authorization
  }
}

export function setAuthToken (token) {
  if (token) {
    localStorage.setItem(AUTH_TOKEN, token)
  } else {
    localStorage.removeItem(AUTH_TOKEN)
  }

  initAuthHeader(token)
}

export function checkAuth (token) {
  return axios.get('/users/me')
}

export async function signUp ({ password, email, fullName }) {
  try {
    const response = await axios.post('/auth/local/register', {
      password,
      email,
      fullName
    })

    const { data, status, headers } = response

    setAuthToken(data.jwt)

    return {
      data: {
        user: data.user
      },
      headers,
      status
    }
  } catch (error) {
    return handleAPIError(error)
  }
}

export async function signIn ({ identifier, password }) {
  try {
    const response = await axios.post('/auth/local', {
      identifier,
      password
    })

    const { data, status, headers } = response

    // Ensure User is of "Authenticated" role
    const userRole = data && data.user && data.user.role
    if (!isAuthenticatedUser(userRole.type)) {
      throw APIError.invalidCredentials()
    }

    setAuthToken(data.jwt)

    return {
      data: {
        user: data.user
      },
      headers,
      status
    }
  } catch (error) {
    return handleAPIError(error)
  }
}

export function signOut () {
  setAuthToken(null)
}

export async function resetPassword ({ password, passwordConfirmation, code }) {
  try {
    const response = await axios.post('/auth/reset-password', {
      password,
      passwordConfirmation,
      code
    })

    const { data, status, headers } = response

    // TODO: we can sign the user in at this point.
    if (data.jwt) {
      data.ok = true
    }

    return {
      data,
      headers,
      status
    }
  } catch (error) {
    return handleAPIError(error)
  }
}

