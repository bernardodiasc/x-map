import useAppContext from '@contexts/App'

import AppHeader from '@components/AppHeader'
import Modal from '@components/Modal'
import JoinScreen from '@components/JoinScreen'
import LocationsForm from '@components/LocationsForm'
import ProfileForm from '@components/ProfileForm'
import FrequentlyAskedQuestions from '@components/FrequentlyAskedQuestions'
import InfoPanel from '@components/InfoPanel'

import { MODAL_IDS } from '@lib/constants'

import * as styles from './AppLayout.module.css'

const AppLayout = ({ children }) => {
  const {
    state: { visibleModal, shouldModalBeClosable },
    actions: { setVisibleModal },
  } = useAppContext()

  const modalContents = {
    [MODAL_IDS.JOIN_SCREEN]: <JoinScreen />,
    [MODAL_IDS.LOCATIONS_FORM]: <LocationsForm />,
    [MODAL_IDS.PROFILE_FORM]: <ProfileForm />,
    [MODAL_IDS.FAQ]: <FrequentlyAskedQuestions />,
  }

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <AppHeader />
      </div>
      <div className={styles.children}>
        {children}
      </div>
      {visibleModal && (
        <Modal onClose={shouldModalBeClosable && setVisibleModal}>
          {modalContents[visibleModal]}
        </Modal>
      )}
      <InfoPanel />
    </main>
  )
}

export default AppLayout
