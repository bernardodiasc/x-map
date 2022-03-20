import Image from 'next/image'

import * as styles from './ShowThumbnails.module.css'

const ShowThumbnails = ({ images = {} }) => {
  const imageKeys = Object.keys(images)
  return imageKeys.length > 0 ? (
    <div className={styles.component}>
      {imageKeys.map(key => {
        const file = images[key]
        return file ? (
          <div key={`thumbnail-${key}`} className={styles.thumb}>
            <div className={styles.thumbInner}>
              <Image
                className={styles.img}
                src={file.url || file.preview}
                alt={file.alt || file.path}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        ) : null
      })}
    </div>
  ) : null
}

export default ShowThumbnails
