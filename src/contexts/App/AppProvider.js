import { useMemo, useEffect } from 'react'

import AppContext from './AppContext'

import useAuthContext from '@contexts/Auth'

import useProfiles from '@hooks/useProfiles'
import useEvents from '@hooks/useEvents'
import useModal from '@hooks/useModal'

import { MODAL_IDS } from '@lib/constants'

const AppProvider = ({ children }) => {
  const { state: { token, user, profile, isLoadedProfile } } = useAuthContext()
  const { profiles } = useProfiles()
  const { events } = useEvents()
  const { visibleModal, toggleVisibleModal } = useModal()

  const collections = useMemo(() => ({
    profiles,
    events,
  }), [profiles, events])

  useEffect(() => {
    if (token && user && !profile && isLoadedProfile) {
      toggleVisibleModal(MODAL_IDS.JOIN_SCREEN)
      return
    }
  }, [token, user, profile, isLoadedProfile, toggleVisibleModal])

  return (
    <AppContext.Provider
      value={{
        state: {
          collections,
          visibleModal,
        },
        actions: {
          toggleVisibleModal,
        }
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
