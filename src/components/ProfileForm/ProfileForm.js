import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import useAuthContext from '@contexts/Auth'

import Form from '@components/Form'
import InputField from '@components/InputField'
import InputLabel from '@components/InputLabel'
import InputError from '@components/InputError'
import Button from '@components/Button'

import { normalizeProfileApiData } from '@lib/profiles'

const PROFILES_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/api/profiles`

const ProfileForm = () => {
  const { register, handleSubmit, formState: { errors }, isSubmitting } = useForm()
  const { state: { user }, actions: { setProfile } } = useAuthContext()
  const [apiError, setApiError] = useState()

  const onSubmit = useCallback(async ({ name }) => {
    setApiError()
    try {
      const { data: apiData } = await axios.post(PROFILES_ENDPOINT, {
        data: {
          name,
          email: user.email,
        }
      })
      const newProfile = normalizeProfileApiData(apiData.data)
      setProfile(newProfile)
    } catch (error) {
      console.error(error)
      setApiError(error?.response?.data?.error?.message)
    }
  }, [setProfile, user.email])

  return (
    <Form
      title="Welcome!"
      description="Please fill up some more info before proceed :)"
      onSubmit={handleSubmit(onSubmit)}
      errorMessage={apiError}
    >
      <InputLabel title="Full name:">
        <InputField type="text" register={register("name", { required: true })} />
        <InputError hasError={errors.name}>This field is required.</InputError>
      </InputLabel>
      <InputLabel>
        <Button type="submit" wide disabled={isSubmitting}>Save</Button>
      </InputLabel>
    </Form>
  )
}

export default ProfileForm
