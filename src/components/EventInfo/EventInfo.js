import Markdown from 'markdown-to-jsx'

import AccordionCards from '@components/AccordionCards'

import useAppContext from '@contexts/App'
import useMapContext from '@contexts/Map'

import { getRecordsByCoordinates } from '@lib/locations'

import * as styles from './EventInfo.module.css'

const EventInfo = () => {
  const { state: { collections } } = useAppContext()
  const { state: { selectedCoordinates } } = useMapContext()

  const selectedEvents = getRecordsByCoordinates(collections.events, selectedCoordinates)

  const EventCard = ({ item, inAccordion }) => (
    <div>
      {!inAccordion && (
        <h1 className={styles.title}>{item.title}</h1>
      )}
      {item.info && (
        <Markdown>{item.info}</Markdown>
      )}
    </div>
  )

  return (
    <AccordionCards
      Card={EventCard}
      data={selectedEvents}
      label='title'
    />
  )
}

export default EventInfo
