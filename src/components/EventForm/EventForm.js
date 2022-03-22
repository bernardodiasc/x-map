import { useState, useCallback } from 'react'
import axios from 'axios'
import { useForm, Controller } from 'react-hook-form'
import CreatableSelect from 'react-select/creatable'

import useAuthContext from '@contexts/Auth'
import useAppContext from '@contexts/App'

import Form from '@components/Form'
import InputLabel from '@components/InputLabel'
import InputField from '@components/InputField'
import InputError from '@components/InputError'
import Button from '@components/Button'

import { getCoordinates } from '@lib/geocode'
import { ENDPOINTS } from '@lib/constants'

import * as styles from './EventForm.module.css'

const createEventOption = event => ({
  value: event.id,
  label: event.title,
})

const EventForm = ({ eventId, toggleEventFormModal }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, control, setValue } = useForm()
  const { state: { profile }, actions: { setProfile } } = useAuthContext()
  const { state: { collections: { events } }, actions: { refetchCollections } } = useAppContext()
  const [apiSuccess, setApiSuccess] = useState()
  const [apiError, setApiError] = useState()
  const [event, setEvent] = useState(events.find(event => event.id === eventId) || {})
  const [isNew, setIsNew] = useState(!eventId && !event?.id)
  const [eventOptions, setEventOptions] = useState(events.map(createEventOption))

  const onSubmit = useCallback(async ({
    title,
    info,
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
      endpoint: ENDPOINTS.EVENTS,
    } : {
      method: axios.put,
      endpoint: `${ENDPOINTS.EVENTS}/${eventId || event.id}`,
    }

    let latitude
    let longitude

    try {
      if (isNew) {
        const coordinates = await getCoordinates({ country, city, address })
        latitude = coordinates.latitude
        longitude = coordinates.longitude
        if (!latitude || !longitude) {
          setApiError('Invalid location.')
          return
        }
      }

      const { data: eventsApiData } = await action.method(action.endpoint, {
        data: {
          title,
          info,
        }
      })

      if (isNew) {
        const { data: locationsApiData } = await axios.post(ENDPOINTS.LOCATIONS, {
          data: {
            country,
            city,
            address,
            since: since !== '' ? since : undefined,
            until: until !== '' ? until : undefined,
            latitude: String(latitude),
            longitude: String(longitude),
            profile: profile.id,
            event: eventsApiData.data.id,
          }
        })
      }

      setApiSuccess('Your event was updated!')
      refetchCollections()
      toggleEventFormModal(false)
    } catch (error) {
      console.error(error)
      setApiError(error?.response?.data?.error?.message)
    }
  }, [event, eventId, isNew, profile, refetchCollections, toggleEventFormModal])

  const handleDeleteEvent = useCallback(async () => {
    setApiError()
    try {
      const locations = event.locations.filter(location => location.profile === profile.id)
      Promise.all(locations.map(async location => {
        await axios.delete(`${ENDPOINTS.LOCATIONS}/${location.id}`)
      }))
      refetchCollections()
      toggleEventFormModal(false)
    } catch (error) {
      console.error(error)
      setApiError(error?.response?.data?.error?.message)
    }
  }, [event, profile, refetchCollections, toggleEventFormModal])

  const handleEventSelectorChange = option => {
    if (option) {
      const event = events.find(event => event.id === option?.value)
      setEvent(event)
      setIsNew(false)
      setValue('info', event.info)
    } else {
      setEvent({})
      setIsNew(true)
      setValue('info', '')
    }
    setEventOptions(events.map(createEventOption))
  }

  const handleEventSelectorCreate = value => {
    setEvent({})
    setIsNew(true)
    setValue('info', '')
    setEventOptions([
      ...events.map(createEventOption),
      { value, label: value }
    ])
  }

  return (
    <Form
      title={isNew ? 'Create new event' : 'Update event'}
      onSubmit={handleSubmit(onSubmit)}
      successMessage={apiSuccess}
      errorMessage={apiError}
      className={styles.component}
    >
      <InputLabel title="Title:" isRequired>
        <Controller
          control={control}
          name="title"
          rules={{ required: true }}
          render={({ field: { onChange, value, name, ref } }) => (
            <CreatableSelect
              placeholder="Type to create a new event or select an existing one..."
              inputRef={ref}
              isClearable
              options={eventOptions}
              onChange={option => {
                onChange(option)
                handleEventSelectorChange(option)
              }}
              onCreateOption={value => {
                onChange(value)
                handleEventSelectorCreate(value)
              }}
              disabled={isSubmitting}
              value={eventOptions.find(option => option.value === (value || value?.value || event?.id))}
            />
          )}
        />
        <InputError hasError={errors.title}>This field is required.</InputError>
      </InputLabel>
      <InputLabel title="Informations:">
        <InputField
          register={register('info')}
          defaultValue={event.info}
          disabled={isSubmitting}
        />
      </InputLabel>

      {isNew && (
        <>
          <InputLabel title="Country:" isRequired>
            <InputField
              register={register('country', { required: true })}
              disabled={isSubmitting}
            />
            <InputError hasError={errors.country}>This field is required.</InputError>
          </InputLabel>
          <InputLabel title="City:" isRequired>
            <InputField
              register={register('city', { required: true })}
              disabled={isSubmitting}
            />
            <InputError hasError={errors.country}>This field is required.</InputError>
          </InputLabel>
          <InputLabel title="Address:">
            <InputField
              register={register('address')}
              disabled={isSubmitting}
            />
          </InputLabel>
        </>
      )}

      <Button type="submit" wide disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save'}
      </Button>
      {!isNew && (
        <Button wide disabled={isSubmitting} onClick={handleDeleteEvent}>
          Delete
        </Button>
      )}
    </Form>
  )
}

export default EventForm
