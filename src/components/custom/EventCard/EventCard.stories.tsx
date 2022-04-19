import { ComponentStory, ComponentMeta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import EventCard from './EventCard'

import { storiesConfig } from '.'

export default {
  ...storiesConfig
} as ComponentMeta<typeof EventCard>

const Template: ComponentStory<typeof EventCard> = (args) => (
  <EventCard {...args} />
)

export const Default_EventCard = Template.bind({})
Default_EventCard.storyName = 'Demo'
Default_EventCard.args = {
  onLocationClick: action('onLocationClick'),
  item: {
    id: 1,
    title: 'This is the title',
    locations: [
      {
        id: 1,
        address: 'This is the address',
        city: 'This is the city',
        country: 'This is the country',
        timezone: 'This is the timezone',
        latitude: '23',
        longitude: '46',
        start: '2022-04-19',
        end: '2023-04-19',
        coordinates: [
          23,
          46,
        ],
        title: 'This is the title',
        description: 'This is the description',
      },
    ],
  }
}
Default_EventCard.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const component = canvas.queryByTestId('EventCard')
  await expect(component).toBeInTheDocument()
}
