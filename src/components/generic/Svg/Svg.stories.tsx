import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import Svg from './Svg'

import { storiesConfig } from '.'

export default {
  ...storiesConfig
} as ComponentMeta<typeof Svg>

const Template: ComponentStory<typeof Svg> = (args) => (
  <Svg {...args} />
)

export const Default_Svg = Template.bind({})
Default_Svg.storyName = 'Demo'
Default_Svg.args = {
  name: 'xteam'
}
Default_Svg.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const component = canvas.queryByTestId('Svg')
  await expect(component).toBeInTheDocument()
}
