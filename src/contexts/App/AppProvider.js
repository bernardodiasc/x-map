import { useMemo, useEffect, useState } from 'react'

import AppContext from './AppContext'

import useAuthContext from '@contexts/Auth'

import useProfiles from '@hooks/useProfiles'
import useEvents from '@hooks/useEvents'
import useBounties from '@hooks/useBounties'
import useFeatureFlags from '@hooks/useFeatureFlags'

import { MODAL_IDS, COLLECTIONS } from '@lib/constants'

const AppProvider = ({ children }) => {
  const { state: { token, user, profile, isLoadingProfile, isLoadedProfile } } = useAuthContext()
  const { profiles, error: profileError, mutate: refetchProfiles } = useProfiles()
  const { events, error: eventsError, mutate: refetchEvents } = useEvents()
  const { bounties, error: bountiesError } = useBounties()
  const { features } = useFeatureFlags()
  const [visibleModal, setVisibleModal] = useState(undefined)
  const [shouldModalBeClosable, toggleShouldModalBeClosable] = useState(true)

  const isLoadingApp = (token && (!user || !isLoadedProfile)) || !profiles || !events || !features

  const collections = useMemo(() => ({
    profiles,
    events,
    bounties,
  }), [profiles, events, bounties])

  const errors = useMemo(() => ({
    [COLLECTIONS.PROFILES]: profileError,
    [COLLECTIONS.EVENTS]: eventsError,
    [COLLECTIONS.BOUNTIES]: bountiesError,
  }), [profileError, eventsError, bountiesError])

  const hasErrors = Object.values(errors).every(value => value !== undefined)

  const refetchCollections = () => {
    refetchProfiles()
    refetchEvents()
  }

  useEffect(() => {
    if (isLoadingApp) {
      return
    }
    if (token && user && !profile && isLoadingProfile) {
      toggleShouldModalBeClosable(false)
      return
    }
    if (token && user && !profile && isLoadedProfile) {
      toggleShouldModalBeClosable(false)
      setVisibleModal(MODAL_IDS.JOIN_SCREEN)
      return
    }
    if (isLoadedProfile && profile?.locations?.length === 0) {
      toggleShouldModalBeClosable(false)
      setVisibleModal(MODAL_IDS.LOCATIONS_MANAGER)
      return
    }
    toggleShouldModalBeClosable(true)
  }, [
    isLoadingApp,
    token,
    user,
    profile,
    isLoadingProfile,
    isLoadedProfile,
    setVisibleModal,
    toggleShouldModalBeClosable,
  ])

  return (
    <AppContext.Provider
      value={{
        state: {
          collections,
          errors,
          hasErrors,
          visibleModal,
          shouldModalBeClosable,
          features,
          isLoadingApp,
        },
        actions: {
          setVisibleModal,
          toggleShouldModalBeClosable,
          refetchCollections,
        }
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
