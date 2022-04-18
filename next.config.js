const path = require('path')

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@dev': path.resolve(__dirname, './dev'),
      '@public': path.resolve(__dirname, './public'),
      '@data': path.resolve(__dirname, './public/data'),
      '@components': path.resolve(__dirname, './src/components'),
      '@containers': path.resolve(__dirname, './src/containers'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@lib': path.resolve(__dirname, './src/lib'),
    }

    config.module.rules.push({
      test: /\.geojson$/,
      use: ['json-loader']
    })

    return config
  }
}
