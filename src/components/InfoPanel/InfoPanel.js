import { useState, useEffect } from 'react'
import Draggable from 'react-draggable'

import ProfileInfo from '@components/ProfileInfo'
import EventInfo from '@components/EventInfo'

import useMapContext from '@contexts/Map'

import { COLLECTIONS } from '@lib/constants'

import * as styles from './InfoPanel.module.css'

const Panel = () => {
  const [visible, setVisible] = useState(true)
  const { state: { selectedFeature, selectedCollection }, actions: { setSelectedFeature } } = useMapContext()

  useEffect(() => {
    if (selectedFeature) {
      setVisible(true)
    }
  }, [selectedFeature])

  const close = () => {
    setVisible(false)
    setSelectedFeature(null)
  }

  const collectionInfo = {
    [COLLECTIONS.PROFILES]: ProfileInfo,
    [COLLECTIONS.EVENTS]: EventInfo,
  }

  const Info = collectionInfo[selectedCollection]

  return selectedFeature && visible ? (
    <Draggable>
      <section className={styles.info}>
        <div className={styles.close} onClick={close}>X</div>
        <Info />
      </section>
    </Draggable>
  ) : null
}

export default Panel
