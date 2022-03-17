export const MODAL_IDS = {
  JOIN_SCREEN: 'JOIN_SCREEN',
  LOCATIONS_FORM: 'LOCATIONS_FORM',
  PROFILE_FORM: 'PROFILE_FORM',
  FAQ: 'FAQ',
}

export const ENDPOINTS = {
  PROFILES: `${process.env.NEXT_PUBLIC_API_URL}/api/profiles`,
  LOCATIONS: `${process.env.NEXT_PUBLIC_API_URL}/api/locations`,
  EVENTS: `${process.env.NEXT_PUBLIC_API_URL}/api/events`,
  ATTENDEES: `${process.env.NEXT_PUBLIC_API_URL}/api/attendees`,
  FAQ: `${process.env.NEXT_PUBLIC_API_URL}/api/frequently-asked-questions`,
  FEATURE_FLAGS: `${process.env.NEXT_PUBLIC_API_URL}/api/feature-flags`,
  LOG_IN: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`,
  SIGN_UP: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`,
  GMAPS_GEOCODE: `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.NEXT_PUBLIC_GMAPS_API_KEY}`,
}

export const COLLECTIONS = {
  PROFILES: 'PROFILES',
  EVENTS: 'EVENTS',
}
