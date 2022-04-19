import EventLocationCard from './EventLocationCard'

export default EventLocationCard

export const storiesConfig = {
  title: 'Custom/EventLocationCard',
  component: EventLocationCard,
  argTypes: {
    onClick: { action: true },
  },
  parameters: {
    controls: {
      exclude: 'onClick',
    }
  },
}
