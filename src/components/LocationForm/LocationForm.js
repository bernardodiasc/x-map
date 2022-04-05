import { useState, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import size from 'lodash.size'

import useAuthContext from '@contexts/Auth'
import useAppContext from '@contexts/App'

import Form from '@components/Form'
import InputField from '@components/InputField'
import InputLabel from '@components/InputLabel'
import InputError from '@components/InputError'
import Button from '@components/Button'

import { normalizeLocationApiData, sortByStartDate, getLocationById } from '@lib/locations'
import { getGeocode, getTimezone } from '@lib/gmaps'
import { ENDPOINTS, FORM_VALIDATION_ERROR_MESSAGE } from '@lib/constants'

import * as styles from './LocationForm.module.css'

const LocationForm = ({ locationId, toggleLocationFormModal, toggleHasUnsavedChanges }) => {
  const { state: { profile }, actions: { setProfile } } = useAuthContext()
  const { state: { features }, actions: { refetchCollections } } = useAppContext()
  const [formSuccess, setFormSuccess] = useState()
  const [formError, setFormError] = useState()
  const [location, setLocation] = useState(getLocationById(profile.locations, locationId))

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
      dirtyFields,
    },
  } = useForm({
    defaultValues: {
      country: location.country || '',
      city: location.city || '',
      address: location.address || '',
      start: location.start || '',
      end: location.end || '',
    }
  })

  const isNew = !locationId && !location?.id

  const onSubmit = useCallback(async ({
    country,
    city,
    address,
    start,
    end,
  }) => {
    setFormSuccess()
    setFormError()

    const action = isNew ? {
      method: axios.post,
      endpoint: ENDPOINTS.LOCATIONS,
    } : {
      method: axios.put,
      endpoint: `${ENDPOINTS.LOCATIONS}/${locationId || location.id}`,
    }

    const { latitude, longitude } = await getGeocode({ country, city, address })

    if (!latitude || !longitude) {
      setFormError('Invalid location.')
      return
    }

    const timezone = await getTimezone({ latitude, longitude })

    const dataObj = {
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

    try {
      const { data: apiData } = await action.method(action.endpoint, {
        data: dataObj
      })
      const updatedLocation = normalizeLocationApiData(apiData.data)
      const locations = isNew
        ? [
          ...profile.locations,
          updatedLocation,
        ].sort(sortByStartDate)
        : [
          ...profile.locations.map(location =>
            location.id === apiData.data.id
              ? updatedLocation
              : location
          )
        ].sort(sortByStartDate)
      const updatedProfile = {
        ...profile,
        locations,
      }
      setProfile(updatedProfile)
      setLocation(updatedLocation)
      reset({
        country: updatedLocation.country,
        city: updatedLocation.city,
        address: updatedLocation.address,
        start: updatedLocation.start,
        end: updatedLocation.end,
      })
      setFormSuccess('Your location was updated!')
      refetchCollections()
      toggleLocationFormModal && toggleLocationFormModal(false)
    } catch (error) {
      console.error(error)
      setFormError(error?.response?.data?.error?.message)
    }
  }, [isNew, location, locationId, profile, refetchCollections, setProfile, toggleLocationFormModal, reset])

  const handleDeleteLocation = useCallback(async () => {
    setFormError()
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
      setFormError(error?.response?.data?.error?.message)
    }
  }, [locationId, profile, refetchCollections, setProfile, toggleLocationFormModal])

  const handleDiscardLocation = () => {
    toggleLocationFormModal(false)
  }

  const hasValidationErrors = Boolean(size(errors))
  useEffect(() => {
    if (hasValidationErrors) {
      setFormSuccess()
      setFormError(FORM_VALIDATION_ERROR_MESSAGE)
    } else {
      setFormError()
    }
  }, [hasValidationErrors])

  const hasUnsavedChanges = Boolean(size(dirtyFields))
  useEffect(() => {
    toggleHasUnsavedChanges(hasUnsavedChanges)
    if (hasUnsavedChanges) {
      setFormSuccess()
    }
  }, [hasUnsavedChanges, toggleHasUnsavedChanges])

  return (
    <Form
      title="Update your location"
      onSubmit={handleSubmit(onSubmit)}
      successMessage={formSuccess}
      errorMessage={formError}
      className={styles.component}
      control={(
        <>
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
        </>
      )}
    >
      <InputLabel title="Country:" isRequired>
        <InputField
          register={register('country', { required: true })}
          disabled={isSubmitting}
          invalid={errors.country}
        />
        <InputError hasError={errors.country}>This field is required.</InputError>
      </InputLabel>
      <InputLabel title="City:">
        <InputField
          register={register('city')}
          disabled={isSubmitting}
        />
      </InputLabel>
      <InputLabel title="Address:">
        <InputField
          register={register('address')}
          disabled={isSubmitting}
        />
      </InputLabel>
      {features?.TRAVELS && (
        <>
          <InputLabel title="Start:">
            <InputField
              type="date"
              register={register('start')}
              disabled={isSubmitting}
            />
          </InputLabel>
          <InputLabel title="End:">
            <InputField
              type="date"
              register={register('end')}
              disabled={isSubmitting}
            />
          </InputLabel>
        </>
      )}
    </Form>
  )
}

export default LocationForm
