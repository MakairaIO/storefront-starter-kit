require('dotenv').config()

const withCss = require('@zeit/next-css')
const path = require('path')
const Dotenv = require('dotenv-webpack')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(
  withCss({
    webpack: (config) => {
      config.plugins = config.plugins || []

      config.plugins = [
        ...config.plugins,

        // Read the .env file
        new Dotenv({
          path: path.join(__dirname, '.env'),
          systemvars: true,
        }),
      ]

      return config
    },
  })
)
