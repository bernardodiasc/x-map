import { useMemo, useState } from 'react'
import Image from 'next/image'

import useAuthContext from '@contexts/Auth'
import useAppContext from '@contexts/App'

import { setAuthToken } from '@lib/auth'
import { MODAL_IDS } from '@lib/constants'

import * as styles from './AppHeader.module.css'

import logo from '@public/x-team-logo.svg'

const AppHeader = () => {
  const { token } = useAuthContext()
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
            onClick={() => setAuthToken(null)}
          >
            Logout
          </button>
        ) : (
          <button
            className={styles.button}
            onClick={() => toggleVisibleModal(MODAL_IDS.LOGIN_FORM)}
          >
            Join
          </button>
        )}
      </div>
    </div>
  )
}

export default AppHeader
