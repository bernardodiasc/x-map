import { useState } from 'react'

import useAuthContext from '@contexts/Auth'

import LogInForm from '@components/LoginForm'
import SignUpForm from '@components/SignUpForm'
import InputLabel from '@components/InputLabel'
import Button from '@components/Button'

import { setAuthToken } from '@lib/auth'

import * as styles from './JoinScreen.module.css'

const JoinScreen = () => {
  const { user, profile } = useAuthContext()
  const [displaySignUpForm, setDisplaySignUpForm] = useState(false)
  const toggleSignUpForm = () => {
    setDisplaySignUpForm(!displaySignUpForm)
  }

  if (user) {
    return (
      <div className={styles.component}>
        Hello there!
        <br/>
        USER: {JSON.stringify(user)}
        <br/>
        PROFILE: {JSON.stringify(profile)}
      </div>
    )
  }

  return (
    <div className={styles.component}>
      {displaySignUpForm ? (
        <SignUpForm />
      ) : (
        <LogInForm />
      )}
      <InputLabel>
        <Button onClick={toggleSignUpForm}>
          {displaySignUpForm
            ? 'Already have an account?'
            : 'Need new account?'
          }
        </Button>
      </InputLabel>
    </div>
  )
}

export default JoinScreen
