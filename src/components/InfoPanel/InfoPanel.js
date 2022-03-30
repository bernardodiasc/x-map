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
        <div className={styles.close} onClick={close}>
          <svg viewBox="0 0 100 100" width="24px" height="24px">
            <path d="M27.601,93.022c-1.729,0-3.358-0.672-4.584-1.892l-9.923-9.878 c-2.536-2.523-2.549-6.643-0.03-9.184L32.977,52L13.037,31.905c-2.521-2.542-2.507-6.662,0.029-9.186l9.921-9.876 c1.101-1.097,2.552-1.748,4.194-1.878l0.207-0.016l0.208,0c1.737,0.006,3.367,0.688,4.59,1.92L52,32.839l19.743-19.897 c1.225-1.233,2.855-1.916,4.591-1.922c1.752,0,3.381,0.672,4.607,1.892l9.923,9.878c2.536,2.523,2.549,6.643,0.03,9.184 L70.893,52.118l19.9,20.056c2.521,2.542,2.637,6.544,0.101,9.068l-9.921,9.876c-1.222,1.218-2.851,1.892-4.584,1.894 c-1.761-0.006-3.391-0.688-4.614-1.92L52,71.161L32.215,91.101c-1.225,1.233-2.855,1.916-4.592,1.922h-0.009H27.601z" opacity=".35" />
            <path fill="#f2f2f2" d="M25.601,91.022c-1.729,0-3.358-0.672-4.584-1.892l-9.923-9.878 c-2.536-2.523-2.549-6.643-0.03-9.184L30.977,50L11.037,29.905c-2.521-2.542-2.507-6.662,0.029-9.186l9.921-9.876 c1.101-1.097,2.552-1.748,4.194-1.878l0.207-0.016l0.208,0c1.737,0.006,3.367,0.688,4.59,1.92L50,30.839l19.743-19.897 c1.225-1.233,2.855-1.916,4.591-1.922c1.752,0,3.381,0.672,4.607,1.892l9.923,9.878c2.536,2.523,2.549,6.643,0.03,9.184L69.023,50 l19.9,20.056c2.521,2.542,2.507,6.662-0.029,9.186l-9.921,9.876c-1.222,1.218-2.851,1.892-4.584,1.894 c-1.761-0.006-3.391-0.688-4.614-1.92L50,69.161L30.215,89.101c-1.225,1.233-2.855,1.916-4.592,1.922h-0.009H25.601z" />
            <polygon fill="#ff7575" points="84.279,25.397 74.357,15.52 50,40.067 25.573,15.45 15.651,25.327 40.134,50 15.679,74.645 25.601,84.522 50,59.933 74.388,84.511 84.31,74.634 59.866,50" />
            <polygon fill="none" stroke="#40396e" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3" points="84.279,25.397 74.357,15.52 50,40.067 25.573,15.45 15.651,25.327 40.134,50 15.679,74.645 25.601,84.522 50,59.933 74.388,84.511 84.31,74.634 59.866,50" />
          </svg>
        </div>
        <Info />
      </section>
    </Draggable>
  ) : null
}

export default Panel
