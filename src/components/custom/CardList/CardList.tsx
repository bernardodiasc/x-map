import Svg from '@components/generic/Svg'

import { getFormattedLocationTitle } from '@lib/locations'

import styles from './CardList.module.css'

type Props = {
  Card?: any, // TO DO: fix this
  title?: string,
  data?: Array<any>, // TO DO: fix this
}

const CardList = ({
  Card,
  title,
  data = [],
}: Props): JSX.Element => {
  if (!Card) {
    return null
  }

  const record = data[0]
  const location = record.location || (record.locations && record.locations[0])
  const formattedLocationTitle = getFormattedLocationTitle(location)

  return (
    <div
      data-testid="CardList"
      className={styles.component}
    >
      <h2
        data-testid="CardList-title"
        className={styles.title}
      >
        <Svg name="mapMarker" width="32" height="32" />
        {title || formattedLocationTitle}
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

export default CardList
