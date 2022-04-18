const path = require('path')

const PUBLIC_PATH = '/docs/';

module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  features: {
    interactionsDebugger: true,
  },
  staticDirs: ['../public/static'],
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@dev': path.resolve(__dirname, '../dev'),
      '@public': path.resolve(__dirname, '../public'),
      '@data': path.resolve(__dirname, '../public/data'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@containers': path.resolve(__dirname, '../src/containers'),
      '@contexts': path.resolve(__dirname, '../src/contexts'),
      '@hooks': path.resolve(__dirname, '../src/hooks'),
      '@lib': path.resolve(__dirname, '../src/lib'),
    }
    config.module.rules.push({
      test: /\.geojson$/,
      use: ['json-loader'],
    })
    return config
  },
  managerHead: (head, { configType }) => {
    if (configType === 'PRODUCTION') {
      return (`
        ${head}
        <base href="${PUBLIC_PATH}">
      `);
    }
  },
}
