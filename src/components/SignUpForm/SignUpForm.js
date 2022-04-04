import { useState, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import size from 'lodash.size'

import useAuthContext from '@contexts/Auth'

import Form from '@components/Form'
import InputField from '@components/InputField'
import InputLabel from '@components/InputLabel'
import InputError from '@components/InputError'
import Button from '@components/Button'

import { ENDPOINTS, EMAIL_REGEX, FORM_VALIDATION_ERROR_MESSAGE } from '@lib/constants'

const SignUpForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const { actions: { logIn } } = useAuthContext()
  const [formError, setFormError] = useState()

  const onSubmit = useCallback(async ({ email, password }) => {
    setFormError()
    try {
      const { data } = await axios.post(ENDPOINTS.SIGN_UP, {
        username: email,
        email,
        password,
      })
      logIn(data)
    } catch (error) {
      console.error(error)
      setFormError(error?.response?.data?.error?.message)
    }
  }, [logIn])

  const hasValidationErrors = Boolean(size(errors))
  useEffect(() => {
    if (hasValidationErrors) {
      setFormError(FORM_VALIDATION_ERROR_MESSAGE)
    } else {
      setFormError()
    }
  }, [hasValidationErrors])

  return (
    <Form
      title="Sign Up"
      onSubmit={handleSubmit(onSubmit)}
      errorMessage={formError}
      control={(
        <Button type="submit" wide disabled={isSubmitting}>
          {isSubmitting ? 'Signing up...' : 'Sign Up'}
        </Button>
      )}
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
          invalid={errors.email}
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
          invalid={errors.password}
        />
        <InputError hasError={errors.password}>{errors.password?.message}</InputError>
      </InputLabel>
    </Form>
  )
}

export default SignUpForm
