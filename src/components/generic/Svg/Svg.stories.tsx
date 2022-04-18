import { ComponentStory, ComponentMeta } from '@storybook/react'

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
