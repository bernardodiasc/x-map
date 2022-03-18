import { useState, useCallback } from 'react'

import useAuthContext from '@contexts/Auth'
import useAppContext from '@contexts/App'

import LocationForm from '@components/LocationForm'
import Modal from '@components/Modal'
import Button from '@components/Button'

import { sortBySinceDate, getLatestLocation } from '@lib/locations'

import * as styles from './LocationsForm.module.css'

const LocationsForm = () => {
  const { state: { profile } } = useAuthContext()
  const { state: { features }, actions: { toggleVisibleModal } } = useAppContext()
  const [editingLocationId, setEditingLocationId] = useState(getLatestLocation(profile.locations)?.id)
  const [locationFormModal, toggleLocationFormModal] = useState(false)

  const handleEditLocation = useCallback(locationId => () => {
    setEditingLocationId(locationId)
    toggleLocationFormModal(true)
  }, [])

  if (features?.TRAVELS) {
    const RenderLocationRow = location => (
      <div key={`location-${location.id}`} className={styles.row} onClick={handleEditLocation(location.id)}>
        <div className={styles.info}>
          <div className={styles.address}>
            {location.city} - {location.country}
            <br/>
            {location.address}
          </div>
          <div className={styles.date}>
            Since: {location.since}
            <br/>
            {location.until && `Until: ${location.until}`}
          </div>
        </div>
      </div>
    )

    return (
      <div className={styles.component}>
        <Button wide onClick={handleEditLocation()}>Add new location</Button>
        <br />
        {profile.locations.map(RenderLocationRow)}
        {locationFormModal && (
          <Modal>
            <LocationForm
              locationId={editingLocationId}
              toggleLocationFormModal={toggleLocationFormModal}
            />
          </Modal>
        )}
      </div>
    )
  }

  return (
    <LocationForm
      locationId={editingLocationId}
      toggleLocationFormModal={toggleVisibleModal}
    />
  )
}

export default LocationsForm
