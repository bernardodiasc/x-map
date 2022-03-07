import { useState, useCallback } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

import useAuthContext from '@contexts/Auth'

import Form from '@components/Form'
import InputField from '@components/InputField'
import InputLabel from '@components/InputLabel'
import InputError from '@components/InputError'
import Button from '@components/Button'

// import { translateApiDataToLocation } from '@lib/profiles'

import * as styles from './LocationForm.module.css'

const LOCATIONS_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/api/locations`

const LocationForm = ({ locationId, toggleLocationFormModal }) => {
  const { register, handleSubmit, formState: { errors }, isSubmitting } = useForm()
  const { state: { profile }, actions: { setProfile } } = useAuthContext()
  const [apiError, setApiError] = useState()

  const onSubmit = useCallback(async ({ country, city, address, since, until }) => {
    setApiError()
    if (locationId === 'new') {
      try {
        const { data: apiData } = await axios.post(LOCATIONS_ENDPOINT, {
          data: {
            country,
            city,
            address,
            // since,
            // until,
            latitude: "-45.5638792",
            longitude: "-23.024996",
            profile: profile.id,
          }
        })
        console.log(locationId, apiData)
        // setProfile({
        //   id: apiData.data.id,
        //   name: apiData.data.attributes.name,
        //   email: apiData.data.attributes.email,
        //   locations: {
        //     ...profile.locations,
        //     // ...translateApiDataToLocation(apiData),
        //   }
        // })
      } catch (error) {
        console.error(error)
        setApiError(error?.response?.data?.error?.message)
      }
    } else {
      try {
        const { data: apiData } = await axios.put(`${LOCATIONS_ENDPOINT}/${locationId}`, {
          data: {
            country,
            city,
            address,
            // since,
            // until,
            profile: profile.id,
          }
        })
        console.log(locationId, apiData)
        // setProfile({
        //   id: apiData.data.id,
        //   name: apiData.data.attributes.name,
        //   email: apiData.data.attributes.email,
        // })
      } catch (error) {
        console.error(error)
        setApiError(error?.response?.data?.error?.message)
      }
    }
  }, [locationId, profile.id])

  // address: "Rua Abissínia, 82"
  // city: "Taubaté"
  // coordinates: (2) [-45.5638792, -23.024996]
  // country: "Brazil"
  // id: 1
  // latitude: "-45.5638792"
  // longitude: "-23.024996"
  // since: "2021-03-01"
  // until: null

  const handleDiscardLocation = () => {
    toggleLocationFormModal(false)
  }

  const location = profile.locations.find(location => location.id === locationId) || {}

  console.log(profile)
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
        />
        <InputError hasError={errors.country}>This field is required.</InputError>
      </InputLabel>
      <InputLabel title="City:">
        <InputField
          type="text"
          register={register("city")}
          defaultValue={location.city}
        />
      </InputLabel>
      <InputLabel title="Address:">
        <InputField
          type="text"
          register={register("address")}
          defaultValue={location.address}
        />
      </InputLabel>
      <InputLabel title="Since:">
        <InputField
          type="date"
          register={register("since")}
          defaultValue={location.since}
        />
      </InputLabel>
      <InputLabel title="Until:">
        <InputField
          type="date"
          register={register("until")}
          defaultValue={location.until}
        />
      </InputLabel>
      <InputLabel>
        <Button type="submit" wide disabled={isSubmitting}>Save</Button>
      <InputLabel>
      </InputLabel>
        <Button type="button" wide disabled={isSubmitting} onClick={handleDiscardLocation}>Discard</Button>
      </InputLabel>
    </Form>
  )
}

export default LocationForm
