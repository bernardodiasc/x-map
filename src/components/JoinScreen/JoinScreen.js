import { useState, useEffect } from 'react'

import useAuthContext from '@contexts/Auth'
import useAppContext from '@contexts/App'

import ProfileForm from '@components/ProfileForm'
import LogInFormTemp from '@components/LogInFormTemp'
import SignUpForm from '@components/SignUpForm'
import InputLabel from '@components/InputLabel'
import Button from '@components/Button'
import Loading from '@components/Loading'

import { setAuthToken } from '@lib/auth'

import * as styles from './JoinScreen.module.css'

const JoinScreen = () => {
  const { user, profile, isLoadingProfile } = useAuthContext()
  const { toggleVisibleModal } = useAppContext()
  const [displaySignUpForm, setDisplaySignUpForm] = useState(false)
  const toggleSignUpForm = e => {
    e.preventDefault()
    setDisplaySignUpForm(!displaySignUpForm)
  }

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

  console.log(user, profile)
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
        <LogInFormTemp />
      )}
      <div className={styles.extra}>
        <a onClick={toggleSignUpForm}>
          {displaySignUpForm
            ? 'Already have an account?'
            : 'Need new account?'
          }
        </a>
      </div>
    </div>
  )
}

export default JoinScreen
