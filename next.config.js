const dotenv = require('dotenv')
dotenv.config()
const env = dotenv.config().parsed || {}
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  trailingSlash: true,
  env,
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
