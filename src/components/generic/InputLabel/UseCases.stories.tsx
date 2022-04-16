import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import InputLabel from './InputLabel'

import InputField from '../InputField'
import { DefaultInputField } from '../InputField/InputField.stories'
import InputError from '../InputError'
import { DefaultInputError } from '../InputError/InputError.stories'

import { storiesConfig } from '.'

export default {
  ...storiesConfig,
  title: `${storiesConfig.title}/Use Cases`,
  subcomponents: {
    InputField,
    InputError,
  }
} as ComponentMeta<typeof InputLabel>

const Template: ComponentStory<typeof InputLabel> = (args) => (
  <InputLabel {...args} />
)

export const InvalidInputLabel = Template.bind({})
InvalidInputLabel.storyName = 'Invalid field'
InvalidInputLabel.args = {
  title: 'This is a label:',
  isRequired: true,
  children: (
    <>
      <DefaultInputField {...DefaultInputField.args} invalid />
      <DefaultInputError {...DefaultInputError.args} />
    </>
  )
}
InvalidInputLabel.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const component = canvas.queryByTestId('InputLabel')
  await expect(component).toBeInTheDocument()
  await expect(component).toHaveTextContent(args.title)
  await expect(component).toHaveTextContent('*')
  await expect(component).toHaveTextContent(DefaultInputError.args.children)
}
