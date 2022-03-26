import ProfileCard from '@components/ProfileInfo/ProfileCard'
import AccordionCards from '@components/AccordionCards'

import useAppContext from '@contexts/App'
import useMapContext from '@contexts/Map'

import { getRecordsByCoordinates } from '@lib/locations'

const ProfileInfo = ({ children }) => {
  const { state: { collections } } = useAppContext()
  const { state: { selectedCoordinates } } = useMapContext()

  const selectedProfiles = getRecordsByCoordinates(collections.profiles, selectedCoordinates)

  return (
    <AccordionCards
      Card={ProfileCard}
      data={selectedProfiles}
      label='name'
    />
  )
}

export default ProfileInfo
