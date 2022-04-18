import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import InputLabel from './InputLabel'

// TO DO: make webpack alias to work
import InputField from '../InputField'
import { DefaultInputField } from '../InputField/InputField.stories'
import InputError from '../InputError'
import { DefaultInputError } from '../InputError/InputError.stories'

import { storiesConfig } from '.'

export default {
  ...storiesConfig,
  // TO DO: make sub-components control tables appear
  // https://storybook.js.org/docs/react/writing-stories/stories-for-multiple-components
  subcomponents: {
    InputField,
    InputError,
  }
} as ComponentMeta<typeof InputLabel>

const Template: ComponentStory<typeof InputLabel> = (args) => (
  <InputLabel {...args} />
)

export const DefaultInputLabel = Template.bind({})
DefaultInputLabel.storyName = 'Demo'
DefaultInputLabel.args = {
  title: 'This is the label',
  isRequired: false,
  children: (
    <>
      <DefaultInputField {...DefaultInputField.args} />
      <DefaultInputError {...DefaultInputError.args} hasError={false} />
    </>
  )
}
DefaultInputLabel.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const component = canvas.queryByTestId('InputLabel')
  await expect(component).toBeInTheDocument()
  await expect(component).toHaveTextContent(args.title)
  await expect(component).not.toHaveTextContent('*')
  await expect(component).not.toHaveTextContent(DefaultInputError.args.children)
}

