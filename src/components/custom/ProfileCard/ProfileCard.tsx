import Image from 'next/image'
import ct from 'countries-and-timezones'

import Svg from '@components/generic/Svg'

import styles from './ProfileCard.module.css'

type Props = {
  item?: any // TO DO: add correct type for Profile
}

const ProfileCard = ({ item }: Props): JSX.Element => {
  if (!item) {
    return null
  }

  let timezone
  if (item.location?.timezone) {
    const { utcOffsetStr } = ct.getTimezone(item.location.timezone)
    timezone = `UTC ${utcOffsetStr}`
  }

  return (
    <div
      data-testid="ProfileCard"
      className={styles.component}
    >
      <div className={styles.avatar}>
        <Image
          className={styles.image}
          src={item.avatar ? item.avatar.url : '/static/avatar.png'}
          alt={item.avatar ? item.avatar.alt : item.name}
          width="200"
          height="200"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={styles.info}>
        <h2 className={styles.name}>{item.name}</h2>
        {timezone && (
          <div className={styles.timezone}>
            <Svg name="clock" width="16" height="16" />
            {timezone}
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
              <Svg name="website" width="38" height="38" />
            </a>
          )}
          {item.github && (
            <a
              href={`https://github.com/${item.github}`}
              title={`https://github.com/${item.github}`}
              target="_blank"
              rel="noreferrer"
            >
              <Svg name="github" width="38" height="38" />
            </a>
          )}
          {item.stackoverflow && (
            <a
              href={`https://stackoverflow.com/users/${item.stackoverflow}`}
              title={`https://stackoverflow.com/users/${item.stackoverflow}`}
              target="_blank"
              rel="noreferrer"
            >
              <Svg name="stackoverflow" width="38" height="38" />
            </a>
          )}
          {item.linkedin && (
            <a
              href={`https://linkedin.com/in/${item.linkedin}`}
              title={`https://linkedin.com/in/${item.linkedin}`}
              target="_blank"
              rel="noreferrer"
            >
              <Svg name="linkedin" width="38" height="38" />
            </a>
          )}
          {item.twitter && (
            <a
              href={`https://twitter.com/${item.twitter}`}
              title={`https://twitter.com/${item.twitter}`}
              target="_blank"
              rel="noreferrer"
            >
              <Svg name="twitter" width="38" height="38" />
            </a>
          )}
          {item.instagram && (
            <a
              href={`https://instagram.com/${item.instagram}`}
              title={`https://instagram.com/${item.instagram}`}
              target="_blank"
              rel="noreferrer"
            >
              <Svg name="instagram" width="38" height="38" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
