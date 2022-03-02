import { useMemo } from 'react'

import AppContext from './AppContext'

import useProfiles from '@hooks/useProfiles'

const AppProvider = ({ children }) => {
  const { profiles } = useProfiles()

  const collections = useMemo(() => ({
    profiles,
  }), [profiles])

  return (
    <AppContext.Provider
      value={{
        collections,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
