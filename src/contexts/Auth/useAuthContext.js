import React, { useContext } from 'react'

import AuthContext from './AuthContext'

// Safely guarded useAuthContext hook
const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    return console.erro('This hook should be wraped by AuthProvider')
  }

  return context
}

export default useAuthContext
