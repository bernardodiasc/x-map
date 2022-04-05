import ProfileCard from '@components/ProfileInfo/ProfileCard'
import AccordionCards from '@components/AccordionCards'

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
      label='name'
    />
  )
}

export default ProfileInfo
