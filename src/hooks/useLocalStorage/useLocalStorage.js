import { useState, useEffect } from 'react'

import { isSSR, getLocalStorage } from '@lib/utils'

function useLocalStorage () {
    // Execute logic only once
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : initialValue
      } catch (error) {
        console.error(error)
        return initialValue
      }
    })

    // Return a wrapped version of useState's setter function so that
    // it persists the new value to localStorage.
    const setValue = value => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore = value instanceof Function
          ? value(storedValue)
          : value
        setStoredValue(valueToStore)
        localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        console.error(error)
      }
    }

    return [storedValue, setValue]
}

export default useLocalStorage
