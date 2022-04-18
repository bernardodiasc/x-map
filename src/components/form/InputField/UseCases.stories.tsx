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

export const Props_Invalid_InputField = Template.bind({})
Props_Invalid_InputField.storyName = 'Prop: invalid'
Props_Invalid_InputField.args = { invalid: true }

export const Props_Prefix_InputField = Template.bind({})
Props_Prefix_InputField.storyName = 'Prop: prefix'
Props_Prefix_InputField.args = { prefix: 'https://' }

export const PrefixAndInvalid_InputField = Template.bind({})
PrefixAndInvalid_InputField.storyName = 'Props: prefix, invalid'
PrefixAndInvalid_InputField.args = {
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

export const PropType_Passoword_InputField = Template.bind({})
PropType_Passoword_InputField.storyName = 'Prop: type: "password"'
PropType_Passoword_InputField.args = { type: 'password' }

export const PropType_Date_InputField = Template.bind({})
PropType_Date_InputField.storyName = 'Prop: type: "date"'
PropType_Date_InputField.args = { type: 'date', defaultValue: '2022-04-15' }

export const PropType_Time_InputField = Template.bind({})
PropType_Time_InputField.storyName = 'Prop: type: "time"'
PropType_Time_InputField.args = { type: 'time', defaultValue: '20:09:22' }

export const PropType_Number_InputField = Template.bind({})
PropType_Number_InputField.storyName = 'Prop: type: "number"'
PropType_Number_InputField.args = { type: 'number', defaultValue: '5' }

export const PropType_Color_InputField = Template.bind({})
PropType_Color_InputField.storyName = 'Prop: type: "color"'
PropType_Color_InputField.args = { type: 'color', defaultValue: '#FFFF00' }
// TO DO: fix control type
PropType_Color_InputField.argTypes = { type: { color: { control: 'color' } } }
