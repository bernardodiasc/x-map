import Markdown from 'markdown-to-jsx'
import { format } from 'date-fns'

import * as styles from './EventLocationCard.module.css'

const EventLocationCard = ({ location, onClick }) => {
  const handleOnClick = () => {
    onClick && onClick()
  }

  const start = new Date(location.start)
  const end = new Date(location.end)

  return (
    <div
      className={styles.component}
      onClick={handleOnClick}
    >
      <div className={styles.info}>
        <div className={styles.title}>
          {location.title}
        </div>
        {location.info && (
          <Markdown>{location.info}</Markdown>
        )}
        {location.country && (
          <div className={styles.infoRow}>
            <b>Country:</b> {location.country}
          </div>
        )}
        {location.city && (
          <div className={styles.infoRow}>
            <b>City:</b> {location.city}
          </div>
        )}
        {location.address && (
          <div className={styles.infoRow}>
            <b>Address:</b> {location.address}
          </div>
        )}
      </div>
      {(location.start || location.end) && (
        <div className={styles.dates}>
          {location.start && (
            <div className={styles.date}>
              <div className={styles.dateLabel}>Start:</div>
              <div className={styles.day}>{format(start, 'dd')}</div>
              <div className={styles.month}>{format(start, 'MMMM')}</div>
              <div className={styles.year}>{format(start, 'yyyy')}</div>
            </div>
          )}
          {location.end && (
            <div className={styles.date}>
              <div className={styles.dateLabel}>End:</div>
              <div className={styles.day}>{format(end, 'dd')}</div>
              <div className={styles.month}>{format(end, 'MMMM')}</div>
              <div className={styles.year}>{format(end, 'yyyy')}</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default EventLocationCard
