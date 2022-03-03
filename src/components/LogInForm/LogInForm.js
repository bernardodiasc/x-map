import { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

import useAuthContext from '@contexts/Auth'

import Form from '@components/Form'
import InputField from '@components/InputField'
import InputLabel from '@components/InputLabel'
import InputError from '@components/InputError'
import Button from '@components/Button'

const LOG_IN_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`

const LogInForm = () => {
  const { register, handleSubmit, formState: { errors }, isSubmitting } = useForm()
  const { logIn } = useAuthContext()
  const [apiError, setApiError] = useState()

  const onSubmit = async ({ identifier, password }) => {
    setApiError()
    try {
      const { data } = await axios.post(LOG_IN_ENDPOINT, {
        identifier,
        password,
      })
      logIn(data)
    } catch (error) {
      console.error(error)
      setApiError(error?.response?.data?.error?.message)
    }
  }

  return (
    <Form
      title="Log In"
      onSubmit={handleSubmit(onSubmit)}
      errorMessage={apiError}
    >
      <InputLabel title="Email:">
        <InputField type="text" register={register("identifier", { required: true })} />
        <InputError hasError={errors.identifier}>This field is required.</InputError>
      </InputLabel>
      <InputLabel title="Password:">
        <InputField type="password" register={register("password", { required: true })} />
        <InputError hasError={errors.password}>This field is required.</InputError>
      </InputLabel>
      <InputLabel>
        <Button type="submit" wide disabled={isSubmitting}>Log In</Button>
      </InputLabel>
    </Form>
  )
}

export default LogInForm
