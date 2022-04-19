import EventCard from '@components/custom/EventCard'
import AccordionCards from '@components/custom/CardList'

import useAppContext from '@contexts/App'
import useMapContext from '@contexts/Map'

import { getEventsByCoordinates } from '@lib/events'

const EventInfo = () => {
  const { state: { collections } } = useAppContext()
  const { state: { selectedCoordinates } } = useMapContext()

  if (!selectedCoordinates) {
    return null
  }

  const selectedEvents = getEventsByCoordinates(collections.events, selectedCoordinates)

  return (
    <AccordionCards
      Card={EventCard}
      data={selectedEvents}
    />
  )
}

export default EventInfo
