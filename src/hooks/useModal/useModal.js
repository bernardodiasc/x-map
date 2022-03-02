import { useState, useEffect } from 'react'

function useModal () {
  const [visibleModal, setVisibleModal] = useState(undefined)

  useEffect(
    () => () => {
      document.body.style.overflowY = ''
    },
    []
  )

  const toggleVisibleModal = modalId =>
    setVisibleModal(visibleModal => {
      document.body.style.overflowY = !modalId ? 'hidden' : ''
      return modalId || undefined
    })

  return {
    visibleModal,
    toggleVisibleModal
  }
}

export default useModal
