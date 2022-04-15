import React, { createContext } from 'react'

export type <%= componentName %>ContextType = {}

const initial<%= componentName %>State: <%= componentName %>ContextType = {}

const <%= componentName %>Context = createContext<<%= componentName %>ContextType>(initial<%= componentName %>State)

export default <%= componentName %>Context
