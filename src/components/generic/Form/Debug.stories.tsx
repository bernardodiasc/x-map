import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import Form from './Form'

export default {
  title: 'Generic/Form/Debug',
  component: Form
} as ComponentMeta<typeof Form>

const Template: ComponentStory<typeof Form> = (args) => <Form {...args} />

export const BlankStory = Template.bind({})
BlankStory.storyName = 'No props'
BlankStory.args = {}
BlankStory.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const component = canvas.queryByTestId('Form')
  await expect(component).not.toBeInTheDocument()
}
