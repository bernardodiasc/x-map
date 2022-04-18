import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import InputLabel from './InputLabel'

import InputField from '../InputField'
import { Default_InputField } from '../InputField/InputField.stories'
import InputError from '../InputError'
import { Default_InputError } from '../InputError/InputError.stories'

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

export const Prop_Invalid_InputLabel = Template.bind({})
Prop_Invalid_InputLabel.storyName = 'Invalid field'
Prop_Invalid_InputLabel.args = {
  title: 'This is a label:',
  isRequired: true,
  children: (
    <>
      <Default_InputField {...Default_InputField.args} invalid />
      <Default_InputError {...Default_InputError.args} />
    </>
  )
}
Prop_Invalid_InputLabel.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const component = canvas.queryByTestId('InputLabel')
  await expect(component).toBeInTheDocument()
  await expect(component).toHaveTextContent(args.title)
  await expect(component).toHaveTextContent('*')
  await expect(component).toHaveTextContent(Default_InputError.args.children)
}
