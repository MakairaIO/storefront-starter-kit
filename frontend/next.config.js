require('dotenv').config()

const withStylus = require('@zeit/next-stylus')
const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = withStylus({
  webpack: config => {
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
