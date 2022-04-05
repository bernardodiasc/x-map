import { normalizeLocationsApiData, sortByStartDate, compareCoordinates } from '@lib/locations'

export const normalizeEventApiData = event => {
  const locations = normalizeLocationsApiData(event.attributes.locations)
  const normalizedEvent = {
    id: event.id,
    title: event.attributes.title,
    locations,
  }
  return normalizedEvent
}

export const normalizeEventsApiData = apiData => apiData?.data
  ? apiData.data.map(normalizeEventApiData)
  : undefined

export const getEventsWithCoordinatesFromAllLocations = (events = []) => events
  .reduce((acc, cur) => {
    if (cur?.locations?.length === 0) {
      return acc
    }
    return [
      ...acc,
      ...cur.locations.map(location => ({
        id: cur.id,
        title: cur.title,
        location: location,
        coordinates: location.coordinates,
      }))
    ]
  }, [])
  .sort((a, b) => sortByStartDate(a.location, b.location))

export const getEventsGroupedByCategory = (events = []) => events
  .reduce((acc, cur) => {
    const existingCategory = acc.find(category => category.id === cur.id)
    if (existingCategory) {
      return acc
    }
    const sameCategoryEvents = events.filter(category => category.id === cur.id)
    const eventByCategory = {
      id: sameCategoryEvents[0].id,
      title: sameCategoryEvents[0].title,
      locations: sameCategoryEvents.map(event => event.location),
    }
    return [...acc, eventByCategory]
  }, [])

export const getEventsByCoordinates = (events, coordinates) => {
  const eventsFromAllLocations = getEventsWithCoordinatesFromAllLocations(events)
  const eventsByCoordinates = eventsFromAllLocations
    .reduce((acc, cur) => {
      const hasSameCoordinates = compareCoordinates(cur.location, coordinates)
      if (!hasSameCoordinates) {
        return acc
      }
      return [...acc, cur]
    }, [])
  return getEventsGroupedByCategory(eventsByCoordinates)
}

export const getEventsByProfileId = (events, profileId) => events.reduce((acc, cur) => {
  const locations = cur.locations.filter(location => location.profile === profileId).sort(sortByStartDate)
  return locations.length > 0 ? [...acc, { ...cur, locations }] : acc
}, [])
