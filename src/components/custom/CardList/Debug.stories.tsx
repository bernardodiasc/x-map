import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import CardList from './CardList'

import { storiesConfig } from '.'

export default {
  ...storiesConfig,
  title: `${storiesConfig.title}/Debug`,
} as ComponentMeta<typeof CardList>

const Template: ComponentStory<typeof CardList> = (args) => (
  <CardList {...args} />
)

export const NoProps_CardList = Template.bind({})
NoProps_CardList.storyName = 'No props'
NoProps_CardList.args = {}
NoProps_CardList.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const component = canvas.queryByTestId('CardList')
  await expect(component).not.toBeInTheDocument()
}

export const InvalidData_CardList = Template.bind({})
InvalidData_CardList.storyName = 'Basic card and data samples'
InvalidData_CardList.args = {
  Card: ({ item }) => item,
  title: 'This is the title',
  data: ['Testing...', 'Testing...', 'Testing...', 'Testing...'],
}
InvalidData_CardList.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const component = canvas.queryByTestId('CardList')
  const title = canvas.queryByTestId('CardList-title')
  await expect(component).toBeInTheDocument()
  await expect(title).toHaveTextContent(args.title)
  await expect(component).toHaveTextContent(args.data[0])
}
