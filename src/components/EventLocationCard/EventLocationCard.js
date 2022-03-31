import Markdown from 'markdown-to-jsx'
import { format } from 'date-fns'

import * as styles from './EventLocationCard.module.css'

const EventLocationCard = ({ location, onClick }) => {
  const handleOnClick = () => {
    onClick && onClick()
  }

  const start = new Date(location.start)
  const startDateOnly = new Date(start.valueOf() + start.getTimezoneOffset() * 60 * 1000)
  const end = new Date(location.end)
  const endDateOnly = new Date(end.valueOf() + end.getTimezoneOffset() * 60 * 1000)

  return (
    <div
      className={styles.component}
      onClick={handleOnClick}
    >
      <div className={styles.info}>
        <div className={styles.title}>
          {location.title}
        </div>
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
        {location.description && (
          <div className={styles.description}>
            <Markdown>{location.description}</Markdown>
          </div>
        )}
      </div>
      {(location.start || location.end) && (
        <div className={styles.dates}>
          {location.start && (
            <div className={styles.date}>
              <div className={styles.dateLabel}>Start:</div>
              <div className={styles.day}>{format(startDateOnly, 'dd')}</div>
              <div className={styles.month}>{format(startDateOnly, 'MMMM')}</div>
              <div className={styles.year}>{format(startDateOnly, 'yyyy')}</div>
            </div>
          )}
          {location.end && (
            <div className={styles.date}>
              <div className={styles.dateLabel}>End:</div>
              <div className={styles.day}>{format(endDateOnly, 'dd')}</div>
              <div className={styles.month}>{format(endDateOnly, 'MMMM')}</div>
              <div className={styles.year}>{format(endDateOnly, 'yyyy')}</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default EventLocationCard
