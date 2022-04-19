import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import ProfileCard from './ProfileCard'

import { storiesConfig } from '.'

export default {
  ...storiesConfig,
  title: `${storiesConfig.title}/Debug`,
} as ComponentMeta<typeof ProfileCard>

const Template: ComponentStory<typeof ProfileCard> = (args) => (
  <ProfileCard {...args} />
)

export const NoProps_ProfileCard = Template.bind({})
NoProps_ProfileCard.storyName = 'No props'
NoProps_ProfileCard.args = {}
NoProps_ProfileCard.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const component = canvas.queryByTestId('ProfileCard')
  await expect(component).not.toBeInTheDocument()
}

export const OnlyName_ProfileCard = Template.bind({})
OnlyName_ProfileCard.storyName = 'Only name'
OnlyName_ProfileCard.args = {
  item: {
    id: 1,
    name: 'This is the name',
  }
}
