require('dotenv').config()

const path = require('path')
const allLanguages = require('./config/allLanguages')
const multiLanguageRoutes = allLanguages
  .map((data) => [
    { source: data.blogRoute, destination: '/frontend/blog' },
    { source: data.searchRoute, destination: '/frontend/search' },
  ])
  .flat()
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  trailingSlash: false,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      ...multiLanguageRoutes,
      {
        source: '/preview',
        destination: '/frontend/preview',
      },
      {
        source: '/pali/variants/:id',
        destination: '/library/entry',
      },
      {
        source: '/pali',
        destination: '/library/entry',
      },
      {
        source: '/:path*',
        destination: '/frontend/entry',
      },
    ]
  },
})
