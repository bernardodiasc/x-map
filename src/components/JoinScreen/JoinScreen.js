import { useState, useEffect, useCallback } from 'react'

import useAuthContext from '@contexts/Auth'
import useAppContext from '@contexts/App'

import AccountForm from '@components/AccountForm'
import LogInForm from '@components/LogInForm'
import SignUpForm from '@components/SignUpForm'
import Button from '@components/Button'
import Loading from '@components/Loading'

import * as styles from './JoinScreen.module.css'

const JoinScreen = () => {
  const { state: { user, profile, isLoadingProfile } } = useAuthContext()
  const { actions: { setVisibleModal } } = useAppContext()
  const [displaySignUpForm, setDisplaySignUpForm] = useState(false)

  const toggleSignUpForm = useCallback(e => {
    e.preventDefault()
    setDisplaySignUpForm(!displaySignUpForm)
  }, [displaySignUpForm])

  useEffect(() => {
    if (profile) {
      setVisibleModal()
    }
  }, [profile, setVisibleModal])

  if (isLoadingProfile) {
    return (
      <Loading inModal />
    )
  }

  if (user) {
    return (
      <AccountForm />
    )
  }

  return (
    <div>
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
