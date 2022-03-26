/*eslint-env node*/
const OFF = 0
const ERROR = 2
module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'next/core-web-vitals'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'plugins': ['react'],
  'rules': {
    'indent': [ERROR, 2],
    'linebreak-style': [ERROR, 'unix'],
    'quotes': [ERROR, 'single'],
    'semi': [ERROR, 'never'],
    'react/prop-types': [OFF]
  }
}
