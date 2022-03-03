import { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

import useAuthContext from '@contexts/Auth'

import Form from '@components/Form'
import InputField from '@components/InputField'
import InputLabel from '@components/InputLabel'
import InputError from '@components/InputError'
import Button from '@components/Button'

import * as styles from './AccountForm.module.css'

const PROFILES_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/api/profiles`

const AccountForm = () => {
  const { register, handleSubmit, formState: { errors }, isSubmitting } = useForm()
  const { profile, setProfile } = useAuthContext()
  const [apiError, setApiError] = useState()

  const onSubmit = async ({ name }) => {
    setApiError()
    try {
      const { data: apiData } = await axios.put(`${PROFILES_ENDPOINT}/${profile.id}`, {
        data: {
          name,
        }
      })
      setProfile({
        id: apiData.data.id,
        name: apiData.data.attributes.name,
      })
    } catch (error) {
      console.error(error)
      setApiError(error?.response?.data?.error?.message)
    }
  }

  return (
    <Form
      title={`Hello ${profile.name}`}
      onSubmit={handleSubmit(onSubmit)}
      errorMessage={apiError}
      className={styles.component}
    >
      <InputLabel title="Full name:">
        <InputField
          type="text"
          register={register("name", { required: true })}
          defaultValue={profile.name}
        />
        <InputError hasError={errors.name}>This field is required.</InputError>
      </InputLabel>
      <InputLabel>
        <Button type="submit" wide disabled={isSubmitting}>Save</Button>
      </InputLabel>
    </Form>
  )
}

export default AccountForm
