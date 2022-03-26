import Markdown from 'markdown-to-jsx'

import * as styles from './EventCard.module.css'

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

export default EventCard
