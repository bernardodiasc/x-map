import axios from 'axios'
import { useForm } from 'react-hook-form'

import useAuthContext from '@contexts/Auth'

import InputField from '@components/InputField'
import InputLabel from '@components/InputLabel'
import InputError from '@components/InputError'
import Button from '@components/Button'

import { setAuthToken } from '@lib/auth'

import * as styles from './SignUpForm.module.css'

const SIGN_UP_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`

const SignUpForm = () => {
  const { logIn, setUser } = useAuthContext()
  const { register, handleSubmit, formState: { errors }, clearErrors } = useForm()

  const onSignUp = async ({ email, password }) => {
    try {
      const response = await axios.post(SIGN_UP_ENDPOINT, {
        username: email,
        email,
        password,
      })
      const { data, status, headers } = response
      logIn(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form className={styles.component}  onSubmit={handleSubmit(onSignUp)}>
      <h1>Sign Up</h1>
      <InputLabel title="Email">
        <InputField type="text" register={register("email", { required: true })} />
        <InputError hasError={errors.email}>This field is required</InputError>
      </InputLabel>
      <InputLabel title="Password">
        <InputField type="password" register={register("password", { required: true })} />
        <InputError hasError={errors.password}>This field is required</InputError>
      </InputLabel>
      <InputLabel>
        <Button type="submit" wide>Sign Up</Button>
      </InputLabel>
    </form>
  )
}

export default SignUpForm
