import { useState, useCallback } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

import useAuthContext from '@contexts/Auth'
import useAppContext from '@contexts/App'

import Form from '@components/Form'
import InputField from '@components/InputField'
import InputLabel from '@components/InputLabel'
import InputError from '@components/InputError'
import Button from '@components/Button'

import { normalizeLocationApiData } from '@lib/locations'
import { getCoordinates } from '@lib/geocode'
import { ENDPOINTS } from '@lib/constants'

import * as styles from './EventLocationForm.module.css'

const EventLocationForm = ({ event = {}, location = {}, toggleModal }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const { state: { profile } } = useAuthContext()
  const { actions: { refetchCollections } } = useAppContext()
  const [apiSuccess, setApiSuccess] = useState()
  const [apiError, setApiError] = useState()
  const [editingLocation, setEditingLocation] = useState(location)
  const [isNew, setIsNew] = useState(!location?.id)

  const onSubmit = useCallback(async ({
    country,
    city,
    address,
    since,
    until,
  }) => {
    setApiSuccess()
    setApiError()

    const action = isNew ? {
      method: axios.post,
      endpoint: ENDPOINTS.LOCATIONS,
    } : {
      method: axios.put,
      endpoint: `${ENDPOINTS.LOCATIONS}/${editingLocation.id}`,
    }

    const { latitude, longitude } = await getCoordinates({ country, city, address })

    if (!latitude || !longitude) {
      setApiError('Invalid location.')
      return
    }

    try {
      const { data: locationsApiData } = await action.method(action.endpoint, {
        data: {
          country,
          city,
          address,
          since: since !== '' ? since : undefined,
          until: until !== '' ? until : undefined,
          latitude: String(latitude),
          longitude: String(longitude),
          profile: profile.id,
          event: event.id,
        }
      })

      const updatedLocation = normalizeLocationApiData(locationsApiData.data)
      setEditingLocation(updatedLocation)
      setApiSuccess(`The location was ${isNew ? 'created' : 'updated'}!`)
      setIsNew(false)
      refetchCollections()
    } catch (error) {
      console.error(error)
      setApiError(error?.response?.data?.error?.message)
    }
  }, [event, isNew, editingLocation, profile, refetchCollections])

  const handleDeleteLocation = useCallback(async () => {
    setApiError()
    try {
      await axios.delete(`${ENDPOINTS.LOCATIONS}/${editingLocation.id}`)
      refetchCollections()
      toggleModal && toggleModal(false)
    } catch (error) {
      console.error(error)
      setApiError(error?.response?.data?.error?.message)
    }
  }, [editingLocation, refetchCollections, toggleModal])

  return (
    <Form
      title={isNew ? 'Create new location and date' : 'Update the location and date'}
      onSubmit={handleSubmit(onSubmit)}
      successMessage={apiSuccess}
      errorMessage={apiError}
      className={styles.component}
    >
      <InputLabel title="Country:" isRequired>
        <InputField
          register={register('country', { required: true })}
          defaultValue={editingLocation.country}
          disabled={isSubmitting}
        />
        <InputError hasError={errors.country}>This field is required.</InputError>
      </InputLabel>
      <InputLabel title="City:" isRequired>
        <InputField
          register={register('city', { required: true })}
          defaultValue={editingLocation.city}
          disabled={isSubmitting}
        />
        <InputError hasError={errors.country}>This field is required.</InputError>
      </InputLabel>
      <InputLabel title="Address:">
        <InputField
          register={register('address')}
          defaultValue={editingLocation.address}
          disabled={isSubmitting}
        />
      </InputLabel>
      <InputLabel title="Start:" isRequired>
        <InputField
          type="date"
          register={register('since', { required: true })}
          defaultValue={editingLocation.since}
          disabled={isSubmitting}
        />
        <InputError hasError={errors.since}>This field is required.</InputError>
      </InputLabel>
      <InputLabel title="End:">
        <InputField
          type="date"
          register={register('until')}
          defaultValue={editingLocation.until}
          disabled={isSubmitting}
        />
      </InputLabel>
      <Button type="submit" wide disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save'}
      </Button>
      {!isNew && (
        <Button wide disabled={isSubmitting} onClick={handleDeleteLocation}>
          Delete
        </Button>
      )}
    </Form>
  )
}

export default EventLocationForm
