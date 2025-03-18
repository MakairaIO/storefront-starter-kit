require('dotenv').config()

const path = require('path')

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
