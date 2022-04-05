import Svg from '@components/Svg'
import EventLocationCard from '@components/EventLocationCard'

import * as styles from './EventCard.module.css'

const EventCard = ({ item }) => {
  const renderEventLocationCard = (location) => (
    <EventLocationCard
      key={`event-${item.id}-location-${location.id}`}
      location={location}
    />
  )

  if (!item) {
    return null
  }

  return (
    <div className={styles.component}>
      <h2 className={styles.title}>
        <Svg name="ticket" width="32" height="32" />
        {item.title}
      </h2>
      <h3 className={styles.schedule}>
        <Svg name="calendar" width="24" height="24" />
        Schedule:
      </h3>
      {item.locations.map(renderEventLocationCard)}
    </div>
  )
}

export default EventCard
