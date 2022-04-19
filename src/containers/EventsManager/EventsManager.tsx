import { useState, useCallback } from 'react'

import useAuthContext from '@contexts/Auth'
import useAppContext from '@contexts/App'

import EventCard from '@components/custom/EventCard'
import EventLocationForm from '@containers/EventLocationForm'
import Modal from '@components/generic/Modal'
import Button from '@components/generic/Button'

import { getEventsByProfileId } from '@lib/events'

type Props = {
  handleCloseModal?: any, // TO DO: FIX THIS
  anotherModalVisibility?: any, // TO DO: FIX THIS
  toggleAnotherModalVisibility?: any, // TO DO: FIX THIS
  toggleHasUnsavedChanges?: any, // TO DO: FIX THIS
}

const EventsManager = ({
  handleCloseModal,
  anotherModalVisibility,
  toggleAnotherModalVisibility,
  toggleHasUnsavedChanges,
}: Props): JSX.Element => {
  const { state: { profile } } = useAuthContext()
  const { state: { collections } } = useAppContext()
  const [editingEvent, setEditingEvent] = useState()
  const [editingLocation, setEditingLocation] = useState()

  const events = getEventsByProfileId(collections.events, profile.id)

  const handleEditLocation = useCallback((event?: any, location?: any) => () => { // TO DO: FIX THIS
    setEditingEvent(event)
    setEditingLocation(location)
    toggleAnotherModalVisibility(true)
  }, [toggleAnotherModalVisibility])

  const renderEventRow = event => (
    <EventCard
      key={`event-${event.id}`}
      item={event}
      onLocationClick={handleEditLocation}
    />
  )

  return (
    <div>
      <Button wide onClick={handleEditLocation()}>Create new event</Button>
      {events.map(renderEventRow)}
      {anotherModalVisibility && (
        <Modal onClose={handleCloseModal}>
          <EventLocationForm
            event={editingEvent}
            location={editingLocation}
            toggleModal={toggleAnotherModalVisibility}
            toggleHasUnsavedChanges={toggleHasUnsavedChanges}
          />
        </Modal>
      )}
    </div>
  )
}

export default EventsManager
