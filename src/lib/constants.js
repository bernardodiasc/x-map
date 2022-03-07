export const MODAL_IDS = {
  JOIN_SCREEN: 'JOIN_SCREEN',
  LOCATIONS_FORM: 'LOCATIONS_FORM',
  ACCOUNT_FORM: 'ACCOUNT_FORM',
}

export const ENDPOINTS = {
  PROFILES: `${process.env.NEXT_PUBLIC_API_URL}/api/profiles`,
  LOCATIONS: `${process.env.NEXT_PUBLIC_API_URL}/api/locations`,
  LOG_IN: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`,
  SIGN_UP: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`,
  GMAPS_GEOCODE: `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.NEXT_PUBLIC_GMAPS_API_KEY}`,
}
