export const normalizeAttendeeApiData = attendee => {
  const profileId = attendee.attributes.profile?.data?.id
  return profileId
}

export const normalizeAttendeesApiData = apiData => apiData?.data
  ? apiData.data.map(normalizeAttendeeApiData)
  : undefined
