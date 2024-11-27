const dotenv = require('dotenv')
dotenv.config()
const path = require('path')
const env =
  require('dotenv').config({ path: path.join(__dirname, '.env') }).parsed || {}
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.NEXT_PUBLIC_${next}`] = JSON.stringify(env[next])
  return prev
}, {})

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  trailingSlash: true,

  webpack: (config) => {
    config.plugins = config.plugins || []

    // Add Dotenv plugin to load environment variables
    config.plugins.push(new webpack.DefinePlugin(envKeys))

    return config
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/suche',
        destination: '/frontend/search',
      },
      {
        source: '/search',
        destination: '/frontend/search',
      },
      {
        source: '/preview',
        destination: '/frontend/preview',
      },
      {
        source: '/:path*',
        destination: '/frontend/entry',
      },
    ]
  },
})
