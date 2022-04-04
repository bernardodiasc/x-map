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

import { normalizeLocationApiData, sortByStartDate, getLocationById } from '@lib/locations'
import { getGeocode, getTimezone } from '@lib/gmaps'
import { ENDPOINTS } from '@lib/constants'

import * as styles from './LocationForm.module.css'

const LocationForm = ({ locationId, toggleLocationFormModal }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const { state: { profile }, actions: { setProfile } } = useAuthContext()
  const { state: { features }, actions: { refetchCollections } } = useAppContext()
  const [apiSuccess, setApiSuccess] = useState()
  const [apiError, setApiError] = useState()
  const [location, setLocation] = useState(getLocationById(profile.locations, locationId))

  const isNew = !locationId && !location?.id

  const onSubmit = useCallback(async ({
    country,
    city,
    address,
    start,
    end,
  }) => {
    setApiSuccess()
    setApiError()

    const action = isNew ? {
      method: axios.post,
      endpoint: ENDPOINTS.LOCATIONS,
    } : {
      method: axios.put,
      endpoint: `${ENDPOINTS.LOCATIONS}/${locationId || location.id}`,
    }

    const { latitude, longitude } = await getGeocode({ country, city, address })

    if (!latitude || !longitude) {
      setApiError('Invalid location.')
      return
    }

    const timezone = await getTimezone({ latitude, longitude })

    try {
      const { data: apiData } = await action.method(action.endpoint, {
        data: {
          country,
          city,
          address,
          timezone,
          start: start !== '' ? start : undefined,
          end: end !== '' ? end : undefined,
          latitude: String(latitude),
          longitude: String(longitude),
          profile: profile.id,
        }
      })
      const locations = isNew
        ? [
          ...profile.locations,
          normalizeLocationApiData(apiData.data),
        ].sort(sortByStartDate)
        : [
          ...profile.locations.map(location =>
            location.id === apiData.data.id
              ? normalizeLocationApiData(apiData.data)
              : location
          )
        ].sort(sortByStartDate)
      const updatedProfile = {
        ...profile,
        locations,
      }
      setProfile(updatedProfile)
      setLocation(normalizeLocationApiData(apiData.data))
      setApiSuccess('Your location was updated!')
      refetchCollections()
      toggleLocationFormModal && toggleLocationFormModal(false)
    } catch (error) {
      console.error(error)
      setApiError(error?.response?.data?.error?.message)
    }
  }, [isNew, location.id, locationId, profile, refetchCollections, setProfile, toggleLocationFormModal])

  const handleDeleteLocation = useCallback(async () => {
    setApiError()
    try {
      await axios.delete(`${ENDPOINTS.LOCATIONS}/${locationId}`)
      const updatedProfile = {
        ...profile,
        locations: [
          ...profile.locations.filter(location => location.id !== locationId)
        ],
      }
      setProfile(updatedProfile)
      refetchCollections()
      toggleLocationFormModal(false)
    } catch (error) {
      console.error(error)
      setApiError(error?.response?.data?.error?.message)
    }
  }, [locationId, profile, refetchCollections, setProfile, toggleLocationFormModal])

  const handleDiscardLocation = () => {
    toggleLocationFormModal(false)
  }

  return (
    <Form
      title="Update your location"
      onSubmit={handleSubmit(onSubmit)}
      successMessage={apiSuccess}
      errorMessage={apiError}
      className={styles.component}
    >
      <InputLabel title="Country:" isRequired>
        <InputField
          register={register('country', { required: true })}
          defaultValue={location.country}
          disabled={isSubmitting}
        />
        <InputError hasError={errors.country}>This field is required.</InputError>
      </InputLabel>
      <InputLabel title="City:">
        <InputField
          register={register('city')}
          defaultValue={location.city}
          disabled={isSubmitting}
        />
      </InputLabel>
      <InputLabel title="Address:">
        <InputField
          register={register('address')}
          defaultValue={location.address}
          disabled={isSubmitting}
        />
      </InputLabel>
      {features?.TRAVELS && (
        <>
          <InputLabel title="Start:">
            <InputField
              type="date"
              register={register('start')}
              defaultValue={location.start}
              disabled={isSubmitting}
            />
          </InputLabel>
          <InputLabel title="End:">
            <InputField
              type="date"
              register={register('end')}
              defaultValue={location.end}
              disabled={isSubmitting}
            />
          </InputLabel>
        </>
      )}
      <Button type="submit" wide disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save'}
      </Button>
      {features?.TRAVELS && (
        <>
          {!isNew && (
            <Button wide disabled={isSubmitting} onClick={handleDeleteLocation}>
              Delete
            </Button>
          )}
          <Button wide disabled={isSubmitting} onClick={handleDiscardLocation}>
            Discard
          </Button>
        </>
      )}
    </Form>
  )
}

export default LocationForm
