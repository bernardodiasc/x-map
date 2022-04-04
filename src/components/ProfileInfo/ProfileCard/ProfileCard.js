import Image from 'next/image'

import Svg from '@components/Svg'

import { getFormattedLocationTitle } from '@lib/locations'

import * as styles from './ProfileCard.module.css'

const ProfileCard = ({ item, inAccordion }) => {
  const formattedLocationTitle = getFormattedLocationTitle(item.location)
  return (
    <div className={[styles.profile, inAccordion ? styles.accordion : ''].join(' ')}>
      <div className={styles.avatar}>
        {item.avatar ? (
          <Image
            className={styles.image}
            src={item.avatar ? item.avatar.url : '/avatar.png'}
            alt={item.name}
            width="200"
            height="200"
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <Svg name="avatar" width="200" height="200" />
        )}
      </div>
      <div className={styles.info}>
        <h2 className={styles.name}>{item.name}</h2>
        {!inAccordion && (
          <div className={styles.location}>
            <Svg name="marker" width="18" height="18" />
            {formattedLocationTitle}
          </div>
        )}
        {item.location.timezone && (
          <div className={styles.timezone}>
            <Svg name="clock" width="16" height="16" />
            {item.location.timezone}
          </div>
        )}
        {item.about && (
          <p className={styles.about}>{item.about}</p>
        )}
        <div className={styles.links}>
          {item.website && (
            <a
              href={`http://${item.website}`}
              title={`http://${item.website}`}
              target="_blank"
              rel="noreferrer"
            >
              <Svg name="website" width="32" height="32" />
            </a>
          )}
          {item.github && (
            <a
              href={`https://github.com/${item.github}`}
              title={`https://github.com/${item.github}`}
              target="_blank"
              rel="noreferrer"
            >
              <Svg name="github" width="32" height="32" />
            </a>
          )}
          {item.stackoverflow && (
            <a
              href={`https://stackoverflow.com/users/${item.stackoverflow}`}
              title={`https://stackoverflow.com/users/${item.stackoverflow}`}
              target="_blank"
              rel="noreferrer"
            >
              <Svg name="stackoverflow" width="32" height="32" />
            </a>
          )}
          {item.linkedin && (
            <a
              href={`https://linkedin.com/in/${item.linkedin}`}
              title={`https://linkedin.com/in/${item.linkedin}`}
              target="_blank"
              rel="noreferrer"
            >
              <Svg name="linkedin" width="32" height="32" />
            </a>
          )}
          {item.twitter && (
            <a
              href={`https://twitter.com/${item.twitter}`}
              title={`https://twitter.com/${item.twitter}`}
              target="_blank"
              rel="noreferrer"
            >
              <Svg name="twitter" width="32" height="32" />
            </a>
          )}
          {item.instagram && (
            <a
              href={`https://instagram.com/${item.instagram}`}
              title={`https://instagram.com/${item.instagram}`}
              target="_blank"
              rel="noreferrer"
            >
              <Svg name="instagram" width="32" height="32" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
