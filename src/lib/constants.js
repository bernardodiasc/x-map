export const MODAL_IDS = {
  JOIN_SCREEN: 'JOIN_SCREEN',
  PROFILE_FORM: 'PROFILE_FORM',
  LOCATIONS_MANAGER: 'LOCATIONS_MANAGER',
  EVENTS_MANAGER: 'EVENTS_MANAGER',
  FAQ: 'FAQ',
}

export const ENDPOINTS = {
  PROFILES: `${process.env.NEXT_PUBLIC_API_URL}/api/profiles`,
  LOCATIONS: `${process.env.NEXT_PUBLIC_API_URL}/api/locations`,
  EVENTS: `${process.env.NEXT_PUBLIC_API_URL}/api/events`,
  ATTENDEES: `${process.env.NEXT_PUBLIC_API_URL}/api/attendees`,
  FAQ: `${process.env.NEXT_PUBLIC_API_URL}/api/frequently-asked-questions`,
  FEATURE_FLAGS: `${process.env.NEXT_PUBLIC_API_URL}/api/feature-flags`,
  UPLOAD: `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
  LOG_IN: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`,
  SIGN_UP: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`,
  GMAPS_GEOCODE: 'https://maps.googleapis.com/maps/api/geocode/json',
  GMAPS_TIMEZONE: 'https://maps.googleapis.com/maps/api/timezone/json',
}

export const COLLECTIONS = {
  PROFILES: 'PROFILES',
  EVENTS: 'EVENTS',
}

export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const FORM_VALIDATION_ERROR_MESSAGE = 'There are invalid values in the form, please fix and try again.'
