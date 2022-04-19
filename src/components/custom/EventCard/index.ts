import EventCard from './EventCard'

export default EventCard

export const storiesConfig = {
  title: 'Custom/EventCard',
  component: EventCard,
  argTypes: {
    onLocationClick: { action: true },
  },
  parameters: {
    controls: {
      exclude: 'onLocationClick',
    }
  },
}
