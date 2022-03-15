import * as styles from './ProfileCard.module.css'

const ProfileCard = ({ profile, inAccordion }) => (
  <div className={[styles.profile, inAccordion ? styles.accordion : ''].join(' ')}>
    <div className={styles.avatar} style={{ backgroundImage: `url(/avatar.png)` }}>
      <div className={styles.avatar} style={{ backgroundImage: `url(/profiles/${profile.uid}/avatar.jpg)` }} />
    </div>
    {!inAccordion && (
      <h3 className={styles.name}>{profile.name}</h3>
    )}
    {profile.role && (
      <p className={styles.paragraph}><strong>Role: </strong> {profile.role}</p>
    )}
    {profile.location && (
      <p className={styles.paragraph}><strong>Location: </strong> {profile.location}</p>
    )}
    {profile.timezone && (
      <p className={styles.paragraph}><strong>Timezone: </strong> {profile.timezone}</p>
    )}
    {profile.github && (
      <p className={styles.paragraph}><strong>GitHub: </strong> <a href={`https://github.com/${profile.github}`} target="_blank" rel="noreferrer">{profile.github}</a></p>
    )}
    {profile.stackoverflow && (
      <p className={styles.paragraph}><strong>StackOverflow: </strong> <a href={`https://stackoverflow.com/users/${profile.stackoverflow}`} target="_blank" rel="noreferrer">{profile.stackoverflow}</a></p>
    )}
    {profile.linkedin && (
      <p className={styles.paragraph}><strong>LinkedIn: </strong> <a href={`https://linkedin.com/in/${profile.linkedin}`} target="_blank" rel="noreferrer">{profile.linkedin}</a></p>
    )}
    {profile.twitter && (
      <p className={styles.paragraph}><strong>Twitter: </strong> <a href={`https://twitter.com/${profile.twitter}`} target="_blank" rel="noreferrer">{profile.twitter}</a></p>
    )}
    {profile.instagram && (
      <p className={styles.paragraph}><strong>Instagram: </strong> <a href={`https://instagram.com/${profile.instagram}`} target="_blank" rel="noreferrer">{profile.instagram}</a></p>
    )}
  </div>
)

export default ProfileCard
