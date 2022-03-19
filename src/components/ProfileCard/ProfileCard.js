import * as styles from './ProfileCard.module.css'

const ProfileCard = ({ item, inAccordion }) => {
  console.log(item.avatar)
  return (
    <div className={[styles.profile, inAccordion ? styles.accordion : ''].join(' ')}>
      <div className={styles.avatar} style={{ backgroundImage: item.avatar ? 'none' : 'url(/avatar.png)' }}>
        <div className={styles.avatar} style={{ backgroundImage: item.avatar ? `url(${item.avatar.url})` : 'none' }} />
      </div>
      {!inAccordion && (
        <h3 className={styles.name}>{item.name}</h3>
      )}
      {item.about && (
        <p className={styles.paragraph}><strong>About: </strong> {item.about}</p>
      )}
      {item.website && (
        <p className={styles.paragraph}><strong>Website: </strong> <a href={item.website} target="_blank" rel="noreferrer">{item.website}</a></p>
      )}
      {item.github && (
        <p className={styles.paragraph}><strong>GitHub: </strong> <a href={`https://github.com/${item.github}`} target="_blank" rel="noreferrer">{item.github}</a></p>
      )}
      {item.stackoverflow && (
        <p className={styles.paragraph}><strong>StackOverflow: </strong> <a href={`https://stackoverflow.com/users/${item.stackoverflow}`} target="_blank" rel="noreferrer">{item.stackoverflow}</a></p>
      )}
      {item.linkedin && (
        <p className={styles.paragraph}><strong>LinkedIn: </strong> <a href={`https://linkedin.com/in/${item.linkedin}`} target="_blank" rel="noreferrer">{item.linkedin}</a></p>
      )}
      {item.twitter && (
        <p className={styles.paragraph}><strong>Twitter: </strong> <a href={`https://twitter.com/${item.twitter}`} target="_blank" rel="noreferrer">{item.twitter}</a></p>
      )}
      {item.instagram && (
        <p className={styles.paragraph}><strong>Instagram: </strong> <a href={`https://instagram.com/${item.instagram}`} target="_blank" rel="noreferrer">{item.instagram}</a></p>
      )}
    </div>
  )
}

export default ProfileCard
