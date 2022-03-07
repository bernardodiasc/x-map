import { useState, useEffect, useCallback } from 'react'

import useAuthContext from '@contexts/Auth'
import useAppContext from '@contexts/App'

import ProfileForm from '@components/ProfileForm'
import LogInForm from '@components/LogInForm'
import SignUpForm from '@components/SignUpForm'
import InputLabel from '@components/InputLabel'
import Button from '@components/Button'
import Loading from '@components/Loading'

import { setAuthToken } from '@lib/auth'

import * as styles from './JoinScreen.module.css'

const JoinScreen = () => {
  const { state: { user, profile, isLoadingProfile } } = useAuthContext()
  const { actions: { toggleVisibleModal } } = useAppContext()
  const [displaySignUpForm, setDisplaySignUpForm] = useState(false)

  const toggleSignUpForm = useCallback(e => {
    e.preventDefault()
    setDisplaySignUpForm(!displaySignUpForm)
  }, [displaySignUpForm])

  useEffect(() => {
    if (profile) {
      toggleVisibleModal()
    }
  }, [profile, toggleVisibleModal])

  if (isLoadingProfile) {
    return (
      <div className={styles.component}>
        <Loading />
      </div>
    )
  }

  if (user) {
    return (
      <div className={styles.component}>
        <ProfileForm />
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
      <Button
        onClick={toggleSignUpForm}
        className={styles.extra}
        link
      >
        {displaySignUpForm
          ? 'Already have an account?'
          : 'Need new account?'
        }
      </Button>
    </div>
  )
}

export default JoinScreen
