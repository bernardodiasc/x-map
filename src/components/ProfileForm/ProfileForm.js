import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import qs from 'qs'

import useAuthContext from '@contexts/Auth'

import Form from '@components/Form'
import InputField from '@components/InputField'
import InputLabel from '@components/InputLabel'
import InputError from '@components/InputError'
import Button from '@components/Button'

import { normalizeProfileApiData } from '@lib/profiles'
import { ENDPOINTS } from '@lib/constants'

import * as styles from './ProfileForm.module.css'

const ProfileForm = () => {
  const { register, handleSubmit, formState: { errors }, isSubmitting } = useForm()
  const { state: { profile }, actions: { setProfile } } = useAuthContext()
  const [apiError, setApiError] = useState()

  const onSubmit = useCallback(async ({
    name,
    about,
    github,
    stackoverflow,
    linkedin,
    twitter,
    instagram,
  }) => {
    setApiError()
    try {
      const queryProfile = qs.stringify({ populate: 'locations' })
      const { data: apiData } = await axios.put(`${ENDPOINTS.PROFILES}/${profile.id}?${queryProfile}`, {
        data: {
          name,
          about,
          github,
          stackoverflow,
          linkedin,
          twitter,
          instagram,
        }
      })
      const updatedProfile = normalizeProfileApiData(apiData.data)
      setProfile(updatedProfile)
      // to do: update 'profiles' collection
    } catch (error) {
      console.error(error)
      setApiError(error?.response?.data?.error?.message)
    }
  }, [profile.id, setProfile])

  return (
    <Form
      title={`Hello ${profile.name}`}
      onSubmit={handleSubmit(onSubmit)}
      errorMessage={apiError}
      className={styles.component}
    >
      <InputLabel title="Full name:" isRequired>
        <InputField
          type="text"
          register={register('name', { required: true })}
          defaultValue={profile.name}
          disabled={isSubmitting}
        />
        <InputError hasError={errors.name}>This field is required.</InputError>
      </InputLabel>
      <InputLabel title="About me:">
        <InputField
          type="text"
          register={register('about')}
          defaultValue={profile.about}
          disabled={isSubmitting}
        />
      </InputLabel>
      <InputLabel title="GitHub:">
        <InputField
          type="text"
          register={register('github')}
          defaultValue={profile.github}
          disabled={isSubmitting}
        />
      </InputLabel>
      <InputLabel title="StackOverflow:">
        <InputField
          type="text"
          register={register('stackoverflow')}
          defaultValue={profile.stackoverflow}
          disabled={isSubmitting}
        />
      </InputLabel>
      <InputLabel title="LinkedIn:">
        <InputField
          type="text"
          register={register('linkedin')}
          defaultValue={profile.linkedin}
          disabled={isSubmitting}
        />
      </InputLabel>
      <InputLabel title="Twitter:">
        <InputField
          type="text"
          register={register('twitter')}
          defaultValue={profile.twitter}
          disabled={isSubmitting}
        />
      </InputLabel>
      <InputLabel title="Instagram:">
        <InputField
          type="text"
          register={register('instagram')}
          defaultValue={profile.instagram}
          disabled={isSubmitting}
        />
      </InputLabel>
      <InputLabel>
        <Button type="submit" wide disabled={isSubmitting}>Save</Button>
      </InputLabel>
    </Form>
  )
}

export default ProfileForm
