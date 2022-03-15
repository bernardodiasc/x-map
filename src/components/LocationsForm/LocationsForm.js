import { useState, useCallback, useEffect } from 'react'

import useAuthContext from '@contexts/Auth'

import LocationForm from '@components/LocationForm'
import Modal from '@components/Modal'
import Button from '@components/Button'

import { sortBySinceDate } from '@lib/locations'

import * as styles from './LocationsForm.module.css'

const LocationsForm = () => {
  const { state: { profile } } = useAuthContext()
  const [editingLocationId, setEditingLocationId] = useState()
  const [locationFormModal, toggleLocationFormModal] = useState(false)

  const handleEditLocation = useCallback(locationId => () => {
    setEditingLocationId(locationId)
    toggleLocationFormModal(true)
  }, [])

  const RenderLocationRow = location => (
    <div className={styles.row} onClick={handleEditLocation(location.id)}>
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
      <Button wide onClick={handleEditLocation('new')}>Add new location</Button>
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

export default LocationsForm
