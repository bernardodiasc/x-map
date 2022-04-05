import { useState, useCallback } from 'react'

import useAuthContext from '@contexts/Auth'
import useAppContext from '@contexts/App'

import EventLocationCard from '@components/EventLocationCard'
import EventLocationForm from '@components/EventLocationForm'
import Modal from '@components/Modal'
import Button from '@components/Button'

import { getEventsByProfileId } from '@lib/events'

import * as styles from './EventsManager.module.css'

const EventsManager = ({
  handleCloseModal,
  anotherModalVisibility,
  toggleAnotherModalVisibility,
  toggleHasUnsavedChanges,
}) => {
  const { state: { profile } } = useAuthContext()
  const { state: { collections } } = useAppContext()
  const [editingEvent, setEditingEvent] = useState()
  const [editingLocation, setEditingLocation] = useState()

  const events = getEventsByProfileId(collections.events, profile.id)

  const handleEditLocation = useCallback((event, location) => () => {
    setEditingEvent(event)
    setEditingLocation(location)
    toggleAnotherModalVisibility(true)
  }, [toggleAnotherModalVisibility])

  const renderEventLocationCard = (event, location) => (
    <EventLocationCard
      key={`event-${event.id}-location-${location.id}`}
      event={event}
      location={location}
      onClick={handleEditLocation(event, location)}
    />
  )

  const renderEventRow = event => (
    <div key={`event-${event.id}`}>
      <div className={styles.title}>
        {event.title}
      </div>
      {event.locations.map(location => renderEventLocationCard(event, location))}
    </div>
  )

  return (
    <div className={styles.component}>
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
