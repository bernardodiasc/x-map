import useAppContext from '@contexts/App'
import useMapContext from '@contexts/Map'

import MainMenu from '@components/MainMenu'
import Svg from '@components/generic/Svg'

import * as styles from './AppHeader.module.css'

const AppHeader = () => {
  const {
    state: { isLoadingApp },
  } = useAppContext()

  const {
    state: { selectedCollection },
  } = useMapContext()

  const handleClickOnLogo = () => {
    if (window.appMainMap) {
      window.appMainMap.setCenter({ lat: 0, lng: 0 })
      window.appMainMap.setZoom(2)
    }
  }

  return (
    <div className={styles.component}>
      <div className={styles.logo} onClick={handleClickOnLogo}>
        <Svg name="map" width="56" height="56" />
        <Svg name="xteam" width="109" height="46" />
      </div>

      <div className={styles.controls}>
        <p className={styles.collectionLabel}>{selectedCollection}</p>
        <div className={styles.message}>
          {/*
            TO DO: add some sort of instruction based on the profile state.
          */}
        </div>
        {!isLoadingApp && <MainMenu />}
      </div>
    </div>
  )
}

export default AppHeader
