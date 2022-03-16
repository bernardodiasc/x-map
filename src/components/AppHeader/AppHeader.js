import { Fragment, useMemo, useState } from 'react'
import Image from 'next/image'

import useAuthContext from '@contexts/Auth'
import useAppContext from '@contexts/App'
import useMapContext from '@contexts/Map'

import Button from '@components/Button'

import { setAuthToken } from '@lib/auth'
import { MODAL_IDS, COLLECTIONS } from '@lib/constants'

import * as styles from './AppHeader.module.css'

import logo from '@public/x-team-logo.svg'

const AppHeader = () => {
  const { state: { token, profile }, actions: { logOut } } = useAuthContext()
  const { state: { isLoadingApp, features }, actions: { toggleVisibleModal } } = useAppContext()
  const { state: { selectedCollection }, actions: { setSelectedCollection } } = useMapContext()

  const collectionSelection = selectedCollection === COLLECTIONS.PROFILES ? {
    onClick: () => setSelectedCollection(COLLECTIONS.EVENTS),
    children: 'View Events',
  } : {
    onClick: () => setSelectedCollection(COLLECTIONS.PROFILES),
    children: 'View Profiles',
  }

  if (isLoadingApp) {
    return (
      <div className={styles.component}>
        <div className={styles.logo}>
          <Image src={logo} width="109" alt="X-Team" />
        </div>
        <div className={styles.controls}>
          <Button onClick={() => toggleVisibleModal(MODAL_IDS.FAQ)}>
            ?
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.component}>
      <div className={styles.logo}>
        <Image src={logo} width="109" alt="X-Team" />
      </div>
      <div className={styles.controls}>
        {features?.EVENTS && (
          <Button {...collectionSelection} />
        )}
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
