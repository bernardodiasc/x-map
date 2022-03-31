import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import useAuthContext from '@contexts/Auth'

import Form from '@components/Form'
import InputField from '@components/InputField'
import InputLabel from '@components/InputLabel'
import InputError from '@components/InputError'
import Button from '@components/Button'

import { ENDPOINTS, EMAIL_REGEX } from '@lib/constants'

const SignUpForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const { actions: { logIn } } = useAuthContext()
  const [apiError, setApiError] = useState()

  const onSubmit = useCallback(async ({ email, password }) => {
    setApiError()
    try {
      const { data } = await axios.post(ENDPOINTS.SIGN_UP, {
        username: email,
        email,
        password,
      })
      logIn(data)
    } catch (error) {
      console.error(error)
      setApiError(error?.response?.data?.error?.message)
    }
  }, [logIn])

  return (
    <Form
      title="Sign Up"
      onSubmit={handleSubmit(onSubmit)}
      errorMessage={apiError}
    >
      <InputLabel title="Email:">
        <InputField
          register={register('email', {
            required: 'The email is required.',
            pattern: {
              value: EMAIL_REGEX,
              message: 'The email must be valid.'
            }
          })}
          disabled={isSubmitting}
        />
        <InputError hasError={errors.email}>{errors.email?.message}</InputError>
      </InputLabel>
      <InputLabel title="Password:">
        <InputField
          type="password"
          register={register('password', {
            required: 'The password is required.',
            minLength: {
              value: 6,
              message: 'The password must be at least 6 characters.'
            }
          })}
          disabled={isSubmitting}
        />
        <InputError hasError={errors.password}>{errors.password?.message}</InputError>
      </InputLabel>
      <InputLabel>
        <Button type="submit" wide disabled={isSubmitting}>
          {isSubmitting ? 'Signing up...' : 'Sign Up'}
        </Button>
      </InputLabel>
    </Form>
  )
}

export default SignUpForm
