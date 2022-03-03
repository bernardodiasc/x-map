import { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

import useAuthContext from '@contexts/Auth'

import LocationForm from '@components/LocationForm'
import Form from '@components/Form'
import InputField from '@components/InputField'
import InputLabel from '@components/InputLabel'
import InputError from '@components/InputError'
import Button from '@components/Button'

import * as styles from './LocationsForm.module.css'
import useProfiles from '../../hooks/useProfiles/useProfiles'

// const PROFILES_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/api/profiles`

const LocationsForm = () => {
  const { register, handleSubmit, formState: { errors }, isSubmitting } = useForm()
  const { profile } = useAuthContext()
  const [apiError, setApiError] = useState()
  const [editing, setEditing] = useState()
  console.log(profile)

  const onSubmit = async ({ name }) => {
  //   setApiError()
  //   try {
  //     const { data: apiData } = await axios.put(`${PROFILES_ENDPOINT}/${profile.id}`, {
  //       data: {
  //         name,
  //       }
  //     })
  //     setProfile({
  //       id: apiData.data.id,
  //       name: apiData.data.attributes.name,
  //       email: apiData.data.attributes.email,
  //     })
  //   } catch (error) {
  //     console.error(error)
  //     setApiError(error?.response?.data?.error?.message)
  //   }
  }

  const handleEdit = locationId => () => {
    if (editing !== locationId) {
      // to do: confirm
      setEditing(locationId)
    }
  }

  const RenderLocationRow = location => (
    <div className={styles.row} onClick={handleEdit(location.id)}>
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
      {editing === location.id && (
        <div className={styles.edit}>
          <LocationForm location={location} />
        </div>
      )}
    </div>
  )

  return (
    <div className={styles.component}>
      {editing === 'new'
        ? <LocationForm />
        : <Button wide onClick={handleEdit('new')}>Add new location</Button>
      }
      {profile.locations.map(RenderLocationRow)}
    </div>
    // <Form
    //   title={`Hello ${profile.name}`}
    //   onSubmit={handleSubmit(onSubmit)}
    //   errorMessage={apiError}
    //   className={styles.component}
    // >
    //   <InputLabel title="Full name:">
    //     <InputField
    //       type="text"
    //       register={register("name", { required: true })}
    //       defaultValue={profile.name}
    //     />
    //     <InputError hasError={errors.name}>This field is required.</InputError>
    //   </InputLabel>
    //   <InputLabel>
    //     <Button type="submit" wide disabled={isSubmitting}>Save</Button>
    //   </InputLabel>
    // </Form>
  )
}

export default LocationsForm
