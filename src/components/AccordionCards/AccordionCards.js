import { useState } from 'react'
import Image from 'next/image'

import Svg from '@components/Svg'

import { getFormattedLocationTitle } from '@lib/locations'

import * as styles from './AccordionCards.module.css'

const AccordionCards = ({ Card, data = [], label }) => {
  const [expanded, setExpanded] = useState()

  const toggle = (i) => () => {
    setExpanded(i)
  }

  const formattedLocationTitle = getFormattedLocationTitle(data[0]?.location || data[0]?.locations[0])

  return (
    <div className={styles.component}>
      <h2 className={styles.title}>
        <Svg name="mapMarker" width="32" height="32" />
        {formattedLocationTitle}
      </h2>
      {data.map((item, i) => (
        <div
          key={`profile-${item.id}`}
          className={[
            styles.item,
            styles.expandedItem,
          ].join(' ')}
        >
          <h3
            className={[styles.button, item.avatar ? '' : styles.imageless].join(' ')}
            onClick={toggle(i)}
          >
            {item.avatar && (
              <div className={styles.image}>
                <Image
                  src={item.avatar.url}
                  alt={item.name}
                  width="32"
                  height="32"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            )}
            <div className={styles.label}>
              {item[label]}
            </div>
            <div className={styles.arrow}>
              <Svg name="arrowDown" width="24" height="24" />
            </div>
          </h3>
          <div className={styles.content}>
            <Card item={item} inAccordion />
          </div>
        </div>
      ))}
    </div>
  )
}

export default AccordionCards
