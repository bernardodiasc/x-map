import { useState, useEffect } from 'react'
import Draggable from 'react-draggable'

import ProfileInfo from '@components/ProfileInfo'
import EventInfo from '@components/EventInfo'

import useMapContext from '@contexts/Map'

import { COLLECTIONS } from '@lib/constants'

import * as styles from './InfoPanel.module.css'

const Panel = () => {
  const {
    state: { selectedFeature, selectedCollection },
    actions: { setSelectedFeature }
  } = useMapContext()
  const [visible, setVisible] = useState(false)
  const [currentCollection, setCurrentCollection] = useState(selectedCollection)

  useEffect(() => {
    if (selectedFeature) {
      setVisible(true)
    }
  }, [selectedFeature])

  useEffect(() => {
    if (selectedCollection !== currentCollection) {
      setVisible(false)
      setSelectedFeature(null)
      setCurrentCollection(selectedCollection)
    }
  }, [currentCollection, selectedCollection, setSelectedFeature])

  const close = () => {
    setVisible(false)
    setSelectedFeature(null)
  }

  const collectionInfo = {
    [COLLECTIONS.PROFILES]: ProfileInfo,
    [COLLECTIONS.EVENTS]: EventInfo,
  }

  const Info = collectionInfo[selectedCollection]

  const isChangingCollection = selectedCollection !== currentCollection

  return selectedFeature && visible && !isChangingCollection ? (
    <Draggable>
      <section className={styles.info}>
        <div className={styles.close} onClick={close}>X</div>
        <Info />
      </section>
    </Draggable>
  ) : null
}

export default Panel
