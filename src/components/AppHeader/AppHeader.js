import { Fragment, useMemo, useState } from 'react'
import Image from 'next/image'

import useAuthContext from '@contexts/Auth'
import useAppContext from '@contexts/App'

import Button from '@components/Button'

import { setAuthToken } from '@lib/auth'
import { MODAL_IDS } from '@lib/constants'

import * as styles from './AppHeader.module.css'

import logo from '@public/x-team-logo.svg'

const AppHeader = () => {
  const { state: { token, profile }, actions: { logOut } } = useAuthContext()
  const { actions: { toggleVisibleModal } } = useAppContext()

  return (
    <div className={styles.component}>
      <div className={styles.logo}>
        <Image src={logo} width="109" alt="X-Team" />
      </div>
        <div className={styles.controls}>
        {token ? (
          <Fragment>
            {profile && (
              <Button onClick={() => toggleVisibleModal(MODAL_IDS.LOCATIONS_FORM)}>
                Add location
              </Button>
            )}
            <Button onClick={() => toggleVisibleModal(profile ? MODAL_IDS.PROFILE_FORM : MODAL_IDS.JOIN_SCREEN)}>
              Update your profile
            </Button>
            <Button onClick={logOut}>
              Logout
            </Button>
          </Fragment>
        ) : (
          <Button onClick={() => toggleVisibleModal(MODAL_IDS.JOIN_SCREEN)}>
            Join
          </Button>
        )}
        <Button onClick={() => toggleVisibleModal(MODAL_IDS.FAQ)}>
          ?
        </Button>
      </div>
    </div>
  )
}

export default AppHeader
