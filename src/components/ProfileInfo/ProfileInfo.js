import AccordionCards from '@components/AccordionCards'
import ProfileCard from '@components/ProfileCard'

import useAppContext from '@contexts/App'
import useMapContext from '@contexts/Map'

import { getRecordsByCoordinates } from '@lib/locations'

import * as styles from './ProfileInfo.module.css'

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
