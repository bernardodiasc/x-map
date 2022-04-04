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
import ImagesSelector from '@components/ImagesSelector'

import { normalizeProfileApiData } from '@lib/profiles'
import { ENDPOINTS, FORM_VALIDATION_ERROR_MESSAGE } from '@lib/constants'

import * as styles from './ProfileForm.module.css'

const ProfileForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const { state: { profile }, actions: { setProfile } } = useAuthContext()
  const { state: { features }, actions: { refetchCollections } } = useAppContext()
  const [formSuccess, setFormSuccess] = useState()
  const [formError, setFormError] = useState()
  const [avatar, setAvatar] = useState()
  const [uploadProgress, setUploadProgress] = useState(0)

  const onSubmit = useCallback(async ({
    name,
    about,
    website,
    github,
    stackoverflow,
    linkedin,
    twitter,
    instagram,
  }) => {
    setFormSuccess()
    setFormError()
    setUploadProgress(0)

    const formData = new FormData()

    const dataObj = {
      name,
      about,
      website,
      github,
      stackoverflow,
      linkedin,
      twitter,
      instagram,
    }

    formData.append('data', JSON.stringify(dataObj))

    if (avatar) {
      if (profile.avatar) {
        await axios.delete(`${ENDPOINTS.UPLOAD}/files/${profile.avatar.id}`)
      }
      formData.append('files.avatar', avatar, avatar.name)
    }

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: event => {
        const percent = Math.floor((event.loaded / event.total) * 100)
        setUploadProgress(percent)
      }
    }

    try {
      const queryProfile = qs.stringify({ populate: ['avatar', 'locations'] })
      const { data: apiData } = await axios.put(
        `${ENDPOINTS.PROFILES}/${profile.id}?${queryProfile}`,
        formData,
        config
      )
      const updatedProfile = normalizeProfileApiData(apiData.data)
      setProfile(updatedProfile)
      setFormSuccess('Your profile was updated!')
      refetchCollections()
    } catch (error) {
      console.error(error)
      setFormError(error?.response?.data?.error?.message)
    }
  }, [avatar, profile, refetchCollections, setProfile])

  const handleSetAvatarFile = files => {
    if (files.length > 0) {
      setAvatar(files[0])
    }
  }

  const hasValidationErrors = Boolean(size(errors))
  useEffect(() => {
    if (hasValidationErrors) {
      setFormSuccess()
      setFormError(FORM_VALIDATION_ERROR_MESSAGE)
      setUploadProgress(0)
    } else {
      setFormError()
    }
  }, [hasValidationErrors])

  return (
    <Form
      title={`Hello ${profile.name}`}
      onSubmit={handleSubmit(onSubmit)}
      successMessage={formSuccess}
      errorMessage={formError}
      className={styles.component}
      control={(
        <Button type="submit" wide disabled={isSubmitting}>
          {isSubmitting ? `Saving... ${uploadProgress}%` : 'Save'}
        </Button>
      )}
    >
      <InputLabel title="Full name:" isRequired>
        <InputField
          register={register('name', { required: true })}
          defaultValue={profile.name}
          disabled={isSubmitting}
          invalid={errors.name}
        />
        <InputError hasError={errors.name}>This field is required.</InputError>
      </InputLabel>
      {features?.AVATAR_UPLOAD && (
        <ImagesSelector
          title="Profile picture:"
          images={[profile.avatar]}
          selectFiles={handleSetAvatarFile}
          disabled={isSubmitting}
        />
      )}
      <InputLabel title="About me:">
        <InputField
          register={register('about')}
          defaultValue={profile.about}
          disabled={isSubmitting}
        />
      </InputLabel>
      <InputLabel title="Website:">
        <InputField
          register={register('website')}
          defaultValue={profile.website}
          disabled={isSubmitting}
          prefix="http://"
        />
      </InputLabel>
      <InputLabel title="GitHub:">
        <InputField
          register={register('github')}
          defaultValue={profile.github}
          disabled={isSubmitting}
          prefix="https://github.com/"
        />
      </InputLabel>
      <InputLabel title="StackOverflow:">
        <InputField
          register={register('stackoverflow')}
          defaultValue={profile.stackoverflow}
          disabled={isSubmitting}
          prefix="https://stackoverflow.com/users/"
        />
      </InputLabel>
      <InputLabel title="LinkedIn:">
        <InputField
          register={register('linkedin')}
          defaultValue={profile.linkedin}
          disabled={isSubmitting}
          prefix="https://linkedin.com/in/"
        />
      </InputLabel>
      <InputLabel title="Twitter:">
        <InputField
          register={register('twitter')}
          defaultValue={profile.twitter}
          disabled={isSubmitting}
          prefix="https://twitter.com/"
        />
      </InputLabel>
      <InputLabel title="Instagram:">
        <InputField
          register={register('instagram')}
          defaultValue={profile.instagram}
          disabled={isSubmitting}
          prefix="https://instagram.com/"
        />
      </InputLabel>
    </Form>
  )
}

export default ProfileForm
