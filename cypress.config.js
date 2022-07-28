const { defineConfig } = require('cypress')
const dotenv = require('dotenv')

module.exports = defineConfig({
  video: false,
  e2e: {
    setupNodeEvents() {
      // implement node event listeners here

      const result = dotenv.config({ path: './.env.cypress' })
      const env = result.error ? {} : result.parsed

      return { env }
    },
    baseUrl: 'http://localhost:5000',
  },
})
