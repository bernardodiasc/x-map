/**
 * GeoJson
 * https://geojson.org/
 */
export const dataToGeoFeature = (data = {}) => ({
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: data.coordinates,
  },
  properties: data,
})

export const dataToGeoFeatureCollection = (data = []) => ({
  type: 'FeatureCollection',
  features: data.reduce((acc, cur) => cur.coordinates
    ? [...acc, dataToGeoFeature(cur)]
    : acc
  , []),
})

export const geoFeaturesToCollection = (features = {}) => ({
  type: 'FeatureCollection',
  features,
})

/**
 * DMS - Degrees, Minutes, Seconds
 * To be used in conjunction with https://github.com/exif-js/exif-js
 */
export const parseDMS = (gpsLat, gpsLatRef, gpsLong, gpsLongRef) => {
  let lat = convertDMSToDD(gpsLat[0], gpsLat[1], gpsLat[2], gpsLatRef)
  let lng = convertDMSToDD(gpsLong[0], gpsLong[1], gpsLong[2], gpsLongRef)
  return { lat, lng }
}

/**
 * DD - Decimal Degrees
 */
export const convertDMSToDD = (degrees, minutes, seconds, direction) => {
  let dd = degrees + (minutes / 60) + (seconds / (60 * 60))
  dd = parseFloat(dd)
  if (direction === 'S' || direction === 'W') {
    dd *= -1
  }
  return dd
}
