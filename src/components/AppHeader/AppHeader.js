import { useMemo, useState } from 'react'
import Image from 'next/image'

import useAuthContext from '@contexts/Auth'
import useAppContext from '@contexts/App'

import Button from '@components/Button'

import { setAuthToken } from '@lib/auth'
import { MODAL_IDS } from '@lib/constants'

import * as styles from './AppHeader.module.css'

import logo from '@public/x-team-logo.svg'

const AppHeader = () => {
  const { token, logOut, profile } = useAuthContext()
  const { toggleVisibleModal } = useAppContext()

  const LoggedControls = () => (
    <div className={styles.controls}>
      {profile && (
        <Button onClick={() => toggleVisibleModal(MODAL_IDS.LOCATIONS_FORM)}>
          Add locations
        </Button>
      )}
      <Button onClick={() => toggleVisibleModal(MODAL_IDS.ACCOUNT_FORM)}>
        Update your profile
      </Button>
      <Button onClick={logOut}>
        Logout
      </Button>
    </div>
  )

  return (
    <div className={styles.component}>
      <div className={styles.logo}>
        <Image src={logo} width="109" alt="X-Team" />
      </div>
      {token ? (
        <LoggedControls />
      ) : (
        <div className={styles.controls}>
          <Button onClick={() => toggleVisibleModal(MODAL_IDS.JOIN_SCREEN)}>
            Join
          </Button>
        </div>
      )}
    </div>
  )
}

export default AppHeader
