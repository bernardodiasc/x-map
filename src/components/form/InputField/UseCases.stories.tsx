import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import InputField from './InputField'

import { storiesConfig } from '.'

export default {
  ...storiesConfig,
  title: `${storiesConfig.title}/Use Cases`,
  argTypes: {
    ...storiesConfig.argTypes,
    defaultValue: {
      ...storiesConfig.argTypes.defaultValue,
      defaultValue: 'Lorem ipsum sit dolor amet...',
    },
  },
  parameters: {
    ...storiesConfig.parameters,
    storySort: {
      order: [ // TO DO: fix sorting
        'Prop: prefix',
        'Prop: invalid',
        'Prop: disabled',
        'Props: prefix, invalid',
        'Props: prefix, invalid, disabled',
        'Prop: type: "password"',
        'Prop: type: "number"',
        'Prop: type: "date"',
        'Prop: type: "time"',
      ],
    },
  },
} as ComponentMeta<typeof InputField>

const Template: ComponentStory<typeof InputField> = (args) => (
  <InputField {...args} />
)

export const Props_Disabled_InputField = Template.bind({})
Props_Disabled_InputField.storyName = 'Prop: disabled'
Props_Disabled_InputField.args = { disabled: true }
Props_Disabled_InputField.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByTestId('InputField-input') as HTMLInputElement
  await userEvent.type(input, 'Trying to type anything...', { delay: 1 })
  await expect(input.value).toBe(args.defaultValue)
}

export const Prop_Invalid_InputField = Template.bind({})
Prop_Invalid_InputField.storyName = 'Prop: invalid'
Prop_Invalid_InputField.args = { invalid: true }

export const Prop_Prefix_InputField = Template.bind({})
Prop_Prefix_InputField.storyName = 'Prop: prefix'
Prop_Prefix_InputField.args = { prefix: 'https://' }

export const Props_PrefixAndInvalid_InputField = Template.bind({})
Props_PrefixAndInvalid_InputField.storyName = 'Props: prefix, invalid'
Props_PrefixAndInvalid_InputField.args = {
  prefix: 'https://',
  invalid: true,
}

export const Props_PrefixInvalidDisabled_InputField = Template.bind({})
Props_PrefixInvalidDisabled_InputField.storyName = 'Props: prefix, invalid, disabled'
Props_PrefixInvalidDisabled_InputField.args = {
  prefix: 'https://',
  invalid: true,
  disabled: true,
}

export const Prop_Type_passoword_InputField = Template.bind({})
Prop_Type_passoword_InputField.storyName = 'Prop: type: "password"'
Prop_Type_passoword_InputField.args = { type: 'password' }

export const Prop_Type_date_InputField = Template.bind({})
Prop_Type_date_InputField.storyName = 'Prop: type: "date"'
Prop_Type_date_InputField.args = { type: 'date', defaultValue: '2022-04-15' }

export const Prop_Type_time_InputField = Template.bind({})
Prop_Type_time_InputField.storyName = 'Prop: type: "time"'
Prop_Type_time_InputField.args = { type: 'time', defaultValue: '20:09:22' }

export const Prop_Type_number_InputField = Template.bind({})
Prop_Type_number_InputField.storyName = 'Prop: type: "number"'
Prop_Type_number_InputField.args = { type: 'number', defaultValue: '5' }

export const Prop_Type_color_InputField = Template.bind({})
Prop_Type_color_InputField.storyName = 'Prop: type: "color"'
Prop_Type_color_InputField.args = { type: 'color', defaultValue: '#FFFF00' }
// TO DO: fix control type
// Prop_Type_color_InputField.argTypes = { type: { color: { control: 'color' } } }
