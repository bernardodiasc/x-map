import Svg from '@components/generic/Svg'
import EventLocationCard from '@components/custom/EventLocationCard'

import styles from './EventCard.module.css'

type Props = {
  item?: any // TO DO: add correct type for Event,
  onLocationClick?: (event: any, location: any) => void, // TO DO: fix this
}

const EventCard = ({
  item,
  onLocationClick
}: Props): JSX.Element => {
  if (!item) {
    return null
  }

  const handleLocationClick = (event, location) =>
    onLocationClick && onLocationClick(item, location)

  const renderEventLocationCard = (location) => (
    <EventLocationCard
      key={`event-${item.id}-location-${location.id}`}
      location={location}
      onClick={handleLocationClick(item, location)}
    />
  )

  return (
    <div
      data-testid="EventCard"
      className={styles.component}
    >
      <h2 className={styles.title}>
        <Svg name="ticket" width="32" height="32" />
        {item.title}
      </h2>
      <h3 className={styles.schedule}>
        <Svg name="calendar" width="24" height="24" />
        Schedule:
      </h3>
      {item.locations?.map(renderEventLocationCard)}
    </div>
  )
}

export default EventCard
