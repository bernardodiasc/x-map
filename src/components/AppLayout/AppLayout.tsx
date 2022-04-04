import useAppContext from '@contexts/App'

import AppHeader from '@components/AppHeader'
import Modal from '@components/Modal'
import JoinScreen from '@components/JoinScreen'
import ProfileForm from '@components/ProfileForm'
import LocationsManager from '@components/LocationsManager'
import EventsManager from '@components/EventsManager'
import FrequentlyAskedQuestions from '@components/FrequentlyAskedQuestions'
import InfoPanel from '@components/InfoPanel'

import { MODAL_IDS } from '@lib/constants'

import styles from './AppLayout.module.css'

type Props = {
  children?: React.ReactNode
}

const AppLayout = ({ children }: Props): JSX.Element => {
  const {
    state: { visibleModal, shouldModalBeClosable },
    actions: { setVisibleModal },
  } = useAppContext()

  const modalContents = {
    [MODAL_IDS.JOIN_SCREEN]: <JoinScreen />,
    [MODAL_IDS.PROFILE_FORM]: <ProfileForm />,
    [MODAL_IDS.LOCATIONS_MANAGER]: <LocationsManager />,
    [MODAL_IDS.EVENTS_MANAGER]: <EventsManager />,
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
        <Modal
          defaultWitdh
          onClose={shouldModalBeClosable && setVisibleModal}
        >
          {modalContents[visibleModal]}
        </Modal>
      )}
      <InfoPanel />
    </main>
  )
}

export default AppLayout
