const { defineConfig } = require('cypress')
const dotenv = require('dotenv')
const getCompareSnapshotsPlugin = require('cypress-image-diff-js/plugin')

const result = dotenv.config({ path: './.env.cypress' })
const env = result.error ? {} : result.parsed

module.exports = defineConfig({
  projectId: 'udn3z',
  video: false,
  e2e: {
    setupNodeEvents(on, config) {
      config.env = env
      return getCompareSnapshotsPlugin(on, config)
    },
    baseUrl: env.BASE_URL,
  },
  viewportWidth: 1440,
  viewportHeight: 900,
})
