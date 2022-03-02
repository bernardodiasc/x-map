import AppHeader from '@components/AppHeader'

import * as styles from './AppLayout.module.css'

const AppLayout = ({ children }) => {
  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <AppHeader />
      </div>
      <div className={styles.children}>
        {children}
      </div>
    </main>
  )
}

export default AppLayout
