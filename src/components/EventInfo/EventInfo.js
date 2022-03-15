import Markdown from 'markdown-to-jsx'

import useAppContext from '@contexts/App'
import useMapContext from '@contexts/Map'

import * as styles from './EventInfo.module.css'

const EventInfo = () => {
  const { state: { collections } } = useAppContext()
  const { state: { selectedFeature, selectedCollection }, actions: { setSelectedFeature } } = useMapContext()

  const selectedEvent = collections.events.find(event => event.id === selectedFeature)

  return (
    <div className={styles.component}>
      <h1 className={styles.title}>{selectedEvent.title}</h1>
      {selectedEvent.info && (
        <Markdown>{selectedEvent.info}</Markdown>
      )}
    </div>
  )
}

export default EventInfo
