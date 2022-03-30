import Markdown from 'markdown-to-jsx'

import * as styles from './EventCard.module.css'

const EventCard = ({ item, inAccordion }) => {
  console.log(item)
  // TO DO:
  // - Display current location info
  // - Display other locations (make it clickable)
  // - Consider adding event images to the content-type
  // - Consider adding location info to the content-type
  return (
    <div>
      {!inAccordion && (
        <h1 className={styles.title}>{item.title}</h1>
      )}
      {item.info && (
        <Markdown>{item.info}</Markdown>
      )}
    </div>
  )
}

export default EventCard
