import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import EventCard from './EventCard'

import { storiesConfig } from '.'

export default {
  ...storiesConfig,
  title: `${storiesConfig.title}/Debug`,
} as ComponentMeta<typeof EventCard>

const Template: ComponentStory<typeof EventCard> = (args) => (
  <EventCard {...args} />
)

export const NoProps_EventCard = Template.bind({})
NoProps_EventCard.storyName = 'No props'
NoProps_EventCard.args = {}
NoProps_EventCard.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const component = canvas.queryByTestId('EventCard')
  await expect(component).not.toBeInTheDocument()
}

export const OnlyTitle_ProfileCard = Template.bind({})
OnlyTitle_ProfileCard.storyName = 'Only title'
OnlyTitle_ProfileCard.args = {
  item: {
    id: 1,
    title: 'This is the title',
  }
}

