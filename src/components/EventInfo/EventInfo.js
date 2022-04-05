import EventCard from '@components/EventInfo/EventCard'
import AccordionCards from '@components/AccordionCards'

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
      label='title'
    />
  )
}

export default EventInfo
