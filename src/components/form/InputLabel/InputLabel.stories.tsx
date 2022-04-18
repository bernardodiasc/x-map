import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import InputLabel from './InputLabel'

// TO DO: make webpack alias to work
import InputField from '../InputField'
import { Default_InputField } from '../InputField/InputField.stories'
import InputError from '../InputError'
import { Default_InputError } from '../InputError/InputError.stories'

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

export const Default_InputLabel = Template.bind({})
Default_InputLabel.storyName = 'Demo'
Default_InputLabel.args = {
  title: 'This is the label',
  isRequired: false,
  children: (
    <>
      <Default_InputField {...Default_InputField.args} />
      <Default_InputError {...Default_InputError.args} hasError={false} />
    </>
  )
}
Default_InputLabel.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const component = canvas.queryByTestId('InputLabel')
  await expect(component).toBeInTheDocument()
  await expect(component).toHaveTextContent(args.title)
  await expect(component).not.toHaveTextContent('*')
  await expect(component).not.toHaveTextContent(Default_InputError.args.children)
}

