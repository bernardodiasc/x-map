import { ComponentStory, ComponentMeta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import EventLocationCard from './EventLocationCard'

import { storiesConfig } from '.'

export default {
  ...storiesConfig
} as ComponentMeta<typeof EventLocationCard>

const Template: ComponentStory<typeof EventLocationCard> = (args) => (
  <EventLocationCard {...args} />
)

export const Default_EventLocationCard = Template.bind({})
Default_EventLocationCard.storyName = 'Demo'
Default_EventLocationCard.args = {
  onClick: action('onClick'),
  location: {
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
  }
}
Default_EventLocationCard.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const component = canvas.queryByTestId('EventLocationCard')
  await expect(component).toBeInTheDocument()
}
