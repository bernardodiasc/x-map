import { useState, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import qs from 'qs'
import size from 'lodash.size'

import useAuthContext from '@contexts/Auth'
import useAppContext from '@contexts/App'

import Form from '@components/Form'
import InputField from '@components/InputField'
import InputLabel from '@components/InputLabel'
import InputError from '@components/InputError'
import Button from '@components/Button'

import { normalizeProfileApiData } from '@lib/profiles'
import { ENDPOINTS, FORM_VALIDATION_ERROR_MESSAGE } from '@lib/constants'

const AccountForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const { state: { user }, actions: { setProfile } } = useAuthContext()
  const { actions: { refetchCollections } } = useAppContext()
  const [formError, setFormError] = useState()

  const onSubmit = useCallback(async ({ name }) => {
    setFormError()
    try {
      const queryProfile = qs.stringify({ populate: ['avatar', 'locations'] })
      const { data: apiData } = await axios.post(`${ENDPOINTS.PROFILES}?${queryProfile}`, {
        data: {
          name,
          email: user.email,
        }
      })
      const newProfile = normalizeProfileApiData(apiData.data)
      setProfile(newProfile)
      refetchCollections()
    } catch (error) {
      console.error(error)
      setFormError(error?.response?.data?.error?.message)
    }
  }, [refetchCollections, setProfile, user])

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
      title="Welcome!"
      description="Please fill up required info before proceed :)"
      onSubmit={handleSubmit(onSubmit)}
      errorMessage={formError}
      control={(
        <Button type="submit" wide disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      )}
    >
      <InputLabel title="Full name:" isRequired>
        <InputField
          register={register('name', { required: true })}
          disabled={isSubmitting}
          invalid={errors.name}
        />
        <InputError hasError={errors.name}>This field is required.</InputError>
      </InputLabel>
    </Form>
  )
}

export default AccountForm
