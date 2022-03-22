import { useState, useCallback } from 'react'

import useAuthContext from '@contexts/Auth'
import useAppContext from '@contexts/App'

import EventForm from '@components/EventForm'
import LocationForm from '@components/LocationForm'
import Modal from '@components/Modal'
import Button from '@components/Button'

import { getEventsByProfileId } from '@lib/events'

import * as styles from './EventsManager.module.css'

const EventsManager = () => {
  const { state: { profile } } = useAuthContext()
  const { state: { collections } } = useAppContext()
  const [editingEventId, setEditingEventId] = useState()
  const [eventFormModal, toggleEventFormModal] = useState(false)
  const [editingLocationId, setEditingLocationId] = useState()
  const [locationFormModal, toggleLocationFormModal] = useState(false)

  const handleEditEvent = useCallback(eventId => () => {
    setEditingEventId(eventId)
    toggleEventFormModal(true)
  }, [])

  const handleEditLocation = useCallback(locationId => () => {
    setEditingLocationId(locationId)
    toggleLocationFormModal(true)
  }, [])

  const events = getEventsByProfileId(collections.events, profile.id)

  const RenderLocationRow = location => {
    const title = [location.country]
    if (location.city) {
      title.push(location.city)
    }

    return (
      <div
        key={`event-location-${location.id}`}
        className={styles.row}
      >
        <h4 onClick={handleEditLocation(location.id)}>
          {title.join(' - ')}
        </h4>
        {location.address && (
          <p>{location.address}</p>
        )}
      </div>
    )
  }

  const RenderEventRow = event => (
    <div
      key={`event-${event.id}`}
      className={styles.row}
    >
      <h2 onClick={handleEditEvent(event.id)}>
        {event.title}
      </h2>
      {event.locations.map(RenderLocationRow)}
    </div>
  )

  const handleCloseEventFormModal = () => toggleEventFormModal(false)

  const handleCloseLocationFormModal = () => toggleLocationFormModal(false)

  return (
    <div className={styles.component}>
      <Button wide onClick={handleEditEvent()}>Add new event</Button>
      <br />
      {events.map(RenderEventRow)}
      {eventFormModal && (
        <Modal onClose={handleCloseEventFormModal}>
          <EventForm
            eventId={editingEventId}
            toggleEventFormModal={toggleEventFormModal}
          />
        </Modal>
      )}
      {locationFormModal && (
        <Modal onClose={handleCloseLocationFormModal}>
          <LocationForm
            locationId={editingLocationId}
            toggleLocationFormModal={toggleLocationFormModal}
          />
        </Modal>
      )}
    </div>
  )
}

export default EventsManager
