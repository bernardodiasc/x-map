import { useMemo, useState } from 'react'
import Image from 'next/image'

import useAuthContext from '@contexts/Auth'
import useAppContext from '@contexts/App'

import { setAuthToken } from '@lib/auth'
import { MODAL_IDS } from '@lib/constants'

import * as styles from './AppHeader.module.css'

import logo from '@public/x-team-logo.svg'

const AppHeader = () => {
  const { token, logOut } = useAuthContext()
  const { toggleVisibleModal } = useAppContext()

  return (
    <div className={styles.component}>
      <div className={styles.logo}>
        <Image src={logo} width="109" alt="X-Team" />
      </div>
      <div className={styles.controls}>
        {token ? (
          <button
            className={styles.button}
            onClick={logOut}
          >
            Logout
          </button>
        ) : (
          <button
            className={styles.button}
            onClick={() => toggleVisibleModal(MODAL_IDS.JOIN_SCREEN)}
          >
            Join
          </button>
        )}
      </div>
    </div>
  )
}

export default AppHeader
