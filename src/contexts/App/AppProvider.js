import { useMemo } from 'react'

import AppContext from './AppContext'

import useProfiles from '@hooks/useProfiles'
import useModal from '@hooks/useModal'

const AppProvider = ({ children }) => {
  const { profiles } = useProfiles()
  const { visibleModal, toggleVisibleModal } = useModal()

  const collections = useMemo(() => ({
    profiles,
  }), [profiles])

  return (
    <AppContext.Provider
      value={{
        collections,
        visibleModal,
        toggleVisibleModal,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
