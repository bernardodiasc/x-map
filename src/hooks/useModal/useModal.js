import { useState, useEffect } from 'react'

function useModal () {
  const [visibleModal, setVisibleModal] = useState(undefined)
  const [shouldModalBeClosable, toggleShouldModalBeClosable] = useState(true)

  useEffect(
    () => () => {
      document.body.style.overflowY = ''
    },
    []
  )

  const handleSetVisibleModal = modalId =>
    setVisibleModal(visibleModal => {
      document.body.style.overflowY = !modalId ? 'hidden' : ''
      return modalId || undefined
    })

  return {
    visibleModal,
    setVisibleModal: handleSetVisibleModal,
    shouldModalBeClosable,
    toggleShouldModalBeClosable,
  }
}

export default useModal
