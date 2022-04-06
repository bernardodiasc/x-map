import Button from '@components/Button'

import useAuthContext from '@contexts/Auth'
import useAppContext from '@contexts/App'

import { MODAL_IDS } from '@lib/constants'

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

  const handleToggleVisibleModal = modalID => () => setVisibleModal(modalID)

  const locationButtonLabel = features?.TRAVELS
    ? 'Update your locations'
    : 'Update your location'

  const profileModalId = profile
    ? MODAL_IDS.PROFILE_FORM
    : MODAL_IDS.JOIN_SCREEN

  return (
    <div className={styles.component}>
      {profile && (
        <Button onClick={handleToggleVisibleModal(MODAL_IDS.EVENTS_MANAGER)}>
          Manage your events
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
