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

const SIGN_UP_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`

const SignUpForm = () => {
  const [apiError, setApiError] = useState()
  const { logIn } = useAuthContext()
  const { register, handleSubmit, formState: { errors }, isSubmitting } = useForm()

  const onSignUp = async ({ email, password }) => {
    setApiError()
    try {
      const response = await axios.post(SIGN_UP_ENDPOINT, {
        username: email,
        email,
        password,
      })
      logIn(response.data)
    } catch (error) {
      console.error(error)
      setApiError(error.response.data.error.message)
    }
  }

  return (
    <Form
      title="Sign Up"
      // description="TBD: some description here..."
      onSubmit={handleSubmit(onSignUp)}
      errorMessage={apiError}
    >
      <InputLabel title="Email:">
        <InputField type="text" register={register("email", { required: true })} />
        <InputError hasError={errors.email}>This field is required.</InputError>
      </InputLabel>
      <InputLabel title="Password:">
        <InputField type="password" register={register("password", { required: true })} />
        <InputError hasError={errors.password}>This field is required.</InputError>
      </InputLabel>
      <InputLabel>
        <Button type="submit" wide disabled={isSubmitting}>Sign Up</Button>
      </InputLabel>
    </Form>
  )
}

export default SignUpForm