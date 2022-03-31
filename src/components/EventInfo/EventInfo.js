import EventCard from '@components/EventInfo/EventCard'
import AccordionCards from '@components/AccordionCards'

import useAppContext from '@contexts/App'
import useMapContext from '@contexts/Map'

import { getRecordsByCoordinates } from '@lib/locations'

const EventInfo = () => {
  const { state: { collections } } = useAppContext()
  const { state: { selectedCoordinates } } = useMapContext()

  if (!selectedCoordinates) {
    return null
  }

  const selectedEvents = getRecordsByCoordinates(collections.events, selectedCoordinates)

  return (
    <AccordionCards
      Card={EventCard}
      data={selectedEvents}
      label='title'
    />
  )
}

export default EventInfo
