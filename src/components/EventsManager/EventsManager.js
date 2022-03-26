import { useState, useCallback } from 'react'

import useAuthContext from '@contexts/Auth'
import useAppContext from '@contexts/App'

import EventRow from './EventRow'
import LocationRow from './LocationRow'

import EventForm from '@components/EventForm'
import EventLocationForm from '@components/EventLocationForm'
import Modal from '@components/Modal'
import Button from '@components/Button'

import { getEventsByProfileId } from '@lib/events'
import { getLocationById } from '@lib/locations'

import * as styles from './EventsManager.module.css'

const EventsManager = () => {
  const { state: { profile } } = useAuthContext()
  const { state: { collections } } = useAppContext()
  const [editingEventId, setEditingEventId] = useState()
  const [editingEvent, setEditingEvent] = useState()
  const [eventFormModal, toggleEventFormModal] = useState(false)
  const [editingLocation, setEditingLocation] = useState()
  const [locationFormModal, toggleLocationFormModal] = useState(false)

  const events = getEventsByProfileId(collections.events, profile.id)

  const handleEditEvent = useCallback(event => () => {
    setEditingEvent(event)
    toggleEventFormModal(true)
  }, [])

  const handleEditLocation = useCallback((event, location) => () => {
    setEditingEvent(event)
    setEditingLocation(location)
    toggleLocationFormModal(true)
  }, [])


  const handleCloseEventFormModal = () => toggleEventFormModal(false)

  const handleCloseLocationFormModal = () => toggleLocationFormModal(false)

  const renderLocationRow = (event, location) => (
    <LocationRow
      key={`event-${event.id}-location-${location.id}`}
      event={event}
      location={location}
      handleEditLocation={handleEditLocation}
    />
  )

  const renderEventRow = event => (
    <EventRow
      key={`event-${event.id}`}
      event={event}
      handleEditEvent={handleEditEvent}
    >
      {event.locations.map(location => renderLocationRow(event, location))}
    </EventRow>
  )

  return (
    <div className={styles.component}>
      <Button wide onClick={handleEditEvent()}>Create or edit events</Button>
      {events.map(renderEventRow)}
      {eventFormModal && (
        <Modal onClose={handleCloseEventFormModal}>
          <EventForm
            event={editingEvent}
            toggleModal={toggleEventFormModal}
            addLocation={handleEditLocation}
          />
        </Modal>
      )}
      {locationFormModal && (
        <Modal onClose={handleCloseLocationFormModal}>
          <EventLocationForm
            event={editingEvent}
            location={editingLocation}
            toggleModal={toggleLocationFormModal}
          />
        </Modal>
      )}
    </div>
  )
}

export default EventsManager
