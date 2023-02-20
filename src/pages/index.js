import useAppContext from '@contexts/App'
import useMapContext from '@contexts/Map'

import Map from '@components/Map'
import Loading from '@components/generic/Loading'

export default function Home() {
  const { state: { isLoadingApp, hasErrors } } = useAppContext()
  const { state: { featureCollection } } = useMapContext()

  return Boolean(!isLoadingApp && featureCollection) || hasErrors ? (
    <Map featureCollection={featureCollection} />
  ) : (
    <Loading />
  )
}
