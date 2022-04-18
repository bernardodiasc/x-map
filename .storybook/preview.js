import { configureActions } from '@storybook/addon-actions'
import * as NextImage from 'next/image'

import '../src/styles/globals.css'

export const parameters = {
  // actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    sort: 'requiredFirst',
  },
  options: {
    storySort: {
      order: [
        'Generic',
        [
          'Button',
        ],
        'Form',
        [
          'Form',
          'InputField',
          'InputError',
          'InputLabel',
        ],
        '*',
        'WIP'
      ],
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
