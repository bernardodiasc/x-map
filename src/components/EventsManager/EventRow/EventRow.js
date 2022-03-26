import LocationRow from '@components/EventsManager/LocationRow'

import * as styles from './EventRow.module.css'

const EventRow = ({ children, event, handleEditEvent }) => {
  return (
    <div className={styles.component}>
      <div className={styles.title} onClick={handleEditEvent(event)}>
        {event.title}
      </div>
      {children}
    </div>
  )
}

export default EventRow
