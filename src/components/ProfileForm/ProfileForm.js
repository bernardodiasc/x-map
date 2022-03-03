import { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

import useAuthContext from '@contexts/Auth'

import Form from '@components/Form'
import InputField from '@components/InputField'
import InputLabel from '@components/InputLabel'
import InputError from '@components/InputError'
import Button from '@components/Button'

import { setAuthToken } from '@lib/auth'

// const SIGN_UP_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`

const ProfileForm = () => {
  const [apiError, setApiError] = useState()
  const { setProfile } = useAuthContext()
  const { register, handleSubmit, formState: { errors }, isSubmitting } = useForm()

  const onSignUp = async ({ name }) => {
    // setApiError()
    // try {
    //   const response = await axios.post(SIGN_UP_ENDPOINT, {
    //     username: email,
    //     email,
    //     password,
    //   })
    //   const { data, status, headers } = response
    //   logIn(data)
    // } catch (error) {
    //   console.error(error)
    //   setApiError(error.response.data.error.message)
    // }
  }

  return (
    <Form
      title="Welcome!"
      description="Please fill up some more info before proceed :)"
      onSubmit={handleSubmit(onSignUp)}
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
