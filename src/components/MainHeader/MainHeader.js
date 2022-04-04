import Svg from '@components/Svg'

import * as styles from './MainHeader.module.css'

const MainHeader = ({ children }) => {
  return (
    <div className={styles.component}>
      <div className={styles.logo}>
        <Svg name="map" width="56" height="56" />
        <Svg name="xteam" width="109" height="46" />
      </div>
      <div className={styles.controls}>
        {children}
      </div>
    </div>
  )
}

export default MainHeader
