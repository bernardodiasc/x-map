import Button from '@components/Button'

import useAuthContext from '@contexts/Auth'
import useAppContext from '@contexts/App'
import useMapContext from '@contexts/Map'

import { MODAL_IDS, COLLECTIONS } from '@lib/constants'

import * as styles from './MainMenu.module.css'

const MainMenu = () => {
  const {
    state: { profile },
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

  const collectionSelection = selectedCollection === COLLECTIONS.PROFILES ? {
    onClick: () => setSelectedCollection(COLLECTIONS.EVENTS),
    children: 'View Events',
  } : {
    onClick: () => setSelectedCollection(COLLECTIONS.PROFILES),
    children: 'View Profiles',
  }

  const handleToggleVisibleModal = modalID => () => setVisibleModal(modalID)

  const locationButtonLabel = features?.TRAVELS
    ? 'Update your locations'
    : 'Update your location'

  const profileModalId = profile
    ? MODAL_IDS.PROFILE_FORM
    : MODAL_IDS.JOIN_SCREEN

  return (
    <div className={styles.component}>
      {features?.EVENTS && (
        <Button {...collectionSelection} />
      )}
      {profile && (
        <Button onClick={handleToggleVisibleModal(MODAL_IDS.EVENTS_MANAGER)}>
          Update events
        </Button>
      )}
      {profile && (
        <Button onClick={handleToggleVisibleModal(MODAL_IDS.LOCATIONS_MANAGER)}>
          {locationButtonLabel}
        </Button>
      )}
      <Button onClick={handleToggleVisibleModal(profileModalId)}>
        Update your profile
      </Button>
      <Button onClick={logOut}>
        Logout
      </Button>
    </div>
  )
}

export default MainMenu
