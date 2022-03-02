import useMapContext from '@contexts/Map'

import Map from '@components/Map'
import Loading from '@components/Loading'

export default function Home() {
  const { featureCollection } = useMapContext()
  console.log(featureCollection)
  return featureCollection ? (
    <Map featureCollection={featureCollection} />
  ) : (
    <Loading />
  )
}
