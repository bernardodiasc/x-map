import { useState, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import size from 'lodash.size'

import useAuthContext from '@contexts/Auth'

import Form from '@components/form/Form'
import InputField from '@components/form/InputField'
import InputLabel from '@components/form/InputLabel'
import InputError from '@components/form/InputError'
import Button from '@components/generic/Button'

import { ENDPOINTS, EMAIL_REGEX, FORM_VALIDATION_ERROR_MESSAGE } from '@lib/constants'

const LogInForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const { actions: { logIn } } = useAuthContext()
  const [formError, setFormError] = useState<string | undefined>(undefined)

  const onSubmit = useCallback(async ({ identifier, password }) => {
    setFormError(undefined)
    try {
      const { data } = await axios.post(ENDPOINTS.LOG_IN, {
        identifier,
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
      setFormError(undefined)
    }
  }, [hasValidationErrors])

  return (
    <Form
      title="Log In"
      onSubmit={handleSubmit(onSubmit)}
      errorMessage={formError}
      control={(
        <Button type="submit" wide disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Log In'}
        </Button>
      )}
    >
      <InputLabel title="Email:">
        <InputField
          register={register('identifier', {
            required: 'The email is required.',
            pattern: {
              value: EMAIL_REGEX,
              message: 'The email must be valid.'
            }
          })}
          disabled={isSubmitting}
          invalid={errors.identifier}
        />
        <InputError hasError={errors.identifier}>{errors.identifier?.message}</InputError>
      </InputLabel>
      <InputLabel title="Password:">
        <InputField
          type="password"
          register={register('password', {
            required: 'This password is required.',
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

export default LogInForm
