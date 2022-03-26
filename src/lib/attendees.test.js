import {
  normalizeAttendeeApiData,
  normalizeAttendeesApiData,
} from './attendees'

const attendee = {
  id: 11,
  attributes: {
    profile: {
      data: {
        id: 22
      }
    }
  }
}

describe('Attendees library', () => {
  it('normalizeAttendeeApiData', () => {
    expect(normalizeAttendeeApiData(attendee)).toBe(22)
  })
})
