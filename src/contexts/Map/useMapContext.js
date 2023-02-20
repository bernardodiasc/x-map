import { useContext } from 'react'

import MapContext from './MapContext'

// Safely guarded useMapContext hook
const useMapContext = () => {
  const context = useContext(MapContext)

  if (!context) {
    return console.erro('This hook should be wraped by MapProvider')
  }

  return context
}

export default useMapContext
