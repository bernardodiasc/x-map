import Image from 'next/image'

import * as styles from './MainHeader.module.css'

import logo from '@public/x-team-logo.svg'

const MainHeader = ({ children }) => {
  return (
    <div className={styles.component}>
      <div className={styles.logo}>
        <Image src={logo} width="109" alt="X-Team" />
      </div>
      <div className={styles.controls}>
        {children}
      </div>
    </div>
  )
}

export default MainHeader
