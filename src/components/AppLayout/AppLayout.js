import useAppContext from '@contexts/App'

import AppHeader from '@components/AppHeader'
import Modal from '@components/Modal'
import LoginForm from '@components/LoginForm'

import { MODAL_IDS } from '@lib/constants'

import * as styles from './AppLayout.module.css'

const AppLayout = ({ children }) => {
  const { visibleModal, toggleVisibleModal } = useAppContext()

  const modalContents = {
    [MODAL_IDS.LOGIN_FORM]: <LoginForm />
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
        <Modal onClose={toggleVisibleModal}>
          {modalContents[visibleModal]}
        </Modal>
      )}
    </main>
  )
}

export default AppLayout
