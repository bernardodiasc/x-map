import { useState, useCallback } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

import useAuthContext from '@contexts/Auth'

import Form from '@components/Form'
import InputField from '@components/InputField'
import InputLabel from '@components/InputLabel'
import InputError from '@components/InputError'
import Button from '@components/Button'

import { normalizeLocationApiData } from '@lib/locations'
import { ENDPOINTS } from '@lib/constants'

import * as styles from './LocationForm.module.css'

const LocationForm = ({ locationId, toggleLocationFormModal }) => {
  const { register, handleSubmit, formState: { errors }, isSubmitting } = useForm()
  const { state: { profile }, actions: { setProfile } } = useAuthContext()
  const [apiError, setApiError] = useState()

  const getCoordinates = async ({ country, city, address }) => {
    const { data: { results } } = await axios.get(
      `${ENDPOINTS.GMAPS_GEOCODE}&address=${[country, city, address].join(' - ')}`,
      {
        transformRequest: (data, headers) => {
          delete headers.common['Authorization']
          return data
        }
      }
    )
    const { location } = results[0]?.geometry
    const coordinates = [location.lng, location.lat]
    return {
      longitude: location.lng,
      latitude: location.lat,
    }
  }

  const onSubmit = useCallback(async ({ country, city, address, since, until }) => {
    setApiError()

    const isNew = locationId === 'new'
    const action = isNew ? {
      method: axios.post,
      endpoint: ENDPOINTS.LOCATIONS,
    } : {
      method: axios.put,
      endpoint: `${ENDPOINTS.LOCATIONS}/${locationId}`,
    }

    const { latitude, longitude } = await getCoordinates({ country, city, address })

    try {
      const { data: apiData } = await action.method(action.endpoint, {
        data: {
          country,
          city,
          address,
          since: since !== '' ? since : undefined,
          until: until !== '' ? until : undefined,
          latitude: String(latitude),
          longitude: String(longitude),
          profile: profile.id,
        }
      })
      const locations = isNew
        ? [
          ...profile.locations,
          normalizeLocationApiData(apiData.data),
        ] : [
          ...profile.locations.map(location => location.id === apiData.data.id ? normalizeLocationApiData(apiData.data) : location)
        ]
      const updatedProfile = {
        ...profile,
        locations,
      }
      setProfile(updatedProfile)
      // to do: update 'profiles' collection
      toggleLocationFormModal(false)
    } catch (error) {
      console.error(error)
      setApiError(error?.response?.data?.error?.message)
    }
  }, [locationId, profile, setProfile, toggleLocationFormModal])

  const handleDiscardLocation = () => {
    toggleLocationFormModal(false)
  }

  const location = profile.locations.find(location => location.id === locationId) || {}

  return (
    <Form
      title={`Add location`}
      onSubmit={handleSubmit(onSubmit)}
      errorMessage={apiError}
      className={styles.component}
    >
      <InputLabel title="Country:">
        <InputField
          type="text"
          register={register("country", { required: true })}
          defaultValue={location.country}
          disabled={isSubmitting}
        />
        <InputError hasError={errors.country}>This field is required.</InputError>
      </InputLabel>
      <InputLabel title="City:">
        <InputField
          type="text"
          register={register("city")}
          defaultValue={location.city}
          disabled={isSubmitting}
        />
      </InputLabel>
      <InputLabel title="Address:">
        <InputField
          type="text"
          register={register("address")}
          defaultValue={location.address}
          disabled={isSubmitting}
        />
      </InputLabel>
      <InputLabel title="Since:">
        <InputField
          type="date"
          register={register("since")}
          defaultValue={location.since}
          disabled={isSubmitting}
        />
      </InputLabel>
      <InputLabel title="Until:">
        <InputField
          type="date"
          register={register("until")}
          defaultValue={location.until}
          disabled={isSubmitting}
        />
      </InputLabel>
      <Button type="submit" wide disabled={isSubmitting}>Save</Button>
      <Button type="button" wide disabled={isSubmitting} onClick={handleDiscardLocation}>Discard</Button>
    </Form>
  )
}

export default LocationForm
