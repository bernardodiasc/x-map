import AuthContext from './AuthContext'

import { getAuthToken } from '@lib/auth'

const AuthProvider = ({ children }) => {
  const token = getAuthToken()
  return (
    <AuthContext.Provider
      value={{
        token
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
