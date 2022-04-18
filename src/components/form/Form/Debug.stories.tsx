import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import Form from './Form'

import { storiesConfig } from '.'

export default {
  ...storiesConfig,
  title: `${storiesConfig.title}/Debug`,
} as ComponentMeta<typeof Form>

const Template: ComponentStory<typeof Form> = (args) => <Form {...args} />

export const NoProps_Form = Template.bind({})
NoProps_Form.storyName = 'No props'
NoProps_Form.args = {}
NoProps_Form.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const component = canvas.queryByTestId('Form')
  await expect(component).not.toBeInTheDocument()
}
