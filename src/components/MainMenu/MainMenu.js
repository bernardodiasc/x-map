import { useState, useRef } from 'react'

import useAuthContext from '@contexts/Auth'
import useAppContext from '@contexts/App'
import useMapContext from '@contexts/Map'

import Button from '@components/generic/Button'
import Svg from '@components/generic/Svg'

import useOnClickOutside from '@hooks/useOnClickOutside'

import { MODAL_IDS, COLLECTIONS } from '@lib/constants'

import * as styles from './MainMenu.module.css'

const MainMenu = () => {
  const {
    state: { token, profile },
    actions: { logOut },
  } = useAuthContext()
  const {
    state: { features },
    actions: { setVisibleModal },
  } = useAppContext()
  const {
    state: { selectedCollection },
    actions: { setSelectedCollection },
  } = useMapContext()
  const [isMenuVisible, toggleIsMenuVisible] = useState(true)

  const handleToggleVisibleModal = modalID => () => setVisibleModal(modalID)

  const locationButtonLabel = features?.TRAVELS
    ? 'Update your locations'
    : 'Update your location'

  const profileModalId = profile
    ? MODAL_IDS.PROFILE_FORM
    : MODAL_IDS.JOIN_SCREEN

  const collectionSelection = selectedCollection === COLLECTIONS.PROFILES ? {
    onClick: () => setSelectedCollection(COLLECTIONS.EVENTS),
    children: (
      <>
        <Svg name="calendar" width="24" height="24" />
        View Events
      </>
    ),
  } : {
    onClick: () => setSelectedCollection(COLLECTIONS.PROFILES),
    children: (
      <>
        <Svg name="people" width="24" height="24" />
        View Profiles
      </>
    ),
  }

  const handleOnClick = () => {
    toggleIsMenuVisible(!isMenuVisible)
  }

  const handleOnClickOuside = () => {
    toggleIsMenuVisible(false)
  }

  const ref = useRef()
  useOnClickOutside(ref, handleOnClickOuside)

  return (
    <div className={styles.component} ref={ref}>
      <div
        className={styles.button}
        onClick={handleOnClick}
      >
        <Svg name="menu" width="56" height="56" />
      </div>
      {isMenuVisible && (
        <div className={styles.menu}>
          {features?.EVENTS && (
            <>
              <Button link wide {...collectionSelection} />
              <hr />
            </>
          )}
          {token ? (
            <>
              <Button
                link
                wide
                onClick={handleToggleVisibleModal(profileModalId)}
              >
                <Svg name="account" width="24" height="24" />
                Update your profile
              </Button>
              {profile && (
                <Button
                  link
                  wide
                  onClick={handleToggleVisibleModal(MODAL_IDS.LOCATIONS_MANAGER)}
                >
                  <Svg name="location" width="24" height="24" />
                  {locationButtonLabel}
                </Button>
              )}
              {profile && (
                <Button
                  link
                  wide
                  onClick={handleToggleVisibleModal(MODAL_IDS.EVENTS_MANAGER)}
                >
                  <Svg name="editcalendar" width="24" height="24" />
                  Manage your events
                </Button>
              )}
              <hr />
              <Button
                link
                wide
                onClick={handleToggleVisibleModal(MODAL_IDS.FAQ)}
              >
                <Svg name="question" width="24" height="24" />
                FAQ
              </Button>
              <hr />
              <Button
                link
                wide
                onClick={logOut}
              >
                <Svg name="shutdown" width="24" height="24" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                link
                wide
                onClick={handleToggleVisibleModal(MODAL_IDS.FAQ)}
              >
                <Svg name="question" width="24" height="24" />
                FAQ
              </Button>
              <hr />
              <Button
                link
                wide
                onClick={handleToggleVisibleModal(MODAL_IDS.JOIN_SCREEN)}
              >
                <Svg name="connect" width="24" height="24" />
                Join the Map
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default MainMenu
