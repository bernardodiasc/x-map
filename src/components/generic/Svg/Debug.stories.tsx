import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import Svg from './Svg'

import { storiesConfig } from '.'

export default {
  ...storiesConfig,
  title: `${storiesConfig.title}/Debug`,
} as ComponentMeta<typeof Svg>

const Template: ComponentStory<typeof Svg> = (args) => (
  <Svg {...args} />
)

export const NoProps_Svg = Template.bind({})
NoProps_Svg.storyName = 'No props'
NoProps_Svg.args = {}
NoProps_Svg.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const component = canvas.queryByTestId('Svg')
  await expect(component).not.toBeInTheDocument()
}
