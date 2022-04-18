import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import InputField from './InputField'

import { storiesConfig } from '.'

export default {
  ...storiesConfig
} as ComponentMeta<typeof InputField>

const Template: ComponentStory<typeof InputField> = (args) => (
  <InputField {...args} />
)

const getValueBackspace = value =>
  Array.from(value).map(() => ('{backspace}')).join('')

export const DefaultInputField = Template.bind({})
DefaultInputField.storyName = 'Demo'
DefaultInputField.args = { defaultValue: 'Lorem ipsum...' }
DefaultInputField.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByTestId('InputField-input') as HTMLInputElement
  await expect(input).toBeInTheDocument()

  let delay = 100
  let string
  const defaultValue = args.defaultValue
  await expect(input.value).toBe(defaultValue)

  delay = 10
  await userEvent.type(input, getValueBackspace(defaultValue), { delay })
  await expect(input.value).toBe('')

  delay = 100
  string = `${defaultValue} ${defaultValue}     `
  await userEvent.type(input, string, { delay })
  await expect(input.value).toBe(string)
  delay = 10
  await userEvent.type(input, getValueBackspace(string), { delay })

  delay = 10
  string = '█▓▒░ '
  await userEvent.type(input, string, { delay })
  await expect(input.value).toBe(string)
  delay = 5
  await userEvent.type(input, getValueBackspace(string), { delay })
  delay = 10
  string = '██▓▒░ '
  await userEvent.type(input, string, { delay })
  await expect(input.value).toBe(string)
  delay = 5
  await userEvent.type(input, getValueBackspace(string), { delay })
  delay = 10
  string = '▓██▓▒░ '
  await userEvent.type(input, string, { delay })
  await expect(input.value).toBe(string)
  delay = 5
  await userEvent.type(input, getValueBackspace(string), { delay })
  delay = 10
  string = '▒▓██▓▒░ '
  await userEvent.type(input, string, { delay })
  await expect(input.value).toBe(string)
  delay = 5
  await userEvent.type(input, getValueBackspace(string), { delay })
  delay = 10
  string = '░▒▓██▓▒░ '
  await userEvent.type(input, string, { delay })
  await expect(input.value).toBe(string)
  delay = 5
  await userEvent.type(input, getValueBackspace(string), { delay })
  delay = 10
  string = '░ ░▒▓██▓▒░ '
  await userEvent.type(input, string, { delay })
  await expect(input.value).toBe(string)
  delay = 5
  await userEvent.type(input, getValueBackspace(string), { delay })
  delay = 10
  string = '▒░ ░▒▓██▓▒░ '
  await userEvent.type(input, string, { delay })
  await expect(input.value).toBe(string)
  delay = 5
  await userEvent.type(input, getValueBackspace(string), { delay })
  delay = 10
  string = '▓▒░ ░▒▓██▓▒░ '
  await userEvent.type(input, string, { delay })
  await expect(input.value).toBe(string)
  delay = 5
  await userEvent.type(input, getValueBackspace(string), { delay })
  delay = 10
  string = '█▓▒░ ░▒▓██▓▒░ '
  await userEvent.type(input, string, { delay })
  await expect(input.value).toBe(string)
  delay = 5
  await userEvent.type(input, getValueBackspace(string), { delay })
  delay = 10
  string = '██▓▒░ ░▒▓██▓▒░ '
  await userEvent.type(input, string, { delay })
  await expect(input.value).toBe(string)
  delay = 5
  await userEvent.type(input, getValueBackspace(string), { delay })
  delay = 10
  string = '▓██▓▒░ ░▒▓██▓▒░ '
  await userEvent.type(input, string, { delay })
  await expect(input.value).toBe(string)
  delay = 5
  await userEvent.type(input, getValueBackspace(string), { delay })
  delay = 10
  string = '▒▓██▓▒░ ░▒▓██▓▒░ '
  await userEvent.type(input, string, { delay })
  await expect(input.value).toBe(string)
  delay = 5
  await userEvent.type(input, getValueBackspace(string), { delay })
  delay = 10
  string = '░▒▓██▓▒░ ░▒▓██▓▒░ '
  await userEvent.type(input, string, { delay })
  await expect(input.value).toBe(string)
  delay = 5
  await userEvent.type(input, getValueBackspace(string), { delay })

  delay = 20
  string = '░▒▓██▓▒░ '
  await userEvent.type(input, string, { delay })
  await expect(input.value).toBe(string)
  await userEvent.type(input, string, { delay })
  await expect(input.value).toBe(`${string}${string}`)
  await userEvent.type(input, string, { delay })
  await expect(input.value).toBe(`${string}${string}${string}`)
  await userEvent.type(input, string, { delay })
  await expect(input.value).toBe(`${string}${string}${string}${string}`)
  await userEvent.type(input, string, { delay })
  await expect(input.value).toBe(`${string}${string}${string}${string}${string}`)
  await userEvent.type(input, string, { delay })
  await expect(input.value).toBe(`${string}${string}${string}${string}${string}${string}`)
  delay = 5
  await userEvent.type(input, getValueBackspace(`${string}${string}${string}${string}${string}${string}`), { delay })
  await expect(input.value).toBe('')

  delay = 200
  const bksp = getValueBackspace('      ')
  const str1 = '▄ ▄ ▄ '
  const str2 = '■ ■ ■ '
  const str3 = '▀ ▀ ▀ '

  await userEvent.type(input, `${str1}`, { delay })
  await expect(input.value).toBe(`${str1}`)
  await userEvent.type(input, `${str2}`, { delay })
  await expect(input.value).toBe(`${str1}${str2}`)
  await userEvent.type(input, `${str3}`, { delay })
  await expect(input.value).toBe(`${str1}${str2}${str3}`)
  await userEvent.type(input, `${str2}`, { delay })
  await expect(input.value).toBe(`${str1}${str2}${str3}${str2}`)
  await userEvent.type(input, `${str1}`, { delay })
  await expect(input.value).toBe(`${str1}${str2}${str3}${str2}${str1}`)
  await userEvent.type(input, `${str2}`, { delay })
  await expect(input.value).toBe(`${str1}${str2}${str3}${str2}${str1}${str2}`)

  delay = 5
  await userEvent.type(input, `${bksp}`, { delay })
  await expect(input.value).toBe(`${str1}${str2}${str3}${str2}${str1}`)
  await userEvent.type(input, `${bksp}`, { delay })
  await expect(input.value).toBe(`${str1}${str2}${str3}${str2}`)

  delay = 50
  await userEvent.type(input, `${str1}${str2}`, { delay })
  await expect(input.value).toBe(`${str1}${str2}${str3}${str2}${str1}${str2}`)
  delay = 5
  await userEvent.type(input, `${bksp}${bksp}${bksp}${bksp}${bksp}${bksp}`, { delay })
  await expect(input.value).toBe('')

  delay = 100
  await userEvent.type(input, 'Looks like it\'s working :)', { delay })
}
