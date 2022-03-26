import { useState, useCallback } from 'react'
import axios from 'axios'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'

import useAppContext from '@contexts/App'

import Form from '@components/Form'
import InputLabel from '@components/InputLabel'
import InputField from '@components/InputField'
import InputError from '@components/InputError'
import Button from '@components/Button'

import { normalizeEventApiData } from '@lib/events'
import { ENDPOINTS } from '@lib/constants'

import * as styles from './EventForm.module.css'

const createEventOption = event => ({
  value: event.id,
  label: event.title,
})

const EventForm = ({ event = {}, addLocation }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, control, setValue } = useForm()
  const { state: { collections: { events } }, actions: { refetchCollections } } = useAppContext()
  const [apiSuccess, setApiSuccess] = useState()
  const [apiError, setApiError] = useState()
  const [editingEvent, setEditingEvent] = useState(event)
  const [isNew, setIsNew] = useState(!event?.id)
  const [eventOptions, setEventOptions] = useState(events.map(createEventOption))

  const onSubmit = useCallback(async ({ title, info }) => {
    setApiSuccess()
    setApiError()

    const action = isNew ? {
      method: axios.post,
      endpoint: ENDPOINTS.EVENTS,
    } : {
      method: axios.put,
      endpoint: `${ENDPOINTS.EVENTS}/${editingEvent.id}`,
    }

    try {
      const { data: eventsApiData } = await action.method(action.endpoint, {
        data: {
          title,
          info,
        }
      })

      const updatedEvent = normalizeEventApiData(eventsApiData.data)
      const updatedEventOption = createEventOption(updatedEvent)
      if (isNew) {
        setEventOptions([...events, updatedEvent].map(createEventOption))
      } else {
        setEventOptions(events
          .reduce((acc, cur) => cur.id === updatedEvent.id
            ? [...acc, updatedEventOption]
            : [...acc, createEventOption(cur)]
          , [])
        )
      }
      setEditingEvent(updatedEvent)
      setApiSuccess(`The event was ${isNew ? 'created' : 'updated'}!`)
      setIsNew(false)
      refetchCollections()
    } catch (error) {
      console.error(error)
      setApiError(error?.response?.data?.error?.message)
    }
  }, [editingEvent, events, isNew, refetchCollections])

  const handleEventSelectorChange = option => {
    setApiSuccess()
    setApiError()
    if (option) {
      const event = events.find(event => event.id === option?.value)
      setEditingEvent(event)
      setIsNew(false)
      setValue('title', event.title)
      setValue('info', event.info)
    } else {
      setEditingEvent({})
      setIsNew(true)
      setValue('title', '')
      setValue('info', '')
    }
    setEventOptions(events.map(createEventOption))
  }

  return (
    <Form
      title={isNew ? 'Create new event' : 'Edit event'}
      onSubmit={handleSubmit(onSubmit)}
      successMessage={apiSuccess}
      errorMessage={apiError}
      className={styles.component}
    >
      <InputLabel title="Select an event to edit:">
        <Controller
          control={control}
          name="edit"
          render={({ field: { onChange, value, ref } }) => (
            <Select
              placeholder="Or leave blank to create new event."
              inputRef={ref}
              isClearable
              options={eventOptions}
              onChange={option => {
                onChange(option)
                handleEventSelectorChange(option)
              }}
              disabled={isSubmitting}
              value={eventOptions.find(option => option.value === value?.value)}
              maxMenuHeight={210}
            />
          )}
        />
      </InputLabel>
      <hr/>
      <InputLabel title="Title:" isRequired>
        <InputField
          register={register('title', { required: true })}
          defaultValue={editingEvent.title}
          disabled={isSubmitting}
        />
        <InputError hasError={errors.title}>This field is required.</InputError>
      </InputLabel>
      <InputLabel title="Informations:">
        <InputField
          register={register('info')}
          defaultValue={editingEvent.info}
          disabled={isSubmitting}
        />
      </InputLabel>
      <Button type="submit" wide disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save'}
      </Button>
      {!isNew && (
        <Button wide disabled={isSubmitting} onClick={addLocation(editingEvent)}>
          Add new location and date for this event
        </Button>
      )}
    </Form>
  )
}

export default EventForm
