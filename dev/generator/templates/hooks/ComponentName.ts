import { useState, useEffect } from 'react'

export type <%= componentName %>Type = {
  is<%= componentName %>: boolean,
  setIs<%= componentName %>: () => void,
}

function <%= componentName %> (): <%= componentName %>Type {
  // This is a sample, just a basic boolean flag Hook
  const [is<%= componentName %>, setIs<%= componentName %>] = useState(false)
  useEffect(() => {
    setIs<%= componentName %>(true)
  }, [setIs<%= componentName %>])

  return { is<%= componentName %>, setIs<%= componentName %> }
}

export default <%= componentName %>
