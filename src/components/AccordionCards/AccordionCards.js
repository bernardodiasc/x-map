import Svg from '@components/generic/Svg'

import { getFormattedLocationTitle } from '@lib/locations'

import * as styles from './AccordionCards.module.css'

const AccordionCards = ({ Card, data = [] }) => {
  const formattedLocationTitle = getFormattedLocationTitle(data[0]?.location || data[0]?.locations[0])
  return (
    <div className={styles.component}>
      <h2 className={styles.title}>
        <Svg name="mapMarker" width="32" height="32" />
        {formattedLocationTitle}
      </h2>
      <div className={styles.cards}>
        {data.map(item => (
          <div
            key={`profile-${item.id}`}
            className={styles.item}
          >
            <Card item={item} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AccordionCards
