import useAppContext from '@contexts/App'
import useMapContext from '@contexts/Map'

import Map from '@components/Map'
import Loading from '@components/Loading'

export default function Home() {
  const { state: { isLoadingApp } } = useAppContext()
  const { state: { featureCollection } } = useMapContext()
  return !isLoadingApp && featureCollection ? (
    <Map featureCollection={featureCollection} />
  ) : (
    <Loading />
  )
}
