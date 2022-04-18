import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import Loading from './Loading'

import { storiesConfig } from '.'

export default {
  ...storiesConfig,
  title: `${storiesConfig.title}/Debug`,
} as ComponentMeta<typeof Loading>

const Template: ComponentStory<typeof Loading> = (args) => (
  <Loading {...args} />
)

export const NoProps_Loading = Template.bind({})
NoProps_Loading.storyName = 'No props'
NoProps_Loading.args = {}
NoProps_Loading.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const component = canvas.queryByTestId('Loading')
  await expect(component).toBeInTheDocument()
}
