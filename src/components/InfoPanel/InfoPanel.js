import { useState, useEffect } from 'react'

import Svg from '@components/Svg'
import ProfileInfo from '@components/ProfileInfo'
import EventInfo from '@components/EventInfo'

import useMapContext from '@contexts/Map'

import { COLLECTIONS } from '@lib/constants'

import * as styles from './InfoPanel.module.css'

const Panel = () => {
  const {
    state: { selectedCoordinates, selectedCollection },
    actions: { setSelectedCoordinates }
  } = useMapContext()
  const [visible, setVisible] = useState(false)
  const [currentCollection, setCurrentCollection] = useState(selectedCollection)

  useEffect(() => {
    if (selectedCoordinates) {
      setVisible(true)
    }
  }, [selectedCoordinates])

  useEffect(() => {
    if (selectedCollection !== currentCollection) {
      setVisible(false)
      setSelectedCoordinates(null)
      setCurrentCollection(selectedCollection)
    }
  }, [currentCollection, selectedCollection, setSelectedCoordinates])

  const close = () => {
    setVisible(false)
    setSelectedCoordinates(null)
  }

  const collectionInfo = {
    [COLLECTIONS.PROFILES]: ProfileInfo,
    [COLLECTIONS.EVENTS]: EventInfo,
  }

  const Info = collectionInfo[selectedCollection]

  const isChangingCollection = selectedCollection !== currentCollection

  return selectedCollection && visible && !isChangingCollection ? (
    <section className={styles.info}>
      <div className={styles.close} onClick={close}>
        <Svg name="x" width="24" height="24" />
      </div>
      <Info />
    </section>
  ) : null
}

export default Panel
