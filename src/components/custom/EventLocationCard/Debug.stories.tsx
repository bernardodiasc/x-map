import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import EventLocationCard from './EventLocationCard'

import { storiesConfig } from '.'

export default {
  ...storiesConfig,
  title: `${storiesConfig.title}/Debug`,
} as ComponentMeta<typeof EventLocationCard>

const Template: ComponentStory<typeof EventLocationCard> = (args) => (
  <EventLocationCard {...args} />
)

export const NoProps_EventLocationCard = Template.bind({})
NoProps_EventLocationCard.storyName = 'No props'
NoProps_EventLocationCard.args = {}
NoProps_EventLocationCard.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const component = canvas.queryByTestId('EventLocationCard')
  await expect(component).not.toBeInTheDocument()
}
