import React, { createContext } from 'react'

const initialAuthState = {}
const AuthContext = createContext(initialAuthState)

export default AuthContext
