import ProfileCard from '@components/custom/ProfileCard'
import AccordionCards from '@components/custom/CardLists'

import useAppContext from '@contexts/App'
import useMapContext from '@contexts/Map'

import { getProfilesByCoordinates } from '@lib/profiles'

const ProfileInfo = () => {
  const { state: { collections } } = useAppContext()
  const { state: { selectedCoordinates } } = useMapContext()

  if (!selectedCoordinates) {
    return null
  }

  const selectedProfiles = getProfilesByCoordinates(collections.profiles, selectedCoordinates)

  return (
    <AccordionCards
      Card={ProfileCard}
      data={selectedProfiles}
    />
  )
}

export default ProfileInfo
