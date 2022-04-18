import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import Loading from './Loading'

import { storiesConfig } from '.'

export default {
  ...storiesConfig
} as ComponentMeta<typeof Loading>

const Template: ComponentStory<typeof Loading> = (args) => (
  <Loading {...args} />
)

export const Default_Loading = Template.bind({})
Default_Loading.storyName = 'Demo'
Default_Loading.args = {}
Default_Loading.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const component = canvas.queryByTestId('Loading')
  await expect(component).toBeInTheDocument()
}

