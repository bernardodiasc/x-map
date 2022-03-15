import { useState } from 'react'

import * as styles from './AccordionCards.module.css'

const AccordionCards = ({ Card, data, label }) => {
  const [expanded, setExpanded] = useState(0)

  const toggle = (i) => () => {
    setExpanded(i)
  }

  return data.length > 1 ? (
    <div className={styles.component}>
      {/* <h2 className={styles.title}>{selectedFeature.location}</h2> */}
      {data.map((item, i) => (
        <div
          key={`profile-${item.id}`}
          className={[
            styles.item,
            expanded === i ? styles.expandedItem : styles.item
          ].join(' ')}
        >
          <h3
            className={styles.button}
            onClick={toggle(i)}
          >
            {item[label]}
          </h3>
          <div className={styles.content}>
            <Card item={item} inAccordion />
          </div>
        </div>
      ))}
    </div>
  ) : (
    <Card item={data[0]} />
  )
}

export default AccordionCards
