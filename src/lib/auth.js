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

export function checkAuth () {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`)
}
