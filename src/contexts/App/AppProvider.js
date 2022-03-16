import { useMemo, useEffect } from 'react'

import AppContext from './AppContext'

import useAuthContext from '@contexts/Auth'

import useProfiles from '@hooks/useProfiles'
import useEvents from '@hooks/useEvents'
import useFeatureFlags from '@hooks/useFeatureFlags'
import useModal from '@hooks/useModal'

import { MODAL_IDS } from '@lib/constants'

const AppProvider = ({ children }) => {
  const { state: { token, user, profile, isLoadedProfile } } = useAuthContext()
  const { profiles } = useProfiles()
  const { events } = useEvents()
  const { features } = useFeatureFlags()
  const { visibleModal, toggleVisibleModal } = useModal()

  const isLoadingApp = (token && (!user || !isLoadedProfile)) || !profiles || !events || !features

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
          features,
          isLoadingApp,
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
