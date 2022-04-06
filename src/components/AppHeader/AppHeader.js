import useAuthContext from '@contexts/Auth'
import useAppContext from '@contexts/App'
import useMapContext from '@contexts/Map'

import MainHeader from '@components/MainHeader'
import MainMenu from '@components/MainMenu'
import Button from '@components/Button'

import { MODAL_IDS, COLLECTIONS } from '@lib/constants'

const AppHeader = () => {
  const { state: { token } } = useAuthContext()
  const {
    state: { isLoadingApp, features },
    actions: { setVisibleModal },
  } = useAppContext()
  const {
    state: { selectedCollection },
    actions: { setSelectedCollection },
  } = useMapContext()

  const handleToggleVisibleModal = modalID => () => setVisibleModal(modalID)

  const collectionSelection = selectedCollection === COLLECTIONS.PROFILES ? {
    onClick: () => setSelectedCollection(COLLECTIONS.EVENTS),
    children: (
      <span>
        View Events
      </span>
    ),
  } : {
    onClick: () => setSelectedCollection(COLLECTIONS.PROFILES),
    children: (
      <span>
        View Profiles
      </span>
    ),
  }

  if (isLoadingApp) {
    return (
      <MainHeader>
        <Button onClick={handleToggleVisibleModal(MODAL_IDS.FAQ)}>
          ?
        </Button>
      </MainHeader>
    )
  }

  if (!token) {
    return (
      <MainHeader>
        {features?.EVENTS && (
          <Button {...collectionSelection} />
        )}
        <Button onClick={handleToggleVisibleModal(MODAL_IDS.JOIN_SCREEN)}>
          Join the Map
        </Button>
        <Button onClick={handleToggleVisibleModal(MODAL_IDS.FAQ)}>
          ?
        </Button>
      </MainHeader>
    )
  }

  return (
    <MainHeader>
      {features?.EVENTS && (
        <Button {...collectionSelection} />
      )}
      <MainMenu />
      <Button onClick={handleToggleVisibleModal(MODAL_IDS.FAQ)}>
        ?
      </Button>
    </MainHeader>
  )
}

export default AppHeader
