import { useState, useCallback, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import size from 'lodash.size'
import Creatable from 'react-select/creatable'

import useAuthContext from '@contexts/Auth'
import useAppContext from '@contexts/App'

import Form from '@components/Form'
import InputField from '@components/InputField'
import InputLabel from '@components/InputLabel'
import InputError from '@components/InputError'
import Button from '@components/Button'

import { normalizeLocationApiData } from '@lib/locations'
import { getGeocode } from '@lib/gmaps'
import { ENDPOINTS, FORM_VALIDATION_ERROR_MESSAGE } from '@lib/constants'

import * as styles from './EventLocationForm.module.css'

const createEventOption = event => ({
  value: event.id,
  label: event.title,
})

const EventLocationForm = ({
  event = {},
  location = {},
  toggleModal,
  toggleHasUnsavedChanges,
}) => {
  const { state: { profile } } = useAuthContext()
  const { state: { collections: { events } }, actions: { refetchCollections } } = useAppContext()
  const [formSuccess, setFormSuccess] = useState()
  const [formError, setFormError] = useState()
  const [editingLocation, setEditingLocation] = useState(location)
  const [isNew, setIsNew] = useState(!location?.id)
  const [eventId, setEventId] = useState(event?.id)
  const [eventOptions, setEventOptions] = useState(events.map(createEventOption))

  const category = eventOptions.find(option => option.value === eventId) || null

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: {
      errors,
      isSubmitting,
      dirtyFields,
    },
  } = useForm({
    defaultValues: {
      title: editingLocation.title || '',
      description: editingLocation.description || '',
      country: editingLocation.country || '',
      city: editingLocation.city || '',
      address: editingLocation.address || '',
      start: editingLocation.start || '',
      end: editingLocation.end || '',
      category,
    }
  })

  const onSubmit = useCallback(async ({
    title,
    description,
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
      endpoint: `${ENDPOINTS.LOCATIONS}/${editingLocation.id}`,
    }

    const { latitude, longitude } = await getGeocode({ country, city, address })

    if (!latitude || !longitude) {
      setFormError('Invalid location.')
      return
    }

    const dataObj = {
      title,
      description,
      country,
      city,
      address,
      start: start !== '' ? start : undefined,
      end: end !== '' ? end : undefined,
      latitude: String(latitude),
      longitude: String(longitude),
      profile: profile.id,
      category: eventId,
      event: true,
    }

    try {
      const { data: locationsApiData } = await action.method(action.endpoint, {
        data: dataObj
      })

      const updatedLocation = normalizeLocationApiData(locationsApiData.data)
      setEditingLocation(updatedLocation)
      reset({
        title: updatedLocation.title,
        description: updatedLocation.description,
        country: updatedLocation.country,
        city: updatedLocation.city,
        address: updatedLocation.address,
        start: updatedLocation.start,
        end: updatedLocation.end,
      })
      setFormSuccess(`The event was ${isNew ? 'created' : 'updated'}!`)
      setIsNew(false)
      refetchCollections()
    } catch (error) {
      console.error(error)
      setFormError(error?.response?.data?.error?.message)
    }
  }, [eventId, isNew, editingLocation, profile, refetchCollections, reset])

  const handleDeleteLocation = useCallback(async () => {
    setFormError()
    try {
      await axios.delete(`${ENDPOINTS.LOCATIONS}/${editingLocation.id}`)
      refetchCollections()
      toggleModal && toggleModal(false)
    } catch (error) {
      console.error(error)
      setFormError(error?.response?.data?.error?.message)
    }
  }, [editingLocation, refetchCollections, toggleModal])

  const handleCategorySelectorChange = option => {
    setFormSuccess()
    setFormError()
    setEventId(option?.value)
  }

  const handleCategorySelectorCreate = async value => {
    setFormSuccess()
    setFormError()

    try {
      const { data: eventsApiData } = await axios.post(ENDPOINTS.EVENTS, {
        data: { title: value }
      })
      const newEvent = {
        id: eventsApiData.data.id,
        title: eventsApiData.data.attributes.title,
      }
      setEventOptions([
        ...eventOptions,
        createEventOption(newEvent)
      ])
      setEventId(newEvent.id)
    } catch (error) {
      console.error(error)
      setFormError(error?.response?.data?.error?.message)
    }
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
      title={isNew ? 'Create new event' : 'Update the event'}
      onSubmit={handleSubmit(onSubmit)}
      successMessage={formSuccess}
      errorMessage={formError}
      className={styles.component}
      control={(
        <>
          <Button type="submit" wide disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
          {!isNew && (
            <Button wide disabled={isSubmitting} onClick={handleDeleteLocation}>
              Delete
            </Button>
          )}
        </>
      )}
    >
      <InputLabel title="Title:" isRequired>
        <InputField
          register={register('title', { required: true })}
          disabled={isSubmitting}
          invalid={errors.title}
        />
        <InputError hasError={errors.title}>This field is required.</InputError>
      </InputLabel>
      <InputLabel title="Description:">
        <InputField
          register={register('description')}
          disabled={isSubmitting}
        />
      </InputLabel>

      <InputLabel title="Category:" isRequired>
        <Controller
          control={control}
          name="category"
          rules={{ required: true }}
          render={({ field: { onChange, ref } }) => (
            <Creatable
              placeholder="Type to create new or select from the list..."
              inputRef={ref}
              isClearable
              options={eventOptions}
              onChange={option => {
                onChange(option)
                handleCategorySelectorChange(option)
              }}
              onCreateOption={option => {
                onChange(option)
                handleCategorySelectorCreate(option)
              }}
              disabled={isSubmitting}
              value={category}
              maxMenuHeight={210}
            />
          )}
        />
        <InputError hasError={errors.category}>This field is required.</InputError>
      </InputLabel>

      <InputLabel title="Country:" isRequired>
        <InputField
          register={register('country', { required: true })}
          disabled={isSubmitting}
          invalid={errors.country}
        />
        <InputError hasError={errors.country}>This field is required.</InputError>
      </InputLabel>
      <InputLabel title="City:" isRequired>
        <InputField
          register={register('city', { required: true })}
          disabled={isSubmitting}
          invalid={errors.city}
        />
        <InputError hasError={errors.city}>This field is required.</InputError>
      </InputLabel>
      <InputLabel title="Address:">
        <InputField
          register={register('address')}
          disabled={isSubmitting}
        />
      </InputLabel>
      <InputLabel title="Start:" isRequired>
        <InputField
          type="date"
          register={register('start', { required: true })}
          disabled={isSubmitting}
          invalid={errors.start}
        />
        <InputError hasError={errors.start}>This field is required.</InputError>
      </InputLabel>
      <InputLabel title="End:">
        <InputField
          type="date"
          register={register('end')}
          disabled={isSubmitting}
        />
      </InputLabel>
    </Form>
  )
}

export default EventLocationForm
