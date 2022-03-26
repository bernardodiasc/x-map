import { format } from 'date-fns'

import * as styles from './LocationRow.module.css'

const LocationRow = ({ event, location, handleEditLocation }) => {
  const title = [location.country]
  if (location.city) {
    title.push(location.city)
  }
  const since = new Date(location.since)
  const until = new Date(location.until)
  return (
    <div
      className={styles.component}
      onClick={handleEditLocation(event, location)}
    >
      <div className={styles.info}>
        {location.country && (
          <div className={styles.infoRow}><b>Country:</b> {location.country}</div>
        )}
        {location.city && (
          <div className={styles.infoRow}><b>City:</b> {location.city}</div>
        )}
        {location.address && (
          <div className={styles.infoRow}><b>Address:</b> {location.address}</div>
        )}
      </div>
      {(location.since || location.until) && (
        <div className={styles.dates}>
          {location.since && (
            <div className={styles.date}>
              <div className={styles.dateLabel}>Start:</div>
              <div className={styles.day}>{format(since, 'dd')}</div>
              <div className={styles.month}>{format(since, 'MMMM')}</div>
              <div className={styles.year}>{format(since, 'yyyy')}</div>
            </div>
          )}
          {location.until && (
            <div className={styles.date}>
              <div className={styles.dateLabel}>End:</div>
              <div className={styles.day}>{format(until, 'dd')}</div>
              <div className={styles.month}>{format(until, 'MMMM')}</div>
              <div className={styles.year}>{format(until, 'yyyy')}</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default LocationRow
