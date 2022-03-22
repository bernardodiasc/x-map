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
  const { profiles, mutate: refetchProfiles } = useProfiles()
  const { events, mutate: refetchEvents } = useEvents()
  const { features } = useFeatureFlags()
  const {
    visibleModal,
    setVisibleModal,
    shouldModalBeClosable,
    setShouldModalBeClosable,
  } = useModal()

  const isLoadingApp = (token && (!user || !isLoadedProfile)) || !profiles || !events || !features

  const collections = useMemo(() => ({
    profiles,
    events,
  }), [profiles, events])

  const refetchCollections = () => {
    refetchProfiles()
    refetchEvents()
  }

  useEffect(() => {
    if (isLoadingApp) {
      return
    }
    if (token && user && !profile && isLoadedProfile) {
      setShouldModalBeClosable(false)
      setVisibleModal(MODAL_IDS.JOIN_SCREEN)
      return
    }
    if (isLoadedProfile && profile?.locations?.length === 0) {
      setShouldModalBeClosable(false)
      setVisibleModal(MODAL_IDS.LOCATIONS_MANAGER)
      return
    }
    setShouldModalBeClosable(true)
  }, [
    token,
    user,
    profile,
    isLoadedProfile,
    setVisibleModal,
    setShouldModalBeClosable,
    isLoadingApp,
  ])

  return (
    <AppContext.Provider
      value={{
        state: {
          collections,
          visibleModal,
          shouldModalBeClosable,
          features,
          isLoadingApp,
        },
        actions: {
          setVisibleModal,
          setShouldModalBeClosable,
          refetchCollections,
        }
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
