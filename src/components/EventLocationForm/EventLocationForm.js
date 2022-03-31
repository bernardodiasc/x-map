import { useState, useCallback } from 'react'
import axios from 'axios'
import { useForm, Controller } from 'react-hook-form'
import Creatable from 'react-select/creatable'

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

const createEventOption = event => ({
  value: event.id,
  label: event.title,
})

const EventLocationForm = ({ event = {}, location = {}, toggleModal }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, control } = useForm()
  const { state: { profile } } = useAuthContext()
  const { state: { collections: { events } }, actions: { refetchCollections } } = useAppContext()
  const [apiSuccess, setApiSuccess] = useState()
  const [apiError, setApiError] = useState()
  const [editingLocation, setEditingLocation] = useState(location)
  const [isNew, setIsNew] = useState(!location?.id)
  const [eventId, setEventId] = useState(event?.id)
  const [eventOptions, setEventOptions] = useState(events.map(createEventOption))

  const onSubmit = useCallback(async ({
    title,
    description,
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
      })

      const updatedLocation = normalizeLocationApiData(locationsApiData.data)
      setEditingLocation(updatedLocation)
      setApiSuccess(`The event was ${isNew ? 'created' : 'updated'}!`)
      setIsNew(false)
      refetchCollections()
    } catch (error) {
      console.error(error)
      setApiError(error?.response?.data?.error?.message)
    }
  }, [eventId, isNew, editingLocation, profile, refetchCollections])

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

  const handleCategorySelectorChange = option => {
    setApiSuccess()
    setApiError()
    setEventId(option?.value)
  }

  const handleCategorySelectorCreate = async value => {
    setApiSuccess()
    setApiError()

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
      setApiError(error?.response?.data?.error?.message)
    }
  }

  return (
    <Form
      title={isNew ? 'Create new event' : 'Update the event'}
      onSubmit={handleSubmit(onSubmit)}
      successMessage={apiSuccess}
      errorMessage={apiError}
      className={styles.component}
    >
      <InputLabel title="Title:" isRequired>
        <InputField
          register={register('title', { required: true })}
          defaultValue={editingLocation.title}
          disabled={isSubmitting}
        />
        <InputError hasError={errors.title}>This field is required.</InputError>
      </InputLabel>
      <InputLabel title="Description:">
        <InputField
          register={register('description')}
          defaultValue={editingLocation.description}
          disabled={isSubmitting}
        />
      </InputLabel>

      <InputLabel title="Category:" isRequired>
        <Controller
          control={control}
          name="category"
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
              value={eventOptions.find(option => option.value === eventId)}
              maxMenuHeight={210}
            />
          )}
        />
        <InputError hasError={errors.category}>This field is required.</InputError>
      </InputLabel>

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
        <InputError hasError={errors.city}>This field is required.</InputError>
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
          register={register('start', { required: true })}
          defaultValue={editingLocation.start}
          disabled={isSubmitting}
        />
        <InputError hasError={errors.start}>This field is required.</InputError>
      </InputLabel>
      <InputLabel title="End:">
        <InputField
          type="date"
          register={register('end')}
          defaultValue={editingLocation.end}
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
