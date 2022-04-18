import { ComponentStory, ComponentMeta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import Form from './Form'

import InputField from '@components/form/InputField'
// import { Default_InputField } from '@components/form/InputField/InputField.stories'
import InputError from '@components/form/InputError'
import { Default_InputError } from '@components/form/InputError/InputError.stories'
import InputLabel from '@components/form/InputLabel'
import { Default_InputLabel } from '@components/form/InputLabel/InputLabel.stories'
import { Prop_Invalid_InputLabel } from '@components/form/InputLabel/UseCases.stories'
import Button from '@components/generic/Button'
import { Default_Button } from '@components/generic/Button/Button.stories'

import { storiesConfig } from '.'

export default {
  ...storiesConfig,
  subcomponents: {
    InputField,
    InputError,
    InputLabel,
    Button,
  }
} as ComponentMeta<typeof Form>

const Template: ComponentStory<typeof Form> = (args) => (
  <Form
    onSubmit={action('Form onSubmit')}
    {...args}
  >
  </Form>
)

export const Default_Form = Template.bind({})
Default_Form.storyName = 'Demo'
Default_Form.args = {
  title: 'Form title!',
  description: 'This is a description field.',
  successMessage: 'This is a success message.',
  errorMessage: 'This is an error message.',
  children: (
    <>
      <Prop_Invalid_InputLabel {...Prop_Invalid_InputLabel.args} isRequired />
      <Default_InputLabel {...Default_InputLabel.args} />
      <Default_InputLabel {...Default_InputLabel.args} />
    </>
  ),
  control: (
    <>
      <Default_Button {...Default_Button.args} type="submit" wide>Submit</Default_Button>
      <Default_Button {...Default_Button.args} wide>Discard</Default_Button>
    </>
  ),
}
Default_Form.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const component = canvas.queryByTestId('Form')
  await expect(component).toBeInTheDocument()
  await expect(component).toHaveTextContent(args.title)
  await expect(component).toHaveTextContent(args.description)
  await expect(component).toHaveTextContent(args.successMessage)
  await expect(component).toHaveTextContent(args.errorMessage)
  await expect(component).toHaveTextContent(Prop_Invalid_InputLabel.args.title)
  // const input = canvas.getAllByDisplayValue(Default_InputField.args.defaultValue)
  // await expect(input[0].value).toHaveTextContent(Default_InputField.args.defaultValue)
  await expect(component).toHaveTextContent(Default_InputError.args.children)
  await expect(component).toHaveTextContent('Submit')
  await expect(component).toHaveTextContent('Discard')
}
