import { configureActions } from '@storybook/addon-actions'
import * as NextImage from 'next/image'

import '../src/styles/globals.css'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      // order: ['Intro', 'Pages', ['Home', 'Login', 'Admin'], 'Components', '*', 'WIP'],
    },
  },
}

// Actions logger config
configureActions({
  depth: 10,
  clearOnStoryChange: true,
  limit: 50,
})

// Replace NextJS Image with unoptimized version
const OriginalNextImage = NextImage.default
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
})
