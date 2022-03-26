import { useState, useCallback } from 'react'

import useAuthContext from '@contexts/Auth'
import useAppContext from '@contexts/App'

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

  const handleEditEvent = useCallback(event => () => {
    setEditingEvent(event)
    toggleEventFormModal(true)
  }, [])

  const handleEditLocation = useCallback((event, location) => () => {
    setEditingEvent(event)
    setEditingLocation(location)
    toggleLocationFormModal(true)
  }, [])

  const events = getEventsByProfileId(collections.events, profile.id)

  const RenderLocationRow = ({ event, location }) => {
    const title = [location.country]
    if (location.city) {
      title.push(location.city)
    }
    return (
      <div
        className={styles.row}
      >
        <h4 onClick={handleEditLocation(event, location)}>
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
      <h2 onClick={handleEditEvent(event)}>
        {event.title}
      </h2>
      {event.locations.map(location => (
        <RenderLocationRow
          key={`event-${event.id}-location-${location.id}`}
          event={event}
          location={location}
        />
      ))}
    </div>
  )

  const handleCloseEventFormModal = () => toggleEventFormModal(false)

  const handleCloseLocationFormModal = () => toggleLocationFormModal(false)

  return (
    <div className={styles.component}>
      <Button wide onClick={handleEditEvent()}>Create or edit events</Button>
      {events.map(RenderEventRow)}
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
