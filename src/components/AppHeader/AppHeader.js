import { useMemo, useState } from 'react'
import Image from 'next/image'

import useAuthContext from '@contexts/Auth'
import useModal from '@hooks/useModal'
import Modal from '@components/Modal'

import * as styles from './AppHeader.module.css'

import logo from '@public/x-team-logo.svg'

const AppHeader = () => {
  const { token } = useAuthContext()
  const { isModalVisible, toggleModal } = useModal()

  return (
    <div className={styles.component}>
      <div className={styles.logo}>
        <Image src={logo} width="109" alt="X-Team" />
      </div>
      <div className={styles.controls}>
        {token ? (
          <button
            className={styles.button}
            // onClick={toggleModal}
          >
            logout
          </button>
        ) : (
          <button
            className={styles.button}
            onClick={toggleModal}
          >
            login
          </button>
        )}
      </div>
      {isModalVisible && (
        <Modal onClose={toggleModal}>
          Login form
        </Modal>
      )}
    </div>
  )
}

export default AppHeader
