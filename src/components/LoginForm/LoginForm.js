import axios from 'axios'
import { useForm } from 'react-hook-form'

import { setAuthToken } from '@lib/auth'

import * as styles from './LoginForm.module.css'

const AUTH_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async ({ identifier, password }) => {
    try {
      const response = await axios.post(AUTH_ENDPOINT, {
        identifier,
        password
      })
      const { data, status, headers } = response
      setAuthToken(data.jwt)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={styles.component}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span>username</span>
          <input type="text" {...register("identifier", { required: true })} />
          {errors.identifier && <span>This field is required</span>}
        </label>
        <label>
          <span>password</span>
          <input type="password" {...register("password", { required: true })} />
          {errors.password && <span>This field is required</span>}
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default LoginForm
