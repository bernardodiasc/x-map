import ProfileCard from '@components/custom/ProfileCard'
import CardList from '@components/custom/CardList'

import useAppContext from '@contexts/App'
import useMapContext from '@contexts/Map'

import { getProfilesByCoordinates } from '@lib/profiles'

const ProfileInfo = (): JSX.Element => {
  const { state: { collections } } = useAppContext()
  const { state: { selectedCoordinates } } = useMapContext()

  if (!selectedCoordinates) {
    return null
  }

  const selectedProfiles = getProfilesByCoordinates(collections.profiles, selectedCoordinates)

  return (
    <CardList
      Card={ProfileCard}
      data={selectedProfiles}
    />
  )
}

export default ProfileInfo
